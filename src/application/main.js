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
				fabric.Image.fromURL(image.source, function (img){
					canvas.add(img)
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
				<a href="#" id="downloader" onClick={this.downloadCanvas.bind(this)}>Download!</a>
	     </div>
		)
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



ReactDOM.render(
	<Editor/>,
	document.getElementById('editor')
);

