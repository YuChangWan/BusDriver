var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
var fs             =        require('fs');
var sys            =        require('sys');
var exec           =        require('child_process').exec;
var option = { encoding: 'utf8', flag: 'w' };
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

function puts(error, stdout, stderr) {sys.puts(stdout)}

app.get('/a',function(req,res){
  res.sendfile("studentwebpage3.html");
});
app.get('/b',function(req,res){
  res.sendfile("professorwebpage2.html");
});


app.post('/directory',function(req,res){
  var stupro = req.body.stupro;
  var id = req.body.id;
  
  exec("ls -l ../hello | awk '{print $1, $9}' | tee directory.txt",puts);
  setTimeout(function() {
 	 var directorydata = fs.readFileSync('./directory.txt', 'utf8');
 	 res.send(directorydata);},500);
});
app.post('/code',function(req,res){
  var filename = req.body.filename;
  var code=req.body.code;
  fs.writeFileSync('../hello/'+filename, code, option);
  exec("gcc -o ../hello/"+filename+".out ../hello/"+filename+" && ../hello/"+filename+".out | tee ../hello/"+filename+"result.txt" ,puts);
  setTimeout(function(){
	var codedata = fs.readFileSync('../hello/'+filename+"result.txt", 'utf8');
  	console.log(codedata);
  	res.send(codedata);},1000);	
  console.log(code);
 // var codedata = fs.readFileSync('./testdata.txt', 'utf8');
 // console.log(codedata);
 // res.send(codedata);
});

app.post('/save',function(req,res){
  var code=req.body.code;
  var filename = req.body.filename;
  fs.writeFileSync('../hello/'+filename, code, option);
  console.log(code);
});

app.post('/getfile',function(req,res){
	var filename = req.body.filename;
	var filedata = fs.readFileSync('../hello/'+filename, 'utf8');
	res.send(filedata);
	
});

app.post('/newfile',function(req,res){
        var newfilename = req.body.filename;
        var newfiledata = fs.writeFileSync('../hello/'+newfilename,"", option);
	res.send(newfilename);
});

io.on('connection', function(socket) {
	console.log("Client is connected");
	socket.on('help', function(data) {

	 	   // socket에 클라이언트 정보를 저장한다
		socket.userid = data.userid;
		console.log("Server received message");
   	 // 접속된 모든 클라이언트에게 메시지를 전송한다
	    io.emit('help', data.userid );
	console.log('server emitted: ' + socket.userid);
  });
	
});

server.listen(3000, function() {
        console.log("started on port 3000");
})
