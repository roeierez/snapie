var React = require('react');
var CategoryBar = require('./category-bar');

var FontContainer = React.createClass({
  componentDidUpdate: function (){
    var self = this;
    self.list && self.list.setState({images: []})

    self.list.setState({
      images: self.props.items
    });
  },
  render: function (){
    return (  
        <div className="fonts-container w3-animate-opacity">
        <div className="content-list-container">
          <FontList addItem={this.props.addItem} ref={(ref) => this.list = ref} />
        </div>
      </div>
    );
  }
})

var FontList = React.createClass({
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
        return <FontItem clickFunction={self.props.addItem} item={image}/>;
      })}
    </ul>
    );
  }
});


var FontItem = React.createClass({
  handleClick: function (){
    var item = this.props.item;
    console.log(item)
    this.props.clickFunction(item)
  },
  render: function (){
    var item = this.props.item;

    var fontstyle = {
      fontFamily: item.fontfamily
    };
    var separatorstyle = {
      margin: '0px'
    }
    return (

      <li onClick={this.handleClick} key={item.id}>
        <div className="font-container">
          <span className="align-left"><p style={fontstyle}>{item.name}</p></span> 
          <span className="align-right"><p style={fontstyle}>Pepper is Awesome.</p></span>
        </div>
        <hr style={separatorstyle}/>  
      </li>
    );
  }
});

module.exports = FontContainer;
