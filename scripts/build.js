/* Simple build script to create a portable dist folder */
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const ROOT = __dirname + '/..';
const DIST = path.join(ROOT, 'dist');

async function rmrf(p) {
  if (await exists(p)) {
    await fsp.rm(p, { recursive: true, force: true });
  }
}

async function exists(p) {
  try { await fsp.stat(p); return true; } catch { return false; }
}

async function mkdirp(p) {
  await fsp.mkdir(p, { recursive: true });
}

async function copyFile(src, dest) {
  await mkdirp(path.dirname(dest));
  await fsp.copyFile(src, dest);
}

async function copyDir(src, dest) {
  const entries = await fsp.readdir(src, { withFileTypes: true });
  await mkdirp(dest);
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) {
      await copyDir(s, d);
    } else if (e.isFile()) {
      await copyFile(s, d);
    }
  }
}

async function main() {
  await rmrf(DIST);
  await mkdirp(DIST);

  // Copy server and views/assets
  await copyFile(path.join(ROOT, 'app.js'), path.join(DIST, 'app.js'));
  await copyDir(path.join(ROOT, 'views'), path.join(DIST, 'views'));
  await copyDir(path.join(ROOT, 'public'), path.join(DIST, 'public'));
  await mkdirp(path.join(DIST, 'uploads')); // empty uploads dir

  // Write a minimal package.json for production
  const pkgSrc = require(path.join(ROOT, 'package.json'));
  const pkgDist = {
    name: pkgSrc.name + '-dist',
    version: pkgSrc.version || '1.0.0',
    description: pkgSrc.description || 'CTF dist',
    scripts: { start: 'node app.js' },
    dependencies: pkgSrc.dependencies,
    license: pkgSrc.license || 'ISC'
  };
  await fsp.writeFile(path.join(DIST, 'package.json'), JSON.stringify(pkgDist, null, 2));

  console.log('Built dist folder at', DIST);
}

main().catch(err => { console.error(err); process.exit(1); });
