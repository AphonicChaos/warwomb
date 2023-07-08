module Main where

import Qml
import Qml.QGuiApplication

main :: IO ()
main = do
  app <- readFile "./qml/main.qml"
  runQGuiApplication $ do
    loadData app
