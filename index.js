
const Hapi = require('@hapi/hapi');
const pgPromise = require('pg-promise');
const Promise = require('bluebird');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        const options = {
          promiseLib: Promise // overriding the default (ES6 Promise);
        };
        const pgp = pgPromise(options);

        const cn = {
          host: 'localhost',
          port: 5432,
          database: 'jb_tenant',
          user: 'postgres',
          password: 'postgres'
        };
        const db = pgp(cn);
        
        return db.query('select * from taa85a64b_5350_4ac4_9639_80b5b2c31810.item where item_id = 1270', ['1'])
          .then((rows) => {
            console.log(rows);
            return rows;
          });
      }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();