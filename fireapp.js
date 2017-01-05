$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyDKDvhKE_UZagB6YImenQwTq9m38eZ6akE",
    authDomain: "heatmap-clicks.firebaseapp.com",
    databaseURL: "https://heatmap-clicks.firebaseio.com",
    storageBucket: "heatmap-clicks.appspot.com",
    messagingSenderId: "185527880134"
  };

  firebase.initializeApp(config);
  // get elements
  var preObject = $("#object");
  var newList = $("#list");
  // var object = document.getElementById("object");

  //create reference
  // .ref() is the root of the database
  // .child will give you a subfolder in the root
  var dbRefObject = firebase.database().ref().child("bcObject");
  var dbRefList = dbRefObject.child("hobby");


  // Sync object changes
  // snap parameter is a data snapshot
  dbRefObject.on("value", snap => {
    preObject.html(JSON.stringify(snap.val(), null, 3));
  });

// Sync List changes
// since we just want to know when child are added to the list
// this will print out all existing items AND newly added child items
// Will not listen on deleted/removed items
dbRefList.on("child_added", snap => {

  var li = $("<li>");
  li.attr("id", snap.key);
  li.html(snap.val());
  newList.append(li);

});

dbRefList.on("child_changed", snap => {
  var liChanged = $("#" + snap.key);
  liChanged.html(snap.val());

})

dbRefList.on("child_removed", snap => {
  var liToRemove = $("#" + snap.key);
  liToRemove.html(snap.val());

})



});
