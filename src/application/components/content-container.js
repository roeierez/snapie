var React = require('React');
var CategoryBar = require('./category-bar');
var fabricAPI;

var ContentContainer = React.createClass({
	componentDidUpdate: function (){
		console.log('updated')
		if (this.state.fabricAPI){
			fabricAPI = this.state.fabricAPI
			console.log('fabric api loaded')
		} else {
			fabricAPI = {}
			console.log('fabric api could not be found!')
		}
	},
	render: function (){
		return (
			<div className="content-editor">
				<CategoryBar/>
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
						return <li className="filter" key={filter}>{filter}</li>
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
			if (self.isMounted()) {
				self.setState({
					pImage: result
				});
			}
		}.bind(self));
	},
	render: function() {
		var images = this.state.pImage || [];
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

module.exports = ContentContainer;


