const { getUsers } = require('../dbconfig');

module.exports.routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.file('login.html');
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: async (request, h) => {
      const data = await getUsers();
      console.log(data);
      return h.view('users', { data });
    },
  },
  {
    method: 'GET',
    path: '/params/{name}',
    handler: (request, h) => {
      return `<h1>Привет ${request.params.name}</h1>`;
    },
  },
  {
    method: 'GET',
    path: '/query{name?}',
    handler: (request, h) => {
      return `<h1>Привет ${request.query.name}</h1>`;
    },
  },
  {
    method: 'GET',
    path: '/{any*}',
    handler: (request, h) => {
      return `<h1>OOps! 404</h1>`;
    },
  },
  {
    method: 'GET',
    path: '/file',
    handler: getUsers,
  },
  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      const { username, password } = request.payload;
      const data = {
        username,
        password,
      };
      if (password === '123') {
        return h.view('index', data);
      } else {
        return h.redirect('/');
      }
    },
  },
];
