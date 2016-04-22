var React = require('react')
import {Link} from 'react-router'

var tabList = [
	{
		title : "Templates",
		type  : "template",
		icon  : '/img/templates.svg',
		url   : '/api/templates',
		state : '/'
	},
	{
		title : "Elements",
		type  : "element",
		icon  : '/img/elements.svg',
		url   : '/api/elements',
		state : '/elements'
	},
	{
		title : "Text",
		type  : "text",
		icon  : '/img/text.svg',
		url   : '/api/fonts',
		state : '/text'
	},
	{
		title : "Upload",
		type  : "transition",
		icon  : "/img/upload.svg",
		state : "/upload"
	},
	{
		title : "Custom",
		type  : "transition",
		icon  : '/img/custommade.svg',
		state : "/custom"
	},
	{
		title : "Animate Yourself",
		type  : "transition",
		icon  : '/img/animate.svg',
		state : "/animoji"
	}
]

var Tab = React.createClass({
    handleClick: function(e){
        e.preventDefault();
        this.props.handleClick();
    },
    
    render: function(){
    	var self = this;
    	var icon = this.props.icon;
    	var title = this.props.title;
        return (
        	<Link to=""/>
        );
    }
});

var Tabs = React.createClass({
    render: function(){
    	console.log(this.props.currentTab)
        return (
        	<nav>
        		<ul>
		            {this.props.tabList.map(function(tab) {
		                return (
		                	<Link key={tab.title} activeClassName="active" to={tab.state}>
								<li>
										<img src={tab.icon}/><br/>{tab.title}
								</li>
							</Link>
		                );
		            }.bind(this))}
	            </ul>
            </nav>
        );
    }
});

var CategoryBar = React.createClass({
	getInitialState: function () {        
        return {
            tabList: tabList,
            currentTab: tabList[0]
        };
    },
	setCategory: function (category) {
		console.log('props in CategoryBar', this.props)
		console.log('setting category to ', category);
		this.setState({ currentTab: category });
		this.props.categoryChanged(category);
	},
	componentDidMount: function () {
		this.setCategory(this.state.currentTab);
	},
	render: function (){
		return (
			<div className="categories">
                <Tabs tabList={this.state.tabList} currentTab={this.state.currentTab}>
                </Tabs>
            </div>
        )
	}
})

module.exports = CategoryBar;