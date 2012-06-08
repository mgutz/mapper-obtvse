var package = require('../package.json');
var program = require('commander');
var mapper = require('mapper');
var util = require('util');
var fs = require('fs');

program
  .version(package.version)
  .option('-d --database <db>', 'set new database name')
  .option('-u --user <user>', 'set new datbase user')
  .option('-p --password <password>', 'set new database user password')
  .option('-r --root [name]', 'set root user [root]', 'root')
  .parse(process.argv);

if (!program.database) throw new Error('database name is required');
if (!program.user) throw new Error('database user is required');
if (!program.password) throw new Error('database user password is required');

var conn = { host: 'localhost', user: program.user, password: program.password, database: program.database };
program.prompt(program.root + ' password: ', function(password) {
  var db = program.database;
  var newUser = program.user;
  var newUserPassword= program.password;

  mapper.connect({user: 'root', password: password});
  var client = mapper.client.client;

  client.querySync("DROP DATABASE IF EXISTS "+db+";");
  client.querySync("CREATE DATABASE "+db);
  client.querySync("GRANT ALL PRIVILEGES ON "+db+".* TO '"+newUser+"'@'localhost' IDENTIFIED BY '"+newUserPassword+"'");

  var o = { database: db, user: newUser, password: newUserPassword };

  var connectionString = "module.exports = { development: { mysql: "+JSON.stringify(o)+"}};";
  fs.writeFileSync(__dirname+"/config.js", connectionString);
  process.exit(0);
});
