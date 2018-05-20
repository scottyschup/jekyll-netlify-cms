$("#recurring-donation").hide();

$(document).ready(function() {
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
