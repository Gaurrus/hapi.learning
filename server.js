const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const handlebars = require('handlebars');
const { routes } = require('./routes');
const { config } = require('./config');
const path = require('path');

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
      html: handlebars,
    },
    path: path.join(__dirname, 'views'),
  });

  server.route(routes);

  try {
    server.start();
    console.log(`server started at : ${server.info.uri}`);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
  return server;
};

startServer();
