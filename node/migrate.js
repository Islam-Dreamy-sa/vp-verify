// H11: prints the isolation it ran under, then exits with MIGRATE_EXIT (default 0).
const fs = require('fs');
let ro = 'writable'; try { fs.writeFileSync('/app/m.txt', 'm'); } catch (e) { ro = e.code; }
console.log(`MIGRATE ran uid=${process.getuid()} appdir=${ro}`);
process.exit(Number(process.env.MIGRATE_EXIT || require('./migrate-exit.json').code));
