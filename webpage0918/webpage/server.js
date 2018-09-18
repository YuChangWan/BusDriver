var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
var fs             =        require('fs');
var sys            =        require('sys');
var exec           =        require('child_process').exec;
var option = { encoding: 'utf8', flag: 'w' };

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

function puts(error, stdout, stderr) {sys.puts(stdout)}

app.get('/',function(req,res){
  res.sendfile("studentwebpage.html");
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
  var code=req.body.code;
  fs.writeFileSync('./test.c', code, option);
  exec("gcc test.c && ./a.out | tee testdata.txt",puts);
  setTimeout(function(){
	var codedata = fs.readFileSync('./testdata.txt', 'utf8');
  	console.log(codedata);
  	res.send(codedata);},1000);	
  console.log(code);
 // var codedata = fs.readFileSync('./testdata.txt', 'utf8');
 // console.log(codedata);
 // res.send(codedata);
});
app.post('/getfile',function(req,res){
	var filename = req.body.filename;
	var filedata = fs.readFileSync('../hello/'+filename, 'utf8');
	res.send(filedata);
	
});

app.post('/newfile',function(req,res){
        var newfilename = req.body.filename;
        var newfiledata = fs.writeFileSync('../hello/'+newfilename,"", option);
});

app.listen(3000, function() {
        console.log("started on port 3000");
})
