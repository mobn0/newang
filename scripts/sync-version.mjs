// Syncs the library source version after semantic-release computes the next release.
// Run: node scripts/sync-version.mjs 1.2.3
import { readFileSync, writeFileSync } from 'node:fs';

const version = process.argv[2];
if (!version) {
  console.error('sync-version: missing version argument');
  process.exit(1);
}

const path = new URL('../projects/newang/package.json', import.meta.url);
const pkg = JSON.parse(readFileSync(path, 'utf8'));
pkg.version = version;
writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
console.log(`sync-version: newang@${version}`);
