// This is dependent upon FirebaseApp
// See:  https://sites.google.com/site/scriptsexamples/new-connectors-to-google-services/firebase
// Source Code:  https://script.google.com/d/1hguuh4Zx72XVC1Zldm_vTtcUUKUA6iBUOoGnJUWLfqDWx5WlOJHqYkrt/edit

var SITE_PAGES_REGISTRY_SS_ID = '1E2m3XZb_MLFhLd_gNztly20FvIHQnOVumJUY6cUPN_g';
var ACTIVE_DOCUMENT = DocumentApp.getActiveDocument();

function onInstall(e) {
 onOpen(e);
}

function onOpen(e) {
  var ui = DocumentApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Site Manager')
      .addItem('Publish', 'ConvertGoogleDocToCleanHtml')
      .addToUi();
}

Array.prototype.findIndex = function(search){
  if(search == "") return false;
  for (var i=0; i<this.length; i++)
    if (this[i] == search) return i;

  return -1;
}

function ConvertGoogleDocToCleanHtml() {
  var body = ACTIVE_DOCUMENT.getBody();
  var numChildren = body.getNumChildren();
  var output = [];
  var images = [];
  var listCounters = {};

  // Walk through all the child elements of the body.
  for (var i = 0; i < numChildren; i++) {
    var child = body.getChild(i);
    output.push(processItem(child, listCounters, images));
  }

  var html = output.join('\r');
  writeToFirebase(html);
  //createDocumentForHtml(html, images);
}

function writeToFirebase(html) {
  var secret = PropertiesService.getScriptProperties().getProperty('database_secret');
  var base = FirebaseApp.getDatabaseByUrl("https://mac-site.firebaseio.com/", secret);
  base.setData(ACTIVE_DOCUMENT.getName(), html);
}

function getPublishedDocId() {
  var registrySheet = SpreadsheetApp.openById(SITE_PAGES_REGISTRY_SS_ID).getSheetByName('NavBar');
  var editableDocIds = registrySheet.getRange(2, 4, registrySheet.getLastRow()).getValues(); // row 1 is header row, column 4 (D) is where editable doc ids are

  // Note -- findIndex is not a google appscript but rather array prototype method we add here ;)
  var matchingRow = editableDocIds.findIndex(ACTIVE_DOCUMENT.getId()) + 2; // have to offset the headers
  targetPublishToDocId = registrySheet.getRange("C" + matchingRow).getValue();

  return targetPublishToDocId;
}

function createDocumentForHtml(html, images) {
  var name = DocumentApp.getActiveDocument().getName()+".html";
  var newDoc = DocumentApp.openById(getPublishedDocId());
  newDoc.getBody().setText(html);
  for(var j=0; j < images.length; j++)
    newDoc.getBody().appendImage(images[j].blob);
  newDoc.saveAndClose();
}

function dumpAttributes(atts) {
  // Log the paragraph attributes.
  for (var att in atts) {
    Logger.log(att + ":" + atts[att]);
  }
}

function processItem(item, listCounters, images) {
  var output = [];
  var prefix = "", suffix = "";

  if (item.getType() == DocumentApp.ElementType.PARAGRAPH) {
    switch (item.getHeading()) {
        // Add a # for each heading level. No break, so we accumulate the right number.
      case DocumentApp.ParagraphHeading.HEADING6:
        prefix = "<h6>", suffix = "</h6>"; break;
      case DocumentApp.ParagraphHeading.HEADING5:
        prefix = "<h5>", suffix = "</h5>"; break;
      case DocumentApp.ParagraphHeading.HEADING4:
        prefix = "<h4>", suffix = "</h4>"; break;
      case DocumentApp.ParagraphHeading.HEADING3:
        prefix = "<h3>", suffix = "</h3>"; break;
      case DocumentApp.ParagraphHeading.HEADING2:
        prefix = "<h2>", suffix = "</h2>"; break;
      case DocumentApp.ParagraphHeading.HEADING1:
        prefix = "<h1>", suffix = "</h1>"; break;
      default:
        prefix = "<p>", suffix = "</p>";
    }

    if (item.getNumChildren() == 0)
      return "";
  }
  else if (item.getType() == DocumentApp.ElementType.INLINE_IMAGE)
  {
    processImage(item, images, output);
  }
  else if (item.getType()===DocumentApp.ElementType.LIST_ITEM) {
    var listItem = item;
    var gt = listItem.getGlyphType();
    var key = listItem.getListId() + '.' + listItem.getNestingLevel();
    var counter = listCounters[key] || 0;

    // First list item
    if ( counter == 0 ) {
      // Bullet list (<ul>):
      if (gt === DocumentApp.GlyphType.BULLET
          || gt === DocumentApp.GlyphType.HOLLOW_BULLET
          || gt === DocumentApp.GlyphType.SQUARE_BULLET) {
        prefix = '<ul><li>', suffix = "</li>";

          //suffix += "</ul>";
        }
      else {
        // Ordered list (<ol>):
        prefix = "<ol><li>", suffix = "</li>";
      }
    }
    else {
      prefix = "<li>";
      suffix = "</li>";
    }

    if (item.isAtDocumentEnd() || item.getNextSibling().getType() != DocumentApp.ElementType.LIST_ITEM) {
      if (gt === DocumentApp.GlyphType.BULLET
          || gt === DocumentApp.GlyphType.HOLLOW_BULLET
          || gt === DocumentApp.GlyphType.SQUARE_BULLET) {
        suffix += "</ul>";
      }
      else {
        // Ordered list (<ol>):
        suffix += "</ol>";
      }

    }

    counter++;
    listCounters[key] = counter;
  }

  output.push(prefix);

  if (item.getType() == DocumentApp.ElementType.TEXT) {
    Logger.log(item);
    processText(item, output);
  }
  else {


    if (item.getNumChildren) {
      var numChildren = item.getNumChildren();

      // Walk through all the child elements of the doc.
      for (var i = 0; i < numChildren; i++) {
        var child = item.getChild(i);
        output.push(processItem(child, listCounters, images));
      }
    }

  }

  output.push(suffix);
  return output.join('');
}


