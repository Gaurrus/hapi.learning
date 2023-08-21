module.exports.routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return '<h1>Server is healthy!</h1>';
    },
  },
  {
    method: 'GET',
    path: '/params/{name}',
    handler: (request, h) => {
      return `<h1>Params - page</h1><h2>${request.params.name}</h2>`;
    },
  },
  {
    method: 'GET',
    path: '/query{name?}',
    handler: (request, h) => {
      return `<h1>Query - page</h1><h2>${request.query.name}</h2>`;
    },
  },
  {
    method: 'GET',
    path: '/static-page',
    handler: (request, h) => {
      return h.file('./static/index.html');
    },
  },
  {
    method: 'GET',
    path: '/download',
    handler: (request, h) => {
      return h.file('./static/index.html', {
        mode: 'inline',
        filename: 'downloaded.html',
      });
    },
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
      if (request.payload.password === '123') {
        // return `<h1>Login success! Hello ${request.payload.username}</h1>`;
        return h.view('index', data);
      } else {
        return h.redirect('/static-page');
      }
    },
  },
  {
    method: 'GET',
    path: '/{any*}',
    handler: (request, h) => {
      return `<h1>Ooppss! 404</h1>`;
    },
  },
];
