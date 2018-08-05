(function () {
  let referenceName = `{{page.firebase_title}}`;
  let mainContent = document.getElementById('mainContent');
  if (referenceName !== "") {
    let firebaseHeadingRef = firebase.database().ref().child(referenceName);
    firebaseHeadingRef.on('value', function(datasnapshot) {
      mainContent.innerHTML = datasnapshot.val();
    })
  }
})();
