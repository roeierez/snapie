var Editor = React.createClass({
	render: function () {
		return (
			<div className="editor">
				<ContentContainer/>
			</div>
		);
	}
})

var ContentContainer = React.createClass({
	render: function (){
		return (
			<div className="content-container">
				<FilterContainer/>
				<ContentList source="/api/elements"/>
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
				<ul>
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
	render: function (){
		var item = this.props.item;
		return (
			<li className="element" key={item.id}><img className="element-image" src={item.source}/></li>
		);
	}
});



ReactDOM.render(
	<Editor/>,
	document.getElementById('editor')
);

