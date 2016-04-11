var React = require('react');

var Graphics = React.createClass({
  getInitialState: function() {
    return {
      pImage: []
    };
  },
  componentDidMount: function() {
    var self = this;
    $.get(self.props.source, function(result) {
      console.log('result',result)
      if (self.isMounted()) {
        self.setState({
          pImage: result
        });
      }
    }.bind(self));
  },
  render: function() {
    var images = this.state.pImage || [];
    console.log('state', this.state)
    console.log('images',images)
    return (
    	<ul>
    		Images
				{images.map(function (image){
					return <ContentItem item={image}/>;
				})}
			</ul>
    );
  }
});

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
				<Graphics source="/api/graphics"/>
			</div>
		);
	}
})

var ContentItem = React.createClass({
	render: function (){
		var item = this.props.item;
		return (
			<li key={item.id}><img src={item.source}/></li>
		);
	}
});



ReactDOM.render(
	<Graphics source="/api/graphics"/>,document.getElementById('editor')
	//<Editor/>,
	//document.getElementById('editor')
);

