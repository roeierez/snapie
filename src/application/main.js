var React = require('react');
var ReactDOM = require('react-dom')

var ContentContainer = require('./components/content-container.js')

var canvas;
var fabricAPI;

////////////////////////////////////////////////////////////////////////////////
// THIS SHOULD BE PLACED IN A SEPARATE FILE IN THE FUTURE
/**
 * These functions will handle the following supported keyboard events:
 * CTRL + Z -> Undo last edit
 * CTRL + X -> Redo last edit
 * del -> delete selected active object
 **/

// dd event listeners
window.addEventListener("keydown", KeyPressed, false);
window.addEventListener("keyup", keyReleased, false);

// store keys pressed
var keys = [];
function KeyPressed(e) {
  keys[e.keyCode] = true;
  // Undo when Ctrl + z pressed
  if (keys[17] && keys[90]) {
      console.log("Undo");
      replay(undo, redo);
  }
  
  // Redo when Ctrl + x pressed
   if (keys[17] && keys[88]) {
      console.log("Undo");
      replay(redo, undo);
  }

  // delete active element when delete key is pressed
  if (keys[8]) {
      event.preventDefault(); 
      if(canvas.getActiveGroup()){
	      canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) });
	      canvas.discardActiveGroup().renderAll();
	    } else {
	      canvas.remove(canvas.getActiveObject());
	    }
  }
}
function keyReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}

// current unsaved state
var state;
 // past states
var undo = [];
 // reverted states
var redo = [];

// Push the current state into the undo stack and then capture the current state
function save() {
  // clear the redo stack
  redo = [];
  if (state) {
    undo.push(state);
  }
  state = JSON.stringify(canvas);
}

function replay(playStack, saveStack) {
  saveStack.push(state);
  state = playStack.pop();
  canvas.clear();
  canvas.loadFromJSON(state, function() {
    canvas.renderAll();
  });
}

////////////////////////////////////////////////////////////////////////////////

var Editor = React.createClass({
	componentDidMount: function () {
		this.contentContainer.setState({fabricAPI: fabricAPI});
	},
	render: function () {
		return (
			<div className="application">
				<ContentContainer ref={(ref) => this.contentContainer = ref}/>
				<FabricEditor/>
			</div>
		);
	}
})

// Fabric Canvas Elements
var FabricEditor = React.createClass({
	componentDidMount: function () {
		canvas = new fabric.Canvas('canvas');
		
		// save initial state
    save();
    // register event listener for user's actions
    canvas.observe('object:modified', function() {
    	save();
    });

		fabricAPI = {
			addItem: function (image) {

				fabric.Image.fromURL(image.source, function (img){
					console.log('url',image.source)
					img.set({
						left: canvas.getWidth()/2,
  					top: canvas.getHeight()/2,
					});
					img.scaleToHeight(100)
					canvas.add(img);
					canvas.renderAll();
				})
			},
			addTextBox: function(image){
				// Grab the font name
				var fontFamily = image.name;
				var fabicText = new fabric.IText('Pepper is awesome!', {
		        left: canvas.getWidth()/12,
		  			top: canvas.getHeight()/2,
		  			fontFamily: fontFamily,
		  			fontSize: 28
		    })
		    canvas.add(fabicText);
			},
			addTemplate: function (image) {
				fabric.Image.fromURL(image.source, function(img) {
					img.scaleToWidth(canvas.getWidth())
					canvas.setBackgroundImage(img)
					canvas.renderAll();
				})
			}
		}
	},
	downloadCanvas: function(event) {
		// Objects need to be re-scaled to 1080x1920 before downloading and then reverted back to 270x480 
		
		console.log('downloading image');

		// Here we re-scale the objects in the canvas to Snapchat's geo filter guidelines 1080x1920
		var factor = 4.8;

		console.log('canvas height:', canvas.getHeight())
		console.log('canvas width:', canvas.getWidth())

		canvas.setHeight(canvas.getHeight() * factor);
		canvas.setWidth(canvas.getWidth() * factor);
		if (canvas.backgroundImage) {
		    // Need to scale background images as well
		    var bi = canvas.backgroundImage;
		    bi.width = bi.width * factor; bi.height = bi.height * factor;
		}
		var objects = canvas.getObjects();
		for (var i in objects) {
		    var scaleX = objects[i].scaleX;
		    var scaleY = objects[i].scaleY;
		    var left = objects[i].left;
		    var top = objects[i].top;

		    var tempScaleX = scaleX * factor;
		    var tempScaleY = scaleY * factor;
		    var tempLeft = left * factor;
		    var tempTop = top * factor;

		    objects[i].scaleX = tempScaleX;
		    objects[i].scaleY = tempScaleY;
		    objects[i].left = tempLeft;
		    objects[i].top = tempTop;

		    objects[i].setCoords();
		}
		canvas.deactivateAll();

		///////////////////////////////////////////////////////
	
		var url = canvas.toDataURL("png");
		$('#downloader').attr({href:url,download:'peppered'});

		///////////////////////////////////////////////////////

		// Here we re-scale the objects in the canvas to 270x480
		canvas.setHeight(canvas.getHeight() / factor);
		canvas.setWidth(canvas.getWidth() / factor);
		if (canvas.backgroundImage) {
		    // Need to scale background images as well
		    var bi = canvas.backgroundImage;
		    bi.width = bi.width / factor; bi.height = bi.height / factor;
		}
		var objects = canvas.getObjects();
		for (var i in objects) {
		    var scaleX = objects[i].scaleX;
		    var scaleY = objects[i].scaleY;
		    var left = objects[i].left;
		    var top = objects[i].top;

		    var tempScaleX = scaleX / factor;
		    var tempScaleY = scaleY / factor;
		    var tempLeft = left / factor;
		    var tempTop = top / factor;

		    objects[i].scaleX = tempScaleX;
		    objects[i].scaleY = tempScaleY;
		    objects[i].left = tempLeft;
		    objects[i].top = tempTop;

		    objects[i].setCoords();
		}
		canvas.renderAll();

		/////////////////////////////////////////////////////////////////////

		// open geofilter submission in new tab
		window.open('https://www.snapchat.com/geofilters/submit.html', '_blank');

	},
	render: function () {
		var self = this;
		return (
			<div className="editor-canvas">

				<EditToolbar/>
				
				<div className="underlay">
					<img className='phone-img' src="/img/iphone.png" alt="" />
					<canvas id="canvas" width="225" height="400"></canvas>
				</div>
				<div className="download-button">
					<a href="#" id="downloader" onClick={this.downloadCanvas}>Download</a>
	     	</div>
	     	<div className="guidelines">
	     		<p>Make sure you follow Snapchat's <a href="https://www.snapchat.com/geofilters/tips.html" target="_blank">Guidelines</a></p>
	     	</div>
	    </div>
		)
	}
})


