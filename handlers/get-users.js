module.exports.getUsers = () => (request, h) => {
  return h.file('./static/index.html', {
    mode: 'inline',
    filename: '123.html',
  });
};
