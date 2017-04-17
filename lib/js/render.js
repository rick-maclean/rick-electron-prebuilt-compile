'use strict';

var $ = jQuery = require('jquery');
var _ = require('lodash');
var bootstrap = require('bootstrap');

var fs = eRequire('fs'),
    xml2js = eRequire('xml2js');

var electron = eRequire('electron');
var ipc = electron.ipcRenderer;
var app = eRequire('electron').remote;
var dialog = app.dialog;

var React = require('react');
var ReactDOM = require('react-dom');
var LoginSubcomponent = require('./LoginSubcomponent');
var JobSpecification = require('./JobSpecification');
var ProgressElement = require('./ProgressBar');
//var ProgressBarDemo = require('./ProgressBarDemo');

function persistData(storage_key, jsonData) {
  console.log('inside persitComponent() and storage_key is ' + storage_key + ', and jsonData is, ' + jsonData);
  const appStorage = eRequire('electron-json-storage');
  //Write
  appStorage.set(storage_key, jsonData, function (error) {
    if (error) throw error;
  });
}

function restorePersistedData(jsonStoragekey) {
  console.log('inside restorePersistedData() and storage_key is ' + jsonStoragekey);
  const storage = eRequire('electron-json-storage');
  //Read
  storage.get(jsonStoragekey, function (error, retrievedData) {
    if (error) throw error;

    console.log('the data restored from persistance is = ' + retrievedData);
    console.log(retrievedData);
  });
  //storage.get(jsonStoragekey, function (error, retrievedData) {
  //    if (error) throw error;
  //console.log('the data restored from persistance is = ' + retrievedData);
}

function isNonemptyString(str) {
  if (typeof str === 'string' && str.length > 0) {
    return true;
  } else {
    return false;
  }
}

var jsonData = '{   "petName": "Buffy"  }';
var jsonToObjData = JSON.parse(jsonData);

