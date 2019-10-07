import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyA8bhF-DDVfNPDXcyx0srfOuu6wUkWmaCQ",
  authDomain: "react-todo-45a01.firebaseapp.com",
  databaseURL: "https://react-todo-45a01.firebaseio.com/",
  storageBucket: "react-todo-45a01.appspot.com"
};

firebase.initializeApp(config);

const rootRef = firebase
  .database()
  .ref()
  .child("react");
export const todosRef = rootRef.child("todos");
