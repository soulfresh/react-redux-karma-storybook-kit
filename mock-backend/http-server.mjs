const API = '../src/services/mocks/rest-api';

const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const notFound = require(`${API}/404.json`);

const port = '8080';
const notFoundJson = JSON.stringify(notFound);

http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} "${req.method} ${req.url}"`);

  const parsedUrl = url.parse(req.url);
  const pathname = path.resolve(__dirname, `${API}/${parsedUrl.pathname}`);
  const ext = path.parse(pathname).ext;

  const map = {
    '.json': 'application/json',
    '.xml': 'text/xml'
  };

  const defaultExt = 'json';

  const addCorsHeaders = () => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin,x-requested-with,content-type,accept,range,authorization,id-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,DELETE');
  };

  const handleSuccess = (data) => {
    addCorsHeaders();

    // Set response data
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
    } else {
      res.setHeader('Content-type', (map)[ext] || 'text/plain');
      res.end(data);
    }
  };

  const handleError = (err) => {
    addCorsHeaders();

    if (err.code === 'ENOENT') {
      res.statusCode = 404;
      console.error(`File ${pathname} not found!`);
      res.end(JSON.stringify(notFoundJson));
    } else {
      res.statusCode = 500;
      const msg = `Error reading the file: ${err}.`;
      console.error(msg);
      res.end(msg);
    }
  };

  const handleDefaultRequest = () => {
    // Try to read the file as it was requested.
    fs.readFile(pathname, (err, data) => {
      if (err) {
        // Try explicity setting the default extension.
        fs.readFile(`${pathname}.${defaultExt}`, (err2, data2) => {
          if (err2) {
            // Try accessing an index file.
            fs.readFile(`${pathname}/index.${defaultExt}`, (err3, data3) => {
              if (err3) {
                handleError(err3);
              } else {
                handleSuccess(data3);
              }
            });
          } else {
            handleSuccess(data2);
          }
        });
      } else {
        handleSuccess(data);
      }
    });
  };

  handleDefaultRequest();

}).listen(parseInt(port, 10));

console.log(`Server listening on port ${port}`);
