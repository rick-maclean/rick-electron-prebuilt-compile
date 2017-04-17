var React = require('react');
var ReactDOM = require('react-dom');

var $ = jQuery = require('jquery');
var bootstrap = require('bootstrap');


var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      emailUsername: '',
      password: '',
      metaDataFolder: 'metaDataFolder',
      metaDataFolderSelected: false,
      jobFilepath: 'jobFilepath',
      jobFilepathSelected: false,
      currentByteCount: 0,
      totalByteCount: 0,
      userKey: '',
      errorMessage: '',
      electronJsonStoredValue: '',
      persistedData: jsonToObjData,
      percentComplete: 15
    }//return
  }, //getInitialState

  render: function() {
   }

    return(
        <div className="container">
        </div>
    );
  } //render
});//MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('ubsUploads')
); //render
