// To add a new page to the site CMS...
// Log into the website@midwestaccesscoalition.org account
// Create your new word doc -- the document title will be the key for the content in the fb db
// Click "Tools > Script Editor" to open the script editor
// Copy and paste the code in this file into the editor
// Click "Resources" > "Libraries"
// Add the PublishWrapper script as a library using its script id (103ooMORsVkkNh3bqqsuv2iI7sOjQgvpwYGCU7E9U7z7KA8CdnfnPyvlN) -- set the version to the most recent
// Click save in the google scripts UI
// Run the "Preview" function to grant permissions to the app and test that its working
// Check the database in the firebase console to ensure that your content was published to the db
// Run the "Publish" function to publish the content to the production database, if desired

function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Site Manager')
      .addItem('Preview', 'preview')
      .addItem('Publish', 'publish')
      .addToUi();
}

function publish() {
  PublishWrapper.publish();
}

function preview() {
  PublishWrapper.publish({preview: true});
}
