// To add a new page to the site CMS...
// Log into the website@midwestaccesscoalition.org account
// Create your new word doc -- the document title will be the key for the content in the fb db
// Click "Tools > Script Editor" to open the script editor
// Copy and paste the code in this file into the editor
// Click "Resources" > "Libraries"
// Add the PublishToHTML script as a library using its script id (1JLiSo7qEeiUyojL13VY4ltKnx50oj5BiFzikDE_t4cRO65I2Bi1gW4fS) -- set the version to the most recent
// Click save in the google scripts UI and then run the "Publish" function to grant permissions to the app and test that its working
// Check the database in the firebase console to ensure that your content was published to the db

function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Site Manager')
      .addItem('Publish', 'publish')
      .addToUi();
}

function publish() {
  PublishtoHTML.ConvertGoogleDocToCleanHtml(); 
}