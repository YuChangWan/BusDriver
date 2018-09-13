//const Container = require('../../../../models/containers');
var mysql_dbc = require('../../../../dbcon/db_con')();
var connection = mysql_dbc.init();

exports.info = (req, res) => {
  var id_data = req.body.id;
  //res.send({ success: false, msg: 'list 준비중입니다' });
  var selectSql = 'select * from lecturers where id =' + id_data;

  connection.query(selectSql, function (err, result) {
    console.log(result);
    if (err) console.error("err : " + err);
    res.send(result);
  });
};

exports.mod = (req, res) => {
  var id_data = req.body.id;
  var data = [req.body.address, req.body.city, req.body.country, req.body.about_me];
  var selectSql = 'select * from lecturers where id =' + id_data;
  var updateSql = 'update lecturers' + ' SET address=?, city=?, country=?, about_me=?' + ' where id =' + id_data;

  connection.query(updateSql, data, function (err, rows) {
    if (err) console.error("err : " + err);
    console.log("rows : " + data);
  });

  connection.query(selectSql, function (err, result) {
    if (err) console.error("err : " + err);
    res.send(result);
  });
  //res.send({ success: false, msg: 'mod 준비중입니다' });
};
