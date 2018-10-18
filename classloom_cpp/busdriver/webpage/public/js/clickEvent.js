$('#compile').click(function() {
	var tab_id = $('ul.tabs li.current').attr("value");
	var codedata = $("textarea[id='"+tab_id+"']").val();
	console.log(codedata);
	$.post("/code",{filename: tab_id, code: codedata},function(data) {
		alert(data);
	});
});

$('#save').click(function() {
	var tab_id = $('ul.tabs li.current').attr("value");
	var codedata = $("textarea[id='"+tab_id+"']").val();
	console.log(codedata);
	$.post("/save",{filename: tab_id, code: codedata},function() {
	});
});

$(document).on("click", "ul.tabs li", function(){
	var tab_id = $(this).attr("value");
	$('ul.tabs li').removeClass('current');
	$('.tab-content').removeClass('current');

	$(this).addClass('current');
	$("textarea[id='"+tab_id+"']").addClass('current');
});

$(document).on("click",".close",function() {
	var tab_id = $(this).attr("value");
	var lock = false;
	console.log($('ul.tabs li').length);
	
	if($('ul.tabs li.current').attr("value") == tab_id) {
		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');
		lock = true;
	}
	$("ul.tabs li[value='"+tab_id+"']").remove();
	$("textarea[id='"+tab_id+"']").remove();
	if(lock) {
		$("ul.tabs li:first-child").addClass('current');
		var firstchild = $("ul.tabs li:first-child").attr("value");
		$("textarea[id='"+firstchild+"']").addClass('current');
	}
	
	
});
