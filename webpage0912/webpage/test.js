var express        =        require("express");
var app            =        express();

app.use(express.static('public'));

app.get('/',function(req,res){
  res.sendfile("studentwebpage.html");
});
app.listen(3000, function() {
        console.log("started on port 3000");
});
