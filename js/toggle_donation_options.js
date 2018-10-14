$(document).ready(function() {
  $("#recurring-donation").hide();

  $("#recurring-prompt").click(() => {
    $("#recurring-donation").toggle();
    $("#options").toggle();
  });

  $("#one-time-prompt").click(() => {
    $("#recurring-donation").toggle();
    $("#options").toggle();
  });
});
