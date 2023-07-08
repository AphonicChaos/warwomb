import QtQuick

Item {
  Loader {
    id: loader
    anchors.fill: parent
    property string filename: "main.qml"
    property string fileContents: ""
    source: ""

    function reload() {
      source = filename + "?t=" + Date.now()
    }

    function checkForChange() {
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          if (loader.fileContents != req.responseText) {
            loader.fileContents = req.responseText;
            loader.reload();
          }
        }
      }
      req.open("GET", loader.filename, true);
      req.send();
    }

    onLoaded: {
      console.log(source)
    }

    Timer {
      id: reloadTimer
      interval: 2000
      repeat: true
      running: true
      onTriggered: loader.checkForChange()
    }

    Component.onCompleted: {
      loader.checkForChange()
    }
  }
}
