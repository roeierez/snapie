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
  console.log('saving state')
  redo = [];
  if (state) {
    undo.push(state);
  }
  state = JSON.stringify(canvas);
}

function load(prevState) {
	console.log('loading state')
	canvas.loadFromJSON(prevState, function() {
		canvas.renderAll();
	});
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
var TemplatesView = React.createClass({
	getInitialState: function () {
		return {items: []}
	},
	componentDidMount: function (){
		this.fetchItems()
	},
	shouldComponentUpdate: function (a, b){
		console.log('update?', a, b)
		return true
	},
	fetchItems: function () {
		var self = this;
		$.get('/api/templates', function(results) {
			console.log('retrieved results', results)
			this.setState({
				items: results
			});
		}.bind(self))
	},
	addItem: function (item) {
		fabricAPI.addTemplate(item)
	},
	render: function () {
		return (
			<div className="content-editor">
				<ContentContainer items={this.state.items} addItem={this.addItem} />
				<FabricEditor/>
			</div>
		)
	}
})
var ElementsView = React.createClass({
	getInitialState: function () {
		return {items: []}
	},
	componentDidMount: function (){
		this.fetchItems()
	},
	shouldComponentUpdate: function (a, b){
		return true
	},
	fetchItems: function () {
		var self = this;
		$.get('/api/elements', function(results) {
			console.log('retrieved results', results)
			this.setState({
				items: results
			});
		}.bind(self))
	},
	addItem: function (item) {
		fabricAPI.addItem(item)
	},
	render: function () {
		return (
			<div className="content-editor">
				<ContentContainer items={this.state.items} addItem={this.addItem} />
				<FabricEditor/>
			</div>
		)
	}
})
var TextView = React.createClass({
	getInitialState: function () {
		return {items: []}
	},
	componentDidMount: function (){
		this.fetchItems()
	},
	shouldComponentUpdate: function (a, b){
		console.log('update?', a, b)
		return true
	},
	fetchItems: function () {
		var self = this;
		$.get('/api/fonts', function(results) {
			console.log('retrieved results', results)
			this.setState({
				items: results
			});
		}.bind(self))
	},
	addItem: function (item) {
		fabricAPI.addTextBox(item)
	},
	render: function () {
		return (
			<div className="content-editor">
				<FontContainer items={this.state.items} addItem={this.addItem} />
				<FabricEditor/>
			</div>
		)
	}
})

var FontContainer = React.createClass({
	componentDidUpdate: function (){
		var self = this;
		self.list && self.list.setState({images: []})

		self.list.setState({
			images: self.props.items
		});
	},
	render: function (){
		return (	
    		<div className="fonts-container">
				<div className="content-list-container">
					<FontList addItem={this.props.addItem} ref={(ref) => this.list = ref} />
				</div>
			</div>
		);
	}
})

var FontList = React.createClass({
	getInitialState: function() {
		return {
			images: [],
		};
	},
	render: function() {
		var images = this.state.images;
		var self = this;
		// Here we grab the tag list from the api, and we check whether the 
		// current filter is in the tag list, if so display
		return (
		<ul className="content-list">
			{images.map(function (image){
				return <FontItem clickFunction={self.props.addItem} item={image}/>;
			})}
		</ul>
		);
	}
});


var FontItem = React.createClass({
	handleClick: function (){
		var item = this.props.item;
		console.log(item)
		this.props.clickFunction(item)
	},
	render: function (){
		var item = this.props.item;

		var fontstyle = {
		  fontFamily: item.fontfamily
		};
		var separatorstyle = {
			margin: '0px'
		}
		return (

			<li onClick={this.handleClick} key={item.id}>
				<div className="font-container">
					<span className="align-left"><p style={fontstyle}>{item.name}</p></span> 
          <span className="align-right"><p style={fontstyle}>Pepper is Awesome!</p></span>
        </div>
        <hr style={separatorstyle}/>  
			</li>
		);
	}
});




var Editor = React.createClass({
	componentDidMount: function () {
		this.contentContainer.setState({fabricAPI: fabricAPI});
	},
	render: function () {
		return (
			<div className="content-editor">
				<ContentContainer ref={(ref) => this.contentContainer = ref}/>
				<FabricEditor/>
			</div>
		);
	}
})

// Fabric Canvas Elements
var FabricEditor = React.createClass({
	componentDidMount: function () {
	console.log('starting fabric')
	if (canvas) {
		console.log('loading old state');
		canvas = new fabric.Canvas('canvas');
		load(state)
	} else {
		console.log('starting from scratch')
		canvas = new fabric.Canvas('canvas');
		// save initial state
	    save();
	}
    // register event listener for user's actions
    canvas.observe('object:modified', function() {
    	console.log('object:modified')
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
				var fontFamily = image.fontfamily;
				var fabicText = new fabric.IText('Pepper is awesome!', {
			        left: canvas.getWidth()/12,
			  			top: canvas.getHeight()/2,
			  			fontFamily: fontFamily,
			  			fontSize: 20
			    })
			    canvas.add(fabicText);
			},
			addTemplate: function (image) {
				fabric.Image.fromURL(image.source, function(img) {
					img.scaleToWidth(canvas.getWidth())
					canvas.setBackgroundImage(img)
					canvas.renderAll();
				})
			},
			removeObject: function () {
				if(canvas.getActiveGroup()){
					canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) });
      				canvas.discardActiveGroup();
		    	} else {
		    		canvas.remove(canvas.getActiveObject());
		    	}
				canvas.renderAll();
				console.log("Removing Object")
			},
			boldenText: function () {
				var obj = canvas.getActiveObject();
				if (!obj) return;
				if (obj.fontWeight == 'bold'){
					obj.setFontWeight('normal');
				}else{
					obj.setFontWeight('bold');
				} 
				canvas.renderAll();
			},
			setColor: function (value) {
				var activeObject = canvas.getActiveObject();
				activeObject.setColor(value);
				canvas.renderAll();
			},
			bringForward: function (){
				canvas.getActiveObject().bringForward(true);
			},
			sendBack: function () {
				canvas.getActiveObject().sendBackwards(true);
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
					<img className='phone-img' src="/assets/img/iphone.png" alt="" />
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
		fabricAPI.sendBack()
		console.log("sending currently selected object backward");
	},
	bringForward: function(){
		/*
		 * Brings currently selected obect forward
		 */
		fabricAPI.bringForward
		console.log("sending currently selected object forward");
	},
	removeObject: function(){
		fabricAPI.removeObject()
	},
	boldText: function(){
		fabricAPI.boldenText()
	},
	render: function () {
		var self = this;
		return (
			<div className="edit-toolbar">
				<ul>
					<li><a onClick={this.sendBack}><img src="/assets/toolbar_icons/up.svg" height="42" width="42"/></a></li>
					<li><a onClick={this.bringForward}><img src="/assets/toolbar_icons/down.svg" height="42" width="42"/></a></li>
					<li><a onClick={this.removeObject}><img src="/assets/toolbar_icons/trash.svg" height="42" width="42"/></a></li>
					<li><ColorSelector/></li>
					<li><a onClick={this.boldText}><img src="/assets/toolbar_icons/bold.svg" height="42" width="42"/></a></li>
				</ul>
			</div> 
		)
	}
})

var ColorSelector = React.createClass({
	changeTextColor: function(event){
		fabricAPI.setColor(event.target.value)
	},
  	render: function() {
    	return (
			<input type="color" onChange={this.changeTextColor}/>
		);
  	}
})

// Bootstrapping the application

// ReactDOM.render(
// 	<Editor/>,
// 	document.getElementById('editor')
// );
module.exports = {
	Editor,
	TemplatesView,
	ElementsView,
	TextView
}


