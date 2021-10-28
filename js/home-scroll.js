var preventMouseWheel = false;
var timeStamp = new Date().getTime();
var currentScrollIndex = 0; 

$(document).ready(function() {

	$('.home .masthead-brand a').click(function(){
		scrollToID('#home', 1000);
		
		return false;
	});
	$('.home .masthead-nav > li > a,.home  .carousel-inner .item > .fot > .p2 > a').click(function(){
		var id = $(this).attr('href');
		scrollToID(id, 1000);
		return false;
	});

	setUpMouseScroll();
	

});
$(window).load(function(){
	var url = window.location.href;   
	var hash_pos = url.lastIndexOf('#');
	if(hash_pos > -1){
		var url_id = url.substring(hash_pos);
		//console.log($(url_id).offset().top);
		scrollToID(url_id,0,false);
	} 
});

function onScrollComplete(){
	preventMouseWheel = false;
}

// scroll function
function scrollToID(id, speed, animate){
	if (typeof animate === "undefined") {animate = true; }
	var offSet = 0;
	var targetOffset = $(id).offset().top - offSet;
	preventMouseWheel = true;
	if(animate){
		$('html,body').animate({scrollTop:targetOffset}, speed, 'swing', onScrollComplete);
	}
	else{
		$('html,body').scrollTop(targetOffset);
		preventMouseWheel = false;
	}
	$('.masthead-nav > li').removeClass('current-menu-item');
	$('.masthead-nav > li > a[href="'+id+'"]').closest('li').addClass('current-menu-item');

	currentScrollIndex = $('body section').index($(id));
	set_special_classes(id);
	if(animate){
		var url = id == '#home' ? '' : id;
		push_state(url);
	}
}
function scrollToSection(index){
	if(index != currentScrollIndex){
		var id = $('body section').eq(index).attr('id');
		scrollToID('#' + id, 1000)
	}
}


function setUpMouseScroll(){
	$('html.no-touch body').bind('mousewheel', function(event, delta) {
		
		var timeNow = new Date().getTime();
		if (timeNow - timeStamp < 100) {
        	timeStamp = timeNow;
        	deltaTime = false;
    	} else {
        	timeStamp = timeNow;
        	deltaTime = true;
    	}


		var newIndex = -1;
		var indexChanged = false;
		if(!preventMouseWheel && deltaTime){
			if (delta > 0) {
				newIndex = Math.max(0,currentScrollIndex-1);
				indexChanged = newIndex != currentScrollIndex;
	        	scrollToSection(newIndex);
	    	} else {
				newIndex = Math.min(4,currentScrollIndex+1);
				indexChanged = newIndex != currentScrollIndex;
		    	scrollToSection(newIndex);
	    	}
		}
		//if(indexChanged) preventMouseWheel = true;
	  	return false;
	});
}

function set_special_classes(id){
	if(id == '#about'){
		$('#site-header').addClass('about');
	}
	else{
		$('#site-header').removeClass('about');
	}
}

function push_state(url){
	//console.log('push: ' + home_url  + url);
	history.pushState(null, null, home_url + url);
}





/*
* DETECT END OF RESIZING, THEN SCROLL
* http://stackoverflow.com/questions/5489946/jquery-how-to-wait-for-the-end-of-resize-event-and-only-then-perform-an-ac
*/
var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 200;
$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        if(currentScrollIndex > 0){
        	var id = $('body section').eq(currentScrollIndex).attr('id');
			scrollToID('#' + id, 1000)
        }
    }               
}