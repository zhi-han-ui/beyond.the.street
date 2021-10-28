

$(document).ready(function() {
	$("#loader").show();
	$('.share-toggle').click(function(){$('.share-bar').toggle();})
	
	$('section .menudreta > li > a').hover( project_menu_In, project_menu_Out );
	function project_menu_In(){
		$(this).closest('.menudreta').find('li > a').removeClass('active');
		$(this).addClass('active');
		$(this).closest('section').find('.carousel .item').removeClass('active');
		$(this).closest('section').find('.carousel-inner > .item').eq($(this).parent().index()).addClass('active');
	}
	function project_menu_Out(){}

	$('.no-touch .single .masthead-nav > li > a').click(function(){
		if($(this).attr('href').indexOf('http') == -1){
			window.location.href = home_url + $(this).attr('href');
			return false;
		}
	});
});



$(window).load(function(){
	$("#loader").fadeOut('slow');
	$("#site-wrapper").fadeIn(); 
});




if (typeof console === "undefined") {console = {log: function() { } }; }
if (typeof home_url === "undefined") {home_url = ''; }
