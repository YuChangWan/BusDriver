var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
var fs             =        require('fs');
var sys            =        require('sys');
var exec           =        require('child_process').exec;
var option = { encoding: 'utf8', flag: 'w' };
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//changwan-yu edit
var path = require('path');
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var errorHandler = expressErrorHandler({
        static: {
                '404': path.join(__dirname,'/public/404.html')
        }
});

app.use(cookieParser());
app.use(expressSession({
        secret: 'my key',
        resave: true,
        saveUninitialized: true
}));


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

function puts(error, stdout, stderr) {sys.puts(stdout)}

app.get('/', function (req, res) {
	res.redirect('/login.html');
});
app.get('/classroom',function(req,res){
  //res.sendfile(path.join(__dirname,'/201324509.html'));
  res.redirect('/student.html');
});

app.get('/Pclassroom',function(req,res){
  res.redirect("/professor.html");
});

app.post('/getMyId',function(req,res){ //HyoHyoHyoHyo
	console.log("/getMyId 호출됨");
	var userid = req.session.user.id;
	res.send(userid);
});

app.post('/directory',function(req,res){
	//var userDirectory = req.body.userid;
	var userDirectory = req.session.user.id;
	console.log("/directory 호출됨");
	exec("ls -l " + path.join( __dirname,'../workspace', userDirectory) + " | awk '{print $1, $9}'", function (error, stdout, stderr) {
		if ( error !== null) {
			console.log("exec D error: " + error);
		} else {
			console.log('stdout: '+stdout);
 			res.send(stdout);
		}
	});
});

app.post('/StuDirectory',function(req,res){ //HyoHyoHyoHyo
	console.log("/StuDirectory 호출됨");
	exec("ls -l " + path.join( __dirname,'../workspace') + " | awk '{print $1, $9}'", function (error, stdout, stderr) {
		if ( error !== null) {
			console.log("exec SD error: " + error);
		} else {
			console.log('stdout: '+stdout);
 			res.send(stdout);
		}
	});
});
app.post('/DirectoryConverted',function(req,res){
	var userDirectory = req.body.userid;
	//var userDirectory = req.session.user.id;
	console.log("/DirectoryConverted 호출됨");
	exec("ls -l " + path.join( __dirname,'../workspace', userDirectory) + " | awk '{print $1, $9}'", function (error, stdout, stderr) {
		if ( error !== null) {
			console.log("exec DC error: " + error);
		} else {
			console.log('stdout: '+stdout);
 			res.send(stdout);
		}
	});
});

app.post('/whoisprofessor',function(req,res){
	console.log("/whosisprofessor 호출됨");
	exec("getent group professor | awk '{split($0,a,\":\"); print a[4];}'", function (error, stdout, stderr) {
		if ( error !== null) {
			console.log("exec error: " + error);
		} else {
			console.log('stdout: '+stdout);
 			res.send(stdout);
		}
	});
});

app.post('/code',function(req,res){
	var userid = req.session.user.id;
	var filename = req.body.filename;
	var code=req.body.code;
	console.log("/code 호출됨");
	fs.writeFileSync(path.join(__dirname,'../workspace', userid, filename), code, option);
	exec("python3 " + path.join( __dirname,'../workspace', userid, filename), function(error, stdout, stderr) {
		if (error !== null) {
			console.log("exec error: " + error);
			res.send(error.message.split('error:')[1]);
		} else {
			console.log('stdout: '+stdout);
			res.send(stdout);
		}
	});
});

app.post('/save',function(req,res){
  //var userid = req.body.userid;
	console.log("/save 호출됨");
	var userid = req.session.user.id;
	var code=req.body.code;
	var filename = req.body.filename;
	fs.writeFileSync(path.join(__dirname, '../workspace', userid, filename), code, option);
	console.log(code);
});

app.post('/getfile',function(req,res){
	var userid = req.body.userid;
	console.log("/getfile 호출됨");
	//var userid = req.session.user.id;
	var filename = req.body.filename;
	var filedata = fs.readFileSync(path.join(__dirname, '../workspace', userid, filename), 'utf8');
	res.send(filedata);
	
});

app.post('/getStuFile',function(req,res){
	var userid = req.body.userid;
	console.log("/getfile 호출됨");
	//var userid = req.session.user.id;
	var filename = req.body.filename;
	var filedata = fs.readFileSync(path.join(__dirname, '../workspace', userid, filename), 'utf8');
	res.send(filedata);
	
});

app.post('/newfile',function(req,res){
	var userid = req.body.userid;
	console.log("/newfile 호출됨");
	//var userid = req.session.user.id;
	var newfilename = req.body.filename;
	fs.writeFileSync(path.join(__dirname, '../workspace',userid, newfilename),"", option);
	res.send(newfilename);
	/*exec('sudo touch ' + path.join(__dirname, '../workspace',userid, newfilename),function (error,stdout,stderr){
		if (error !== null) {
			console.log("exec error: " + error);
		} else {
			res.send(newfilename);
			console.log("newfilename: " + newfilename);
		}
	});*/
});

