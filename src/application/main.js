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

// Content Browser Elements

var ContentContainer = React.createClass({
	render: function (){
		return (
			<div className="content-editor">
				<div className="sidebar">
                    <ul>
                        <li className="active"><img src="/img/templates.svg"/><br/>Templates</li>
                        <li><img src="/img/text.png"/><br/>Text</li>
                        <li><img src="/img/elements.png"/><br/>Elements</li>
                        <li><img src="/img/custom.svg"/><br/>Custom <br/>Made</li>
                        <li><img src="/img/animate.png"/><br/>Animate Yourself</li>
                    </ul>
                </div>
                <div className="content-container">
					<FilterContainer/>
					<ContentList source="/api/elements"/>
				</div>
			</div>
		);
	}
})

var FilterContainer = React.createClass({
	render: function () {
		var filters = ['All', 'Food & Drink', 'Party', 'Love', 'Shapes',
				'Emojis', 'Animals', 'Holidays', 'Social', 'Technology', 'Random'];
		// ['Birthday', 'Wedding', 'Valentine\'s Day',
		// 		'Holiday', 'Event', 'Student Life', 'Bachelor Party', 'Concert'];
		return (
			<div className="filter-container">
				<ul className="filters">
					{filters.map(function (filter){
						return <li className="filter">{filter}</li>
					})}
				</ul>
			</div>
		)
	}

})
var ContentList = React.createClass({
	getInitialState: function() {
		return {
			pImage: []
		};
	},
	componentDidMount: function() {
		var self = this;
		$.get(self.props.source, function(result) {
			console.log('result',result)
			if (self.isMounted()) {
				self.setState({
					pImage: result
				});
			}
		}.bind(self));
	},
	render: function() {
		var images = this.state.pImage || [];
		console.log('state', this.state)
		console.log('images',images)
		return (
			<ul className="content-list">
				{images.map(function (image){
					return <ContentItem item={image}/>;
				})}
			</ul>
		);
	}
});

var ContentItem = React.createClass({
	handleClick: function (){
		var item = this.props.item;
		console.log(item)
		fabricAPI.addImage(item)
	},
	render: function (){
		var item = this.props.item;
		return (
			<li className="element" onClick={this.handleClick} key={item.id}><img className="element-image" src={item.source}/></li>
		);
	}
});


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
				<a id="downloader" onClick={this.downloadCanvas.bind(this)}>Download!</a>
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
					<li><a onClick={this.sendBack}>Send Back</a></li>
					<li><a onClick={this.bringForward}>Bring Forward</a></li>
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

