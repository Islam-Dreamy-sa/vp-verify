// Writes into its own app directory at start. Hardened node is read-only, so this
// must fail cleanly (EROFS) and the error must be visible in the deploy log.
require('fs').writeFileSync(__dirname + '/data.txt', 'x');
require('http').createServer((q, s) => s.end('rofs started')).listen(process.env.PORT || 3000, '0.0.0.0');
