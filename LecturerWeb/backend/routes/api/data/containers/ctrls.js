//const Container = require('../../../../models/containers');
var mysql_dbc = require('../../../../dbcon/db_con')();
const shell = require('shelljs');

var connection = mysql_dbc.init();

mysql_dbc.test_open(connection);

exports.list = (req, res) => {
  //res.send({ success: false, msg: 'list 준비중입니다' });
  var selectSql = 'select * from containers where lecturer_id = 1';
  connection.query(selectSql, function (err, result) {
    /*if (err) throw err;
    console.log(result);
    */
    if (err) console.error("err : " + err);
    res.send(result);
  });
};

exports.add = (req, res) => {
  var data = [req.body.name, req.body.language, 1, req.body.maximumstudents, req.body.comment];

  //shell.cd('~');
  /*if(shell.exec('openstack appcontainer create --interactive --security-group global_http --name ' + req.body.name + ' --net network=ff897b78-fece-42ae-9f9a-061204629ab9 ubuntu:16.04').code !== 0) {
    shell.echo('Error: command failed');
    shell.exit(1);
  }*/

  var selectSql = 'select * from containers where lecturer_id = 1';
  var insertSql = 'INSERT INTO containers(name, language, lecturer_id, maximumstudents, comment) VALUES(?,?,?,?,?)';
  console.log("rows : " + data);
  connection.query(insertSql, data, function (err, rows) {
    if (err) console.error("err : " + err);
  });
  connection.query(selectSql, function (err, result) {
    /*if (err) throw err;
    console.log(result);
    */
    if (err) console.error("err : " + err);
    res.send(result);
  });
  //res.send({ success: false, msg: 'add 준비중입니다' });
};

exports.del = (req, res) => {
  var con_id_data = req.body.con_id;
  var selectSql = 'select * from containers where lecturer_id = 1';
  var deleteSql = 'delete from containers' + ' where id =' + con_id_data;
  console.log("rows : " + deleteSql);
  connection.query(deleteSql, function (err, rows) {
    if (err) console.error("err : " + err);
  });
  connection.query(selectSql, function (err, result) {
    /*if (err) throw err;
    console.log(result);
    */
    if (err) console.error("err : " + err);
    res.send(result);
  });
};
