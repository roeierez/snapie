var React = require('react');
var Dropzone = require('react-dropzone');

var Upload = React.createClass({
    getInitialState: function(){
      return{ 
        imagesrc: null 
      };
    },  
    onDrop: function (files) {
      var imageFile = files[0]
      this.setState({imagesrc: imageFile}, function(){
        var img = {
          tag: "All",
          name: this.state.imagesrc.name,
          preview: null,
          source: this.state.imagesrc.preview
        }
        if (this.state.imagesrc.type == "image/png" || this.state.imagesrc.type == "image/svg"){
          this.props.addUploadItem(img)
        }else{
          console.log("Invalid file type. Please select an image.")
        }
      }.bind(this));
    },
    render: function () {
      return (
        <li className="element">
          <Dropzone className="file-upload" ref="dropzone" onDrop={this.onDrop}>
            <img className="element-image" src="/assets/default/uploadbutton.png"/>
          </Dropzone>
        </li>
      );
    }
});


module.exports = Upload;
