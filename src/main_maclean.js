const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let appWindow


app.on('ready', function() {
  appWindow = new BrowserWindow();
  appWindow.loadURL('http://macleanmanuscript.com');
})
