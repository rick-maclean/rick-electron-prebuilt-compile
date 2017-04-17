"use strict";

var React = require('react');

var LoginSubcomponent = React.createClass({
  displayName: "LoginSubcomponent",


  localHandleLogin: function (e) {
    e.preventDefault(); //need to prevent the default behavior of the onSubmit button with this
    //normal behavior is to cause a reload and sending of the information to a server
    //note we will be acccessing the input fields via the ref attributes
    // eg ref="inputOwnerName"
    //note it receives an event handler  e
    //(note all functions have e passed to it but we might not use it as in localToggleAptDisplay)
    var tempLoginCredentials = {
      userName: this.refs.inputEmail.value,
      password: this.refs.inputPassword.value
    }; //tempLoginCredentials
    //this.prop.subUsername = this.refs.inputEmail.value;
    //this.prop.subPassword = this.refs.inputPassword.value

    this.props.subHandleLogin(tempLoginCredentials); //pass tempItem to this prop in main
  }, //localHandleLogin


  render: function () {
    return React.createElement(
      "div",
      { className: "panel panel-primary" },
      React.createElement(
        "div",
        { className: "panel-heading apt-addheading" },
        "Sign in with DBL account"
      ),
      React.createElement("br", null),
      React.createElement(
        "p",
        null,
        React.createElement(
          "i",
          null,
          "Please enter your DBL log-in credentials."
        )
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement(
          "form",
          { className: "form-signin form-horizontal", onSubmit: this.localHandleLogin },
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { className: "col-sm-3 control-label", htmlFor: "inputEmail" },
              "Username"
            ),
            React.createElement(
              "div",
              { className: "col-sm-9" },
              React.createElement("input", { type: "email", className: "form-control",
                id: "inputEmail", ref: "inputEmail", placeholder: "Email address" })
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement(
              "label",
              { className: "col-sm-3 control-label", htmlFor: "inputPassword" },
              "Password"
            ),
            React.createElement(
              "div",
              { className: "col-sm-9" },
              React.createElement("input", { type: "password", className: "form-control",
                id: "inputPassword", ref: "inputPassword", placeholder: "Password" })
            )
          ),
          React.createElement(
            "div",
            { className: "checkbox" },
            React.createElement(
              "label",
              null,
              React.createElement("input", { type: "checkbox", value: "remember-me" }),
              " Remember me"
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
                { type: "submit", className: "btn btn-primary pull-right" },
                "Sign In"
              )
            )
          )
        )
      )
    ); // return
  } // render
}); // LoginSubcomponent

