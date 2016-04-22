var React = require('react');
var ReactDOM = require('react-dom')
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import {ContentEditorLayout, TemplateView, ElementView, FontView} from './components/content-container.js'

var canvas;
var fabricAPI;

var Root = React.createClass({
	componentDidMount: function () {
		this.setState({fabricAPI: fabricAPI});
	},
	render: function () {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={MainLayout}>
					<Route component={ContentEditorLayout}>
						<IndexRoute component={TemplateView}/>
						<Route path="elements" component={ElementView}/>
						<Route path="text" component={FontView}/>
					</Route>
				</Route>
			</Router>
		)
	}
})

var MainLayout = React.createClass({
	render: function () {
		return (
			<div className="application">
				{this.props.children}
				<FabricEditor/>
			</div>
		)
	}
})

// This Layout will contain all of the FabricEditor components
var FabricEditorLayout = React.createClass({
	render: function () {
		<FabricEditor/>
	}
})




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
	getInitialState: function() {
		// want to initially hide the toolbar until an element is selected
    return { showToolbar: false };
  },
  showToolbar: function(){
  	this.setState({ showToolbar: true });
  },
  hideToolbar: function(){
  	this.setState({ showToolbar: false });
  },
	componentDidMount: function () {
		canvas = new fabric.Canvas('canvas');
		// make the tool bar visible when object is selected
		canvas.observe('object:selected', this.showToolbar);
		canvas.observe('selection:cleared', this.hideToolbar);
		console.log('canvas obj',canvas)
		console.log('fabric obj',fabric)
		fabricAPI = {
			addItem: function (image) {

				fabric.Image.fromURL(image.source, function (img){
					console.log('url',image.source)
					img.set({
						left: canvas.getWidth()/3,
  					top: canvas.getHeight()/2,
					});
					img.scaleToHeight(100)
					canvas.add(img);
					canvas.renderAll();
				})
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
		var factor = 4;

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

	},
	render: function () {
		var self = this;
		return (
			<div className="editor-canvas">

				{ this.state.showToolbar ? <EditToolbar/> : null }
				
				<div className="underlay">
					<img className='phone-img' src="/img/iphone.png" alt="" />
					<canvas id="canvas" width="240" height="420"></canvas>
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
	changeColor: function(color){
		console.log(color)
		fabricAPI.setActiveColor(color)
	},
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
	render: function () {
		var self = this;
		return (
			<div className="edit-toolbar">
				<ul>
					<li><a onClick={this.sendBack}>Back</a></li>
					<li><a onClick={this.bringForward}>Forward</a></li>
					<li><a onClick={this.removeObject}>Remove</a></li>
				</ul>
			</div>
	
		)
	}
})




// Bootstrapping the application

ReactDOM.render(
	<Root/>,
	document.getElementById('editor')
);

