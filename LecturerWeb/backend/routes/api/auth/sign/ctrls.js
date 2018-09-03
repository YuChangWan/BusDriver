var mysql_dbc = require('../../../../dbcon/db_con')();
var connection = mysql_dbc.init();

mysql_dbc.test_open(connection);

exports.in = (req, res) => {
  var id_data;
  var email_data = req.body.email;
  var name_data = req.body.name;
  var data = [req.body.email, req.body.name];

  //res.send({ success: false, msg: 'list 준비중입니다' });
  var selectSql = 'select * from lecturers where email =' + email_data;
  var insertSql = 'INSERT INTO lecturers(email, name) VALUES(?,?)';

  connection.query(selectSql, function (err, result) {
    if (err) console.error("err : " + err);
    console.log(result);

    res.send(result);
  });

  connection.query(insertSql, data, function (err, rows) {
    if (err) console.error("err : " + err);
    console.log("rows : " + result);

    res.send(rows);
  });
  //res.send({ success: false, msg: 'signin 준비중입니다' });
};
