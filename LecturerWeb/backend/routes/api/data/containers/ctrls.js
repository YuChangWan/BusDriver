//const Container = require('../../../../models/containers');
var mysql_dbc = require('../../../../dbcon/db_con')();
const shell = require('shelljs');

var connection = mysql_dbc.init();
var connection2 = mysql_dbc.init2();

mysql_dbc.test_open(connection);
mysql_dbc.test_open(connection2);

exports.list = (req, res) => {
  var user_id = req.body.id;
  var selectSql = 'select * from containers where lecturer_id = ' + user_id;

  connection.query(selectSql, function (err, result) {
    if (err) console.error("err : " + err);
    res.send(result);
  });
};

exports.add = (req, res) => {
  var user_id = req.body.id;

  var selectSql = 'select * from containers where lecturer_id = ' + user_id;
  var insertSql = 'INSERT INTO containers(name, language, lecturer_id, maximumstudents, comment, ip, state, uuid) VALUES(?,?,?,?,?,?,?,?)';

  var analysisCode = '';
  var analysisArr = '';
  var analysisUuidLoc;
  var analysisUuidArr = '';

  var openStackCreateCmd = '';

  if(req.body.language == 'C/C++') {
    openStackCreateCmd = 'openstack appcontainer create --security-group busdriver_http --name ' + req.body.name + ' --net network=ff897b78-fece-42ae-9f9a-061204629ab9 busdriver/busdrivercpp';
  } else if(req.body.language == 'Python') {
    openStackCreateCmd = 'openstack appcontainer create --security-group busdriver_http --name ' + req.body.name + ' --net network=ff897b78-fece-42ae-9f9a-061204629ab9 busdriver/busdriverpython';
  }

  shell.exec(openStackCreateCmd, function (error, stdout, stderr) {
    analysisCode = stdout;
    if (error !== null) {
      analysisArr = analysisCode.split("\n");
      var i = analysisArr.length;
      for(var j = 0; j < i; j ++) {
        if(analysisArr[j].match(/uuid/) !== null) {
          analysisUuidLoc = j;
        }
      }

      analysisUuidArr = analysisArr[analysisUuidLoc].split(/\s+/);
      console.log('find uuid: ' + analysisUuidArr[3]);

      var data = [req.body.name, req.body.language, req.body.id, req.body.maximumstudents, req.body.comment, 'Wait IP..', 'Create', analysisUuidArr[3]];
      console.log("rows : " + data);
      connection.query(insertSql, data, function (err, rows) {
        if (err) console.error("err : " + err);
      });
      connection.query(selectSql, function (err, result) {
        if (err) console.error("err : " + err);
        res.send(result);
      });
    } else {
      console.log('exec error: ' + error);
    }
  });
};

exports.start = (req, res) => {
  var user_id = req.body.id;
  var con_name = req.body.con_name;
  var con_uuid_data = req.body.con_uuid;
  var analysisArr = '';
  var analysisIpBeforeLoc;
  var analysisIpArr = '';
  var subIp;
  //shell.cd('~');
  if(shell.exec('openstack appcontainer start ' + "'" + con_uuid_data + "'").code !== 0) {
    shell.echo('Error: command failed');
    shell.exit(1);
  } else {
    var selectSql2 = 'select addresses from container where uuid = ' + "'" + con_uuid_data + "'";
    var updateSql = 'update containers' + ' SET ip=?, state=?' + ' where uuid = ' + "'" + con_uuid_data + "'";

    connection2.query(selectSql2, function (err, result) {
      if (err) console.error("err : " + err);
      analysisArr = JSON.stringify(result).split(" ");
      var i = analysisArr.length;
      for(var j = 0; j < i; j ++) {
        if(analysisArr[j].match(/addr/) !== null) {
          analysisIpBeforeLoc = j;
        }
      }

      analysisIpArr = analysisArr[analysisIpBeforeLoc + 1].split(",");
      subIp = analysisIpArr[0].substring(2, analysisIpArr[0].length - 2);
      res.send(con_name + " : " + subIp + " start success!");

      var start_data = [subIp, 'Start'];
      connection.query(updateSql, start_data, function (err, rows) {
        if (err) console.error("err : " + err);
      });
    });
  }
};

exports.stop = (req, res) => {
  var user_id = req.body.id;
  var con_name = req.body.con_name;
  var con_uuid_data = req.body.con_uuid;
  var start_data = ['Stop'];
  var updateSql = 'update containers' + ' SET state=?' + ' where uuid = ' + "'" + con_uuid_data + "'";

  if(shell.exec('openstack appcontainer stop ' + "'" + con_uuid_data + "'").code !== 0) {
    shell.echo('Error: command failed');
    shell.exit(1);
  } else {
    connection.query(updateSql, start_data, function (err, rows) {
      if (err) console.error("err : " + err);
      console.log("stop rows : " + rows);
    });
    res.send(con_name + " stop success")
  }
};

exports.del = (req, res) => {
  var user_id = req.body.id;
  var con_name = req.body.con_name;
  var con_id_data = req.body.con_id;
  var con_uuid_data = req.body.con_uuid;

  var deleteSql = 'delete from containers' + ' where id =' + con_id_data;

  if(shell.exec('openstack appcontainer delete ' + "'" + con_uuid_data + "'").code !== 0) {
    shell.echo('Error: command failed');
    shell.exit(1);
  } else {
    connection.query(deleteSql, function (err, rows) {
      if (err) console.error("err : " + err);
      console.log("del rows : " + rows);
    });
    res.send(con_name + " delete success!")
  }
};
