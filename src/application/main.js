var React = require('react');
var ReactDOM = require('react-dom')

var ContentContainer = require('./components/content-container.js')

var canvas;
var fabricAPI;

var Editor = React.createClass({
	componentDidMount: function () {
		console.log('api...', fabricAPI);
		console.log('setting component state to', fabricAPI)
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
			addImage: function (image) {
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
			}
		}
	},
	downloadCanvas: function(event) {
		console.log('downloading image');
		canvas.deactivateAll().renderAll();
		var url = canvas.toDataURL("png");
		$('#downloader').attr({href:url,download:'peppered'});
	},
	render: function () {
		var self = this;
		return (
			<div className="editor-canvas">

				{ this.state.showToolbar ? <EditToolbar/> : null }
				
				<div className="underlay">
					<img className='phone-img' src="/img/iphone.png" alt="" />
					<canvas id="canvas" width="270" height="480"></canvas>
				</div>
				<div className="download-button">
					<a href="#" id="downloader" onClick={this.downloadCanvas}>Download!</a>
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
	render: function () {
		var self = this;
		return (
			<div className="edit-toolbar">
				<ul>
					<li><a onClick={this.sendBack}>Back</a></li>
					<li><a onClick={this.bringForward}>Forward</a></li>
				</ul>
			</div>
	
		)
	}
})




// Bootstrapping the application

ReactDOM.render(
	<Editor/>,
	document.getElementById('editor')
);