var MainInterface = React.createClass({
  displayName: 'MainInterface',

  getInitialState: function () {
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
    }; //return
  }, //getInitialState
  /*
  currentFileInfo: {
    filename: 'currentFileInfo filename',
    size: 'currentFileInfo size'
  },
  */

  componentDidMount: function () {
    console.log('componentDidMount lifecycle running');

    const storage = eRequire('electron-json-storage');
    storage.getAll(function (error, data) {
      if (error) throw error;

      console.log('inside onestorePersistedAllData');
      console.log('data.loginPersistKey is =>' + data.loginPersistKey);
      console.log('data.metaDataPersistKey is =>' + data.metaDataPersistKey);
      console.log('data.jobFilePersistKey is =>' + data.jobFilePersistKey);
      // console.log('ALL the data restored from electron-json-storage  is : ' + data);
      jQuery('#inputEmail').val(data.loginPersistKey);

      if (isNonemptyString(data.metaDataPersistKey)) {
        jQuery('#metaDataFolderId').text(data.metaDataPersistKey);
        this.setState({ metaDataFolderSelected: true }); //setState
      }

      if (isNonemptyString(data.jobFilePersistKey)) {
        jQuery('#jobFilePathId').text(data.jobFilePersistKey);
        this.setState({ jobFilepathSelected: true }); //setState
      }

      if (isNonemptyString(data.jobFilePersistKey) && isNonemptyString(data.metaDataPersistKey)) {
        $('#sendButton').removeAttr("disabled");
      }
    }.bind(this));
  }, //componentDidMount

  componentDidUpdate: function () {
    console.log('componentDidUpdate lifecycle running');
    console.log('this.state.metaDataFolder is =>' + this.state.metaDataFolder);
    console.log('this.state.metaDataFolderSelected is =>' + this.state.metaDataFolderSelected);
    console.log('this.state.jobFilepath is =>' + this.state.jobFilepath);
    console.log('this.state.jobFilepathSelected is =>' + this.state.jobFilepathSelected);
  }, //componentDidUpdate

  showAbout: function () {
    ipc.sendSync('openInfoWindow');
  }, //showAbout

  mainHandleLogin: function (loginCredentials) {
    var subuserName = loginCredentials.userName;
    var subpassword = loginCredentials.password;
    console.log('subuserName is = ' + subuserName);
    console.log('subpassword is = ' + subpassword);
    /*this.setState( {
      emailUsername : subuserName,
      password: subpassword
    }); //setState */
    this.setState({
      emailUsername: subuserName,
      password: subpassword
    }); //setState
    persistData('loginPersistKey', subuserName);

    /*================================= LOGIN CODE ====================================================
    let params = $.param({ 'email': this.state.emailUsername, 'password': this.state.password });
    let url = "https://app.thedigitalbiblelibrary.org/api/user_token?" + params;
     // $.get() requires "Allow-Control-Allow-Origin: *" Chrome extension when
    // running in localhost Chrome browser to avoid cross domain errors
        $.get({
            url: url,
            success: function (result) {
              this.setState( {
                userKey : result,
                errorMessage : ''
                }); //setState
            }
        }).fail(function (response) {
          let errorMsg = 'error.message' +  `${response.statusText} (Code ${response.status}) ${response.responseText}`;
          this.setState( {
            errorMessage : errorMsg
            }); //setState
        });
        =================================================================================================*/
  }, //mainHandleLogin

  onSelectMetaDataFile: function () {
    console.log('called onSelectMetaDataFile');
    var path = dialog.showOpenDialog({ title: "Select a folder", properties: ["openDirectory"] });
    if (path === undefined) {
      console.log("No destination folder selected");
      this.setState({ metaDataFolderSelected: false });
      this.setState({ metaDataFolder: '' });
    } else {
      //console.log('going to set the path and boolean' + path);
      this.setState({ metaDataFolderSelected: true });
      this.setState({ metaDataFolder: path[0] });
    }
    persistData('metaDataPersistKey', path[0]);
    console.log('end of onSelectMetaDataFile');
  }, //onSelectMetaDataFile

  onSelectJobSpecsFile: function () {
    console.log('called onSelectJobSpecsFile');
    var fileNames = dialog.showOpenDialog();
    if (fileNames === undefined) {
      console.log("No file selected");
      this.setState({ jobFilepathSelected: false });
      this.setState({ jobFilepath: '' });
      return;
    } else {
      //console.log('going to set the filename and boolean' + fileNames);
      this.setState({ jobFilepathSelected: true });
      this.setState({ jobFilepath: fileNames[0] });
    }
    persistData('jobFilePersistKey', fileNames[0]);
    console.log('end of onSelectJobSpecsFile');
  }, //onSelectJobSpecsFile

  onHandleSend: function (sendFileSpecs) {
    console.log('called onHandleSend');
    console.log('metaDataFolder= ' + sendFileSpecs.metaDataFolder);
    console.log('jobFilepath= ' + sendFileSpecs.jobFilepath);
    var temp_percentComplete = this.state.percentComplete;
    if (temp_percentComplete == 100) {
      temp_percentComplete = 20;
    }
    temp_percentComplete = temp_percentComplete + 0.33 * temp_percentComplete;
    if (temp_percentComplete > 100) {
      this.setState({ percentComplete: 100 });
    } else {
      this.setState({ percentComplete: temp_percentComplete });
    }
  }, //onHandleSend

  computeProgressBar: function () {
    return this.state.currentByteCount / this.state.totalByteCount * 100;
  }, //computeProgressBar


  render: function () {
    //var filteredApts = [];
    //var myAppointments = this.state.myAppointments;
    /*
    var parseString = xml2js.parseString;
    var xml = "<root>Hello xml2js!</root>";
    parseString(xml, function (err, result) {
        console.dir(result);
    });
    var parser = new xml2js.Parser();
    fs.readFile(xmlDataLocation, function(err, data) {
        parser.parseString(data, function (err, result) {
            console.dir(result);
            console.log('Done');
        });
    });
    */

    if (this.state.jobFilepathSelected && this.state.metaDataFolderSelected) {
      $('#sendButton').removeAttr("disabled");
    } else {
      $('#sendButton').attr("disabled", "true");
    }

    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(LoginSubcomponent, {
        subHandleLogin: this.mainHandleLogin,
        subUsername: this.state.emailUsername,
        subPassword: this.state.password
      }),
      React.createElement(JobSpecification, {
        metaDataFolder: this.state.metaDataFolder,
        jobFilepath: this.state.jobFilepath,
        onselectMetaDataFile: this.onSelectMetaDataFile,
        onselectJobSpecsFile: this.onSelectJobSpecsFile,
        handleSend: this.onHandleSend
      }),
      React.createElement(ProgressElement, {
        percentComplete: this.state.percentComplete })
    );
  } //render
}); //MainInterface

