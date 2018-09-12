			function getDirectoryList() {	
				var stupro = "stu";
				var id = "123";
				
				$.post( "/directory",{stupro: stupro, id: id}, function( data ) {
					var darray = data.split('\n');
					var newarray = new Array();
					var temparray			
					for (i = 1; i < darray.length-1; i++){
						if(darray[i].indexOf('d') == 0) {
							//create directory
							temparray = darray[i].split(' ');
							console.log(temparray[1]);
						}
						else {
							//create file
							temparray = darray[i].split(' ');
							var branches = $("<li name='lala' value='"+temparray[1]+"'><span class='file'>"+temparray[1]+"</span></li>").appendTo("#browser2");
							$("#browser").treeview({
								add: branches
							});
							console.log(temparray[1]);
						}
					}
				});
			}

			var modalLayer = $("#modalLayer");
			var modalLink = $(".modalLink");
			var modalCont = $(".modalContent");
			var marginLeft = modalCont.outerWidth()/2;
			var marginTop = modalCont.outerHeight()/2; 

			modalLink.click(function(){
				modalLayer.fadeIn("slow");
				modalCont.css({"margin-top" : -marginTop, "margin-left" : -marginLeft});
				$(this).blur();
				$(".modalContent > a").focus(); 
				return false;
			});

			$(".modalContent > button").click(function(){
				modalLayer.fadeOut("slow");
				modalLink.focus();
			});
			$("#newfile").click(function() {
				var input = document.getElementById("filename").value;
				$.post( "/newfile", {filename: input} , function( data ) {
					 getDirectoryList();
				});
				modalLayer.fadeOut("slow");
				modalLink.focus();
					
			});	
			$(document).on("click",".file", function() {
				var myindex = $( ".file" ).index( this );
				var input =  $( "li[name='lala']" ).eq(myindex).attr("value");
				$.post( "/getfile", {filename: input} , function( data ) {
					$("#codepage").text(data);
				});
			});
			 //this is tree view construction end