module.exports = LoginSubcomponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qcy9Mb2dpblN1YmNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJMb2dpblN1YmNvbXBvbmVudCIsImNyZWF0ZUNsYXNzIiwibG9jYWxIYW5kbGVMb2dpbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRlbXBMb2dpbkNyZWRlbnRpYWxzIiwidXNlck5hbWUiLCJyZWZzIiwiaW5wdXRFbWFpbCIsInZhbHVlIiwicGFzc3dvcmQiLCJpbnB1dFBhc3N3b3JkIiwicHJvcHMiLCJzdWJIYW5kbGVMb2dpbiIsInJlbmRlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsUUFBUUMsUUFBUSxPQUFSLENBQVo7O0FBRUEsSUFBSUMsb0JBQW9CRixNQUFNRyxXQUFOLENBQWtCO0FBQUE7OztBQUd4Q0Msb0JBQWtCLFVBQVVDLENBQVYsRUFBYTtBQUM3QkEsTUFBRUMsY0FBRixHQUQ2QixDQUNSO0FBQ2I7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUlDLHVCQUF1QjtBQUN6QkMsZ0JBQVUsS0FBS0MsSUFBTCxDQUFVQyxVQUFWLENBQXFCQyxLQUROO0FBRXpCQyxnQkFBVSxLQUFLSCxJQUFMLENBQVVJLGFBQVYsQ0FBd0JGO0FBRlQsS0FBM0IsQ0FQNkIsQ0FVM0I7QUFDRjtBQUNBOztBQUVBLFNBQUtHLEtBQUwsQ0FBV0MsY0FBWCxDQUEwQlIsb0JBQTFCLEVBZDZCLENBY3FCO0FBQ25ELEdBbEJ1QyxFQWtCckM7OztBQUdGUyxVQUFRLFlBQVc7QUFDbEIsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHFCQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSw4QkFBZjtBQUFBO0FBQUEsT0FERjtBQUVFLHFDQUZGO0FBRU87QUFBQTtBQUFBO0FBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFILE9BRlA7QUFHRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFlBQWY7QUFDRTtBQUFBO0FBQUEsWUFBTSxXQUFVLDZCQUFoQixFQUE4QyxVQUFVLEtBQUtaLGdCQUE3RDtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsWUFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBTyxXQUFVLHdCQUFqQixFQUEwQyxTQUFRLFlBQWxEO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBLGdCQUFLLFdBQVUsVUFBZjtBQUNFLDZDQUFPLE1BQUssT0FBWixFQUFvQixXQUFVLGNBQTlCO0FBQ0Usb0JBQUcsWUFETCxFQUNrQixLQUFJLFlBRHRCLEVBQ21DLGFBQVksZUFEL0M7QUFERjtBQUZGLFdBREY7QUFRRTtBQUFBO0FBQUEsY0FBSyxXQUFVLFlBQWY7QUFDRTtBQUFBO0FBQUEsZ0JBQU8sV0FBVSx3QkFBakIsRUFBMEMsU0FBUSxlQUFsRDtBQUFBO0FBQUEsYUFERjtBQUVFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLFVBQWY7QUFDRSw2Q0FBTyxNQUFLLFVBQVosRUFBdUIsV0FBVSxjQUFqQztBQUNFLG9CQUFHLGVBREwsRUFDcUIsS0FBSSxlQUR6QixFQUN5QyxhQUFZLFVBRHJEO0FBREY7QUFGRixXQVJGO0FBZU07QUFBQTtBQUFBLGNBQUssV0FBVSxVQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQ0ksNkNBQU8sTUFBSyxVQUFaLEVBQXVCLE9BQU0sYUFBN0IsR0FESjtBQUFBO0FBQUE7QUFESixXQWZOO0FBb0JFO0FBQUE7QUFBQSxjQUFLLFdBQVUsWUFBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLDJCQUFmO0FBQ0U7QUFBQTtBQUFBLGtCQUFRLE1BQUssUUFBYixFQUFzQixXQUFVLDRCQUFoQztBQUFBO0FBQUE7QUFERjtBQURGO0FBcEJGO0FBREY7QUFIRixLQURGLENBRGtCLENBa0NoQjtBQUNILEdBeER1QyxDQXdEdEM7QUF4RHNDLENBQWxCLENBQXhCLEMsQ0F5REk7O0FBRUphLE9BQU9DLE9BQVAsR0FBaUJoQixpQkFBakIiLCJmaWxlIjoiTG9naW5TdWJjb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5cclxudmFyIExvZ2luU3ViY29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHJcbiAgbG9jYWxIYW5kbGVMb2dpbjogZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTsgIC8vbmVlZCB0byBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBvblN1Ym1pdCBidXR0b24gd2l0aCB0aGlzXHJcbiAgICAgICAgICAgIC8vbm9ybWFsIGJlaGF2aW9yIGlzIHRvIGNhdXNlIGEgcmVsb2FkIGFuZCBzZW5kaW5nIG9mIHRoZSBpbmZvcm1hdGlvbiB0byBhIHNlcnZlclxyXG4gICAgLy9ub3RlIHdlIHdpbGwgYmUgYWNjY2Vzc2luZyB0aGUgaW5wdXQgZmllbGRzIHZpYSB0aGUgcmVmIGF0dHJpYnV0ZXNcclxuICAgIC8vIGVnIHJlZj1cImlucHV0T3duZXJOYW1lXCJcclxuICAgIC8vbm90ZSBpdCByZWNlaXZlcyBhbiBldmVudCBoYW5kbGVyICBlXHJcbiAgICAvLyhub3RlIGFsbCBmdW5jdGlvbnMgaGF2ZSBlIHBhc3NlZCB0byBpdCBidXQgd2UgbWlnaHQgbm90IHVzZSBpdCBhcyBpbiBsb2NhbFRvZ2dsZUFwdERpc3BsYXkpXHJcbiAgICB2YXIgdGVtcExvZ2luQ3JlZGVudGlhbHMgPSB7XHJcbiAgICAgIHVzZXJOYW1lOiB0aGlzLnJlZnMuaW5wdXRFbWFpbC52YWx1ZSxcclxuICAgICAgcGFzc3dvcmQ6IHRoaXMucmVmcy5pbnB1dFBhc3N3b3JkLnZhbHVlXHJcbiAgICB9IC8vdGVtcExvZ2luQ3JlZGVudGlhbHNcclxuICAgIC8vdGhpcy5wcm9wLnN1YlVzZXJuYW1lID0gdGhpcy5yZWZzLmlucHV0RW1haWwudmFsdWU7XHJcbiAgICAvL3RoaXMucHJvcC5zdWJQYXNzd29yZCA9IHRoaXMucmVmcy5pbnB1dFBhc3N3b3JkLnZhbHVlXHJcblxyXG4gICAgdGhpcy5wcm9wcy5zdWJIYW5kbGVMb2dpbih0ZW1wTG9naW5DcmVkZW50aWFscyk7ICAvL3Bhc3MgdGVtcEl0ZW0gdG8gdGhpcyBwcm9wIGluIG1haW5cclxuICB9LCAvL2xvY2FsSGFuZGxlTG9naW5cclxuXHJcblxyXG4gICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmcgYXB0LWFkZGhlYWRpbmdcIj5TaWduIGluIHdpdGggREJMIGFjY291bnQ8L2Rpdj5cclxuICAgICAgICA8YnIvPjxwPjxpPlBsZWFzZSBlbnRlciB5b3VyIERCTCBsb2ctaW4gY3JlZGVudGlhbHMuPC9pPjwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj5cclxuICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cImZvcm0tc2lnbmluIGZvcm0taG9yaXpvbnRhbFwiIG9uU3VibWl0PXt0aGlzLmxvY2FsSGFuZGxlTG9naW59PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29sLXNtLTMgY29udHJvbC1sYWJlbFwiIGh0bWxGb3I9XCJpbnB1dEVtYWlsXCI+VXNlcm5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTlcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgICAgICBpZD1cImlucHV0RW1haWxcIiByZWY9XCJpbnB1dEVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCBhZGRyZXNzXCIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wtc20tMyBjb250cm9sLWxhYmVsXCIgaHRtbEZvcj1cImlucHV0UGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tOVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICAgICAgICAgIGlkPVwiaW5wdXRQYXNzd29yZFwiIHJlZj1cImlucHV0UGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCJyZW1lbWJlci1tZVwiLz4gUmVtZW1iZXIgbWVcclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLW9mZnNldC0yIGNvbC1zbS0xMFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIj5TaWduIEluPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICkgLy8gcmV0dXJuXHJcbiAgfSAvLyByZW5kZXJcclxufSk7IC8vIExvZ2luU3ViY29tcG9uZW50XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2luU3ViY29tcG9uZW50O1xyXG4iXX0=