function processText(item, output) {
  var text = item.getText();
  Logger.log(text);
  var indices = item.getTextAttributeIndices();

  Logger.log(indices);
  if (indices.length <= 1) {
    //Logger.log("I'm in branch one");
    // Assuming that a whole para fully italic is a quote
    if(item.isBold()) {
      output.push('<b>' + text + '</b>');
    }
    else if(item.isItalic()) {
      output.push('<blockquote>' + text + '</blockquote>');
    }
    else if (item.getLinkUrl()) {
      output.push('<a href="'+ item.getLinkUrl() + '">' + text + '</a>');
    }
    else if (text.trim().indexOf('http://') == 0) {
      output.push('<a href="' + text + '" rel="nofollow">' + text + '</a>');
    }
    else {
      output.push(text);
    }
  }
  else {
    //Logger.log("I'm in branch two");
    for (var i=0; i < indices.length; i ++) {
      var partAtts = item.getAttributes(indices[i]);
      var startPos = indices[i];
      var endPos = i+1 < indices.length ? indices[i+1]: text.length;
      var partText = text.substring(startPos, endPos);

      //Logger.log(partText);

      if (partAtts.ITALIC) {
        output.push('<i>');
      }
      if (partAtts.BOLD) {
        output.push('<b>');
      }
      if (partAtts.LINK_URL) {
        output.push('<a href="'+ partAtts.LINK_URL + '">');
      }

      if (partAtts.UNDERLINE && !partAtts.LINK_URL) {
        output.push('<u>');
      }
      // If someone has written [xxx] and made this whole text some special font, like superscript
      // then treat it as a reference and make it superscript.
      // Unfortunately in Google Docs, there's no way to detect superscript
      if (partText.indexOf('[')==0 && partText[partText.length-1] == ']') {
        output.push('<sup>' + partText + '</sup>');
      }
      // this link handling does not work
      else if (partText.trim().indexOf('http://') == 0) {
        output.push('<a href="' + partText + '" rel="nofollow">' + partText + '</a>');
      }
      else {
        output.push(partText);
      }

      if (partAtts.ITALIC) {
        output.push('</i>');
      }
      if (partAtts.BOLD) {
        output.push('</b>');
      }
      if (partAtts.LINK_URL) {
        output.push('</a>');
      }
      if (partAtts.UNDERLINE && !partAtts.LINK_URL) {
        output.push('</u>');
      }
    }
  }
}


function processImage(item, images, output)
{
  images = images || [];
  var blob = item.getBlob();
  var contentType = blob.getContentType();
  var extension = "";
  if (/\/png$/.test(contentType)) {
    extension = ".png";
  } else if (/\/gif$/.test(contentType)) {
    extension = ".gif";
  } else if (/\/jpe?g$/.test(contentType)) {
    extension = ".jpg";
  } else {
    throw "Unsupported image type: "+contentType;
  }
  var imagePrefix = "Image_";
  var imageCounter = images.length;
  var name = imagePrefix + imageCounter + extension;
  imageCounter++;
  output.push('<img src="cid:'+name+'" />');
  images.push( {
    "blob": blob,
    "type": contentType,
    "name": name});
}
