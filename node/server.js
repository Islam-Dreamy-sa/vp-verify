// DLV-13 probes: /health, /oom (allocates until killed), /fork (spawns until capped),
// /tmpwrite (writes /tmp), /tmpexec (tries to exec from /tmp), /home (writes $HOME).
const http = require('http'), fs = require('fs'), { spawn, execFileSync } = require('child_process');
const hold = [];
http.createServer((req, res) => {
  const send = (c, b) => { res.writeHead(c, { 'content-type': 'text/plain' }); res.end(String(b)); };
  try {
    if (req.url === '/health') return send(200, 'node ok uid=' + process.getuid());
    if (req.url === '/oom') { for (;;) hold.push(Buffer.alloc(64 * 1024 * 1024, 1)); }
    if (req.url === '/fork') { let n = 0, err = ''; for (let i = 0; i < 2000; i++) { try { const p = spawn('sleep', ['30']); p.on('error', e => { err = e.code; }); n++; } catch (e) { err = e.code; break; } } return setTimeout(() => send(200, 'spawned=' + n + ' err=' + err), 1500); }
    if (req.url === '/tmpwrite') { fs.writeFileSync('/tmp/x.txt', 'x'); return send(200, 'tmp write ok'); }
    if (req.url === '/tmpexec') { fs.writeFileSync('/tmp/x.sh', '#!/bin/sh\necho ran\n'); fs.chmodSync('/tmp/x.sh', 0o755); try { return send(200, 'EXEC ALLOWED: ' + execFileSync('/tmp/x.sh')); } catch (e) { return send(200, 'exec denied: ' + e.code); } }
    if (req.url === '/home') { fs.writeFileSync((process.env.HOME || '/home/node') + '/h.txt', 'h'); return send(200, 'home write ok HOME=' + process.env.HOME); }
    if (req.url === '/appwrite') { try { fs.writeFileSync('/app/w.txt', 'w'); return send(200, 'APP WRITABLE'); } catch (e) { return send(200, 'app write denied: ' + e.code); } }
    send(200, 'node ok');
  } catch (e) { send(500, e.code || e.message); }
}).listen(process.env.PORT || 3000, '0.0.0.0');
