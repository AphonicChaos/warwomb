import QtQuick
import QtQuick.Controls

ApplicationWindow {
  width: 1920
  height: 1080
  visible: true

  Image {
    id: playMat
    source: "https://www.myfreetextures.com/wp-content/uploads/2012/05/2011-06-11-09606.jpg"
    anchors.fill: parent

    Rectangle {
      id: token
      width: 50
      height: 50
      anchors.centerIn: parent
      color: "red"

      MouseArea {
        anchors.fill: parent
        onClicked: token.rotation += 45
      }
    }
  }
}
