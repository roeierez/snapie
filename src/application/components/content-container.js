var React = require('react');
var CategoryBar = require('./category-bar');
var fabricAPI;

var ContentContainer = React.createClass({
	getInitialState: function() {
		return {
			currentFilter: 'All'
		};
	},
	componentDidUpdate: function (){
		this.filterItems()
	},
	changeFilter: function(filter) {
		// When a filter is changes, we grab the elements from the server
		this.setState({currentFilter: filter});
		console.log("Changing Filter", this.state.currentFilter);
		if(this.state.category != null){
			this.filterItems();
		}
	},
	filterItems: function () {
		console.log('filtering things')
		var self = this;
		self.list && self.list.setState({images: []})
		var currentFilter = this.state.currentFilter
		var items = self.props.items;
		var filteredList=[]
		// loop through them and look at the tags
		items.forEach(function(image, index){
			if(isInTagList(currentFilter, image.tag)){
				filteredList.push(image);
			}
		})
		self.list.setState({
			images: filteredList
		});
	},
	render: function (){
		return (	
    		<div className="content-container w3-animate-opacity">
				<FilterContainer filterChanged={this.changeFilter}/>
				<div className="content-list-container">
					<ContentList addItem={this.props.addItem} ref={(ref) => this.list = ref} />
				</div>
			</div>
		);
	}
})

function isInTagList(value, array) {
  return array.indexOf(value) > -1;
}

var ContentList = React.createClass({
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
					<p className={self.props.isCurrent ? 'active' : 'inactive'}>{title}</p></li>
					</a>
        );
    }
});

var Filters = React.createClass({
    handleClick: function(filter){
        this.props.changeFilter(filter);
    },
    render: function(){
        return (
        		<ul className="filters">
		            {this.props.filterList.map(function(filter) {
		                return (
	                    <Filter
	                        handleClick={this.handleClick.bind(this, filter)}
	                        key={filter}
	                        title={filter}
	                        isCurrent={(this.props.currentFilter == filter)}
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
            currentFilter: filterList[0],
        };
    },
	setFilter: function (filter) {
		this.props.filterChanged(filter);
    this.setState({currentFilter: filter});
    console.log("Current Filter", filter);

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


