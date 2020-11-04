// request GET http://localhost:3000/songs?artist=madonna
const http = require('http');
const URL = require('url').URL;

http.createServer((req, res) => {
  // req.url: /songs?artist=madonna
  // req.headers.host: localhost:3000
  const url = new URL(req.url, `http://${req.headers.host}`);
  const queryParams = url.searchParams;
  const artist = queryParams.get('artist'); //madonna

  console.log({ url });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(artist);
}).listen(3000, () => {
  console.log('Server is listening on port: 3000');
});