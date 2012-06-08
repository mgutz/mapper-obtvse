#!/usr/bin/env bash
if [ -z "$1" ]; then
  PREFIX="example"
else
  PREFIX=$1
fi;

[ -z "$NODE_ENV" ] && NODE_ENV=dev
DB=${PREFIX}_db_${NODE_ENV}
DBUSER=${PREFIX}_user_${NODE_ENV}

# Creates the mapper_example which is used by integration test.
mysql -p -u root <<-EOF

-- Re-create database as needed.
drop database if exists ${DB};

create database ${DB};
grant all privileges on ${DB}.* to '${DBUSER}'@'localhost' identified by 'password';

EOF

cat <<-EOJ > config.js
// To migrate a schema based on an environment, run
//
//  NODE_ENV=development mygrate up
module.exports = {
  development: {
    mysql: { user: '${DBUSER}', password: 'password', database: '${DB}' }
  },
};
EOJ

echo database: $DB
echo user: $DBUSER
echo password: password