/*
 * Toolbar 
 */
var EditToolbar = React.createClass({
	sendBack: function(){
		/*
		 * Sends currently selected object back
		 */
		canvas.getActiveObject().sendBackwards(true);
		console.log("sending currently selected object backward");
	},
	bringForward: function(){
		/*
		 * Brings currently selected obect forward
		 */
		canvas.getActiveObject().bringForward(true);
		console.log("sending currently selected object forward");
	},
	removeObject: function(){
		if(canvas.getActiveGroup()){
      canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) });
      canvas.discardActiveGroup().renderAll();
    } else {
      canvas.remove(canvas.getActiveObject());
    }
	},
	boldText: function(){
		var obj = canvas.getActiveObject();
		if (!obj) return;
		if (obj.fontWeight == 'bold'){
			obj.setFontWeight('normal');
		}else{
			obj.setFontWeight('bold');
		} 
		canvas.renderAll();
	},
	/*
	italicizeText: function(){
		var obj = canvas.getActiveObject();
		if (!obj) return;
		if (obj.fontStyle == 'italic'){
			obj.setFontStyle('normal');
		}else{
			obj.setFontStyle('italic');
		} 
		canvas.renderAll();
	},
	underlineText: function(){
		var obj = canvas.getActiveObject();
		if (!obj) return;
		if (obj.textDecoration == 'underline'){
			obj.setTextDecoration('normal');
		}else{
			obj.setTextDecoration('underline');
		}
		canvas.renderAll();
	},
	clearBackground: function(){
		canvas.backgroundImage = null;
		canvas.renderAll();
	},
	*/
	render: function () {
		var self = this;
		return (
			<div className="edit-toolbar">
				<ul>
					<li><a onClick={this.sendBack}><img src="/toolbar_icons/up.svg" height="42" width="42"/></a></li>
					<li><a onClick={this.bringForward}><img src="/toolbar_icons/down.svg" height="42" width="42"/></a></li>
					<li><a onClick={this.removeObject}><img src="/toolbar_icons/trash.svg" height="42" width="42"/></a></li>
					<li><ColorSelector/></li>
					<li><a onClick={this.boldText}><img src="/toolbar_icons/bold.svg" height="42" width="42"/></a></li>
				</ul>
			</div> 
		)
	}
})

var ColorSelector = React.createClass({
  changeTextColor: function(event){
    var activeObject = canvas.getActiveObject();
   	activeObject.setColor(event.target.value);
    canvas.renderAll();
	},
  render: function() {
    return (
      <input type="color" onChange={this.changeTextColor}/>
    );
  }
})

// Bootstrapping the application

ReactDOM.render(
	<Editor/>,
	document.getElementById('editor')
);

