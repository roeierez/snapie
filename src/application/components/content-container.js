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
			this.state.fabricAPI.addTextBox(item)
		}
	},
	changeCategory: function (category) {
		if (category.type==="transition"){
			console.log(category.url);
		}
		else {
			this.setState({category: category})
			this.fetchItems(category.url)
		}
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
					<div className="content-list-container">
						<ContentList addItem={this.addItem} ref={(ref) => this.list = ref} />
					</div>
				</div>
			</div>
		);
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

var filterList = ['All', 'Birthday', 'Party', 'Love', 'Shapes', 'Holidays', 'Social', 'Technology', 'Random'];

var Filter = React.createClass({
    handleClick: function(e){
        e.preventDefault();
        this.props.handleClick();
    },
    render: function(){
    	var self = this;
    	var icon = this.props.icon;
    	var title = this.props.title;
        return (
        	<a onClick={self.handleClick} href='#'>
					<li className="filter" onClick={self.props.action}>
					{title}</li>
					</a>
        );
    }
});

var Filters = React.createClass({
    handleClick: function(filter){
        this.props.changeFilter(filter);
    },
    
    render: function(){
    	console.log(this.props.currentFilter)
        return (
        		<ul className="filters">
		            {this.props.filterList.map(function(filter) {
		                return (
	                    <Filter
	                        handleClick={this.handleClick.bind(this, filter)}
	                        key={filter}
	                        title={filter}
	                        isCurrent={(this.props.currentFilter.title === filter)}
	                     />
		                );
		            }.bind(this))}
	            </ul>
        );
    }
});

var FilterContainer = React.createClass({
	getInitialState: function () {        
        return {
            filterList: filterList,
            currentFilter: filterList[0]
        };
    },
	setFilter: function (filter) {
		console.log('setting filter to', filter);
		// CHANGE CONTENTS OF LIST HERE
	},
	componentDidMount: function () {
		this.setFilter(this.state.currentFilter);
	},
	render: function (){
		return (
			<div className="filter-container">
           <Filters filterList={this.state.filterList} currentFilter={this.state.currentFilter} changeFilter={this.setFilter}></Filters>
      </div>
    )
	}
})


module.exports = ContentContainer;


