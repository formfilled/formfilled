function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/drive.metadata.readonly");

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log("success!");
    console.log("user");
    console.log(user);

    console.log("result");
    console.log(result);
    document.getElementById('user').innerHTML = user.displayName;

    firebase.database().ref("/associations/").once("value", function(snapshot) {
      var assoc = snapshot.val();
      console.log("assoc data");
      console.log(assoc);
      var thisAssoc = assoc[user.email.split("@")[0]];
      console.log(thisAssoc);

      firebase.database().ref("/masterSheet/").on("value", function(snapshot){
        var incompletes = [];
        snapshot.forEach(function(shot) {
          var row = shot.val();
          if (!row[2] || !row[3]) {
            for (const name of thisAssoc) {
              if (name == row[0].split("@")[0]) {
                incompletes.push(row);
              }
            }

          }
        });
        console.log(incompletes);
        displayIncompletes(incompletes);
      });
    });


    console.log("DATABASE:");
    console.log(database);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(errorMessage);
  });
}
