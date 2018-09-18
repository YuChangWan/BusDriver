			function getDirectoryList() {	
				var stupro = "stu";//더미 데이터. 일단 학생이라는 의미가 stu고 학생의 아이디를 123이라 둔다
				var id = "123";
				
				$.post( "/directory",{stupro: stupro, id: id}, function( data ) { //리눅스로 학생여부와 ID정보를 전달한다
					var darray = data.split('\n'); //리눅스로부터 ls -l의 결과를 가져온다. 해당 파일에는 디렉토리인지 파일인지 판단하는 코드 (dwx---dwx)와 파일 이름이 있다 이걸 각 항마다 배열에 저장한다
					var newarray = new Array();
					var temparray			
					for (i = 1; i < darray.length-1; i++){
						if(darray[i].indexOf('d') == 0) { //디렉토리일 경우
							//create directory
							temparray = darray[i].split(' '); //디렉토리를 만들어야 하지만, 일단 구현을 하지 않았음. 왜냐? 만약 이걸 만들면 디렉토리 하위 파일을 전부 생성하는 과정이 필요하기 때문
							console.log(temparray[1]);
						}
						else {
							//create file
							temparray = darray[i].split(' '); //파일을 생성하기 전에 해당 파일의 이름을 추출하기 위해 split한다. temparray[1]에 파일 이름이 저장됌
							var branches = $("<li name='lala' value='"+temparray[1]+"'><span class='file'>"+temparray[1]+"</span></li>").appendTo("#browser2");
							$("#browser").treeview({
								add: branches
							}); //temp[1]에 있는 파일 이름을 바탕으로 디렉토리 리스트에 추가한다.
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
					alert("nwfl");
					 var branches = $("<li name='lala' value='"+data+"'><span class='file'>"+data+"</span></li>").appendTo("#browser2");
							$("#browser").treeview({
								add: branches
							});
				});
				modalLayer.fadeOut("slow");
				modalLink.focus();
					
			});	
			$(document).on("click", ".file",function() {
				var myindex = $( ".file" ).index( this );
				var input =  $( "li[name='lala']" ).eq(myindex).attr("value"); //리눅스 학생 폴더의 파일 이름이 input에 저장된다.
				var fileisinTab = false;
				
				$('.tab-link').each(function(){ //tab 목록에 파일이 있는지 없는지 검사
					var tab_value=$(this).attr('value');
					if(tab_value==input)
					{
						fileisinTab = true;
					}

				 });
				
				if(fileisinTab) { //만약 파일이 현재 탭 메뉴에 있다면
					$('ul.tabs li').removeClass('current');
					$('.tab-content').removeClass('current');	
					$("ul.tabs li[value='"+input+"']").addClass('current');
					$("textarea[id='"+input+"']").addClass('current');
				}
				else { //만약 파일이 현재 탭에 없다면
					$('ul.tabs li').removeClass('current');
					$('.tab-content').removeClass('current');	
					$("<li class='tab-link current' value='"+input+"'>"+input+"<span class = 'close' value='"+input+"'>×</span></li>").appendTo(".tabs");
					
					$("<textarea id='"+input+"' class='tab-content current'></textarea>").appendTo(".tabarea");
				}
				$.post( "/getfile", {filename: input} , function( data ) {
					
					$("textarea[id='"+input+"']").text(data);
				});
			});
			 //this is tree view construction end
