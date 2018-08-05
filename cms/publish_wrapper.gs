// PublishWrapper v2

// This script exists in order to simplify dependency management. Any
// dependencies for the per-page publish scripts should be included
// here, so that the versions of those dependencies can be specified
// here and we won't need to manually update the versions in each
// individual script.

function publish(options) {
  PublishtoHTML.ConvertGoogleDocToCleanHtml(options);
}
