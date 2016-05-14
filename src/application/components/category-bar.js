import React from 'react'
import {Link} from 'react-router'

var tabList = [
	{
		title : "Backgrounds",
		icon  : '/assets/img/templates.svg',
		url   : '/api/backgrounds',
		state : '/backgrounds'
	},
	{
		title : "Templates",
		icon  : '/assets/img/templates.svg',
		url   : '/api/templates',
		state : '/templates'
	},
	{
		title : "Elements",
		icon  : '/assets/img/elements.svg',
		url   : '/api/elements',
		state : '/elements'
	},
	{
		title : "Text",
		icon  : '/assets/img/text.svg',
		url   : '/api/fonts',
		state : '/text'
	}
  /*,
	{
		title : "Custom",
		icon  : '/assets/img/custommade.svg',
		state : "/custom"
	},
	{
		title : "Animate Yourself",
		icon  : '/assets/img/animate.svg',
		state : "/animoji"
	}
  */
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
        	<a onClick={self.handleClick} href='#'>
			<li className={self.props.isCurrent ? 'active' : 'inactive'} onClick={self.props.action}>
          <object type="image/svg+xml" data={self.props.icon}></object><br/>{self.props.title}
			</li>
			</a>
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

	componentWillMount: function(){
		if (!this.props.showBackgrounds) {
			tabList.shift();
			this.setState({
				tabList: tabList,
				currentTab: tabList[0]
			});
		}
	},
	setCategory: function (category) {
		console.log('props in CategoryBar', this.props)
		console.log('setting category to ', category);
		this.setState({ currentTab: category });
		//this.props.categoryChanged(category);
	},
	componentDidMount: function () {
		this.setCategory(this.state.currentTab);
	},
	render: function (){
		return (
			<div className="categories">
                <Tabs tabList={this.state.tabList} currentTab={this.state.currentTab} changeTab={this.setCategory}>
                </Tabs>
            </div>
        )
	}
})

module.exports = CategoryBar;