ReactDOM.render(React.createElement(MainInterface, null), document.getElementById('ubsUploads')); //render
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qcy9yZW5kZXIuanMiXSwibmFtZXMiOlsiJCIsImpRdWVyeSIsInJlcXVpcmUiLCJfIiwiYm9vdHN0cmFwIiwiZnMiLCJlUmVxdWlyZSIsInhtbDJqcyIsImVsZWN0cm9uIiwiaXBjIiwiaXBjUmVuZGVyZXIiLCJhcHAiLCJyZW1vdGUiLCJkaWFsb2ciLCJSZWFjdCIsIlJlYWN0RE9NIiwiTG9naW5TdWJjb21wb25lbnQiLCJKb2JTcGVjaWZpY2F0aW9uIiwiUHJvZ3Jlc3NFbGVtZW50IiwicGVyc2lzdERhdGEiLCJzdG9yYWdlX2tleSIsImpzb25EYXRhIiwiY29uc29sZSIsImxvZyIsImFwcFN0b3JhZ2UiLCJzZXQiLCJlcnJvciIsInJlc3RvcmVQZXJzaXN0ZWREYXRhIiwianNvblN0b3JhZ2VrZXkiLCJzdG9yYWdlIiwiZ2V0IiwicmV0cmlldmVkRGF0YSIsImlzTm9uZW1wdHlTdHJpbmciLCJzdHIiLCJsZW5ndGgiLCJqc29uVG9PYmpEYXRhIiwiSlNPTiIsInBhcnNlIiwiTWFpbkludGVyZmFjZSIsImNyZWF0ZUNsYXNzIiwiZ2V0SW5pdGlhbFN0YXRlIiwiZW1haWxVc2VybmFtZSIsInBhc3N3b3JkIiwibWV0YURhdGFGb2xkZXIiLCJtZXRhRGF0YUZvbGRlclNlbGVjdGVkIiwiam9iRmlsZXBhdGgiLCJqb2JGaWxlcGF0aFNlbGVjdGVkIiwiY3VycmVudEJ5dGVDb3VudCIsInRvdGFsQnl0ZUNvdW50IiwidXNlcktleSIsImVycm9yTWVzc2FnZSIsImVsZWN0cm9uSnNvblN0b3JlZFZhbHVlIiwicGVyc2lzdGVkRGF0YSIsInBlcmNlbnRDb21wbGV0ZSIsImNvbXBvbmVudERpZE1vdW50IiwiZ2V0QWxsIiwiZGF0YSIsImxvZ2luUGVyc2lzdEtleSIsIm1ldGFEYXRhUGVyc2lzdEtleSIsImpvYkZpbGVQZXJzaXN0S2V5IiwidmFsIiwidGV4dCIsInNldFN0YXRlIiwicmVtb3ZlQXR0ciIsImJpbmQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJzdGF0ZSIsInNob3dBYm91dCIsInNlbmRTeW5jIiwibWFpbkhhbmRsZUxvZ2luIiwibG9naW5DcmVkZW50aWFscyIsInN1YnVzZXJOYW1lIiwidXNlck5hbWUiLCJzdWJwYXNzd29yZCIsIm9uU2VsZWN0TWV0YURhdGFGaWxlIiwicGF0aCIsInNob3dPcGVuRGlhbG9nIiwidGl0bGUiLCJwcm9wZXJ0aWVzIiwidW5kZWZpbmVkIiwib25TZWxlY3RKb2JTcGVjc0ZpbGUiLCJmaWxlTmFtZXMiLCJvbkhhbmRsZVNlbmQiLCJzZW5kRmlsZVNwZWNzIiwidGVtcF9wZXJjZW50Q29tcGxldGUiLCJjb21wdXRlUHJvZ3Jlc3NCYXIiLCJyZW5kZXIiLCJhdHRyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxJQUFJQyxTQUFTQyxRQUFRLFFBQVIsQ0FBakI7QUFDQSxJQUFJQyxJQUFJRCxRQUFRLFFBQVIsQ0FBUjtBQUNBLElBQUlFLFlBQVlGLFFBQVEsV0FBUixDQUFoQjs7QUFFQSxJQUFJRyxLQUFLQyxTQUFTLElBQVQsQ0FBVDtBQUFBLElBQ0lDLFNBQVNELFNBQVMsUUFBVCxDQURiOztBQUdBLElBQUlFLFdBQVdGLFNBQVMsVUFBVCxDQUFmO0FBQ0EsSUFBSUcsTUFBTUQsU0FBU0UsV0FBbkI7QUFDQSxJQUFJQyxNQUFNTCxTQUFTLFVBQVQsRUFBcUJNLE1BQS9CO0FBQ0EsSUFBSUMsU0FBU0YsSUFBSUUsTUFBakI7O0FBRUEsSUFBSUMsUUFBUVosUUFBUSxPQUFSLENBQVo7QUFDQSxJQUFJYSxXQUFXYixRQUFRLFdBQVIsQ0FBZjtBQUNBLElBQUljLG9CQUFvQmQsUUFBUSxxQkFBUixDQUF4QjtBQUNBLElBQUllLG1CQUFtQmYsUUFBUSxvQkFBUixDQUF2QjtBQUNBLElBQUlnQixrQkFBa0JoQixRQUFRLGVBQVIsQ0FBdEI7QUFDQTs7QUFFQSxTQUFTaUIsV0FBVCxDQUFxQkMsV0FBckIsRUFBa0NDLFFBQWxDLEVBQTRDO0FBQzFDQyxV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LFFBQUssV0FBVSxXQUFmO0FBQ0EsMEJBQUMsaUJBQUQ7QUFDSSx3QkFBa0IsS0FBS2xCLGVBRDNCO0FBRUkscUJBQWUsS0FBS0gsS0FBTCxDQUFXekIsYUFGOUI7QUFHSSxxQkFBZSxLQUFLeUIsS0FBTCxDQUFXeEI7QUFIOUIsUUFEQTtBQU1FLDBCQUFDLGdCQUFEO0FBQ0Esd0JBQWtCLEtBQUt3QixLQUFMLENBQVd2QixjQUQ3QjtBQUVBLHFCQUFlLEtBQUt1QixLQUFMLENBQVdyQixXQUYxQjtBQUdBLDhCQUF3QixLQUFLNkIsb0JBSDdCO0FBSUEsOEJBQXdCLEtBQUtNLG9CQUo3QjtBQUtBLG9CQUFjLEtBQUtFO0FBTG5CLFFBTkY7QUFhRSwwQkFBQyxlQUFEO0FBQ0kseUJBQWlCLEtBQUtoQixLQUFMLENBQVdiLGVBRGhDO0FBYkYsS0FESjtBQWtCRCxHQTNNbUMsQ0EyTWxDO0FBM01rQyxDQUFsQixDQUFwQixDLENBNE1HOztBQUVIdEMsU0FBU3VFLE1BQVQsQ0FDRSxvQkFBQyxhQUFELE9BREYsRUFFRUUsU0FBU0MsY0FBVCxDQUF3QixZQUF4QixDQUZGLEUsQ0FHRyIsImZpbGUiOiJyZW5kZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgJCA9IGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG52YXIgYm9vdHN0cmFwID0gcmVxdWlyZSgnYm9vdHN0cmFwJyk7XHJcblxyXG52YXIgZnMgPSBlUmVxdWlyZSgnZnMnKSxcclxuICAgIHhtbDJqcyA9IGVSZXF1aXJlKCd4bWwyanMnKTtcclxuXHJcbnZhciBlbGVjdHJvbiA9IGVSZXF1aXJlKCdlbGVjdHJvbicpO1xyXG52YXIgaXBjID0gZWxlY3Ryb24uaXBjUmVuZGVyZXI7XHJcbnZhciBhcHAgPSBlUmVxdWlyZSgnZWxlY3Ryb24nKS5yZW1vdGU7XHJcbnZhciBkaWFsb2cgPSBhcHAuZGlhbG9nO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XHJcbnZhciBMb2dpblN1YmNvbXBvbmVudCA9IHJlcXVpcmUoJy4vTG9naW5TdWJjb21wb25lbnQnKTtcclxudmFyIEpvYlNwZWNpZmljYXRpb24gPSByZXF1aXJlKCcuL0pvYlNwZWNpZmljYXRpb24nKTtcclxudmFyIFByb2dyZXNzRWxlbWVudCA9IHJlcXVpcmUoJy4vUHJvZ3Jlc3NCYXInKTtcclxuLy92YXIgUHJvZ3Jlc3NCYXJEZW1vID0gcmVxdWlyZSgnLi9Qcm9ncmVzc0JhckRlbW8nKTtcclxuXHJcbmZ1bmN0aW9uIHBlcnNpc3REYXRhKHN0b3JhZ2Vfa2V5LCBqc29uRGF0YSkge1xyXG4gIGNvbnNvbGUubG9nKCdpbnNpZGUgcGVyc2l0Q29tcG9uZW50KCkgYW5kIHN0b3JhZ2Vfa2V5IGlzICcgKyBzdG9yYWdlX2tleSArICcsIGFuZCBqc29uRGF0YSBpcywgJyArIGpzb25EYXRhKTtcclxuICAgIGNvbnN0IGFwcFN0b3JhZ2UgPSBlUmVxdWlyZSgnZWxlY3Ryb24tanNvbi1zdG9yYWdlJyk7XHJcbiAgICAvL1dyaXRlXHJcbiAgICBhcHBTdG9yYWdlLnNldChzdG9yYWdlX2tleSwganNvbkRhdGEsIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVzdG9yZVBlcnNpc3RlZERhdGEoanNvblN0b3JhZ2VrZXkpIHtcclxuICBjb25zb2xlLmxvZygnaW5zaWRlIHJlc3RvcmVQZXJzaXN0ZWREYXRhKCkgYW5kIHN0b3JhZ2Vfa2V5IGlzICcgKyBqc29uU3RvcmFnZWtleSk7XHJcbiAgY29uc3Qgc3RvcmFnZSA9IGVSZXF1aXJlKCdlbGVjdHJvbi1qc29uLXN0b3JhZ2UnKTtcclxuICAvL1JlYWRcclxuICBzdG9yYWdlLmdldChqc29uU3RvcmFnZWtleSwgZnVuY3Rpb24gKGVycm9yLCByZXRyaWV2ZWREYXRhKSB7XHJcbiAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZygndGhlIGRhdGEgcmVzdG9yZWQgZnJvbSBwZXJzaXN0YW5jZSBpcyA9ICcgKyByZXRyaWV2ZWREYXRhICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKHJldHJpZXZlZERhdGEpO1xyXG4gICAgICB9KTtcclxuICAvL3N0b3JhZ2UuZ2V0KGpzb25TdG9yYWdla2V5LCBmdW5jdGlvbiAoZXJyb3IsIHJldHJpZXZlZERhdGEpIHtcclxuICAvLyAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xyXG4gIC8vY29uc29sZS5sb2coJ3RoZSBkYXRhIHJlc3RvcmVkIGZyb20gcGVyc2lzdGFuY2UgaXMgPSAnICsgcmV0cmlldmVkRGF0YSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTm9uZW1wdHlTdHJpbmcoc3RyKSB7XHJcbiAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnICYmIHN0ci5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbnZhciBqc29uRGF0YSA9ICAgJ3sgICBcInBldE5hbWVcIjogXCJCdWZmeVwiICB9JztcclxudmFyIGpzb25Ub09iakRhdGEgPSBKU09OLnBhcnNlKGpzb25EYXRhKTtcclxuXHJcbnZhciBNYWluSW50ZXJmYWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbWFpbFVzZXJuYW1lOiAnJyxcclxuICAgICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgICBtZXRhRGF0YUZvbGRlcjogJ21ldGFEYXRhRm9sZGVyJyxcclxuICAgICAgbWV0YURhdGFGb2xkZXJTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgIGpvYkZpbGVwYXRoOiAnam9iRmlsZXBhdGgnLFxyXG4gICAgICBqb2JGaWxlcGF0aFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgY3VycmVudEJ5dGVDb3VudDogMCxcclxuICAgICAgdG90YWxCeXRlQ291bnQ6IDAsXHJcbiAgICAgIHVzZXJLZXk6ICcnLFxyXG4gICAgICBlcnJvck1lc3NhZ2U6ICcnLFxyXG4gICAgICBlbGVjdHJvbkpzb25TdG9yZWRWYWx1ZTogJycsXHJcbiAgICAgIHBlcnNpc3RlZERhdGE6IGpzb25Ub09iakRhdGEsXHJcbiAgICAgIHBlcmNlbnRDb21wbGV0ZTogMTVcclxuICAgIH0vL3JldHVyblxyXG4gIH0sIC8vZ2V0SW5pdGlhbFN0YXRlXHJcbi8qXHJcbmN1cnJlbnRGaWxlSW5mbzoge1xyXG4gIGZpbGVuYW1lOiAnY3VycmVudEZpbGVJbmZvIGZpbGVuYW1lJyxcclxuICBzaXplOiAnY3VycmVudEZpbGVJbmZvIHNpemUnXHJcbn0sXHJcbiovXHJcblxyXG5jb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgY29uc29sZS5sb2coJ2NvbXBvbmVudERpZE1vdW50IGxpZmVjeWNsZSBydW5uaW5nJyk7XHJcblxyXG4gIGNvbnN0IHN0b3JhZ2UgPSBlUmVxdWlyZSgnZWxlY3Ryb24tanNvbi1zdG9yYWdlJyk7XHJcbiAgc3RvcmFnZS5nZXRBbGwoZnVuY3Rpb24oZXJyb3IsIGRhdGEpIHtcclxuICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ2luc2lkZSBvbmVzdG9yZVBlcnNpc3RlZEFsbERhdGEnKTtcclxuICAgIGNvbnNvbGUubG9nKCdkYXRhLmxvZ2luUGVyc2lzdEtleSBpcyA9PicgK2RhdGEubG9naW5QZXJzaXN0S2V5KTtcclxuICAgIGNvbnNvbGUubG9nKCdkYXRhLm1ldGFEYXRhUGVyc2lzdEtleSBpcyA9PicgK2RhdGEubWV0YURhdGFQZXJzaXN0S2V5KTtcclxuICAgIGNvbnNvbGUubG9nKCdkYXRhLmpvYkZpbGVQZXJzaXN0S2V5IGlzID0+JyArZGF0YS5qb2JGaWxlUGVyc2lzdEtleSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnQUxMIHRoZSBkYXRhIHJlc3RvcmVkIGZyb20gZWxlY3Ryb24tanNvbi1zdG9yYWdlICBpcyA6ICcgKyBkYXRhKTtcclxuICAgIGpRdWVyeSgnI2lucHV0RW1haWwnKS52YWwoZGF0YS5sb2dpblBlcnNpc3RLZXkpO1xyXG5cclxuICAgIGlmIChpc05vbmVtcHR5U3RyaW5nKGRhdGEubWV0YURhdGFQZXJzaXN0S2V5KSApIHtcclxuICAgICAgalF1ZXJ5KCcjbWV0YURhdGFGb2xkZXJJZCcpLnRleHQoZGF0YS5tZXRhRGF0YVBlcnNpc3RLZXkpO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKCB7IG1ldGFEYXRhRm9sZGVyU2VsZWN0ZWQgOiB0cnVlIH0pOyAvL3NldFN0YXRlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTm9uZW1wdHlTdHJpbmcoZGF0YS5qb2JGaWxlUGVyc2lzdEtleSkgKSB7XHJcbiAgICAgIGpRdWVyeSgnI2pvYkZpbGVQYXRoSWQnKS50ZXh0KGRhdGEuam9iRmlsZVBlcnNpc3RLZXkpO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKCB7IGpvYkZpbGVwYXRoU2VsZWN0ZWQgOiB0cnVlIH0pOyAvL3NldFN0YXRlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTm9uZW1wdHlTdHJpbmcoZGF0YS5qb2JGaWxlUGVyc2lzdEtleSkgJiYgaXNOb25lbXB0eVN0cmluZyhkYXRhLm1ldGFEYXRhUGVyc2lzdEtleSkpIHtcclxuICAgICAgJCgnI3NlbmRCdXR0b24nKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICB9XHJcbiAgfS5iaW5kKHRoaXMpKTtcclxuICB9LCAvL2NvbXBvbmVudERpZE1vdW50XHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnY29tcG9uZW50RGlkVXBkYXRlIGxpZmVjeWNsZSBydW5uaW5nJyk7XHJcbiAgICBjb25zb2xlLmxvZygndGhpcy5zdGF0ZS5tZXRhRGF0YUZvbGRlciBpcyA9PicgKyB0aGlzLnN0YXRlLm1ldGFEYXRhRm9sZGVyKTtcclxuICAgIGNvbnNvbGUubG9nKCd0aGlzLnN0YXRlLm1ldGFEYXRhRm9sZGVyU2VsZWN0ZWQgaXMgPT4nICsgdGhpcy5zdGF0ZS5tZXRhRGF0YUZvbGRlclNlbGVjdGVkKTtcclxuICAgIGNvbnNvbGUubG9nKCd0aGlzLnN0YXRlLmpvYkZpbGVwYXRoIGlzID0+JyArIHRoaXMuc3RhdGUuam9iRmlsZXBhdGgpO1xyXG4gICAgY29uc29sZS5sb2coJ3RoaXMuc3RhdGUuam9iRmlsZXBhdGhTZWxlY3RlZCBpcyA9PicgKyB0aGlzLnN0YXRlLmpvYkZpbGVwYXRoU2VsZWN0ZWQpO1xyXG4gIH0sIC8vY29tcG9uZW50RGlkVXBkYXRlXHJcblxyXG4gIHNob3dBYm91dDpmdW5jdGlvbigpIHtcclxuICAgIGlwYy5zZW5kU3luYygnb3BlbkluZm9XaW5kb3cnKTtcclxuICB9LCAvL3Nob3dBYm91dFxyXG5cclxuICBtYWluSGFuZGxlTG9naW46IGZ1bmN0aW9uKGxvZ2luQ3JlZGVudGlhbHMpIHtcclxuICAgICAgdmFyIHN1YnVzZXJOYW1lID0gbG9naW5DcmVkZW50aWFscy51c2VyTmFtZTtcclxuICAgICAgdmFyIHN1YnBhc3N3b3JkID0gbG9naW5DcmVkZW50aWFscy5wYXNzd29yZDtcclxuICAgICAgY29uc29sZS5sb2coJ3N1YnVzZXJOYW1lIGlzID0gJyArIHN1YnVzZXJOYW1lKTtcclxuICAgICAgY29uc29sZS5sb2coJ3N1YnBhc3N3b3JkIGlzID0gJyAgKyBzdWJwYXNzd29yZCk7XHJcbiAgICAgIC8qdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgIGVtYWlsVXNlcm5hbWUgOiBzdWJ1c2VyTmFtZSxcclxuICAgICAgICBwYXNzd29yZDogc3VicGFzc3dvcmRcclxuICAgICAgfSk7IC8vc2V0U3RhdGUgKi9cclxuICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgIGVtYWlsVXNlcm5hbWUgOiBzdWJ1c2VyTmFtZSxcclxuICAgICAgICBwYXNzd29yZCA6IHN1YnBhc3N3b3JkXHJcbiAgICAgICAgfSk7IC8vc2V0U3RhdGVcclxuICAgICAgcGVyc2lzdERhdGEoJ2xvZ2luUGVyc2lzdEtleScsIHN1YnVzZXJOYW1lKTtcclxuXHJcbiAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gTE9HSU4gQ09ERSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgbGV0IHBhcmFtcyA9ICQucGFyYW0oeyAnZW1haWwnOiB0aGlzLnN0YXRlLmVtYWlsVXNlcm5hbWUsICdwYXNzd29yZCc6IHRoaXMuc3RhdGUucGFzc3dvcmQgfSk7XHJcbiAgICAgbGV0IHVybCA9IFwiaHR0cHM6Ly9hcHAudGhlZGlnaXRhbGJpYmxlbGlicmFyeS5vcmcvYXBpL3VzZXJfdG9rZW4/XCIgKyBwYXJhbXM7XHJcblxyXG4gICAgLy8gJC5nZXQoKSByZXF1aXJlcyBcIkFsbG93LUNvbnRyb2wtQWxsb3ctT3JpZ2luOiAqXCIgQ2hyb21lIGV4dGVuc2lvbiB3aGVuXHJcbiAgICAvLyBydW5uaW5nIGluIGxvY2FsaG9zdCBDaHJvbWUgYnJvd3NlciB0byBhdm9pZCBjcm9zcyBkb21haW4gZXJyb3JzXHJcbiAgICAgICAgICQuZ2V0KHtcclxuICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICAgdXNlcktleSA6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgOiAnJ1xyXG4gICAgICAgICAgICAgICAgIH0pOyAvL3NldFN0YXRlXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgbGV0IGVycm9yTXNnID0gJ2Vycm9yLm1lc3NhZ2UnICsgIGAke3Jlc3BvbnNlLnN0YXR1c1RleHR9IChDb2RlICR7cmVzcG9uc2Uuc3RhdHVzfSkgJHtyZXNwb25zZS5yZXNwb25zZVRleHR9YDtcclxuICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgOiBlcnJvck1zZ1xyXG4gICAgICAgICAgICAgfSk7IC8vc2V0U3RhdGVcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xyXG4gIH0sIC8vbWFpbkhhbmRsZUxvZ2luXHJcblxyXG4gIG9uU2VsZWN0TWV0YURhdGFGaWxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnY2FsbGVkIG9uU2VsZWN0TWV0YURhdGFGaWxlJyk7XHJcbiAgICB2YXIgcGF0aCA9IGRpYWxvZy5zaG93T3BlbkRpYWxvZyhcclxuICAgICAgeyB0aXRsZTpcIlNlbGVjdCBhIGZvbGRlclwiLCBwcm9wZXJ0aWVzOiBbXCJvcGVuRGlyZWN0b3J5XCJdIH1cclxuICAgICk7XHJcbiAgICBpZihwYXRoID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gZGVzdGluYXRpb24gZm9sZGVyIHNlbGVjdGVkXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtZXRhRGF0YUZvbGRlclNlbGVjdGVkOiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgIG1ldGFEYXRhRm9sZGVyOiAnJyB9KTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZygnZ29pbmcgdG8gc2V0IHRoZSBwYXRoIGFuZCBib29sZWFuJyArIHBhdGgpO1xyXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IG1ldGFEYXRhRm9sZGVyU2VsZWN0ZWQ6IHRydWUgfSk7XHJcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgIG1ldGFEYXRhRm9sZGVyOiBwYXRoWzBdIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHBlcnNpc3REYXRhKCdtZXRhRGF0YVBlcnNpc3RLZXknLCBwYXRoWzBdICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdlbmQgb2Ygb25TZWxlY3RNZXRhRGF0YUZpbGUnKTtcclxuICB9LCAvL29uU2VsZWN0TWV0YURhdGFGaWxlXHJcblxyXG4gIG9uU2VsZWN0Sm9iU3BlY3NGaWxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnY2FsbGVkIG9uU2VsZWN0Sm9iU3BlY3NGaWxlJyk7XHJcbiAgICB2YXIgZmlsZU5hbWVzID0gZGlhbG9nLnNob3dPcGVuRGlhbG9nKCk7XHJcbiAgICBpZihmaWxlTmFtZXMgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBmaWxlIHNlbGVjdGVkXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBqb2JGaWxlcGF0aFNlbGVjdGVkOiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgam9iRmlsZXBhdGg6ICcnIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2dvaW5nIHRvIHNldCB0aGUgZmlsZW5hbWUgYW5kIGJvb2xlYW4nICsgZmlsZU5hbWVzKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgam9iRmlsZXBhdGhTZWxlY3RlZDogdHJ1ZSB9KTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgam9iRmlsZXBhdGg6IGZpbGVOYW1lc1swXSB9KTtcclxuICAgICAgfVxyXG4gICAgICBwZXJzaXN0RGF0YSgnam9iRmlsZVBlcnNpc3RLZXknLCBmaWxlTmFtZXNbMF0gKTtcclxuICAgICAgY29uc29sZS5sb2coJ2VuZCBvZiBvblNlbGVjdEpvYlNwZWNzRmlsZScpO1xyXG4gIH0sIC8vb25TZWxlY3RKb2JTcGVjc0ZpbGVcclxuXHJcbiAgICBvbkhhbmRsZVNlbmQ6IGZ1bmN0aW9uKHNlbmRGaWxlU3BlY3MpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2NhbGxlZCBvbkhhbmRsZVNlbmQnKTtcclxuICAgICAgY29uc29sZS5sb2coJ21ldGFEYXRhRm9sZGVyPSAnICsgc2VuZEZpbGVTcGVjcy5tZXRhRGF0YUZvbGRlcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdqb2JGaWxlcGF0aD0gJyArIHNlbmRGaWxlU3BlY3Muam9iRmlsZXBhdGgpO1xyXG4gICAgICB2YXIgdGVtcF9wZXJjZW50Q29tcGxldGUgPSB0aGlzLnN0YXRlLnBlcmNlbnRDb21wbGV0ZTtcclxuICAgICAgaWYgKHRlbXBfcGVyY2VudENvbXBsZXRlID09IDEwMClcclxuICAgICAgICB7IHRlbXBfcGVyY2VudENvbXBsZXRlID0gMjA7IH1cclxuICAgICAgdGVtcF9wZXJjZW50Q29tcGxldGUgPSB0ZW1wX3BlcmNlbnRDb21wbGV0ZSArIDAuMzMqdGVtcF9wZXJjZW50Q29tcGxldGU7XHJcbiAgICAgIGlmICh0ZW1wX3BlcmNlbnRDb21wbGV0ZSA+IDEwMCkge1xyXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBlcmNlbnRDb21wbGV0ZTogMTAwfSk7IH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwZXJjZW50Q29tcGxldGU6IHRlbXBfcGVyY2VudENvbXBsZXRlfSk7XHJcbiAgICAgICAgfVxyXG4gIH0sIC8vb25IYW5kbGVTZW5kXHJcblxyXG4gIGNvbXB1dGVQcm9ncmVzc0JhcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5jdXJyZW50Qnl0ZUNvdW50L3RoaXMuc3RhdGUudG90YWxCeXRlQ291bnQqMTAwO1xyXG4gIH0sIC8vY29tcHV0ZVByb2dyZXNzQmFyXHJcblxyXG5cclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIC8vdmFyIGZpbHRlcmVkQXB0cyA9IFtdO1xyXG4gICAgLy92YXIgbXlBcHBvaW50bWVudHMgPSB0aGlzLnN0YXRlLm15QXBwb2ludG1lbnRzO1xyXG4gICAgLypcclxuICAgIHZhciBwYXJzZVN0cmluZyA9IHhtbDJqcy5wYXJzZVN0cmluZztcclxuICAgIHZhciB4bWwgPSBcIjxyb290PkhlbGxvIHhtbDJqcyE8L3Jvb3Q+XCI7XHJcbiAgICBwYXJzZVN0cmluZyh4bWwsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBwYXJzZXIgPSBuZXcgeG1sMmpzLlBhcnNlcigpO1xyXG4gICAgZnMucmVhZEZpbGUoeG1sRGF0YUxvY2F0aW9uLCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcclxuICAgICAgICBwYXJzZXIucGFyc2VTdHJpbmcoZGF0YSwgZnVuY3Rpb24gKGVyciwgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEb25lJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgICovXHJcblxyXG4gICAgaWYodGhpcy5zdGF0ZS5qb2JGaWxlcGF0aFNlbGVjdGVkICAmJiAgdGhpcy5zdGF0ZS5tZXRhRGF0YUZvbGRlclNlbGVjdGVkKSB7XHJcbiAgICAgICQoJyNzZW5kQnV0dG9uJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCgnI3NlbmRCdXR0b24nKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybihcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxMb2dpblN1YmNvbXBvbmVudFxyXG4gICAgICAgICAgICBzdWJIYW5kbGVMb2dpbiA9IHt0aGlzLm1haW5IYW5kbGVMb2dpbn1cclxuICAgICAgICAgICAgc3ViVXNlcm5hbWUgPSB7dGhpcy5zdGF0ZS5lbWFpbFVzZXJuYW1lfVxyXG4gICAgICAgICAgICBzdWJQYXNzd29yZCA9IHt0aGlzLnN0YXRlLnBhc3N3b3JkfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxKb2JTcGVjaWZpY2F0aW9uXHJcbiAgICAgICAgICBtZXRhRGF0YUZvbGRlciA9IHt0aGlzLnN0YXRlLm1ldGFEYXRhRm9sZGVyfVxyXG4gICAgICAgICAgam9iRmlsZXBhdGggPSB7dGhpcy5zdGF0ZS5qb2JGaWxlcGF0aH1cclxuICAgICAgICAgIG9uc2VsZWN0TWV0YURhdGFGaWxlID0ge3RoaXMub25TZWxlY3RNZXRhRGF0YUZpbGV9XHJcbiAgICAgICAgICBvbnNlbGVjdEpvYlNwZWNzRmlsZSA9IHt0aGlzLm9uU2VsZWN0Sm9iU3BlY3NGaWxlfVxyXG4gICAgICAgICAgaGFuZGxlU2VuZCA9IHt0aGlzLm9uSGFuZGxlU2VuZH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8UHJvZ3Jlc3NFbGVtZW50XHJcbiAgICAgICAgICAgICAgcGVyY2VudENvbXBsZXRlPXt0aGlzLnN0YXRlLnBlcmNlbnRDb21wbGV0ZX0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfSAvL3JlbmRlclxyXG59KTsvL01haW5JbnRlcmZhY2VcclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICA8TWFpbkludGVyZmFjZSAvPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndWJzVXBsb2FkcycpXHJcbik7IC8vcmVuZGVyXHJcbiJdfQ==