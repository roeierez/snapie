var React = require('react');
var CategoryBar = require('./category-bar');
var fabricAPI;

var ContentContainer = React.createClass({
	componentDidUpdate: function (){
		if (this.state.fabricAPI){
			fabricAPI = this.state.fabricAPI
		} else {
			fabricAPI = {}
		}
	},
	addItem: function (item) {
		if (this.state.category.type==="element") {
			this.state.fabricAPI.addItem(item)
		}
		else if (this.state.category.type==="template"){
			this.state.fabricAPI.addTemplate(item)
		}
		else if (this.state.category.type==="text") {
			this.state.fabricAPI.addTextBox(text)
		}
	},
	changeCategory: function (category) {
		this.setState({category: category})
		this.fetchItems(category.url)
	},
	fetchItems: function (url) {
		var self = this;
		self.list && self.list.setState({images: []})
		$.get(url, function(result) {
			console.log('retrieved',result)
			// This really shouldn't need to be stored directly on the element like this.
			self.list.setState({
				images: result
			});
		}.bind(self))
	},
	render: function (){
		return (
			<div className="content-editor">
				<CategoryBar categoryChanged={this.changeCategory}/>
                <div className="content-container">
					<FilterContainer/>
					<ContentList addItem={this.addItem} ref={(ref) => this.list = ref} />
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
			images: []
		};
	},
	render: function() {
		var images = this.state.images;
		var self = this;
		return (
		<ul className="content-list">
			{images.map(function (image){
				return <ContentItem clickFunction={self.props.addItem} item={image}/>;
			})}
		</ul>
			
		);
	}
});

var ContentItem = React.createClass({
	handleClick: function (){
		var item = this.props.item;
		console.log(item)
		this.props.clickFunction(item)
	},
	render: function (){
		var item = this.props.item;
		return (
			<li className="element" onClick={this.handleClick} key={item.id}><img className="element-image" src={item.preview}/></li>
		);
	}
});

module.exports = ContentContainer;


