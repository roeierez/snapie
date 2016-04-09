// var React = require('react');
// var ReactDOM = require('react-dom');


var Editor = React.createClass({
	render: function () {
		return (
			<div className="editor">
			<ContentBrowser/>
			</div>
		);
	}
})
var ContentBrowser = React.createClass({
	render: function (){
		return (
			<div className="ContentBrowser">
				<ContentList items={['lololol', 'bruhhhh', 'look at dis shit']}/>
			</div>
		);
	}
})

var ContentList = React.createClass({
	render: function () {
		console.log(this.props)
		var items = this.props.items;
		return (
			<ul>
				{items.map(function (item){
					return <ContentItem key= {item} item={item}/>;
				})}
			</ul>
		);
	}
});

var ContentItem = React.createClass({
	render: function (){
		var item = this.props.item;
		return (
			<ul key={item}>{item}</ul>
		);
	}
});

ReactDOM.render(
	<Editor/>,
	document.getElementById('editor')
);

