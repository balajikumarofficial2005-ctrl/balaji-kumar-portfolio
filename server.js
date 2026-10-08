// A dependency-free local preview server. Run with npm start or node server.js.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.PORT || 5500);
const contentTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon' };
const server = http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    return response.end('Method not allowed');
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); return response.end('Invalid request'); }
  const target = path.resolve(root, '.' + pathname.replace(/\\/g, '/'), pathname.endsWith('/') ? 'index.html' : '');
  if (!target.startsWith(root + path.sep) || pathname.includes('\0')) {
    response.writeHead(403);
    return response.end('Forbidden');
  }
  fs.stat(target, (error, stats) => {
    if (error || !stats.isFile()) { response.writeHead(404); return response.end('File not found'); }
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(target)] || 'application/octet-stream', 'Content-Length': stats.size, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    if (request.method === 'HEAD') return response.end();
    const stream = fs.createReadStream(target);
    stream.on('error', () => response.destroy());
    stream.pipe(response);
  });
});
server.on('error', error => { console.error(`Unable to start preview: ${error.message}`); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Portfolio preview: http://127.0.0.1:${port}`));
