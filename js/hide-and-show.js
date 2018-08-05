$(document).ready(function() {
  $("#recurring-donation").hide();
    var hash = location.hash;
    if (hash === "#recurring-donation") {
      $(".donation-btn").hide();
      $(hash).show();
    }
});

$( "#recurring" ).click(function(){
	$(".donation-btn").hide();
	$("#recurring-donation").toggle();
	window.location.hash='#recurring-donation';
});
