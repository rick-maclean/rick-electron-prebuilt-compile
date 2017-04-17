"use strict";

var React = require('react');

var JobSpecification = React.createClass({
  displayName: "JobSpecification",


  selectMetaDataFile: function () {
    this.props.onselectMetaDataFile();
  },
  selectJobSpecsFile: function () {
    this.props.onselectJobSpecsFile();
  },

  localHandleSend: function (e) {
    e.preventDefault();
    var tempSendFileSpecs = {
      metaDataFolder: this.props.metaDataFolder,
      jobFilepath: this.props.jobFilepath
    }; //tempSendFileSpecs
    this.props.handleSend(tempSendFileSpecs); //pass tempItem to this prop in main
  }, //localHandleSend

  render: function () {
    return React.createElement(
      "div",
      { className: "panel panel-primary" },
      React.createElement(
        "div",
        { className: "panel-heading apt-addheading" },
        "Job"
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement(
          "form",
          { className: "form", onSubmit: this.localHandleSend },
          React.createElement(
            "h3",
            null,
            "Job"
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Metadata File"
            ),
            React.createElement(
              "div",
              { className: "form-text", id: "metaDataFolderId" },
              this.props.metaDataFolder
            ),
            React.createElement(
              "div",
              { className: "col-sm-offset-3 col-sm-9" },
              React.createElement(
                "div",
                { className: "pull-right" },
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-primary", onClick: this.selectMetaDataFile },
                  "Select metadata.xml"
                ),
                "\xA0"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              null,
              "Job Spec"
            ),
            React.createElement(
              "div",
              { className: "form-text", id: "jobFilePathId" },
              this.props.jobFilepath
            ),
            React.createElement(
              "div",
              { className: "col-sm-offset-3 col-sm-9" },
              React.createElement(
                "div",
                { className: "pull-right" },
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-primary", onClick: this.selectJobSpecsFile },
                  "Select job specification"
                ),
                "\xA0"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "div",
              { className: "col-sm-offset-2 col-sm-10" },
              React.createElement(
                "button",
                { type: "submit", id: "sendButton", className: "btn btn-primary pull-left", disabled: true },
                "Send"
              )
            )
          )
        )
      )
    ); // return
  } // render
}); // JobSpecification

