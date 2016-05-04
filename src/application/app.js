import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import {TextView, TemplatesView, ElementsView} from './main.js'
import CategoryBar from './components/category-bar'


var App = React.createClass({
	render: function () {
		return (
			<div className="application">
				<CategoryBar categoryChanged={this.changeCategory}/>
				{this.props.children}
			</div>
		)
	}
})

ReactDOM.render((
	<Router history={hashHistory}>
		<Route component={App}>
			<Route path="/" component={TemplatesView}/>
			<Route path="templates" component={TemplatesView}/>
			<Route path="elements" component={ElementsView}/>
			<Route path="text" component={TextView}/>
			<Route path="upload"/>
			<Route path="custom"/>
			<Route path="animate"/>
		</Route>
	</Router>
), document.getElementById('editor'))