'use strict';
const Hapi = require('@hapi/hapi');
const hapiBoomDecorators = require('hapi-boom-decorators');
const config = require('./config');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const path = require('path');
const handlebars = require('handlebars');

const Connection = require('./dbconfig');

async function init() {
  // Инициализируем сервер
  const server = await new Hapi.Server(config.server);

  // Регистрируем расширение
  await server.register([hapiBoomDecorators]);

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
    path: path.join(__dirname, 'src/views'),
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return h.file('hello-page.html');
      },
    },
    {
      method: 'GET',
      path: '/image-file',
      handler: (request, h) => {
        return h.file('bmw.png', {
          mode: 'attachment',
          filename: 'bmw.png',
        });
      },
    },
    {
      method: 'GET',
      path: '/test',
      handler: (request, h) => {
        return `<h1>Server is on test!</h1>`;
      },
    },
    {
      method: 'GET',
      path: '/users',
      handler: async (request, h) => {
        const users = await Connection.getUsers();
        const data = {
          user: users[0].username,
          pass: users[0].password,
        };
        return h.view('bd-page', data);
      },
    },
    {
      method: 'GET',
      path: '/test/{user}',
      handler: (request, h) => {
        return `<h1>Hello params ${request.params.user}</h1>`;
      },
    },
    {
      method: 'GET',
      path: '/user/{names?}',
      handler: (request, h) => {
        return `<h1>Hello query ${request.query.user}</h1>`;
      },
    },
    {
      method: 'GET',
      path: '/redirect',
      handler: (request, h) => {
        return h.redirect('/');
      },
    },
    {
      method: 'POST',
      path: '/login',
      handler: (request, h) => {
        const data = {
          user: request.payload.user,
          pass: request.payload.password,
        };
        if (
          request.payload.user === 'Gar' &&
          request.payload.password === '123'
        ) {
          // return `<h1>Hello ${request.payload.user}</h1>`;
          return h.view('index', data);
        } else {
          return `<h1>User ${request.payload.user} do not found!</h1>`;
        }
      },
    },
    {
      method: 'GET',
      path: '/{any*}',
      handler: (request, h) => {
        return `<h1>Ooppss!</h1>`;
      },
    },
  ]);

  // Запускаем сервер
  try {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    // если не смогли стартовать, выводим ошибку
    console.log(JSON.stringify(err));
  }

  return server;
}

init();