module.exports = JobSpecification;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qcy9Kb2JTcGVjaWZpY2F0aW9uLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwicmVxdWlyZSIsIkpvYlNwZWNpZmljYXRpb24iLCJjcmVhdGVDbGFzcyIsInNlbGVjdE1ldGFEYXRhRmlsZSIsInByb3BzIiwib25zZWxlY3RNZXRhRGF0YUZpbGUiLCJzZWxlY3RKb2JTcGVjc0ZpbGUiLCJvbnNlbGVjdEpvYlNwZWNzRmlsZSIsImxvY2FsSGFuZGxlU2VuZCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRlbXBTZW5kRmlsZVNwZWNzIiwibWV0YURhdGFGb2xkZXIiLCJqb2JGaWxlcGF0aCIsImhhbmRsZVNlbmQiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVFDLFFBQVEsT0FBUixDQUFaOztBQUVBLElBQUlDLG1CQUFtQkYsTUFBTUcsV0FBTixDQUFrQjtBQUFBOzs7QUFFdkNDLHNCQUFvQixZQUFXO0FBQzdCLFNBQUtDLEtBQUwsQ0FBV0Msb0JBQVg7QUFDRCxHQUpzQztBQUt2Q0Msc0JBQW9CLFlBQVc7QUFDN0IsU0FBS0YsS0FBTCxDQUFXRyxvQkFBWDtBQUNELEdBUHNDOztBQVN2Q0MsbUJBQWlCLFVBQVVDLENBQVYsRUFBYTtBQUM1QkEsTUFBRUMsY0FBRjtBQUNBLFFBQUlDLG9CQUFvQjtBQUN0QkMsc0JBQWdCLEtBQUtSLEtBQUwsQ0FBV1EsY0FETDtBQUV0QkMsbUJBQWMsS0FBS1QsS0FBTCxDQUFXUztBQUZILEtBQXhCLENBRjRCLENBSzFCO0FBQ0YsU0FBS1QsS0FBTCxDQUFXVSxVQUFYLENBQXNCSCxpQkFBdEIsRUFONEIsQ0FNZTtBQUM1QyxHQWhCc0MsRUFnQnBDOztBQUVGSSxVQUFRLFlBQVc7QUFDbEIsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHFCQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSw4QkFBZjtBQUFBO0FBQUEsT0FERjtBQUVFO0FBQUE7QUFBQSxVQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQSxZQUFNLFdBQVUsTUFBaEIsRUFBdUIsVUFBVSxLQUFLUCxlQUF0QztBQUNLO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FETDtBQUVLO0FBQUE7QUFBQSxjQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFESjtBQUVJO0FBQUE7QUFBQSxnQkFBSyxXQUFVLFdBQWYsRUFBMkIsSUFBRyxrQkFBOUI7QUFBbUQsbUJBQUtKLEtBQUwsQ0FBV1E7QUFBOUQsYUFGSjtBQUdJO0FBQUE7QUFBQSxnQkFBSyxXQUFVLDBCQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFLLFdBQVUsWUFBZjtBQUNFO0FBQUE7QUFBQSxvQkFBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSxpQkFBaEMsRUFBbUQsU0FBUyxLQUFLVCxrQkFBakU7QUFBQTtBQUFBLGlCQURGO0FBQUE7QUFBQTtBQURGO0FBSEosV0FGTDtBQVdLO0FBQUE7QUFBQSxjQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFESjtBQUVJO0FBQUE7QUFBQSxnQkFBSyxXQUFVLFdBQWYsRUFBMkIsSUFBRyxlQUE5QjtBQUFnRCxtQkFBS0MsS0FBTCxDQUFXUztBQUEzRCxhQUZKO0FBR0k7QUFBQTtBQUFBLGdCQUFLLFdBQVUsMEJBQWY7QUFDRTtBQUFBO0FBQUEsa0JBQUssV0FBVSxZQUFmO0FBQ0U7QUFBQTtBQUFBLG9CQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLGlCQUFoQyxFQUFtRCxTQUFTLEtBQUtQLGtCQUFqRTtBQUFBO0FBQUEsaUJBREY7QUFBQTtBQUFBO0FBREY7QUFISixXQVhMO0FBb0JLO0FBQUE7QUFBQSxjQUFLLFdBQVUsWUFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLDJCQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFRLE1BQUssUUFBYixFQUFzQixJQUFHLFlBQXpCLEVBQXNDLFdBQVUsMkJBQWhELEVBQTRFLGNBQTVFO0FBQUE7QUFBQTtBQURGO0FBREY7QUFwQkw7QUFESjtBQUZGLEtBREYsQ0FEa0IsQ0FpQ2hCO0FBQ0gsR0FwRHNDLENBb0RyQztBQXBEcUMsQ0FBbEIsQ0FBdkIsQyxDQXFESTs7QUFFSlUsT0FBT0MsT0FBUCxHQUFpQmhCLGdCQUFqQiIsImZpbGUiOiJKb2JTcGVjaWZpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbnZhciBKb2JTcGVjaWZpY2F0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBzZWxlY3RNZXRhRGF0YUZpbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5vbnNlbGVjdE1ldGFEYXRhRmlsZSgpO1xyXG4gIH0sXHJcbiAgc2VsZWN0Sm9iU3BlY3NGaWxlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMucHJvcHMub25zZWxlY3RKb2JTcGVjc0ZpbGUoKTtcclxuICB9LFxyXG5cclxuICBsb2NhbEhhbmRsZVNlbmQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgdGVtcFNlbmRGaWxlU3BlY3MgPSB7XHJcbiAgICAgIG1ldGFEYXRhRm9sZGVyOiB0aGlzLnByb3BzLm1ldGFEYXRhRm9sZGVyLFxyXG4gICAgICBqb2JGaWxlcGF0aCA6IHRoaXMucHJvcHMuam9iRmlsZXBhdGhcclxuICAgIH0gLy90ZW1wU2VuZEZpbGVTcGVjc1xyXG4gICAgdGhpcy5wcm9wcy5oYW5kbGVTZW5kKHRlbXBTZW5kRmlsZVNwZWNzKTsgIC8vcGFzcyB0ZW1wSXRlbSB0byB0aGlzIHByb3AgaW4gbWFpblxyXG4gIH0sIC8vbG9jYWxIYW5kbGVTZW5kXHJcblxyXG4gICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmcgYXB0LWFkZGhlYWRpbmdcIj5Kb2I8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cclxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiZm9ybVwiIG9uU3VibWl0PXt0aGlzLmxvY2FsSGFuZGxlU2VuZH0+XHJcbiAgICAgICAgICAgICAgICAgPGgzPkpvYjwvaDM+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5NZXRhZGF0YSBGaWxlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLXRleHRcIiBpZD1cIm1ldGFEYXRhRm9sZGVySWRcIiA+e3RoaXMucHJvcHMubWV0YURhdGFGb2xkZXJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLW9mZnNldC0zIGNvbC1zbS05XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdWxsLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiAgb25DbGljaz17dGhpcy5zZWxlY3RNZXRhRGF0YUZpbGV9PlNlbGVjdCBtZXRhZGF0YS54bWw8L2J1dHRvbj4mbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Kb2IgU3BlYzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS10ZXh0XCIgaWQ9XCJqb2JGaWxlUGF0aElkXCIgPnt0aGlzLnByb3BzLmpvYkZpbGVwYXRofTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS1vZmZzZXQtMyBjb2wtc20tOVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVsbC1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgIG9uQ2xpY2s9e3RoaXMuc2VsZWN0Sm9iU3BlY3NGaWxlfT5TZWxlY3Qgam9iIHNwZWNpZmljYXRpb248L2J1dHRvbj4mbmJzcDtcclxuICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS1vZmZzZXQtMiBjb2wtc20tMTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgaWQ9XCJzZW5kQnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIGRpc2FibGVkPlNlbmQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgICAgIDwvZGl2PlxyXG4gICAgKSAvLyByZXR1cm5cclxuICB9IC8vIHJlbmRlclxyXG59KTsgLy8gSm9iU3BlY2lmaWNhdGlvblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBKb2JTcGVjaWZpY2F0aW9uO1xyXG4iXX0=