var React = require('react')

var tabList = [
	{
		title: "Templates",
		icon: '/img/templates.svg'
	},
	{
		title: "Elements",
		icon: '/img/elements.svg'
	},
	{
		title: "Text",
		icon: '/img/text.svg'
	},
	{
		title: "Custom",
		icon: '/img/custommade.svg'
	},
	{
		title: "Animate Yourself",
		icon: '/img/animate.svg'
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
        	<a onClick={self.handleClick} href='#'>
			<li className={self.props.isCurrent ? 'active' : 'inactive'} onClick={self.props.action}>
					<img src={self.props.icon}/><br/>{self.props.title}
			</li>
			</a>
        );
    }
});

var Tabs = React.createClass({
    handleClick: function(tab){
        this.props.changeTab(tab);
    },
    
    render: function(){
        return (
        	<nav>
        		<ul>
		            {this.props.tabList.map(function(tab) {
		                return (
		                    <Tab
		                        handleClick={this.handleClick.bind(this, tab)}
		                        key={tab.title}
		                        icon={tab.icon}
		                        title={tab.title}
		                        isCurrent={(this.props.currentTab === tab.title)}
		                     />
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
            currentTab: 'Templates'
        };
    },
	setCategory: function (category) {
		console.log('setting category to ', category);
		this.setState({ currentTab: category.title });
	},
	render: function (){
		return (
			<div className="sidebar">
                <Tabs tabList={this.state.tabList} currentTab={this.state.currentTab} changeTab={this.setCategory}>
                </Tabs>
            </div>
        )
	}
})

module.exports = CategoryBar;