app.post('/deleteFile',function(req,res){
	var userid = req.body.userid;
	console.log("/newfile 호출됨");
	//var userid = req.session.user.id;
	var newfilename = req.body.filename;
	fs.unlink(path.join(__dirname, '../workspace',userid, newfilename),function(err) {
		if(err) console.log("ERROR deletefile");
		
		console.log("file delete complete");
		res.send("complete");
	});
});

io.on('connection', function(socket) {
	console.log("Client is connected");
	socket.on('socketAccess', function(data) {
	 	   // socket에 클라이언트 정보를 저장한다
		socket.userid = data.userid;
		console.log('server emitted: ' + data.userid); //HyoEDIT
 	});
	
	socket.on('help', function(data) {

   	 	// 접속된 모든 클라이언트에게 메시지를 전송한다
	    	io.emit('help', {userid: data.userid, filename: data.filename} );
		console.log('server emitted: ' + data.userid);
 	});
	socket.on('complete', function(data) {

   		 // 접속된 모든 클라이언트에게 메시지를 전송한다
	    	io.emit('complete', {userid: data.userid, filename: data.filename} );
		console.log('server emitted: ' + data.userid);
 	});
	socket.on('newtext', function(data) {
	    var userid = data.userid;
	    var stufilename = data.filename;
	    var newtext = data.textvalue;
	    console.log("Server received code");
   	 // 클라이언트에게 메시지를 전송한다
	    socket.broadcast.emit('newtext', {userid: userid, filename: stufilename, textvalue: newtext} ); //HyoEDIT
 	});

	socket.on('newFileCreated', function(data) {
	    console.log("Server received code");
   	 // 접속된 모든 클라이언트에게 메시지를 전송한다
	    socket.broadcast.emit('newFileCreated', {userid: data.userid, filename: data.filename} ); //HyoEDIT
 	});
	
});

//changwan-yu edit

app.post('/process/signup', function (req, res) {
        console.log('/process/signup 처리함.');
        var paramId = req.param('id');
        var paramPos = req.param('position');

        if (req.session.user) {
                console.log('이미 로그인되어 강의실 페이지로 이동합니다.');
                if(req.session.user.position == 'professor') {
			res.redirect('/Pclassroom'); 
		}
		else {
			res.redirect('/classroom'); 
		}
        } else {
                exec('useradd -m -s /bin/bash -d '+ path.join(__dirname,'../workspace/'+paramId)+' -G '+paramPos + ' ' + paramId, function (error, stdout, stderr) {
                        if (error !== null) {
                                console.log('exec error: ' + error);
                        } else {
                                req.session.user = {
                                        id: paramId,
                                        position: paramPos,
                                        authorized: true
                                };
                                console.dir(req.session.user);
                                if(req.session.user.position == 'professor') {
					res.redirect('/Pclassroom'); 
				}
				else {
					res.redirect('/classroom'); 
				}
                        }
                });
        }
});

app.post('/process/login', function (req, res) {
        console.log('/process/login  처리함.');
        var paramId = req.param('id');
        //var paramPos = req.param('position');
	
	if (req.session.user) {
		console.log('이미 로그인되어 강의실 페이지로 이동합니다.');
		if(req.session.user.position == 'professor') {
			res.redirect('/Pclassroom'); 
		}
		else {
			res.redirect('/classroom'); 
		}
	} else {
		exec('grep /bin/bash /etc/passwd | cut -f1 -d: |grep -x ' + paramId, function (error, stdout, stderr) {
		        if (error !== null) {
		                console.log('exec error: ' + error);
		        } else if (stdout.trim() == paramId) {
		                console.log(paramId + ' 로그인 성공');
		                exec('groups ' + paramId + ' | cut -f4 -d" "', function (error, stdout, stderr) {
		                        if (error !== null) {
		                                console.log('exec error: ' + error);
		                        } else {
		                                var userPos = stdout.trim();
		                                req.session.user = {
		                                        id: paramId,
		                                        position: userPos,
		                                        authorized: true
		                                };
						console.log(req.session.user.id);
		                                console.dir(req.session.user);
						if(req.session.user.position == 'professor') {
							res.redirect('/Pclassroom'); 
						}
						else {
							res.redirect('/classroom'); 
						}
		                        }

		                });
		        } else {
				console.log("stdout: " + stdout);
			}
		});
	}
	
});

app.get('/process/logout', function (req, res) {
        console.log('/process/logout 호출됨.');

        if (req.session.user) {
                //로그인된 상태
                console.log('로그아웃합니다.');
                req.session.destroy(function (err) {
                        if (err) {throw err;}
                        console.log('세션을 삭제하고 로그아웃되었습니다.');
                        res.redirect('/login.html');
                });
        } else {
                //로그인 안 된 상태
                console.log('아직 로그인되어 있지 않습니다.');
                res.redirect('/login.html');
        }
});

app.get('/process/product', function (req, res) {
        console.log('/process/product 호출됨.');

        if (req.session.user) {
                res.redirect('/product.html');
        } else {
                res.redirect('/login.html');
        }
});




app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);



server.listen(3000, function() {
        console.log("started on port 3000");
})
