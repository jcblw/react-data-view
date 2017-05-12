# React Data View

[![Greenkeeper badge](https://badges.greenkeeper.io/jcblw/react-data-view.svg)](https://greenkeeper.io/)

Makes a way to view large sets of data similar to how Google Chrome DevTools shows data.

![Data Viewer](https://raw.githubusercontent.com/jcblw/react-data-viewer/master/example.gif)

## Usage

```javascript
const {TypeComponents} = require('react-data-viewer')
const React = require('react')
const ReactDOM = require('react-dom')
const ObjectComponent = TypeComponents.object

ReactDOM.render(<ObjectComponent />, document.getElementById('app'))
```
