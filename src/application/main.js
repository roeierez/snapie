var React = require('react');
var ReactDOM = require('react-dom')

var ContentContainer = require('./components/content-container.js')

var canvas;
var fabricAPI;

var Editor = React.createClass({
	render: function () {
		return (
			<div className="application">
				<ContentContainer/>
				<FabricEditor/>
			</div>
		);
	}
})


// Fabric Canvas Elements
var FabricEditor = React.createClass({
	componentDidMount: function () {
		fabricAPI = {
			addImage: function (image) {
				console.log('url',image.source)
				fabric.Image.fromURL(image.source, function (img){
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
		canvas.deactivateAll().renderAll();
		var url = canvas.toDataURL("png");
		$('#downloader').attr({href:url,download:'peppered'});
	},
	render: function () {
		var self = this;
		return (
			<div className="editor-canvas">
				<div className="underlay">
					<img className='phone-img' src="/img/iphone.png" alt="" />
					<canvas id="canvas" width="270" height="480"></canvas>
				</div>
				<a href="#" id="downloader" onClick={this.downloadCanvas}>Download!</a>
	     </div>
		)
	}
})

var EditToolbar = React.createClass({
	changeColor: function(color){
		console.log(color)
		fabricAPI.setActiveColor(color)
	},
	render: function () {
		var self = this;
		return (
			<ul class="edit-toolbar">
				<li><a onClick={self.changeColor.bind(self, '#0F0')}>Green</a></li>
				<li><a onClick={self.changeColor}>Blue</a></li>
				<li><a onClick={this.changeColor.bind(self, '#F00')}>Red</a></li>
			</ul>
		)
	}
})




// Bootstrapping the application

ReactDOM.render(
	<Editor/>,
	document.getElementById('editor')
);

