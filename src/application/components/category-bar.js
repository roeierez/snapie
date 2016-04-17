var React = require('react')

var tabList = [
	{
		title: "Templates",
		type: "template",
		icon: '/img/templates.svg',
		url: '/api/templates'
	},
	{
		title: "Elements",
		type: "element",
		icon: '/img/elements.svg',
		url: '/api/elements'
	},
	{
		title: "Text",
		type: "text",
		icon: '/img/text.svg',
		url: '/api/fonts'
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
    	console.log(this.props.currentTab)
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
		                        isCurrent={(this.props.currentTab.title === tab.title)}
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
			<div className="sidebar">
                <Tabs tabList={this.state.tabList} currentTab={this.state.currentTab} changeTab={this.setCategory}>
                </Tabs>
            </div>
        )
	}
})

module.exports = CategoryBar;