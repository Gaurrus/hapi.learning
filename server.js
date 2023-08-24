const Hapi = require('@hapi/hapi');
const { config } = require('./config');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const handlebars = require('handlebars');
const path = require('path');
const { routes } = require('./routes');

const startServer = async () => {
  const server = await new Hapi.Server(config);

  await server.register([
    {
      plugin: inert,
    },
    {
      plugin: vision,
    },
  ]);

  server.views({
    engines: {
      hbs: handlebars,
    },
    path: path.join(__dirname, 'views'),
  });

  server.route(routes);

  try {
    server.start();
    console.log(`server started at: ${server.info.uri}`);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
  return server;
};

startServer();
