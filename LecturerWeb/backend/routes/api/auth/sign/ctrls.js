var mysql_dbc = require('../../../../dbcon/db_con')();
var connection = mysql_dbc.init();
//var hello = require('hellojs/dist/hello.all.min.js');

exports.check = (req, res) => {
  var id_data;
  var email_data = req.body.user_email;
  var name_data = req.body.user_name;
  var data = [req.body.user_email, req.body.user_name];

  var selectSql = 'select id from lecturers where email = ' + "'" + email_data + "'";

  connection.query(selectSql, function (err, result) {
    if (err) console.error("err : " + err);
    res.send(result);
  });
};

exports.in = (req, res) => {
  var id_data;
  var email_data = req.body.user_email;
  var name_data = req.body.user_name;
  var data = [req.body.user_email, req.body.user_name, 1];

  var selectSql = 'select id from lecturers where email = ' + "'" + email_data + "'";
  var insertSql = 'INSERT INTO lecturers(email, name, user_lv) VALUES(?,?,?)';

  connection.query(selectSql, function (err, result) {
    if (err) console.error("err : " + err);

    if(result == "") {
      console.log("undefined!!!!");
      connection.query(insertSql, data, function (err, rows) {
        if (err) console.error("err : " + err);
        console.log("rows : " + rows);
        res.send(rows);
      });
    } else {
      console.log("defined!!!!");
      res.send(result);
    }
  });
};
