const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'rat-rush/index.html', 'rat-rush/privacy/index.html', 'rat-rush/terms/index.html'];
let links = 0;
for (const page of pages) {
  const file = path.join(root, page);
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page}: one main heading`);
  assert.ok(html.includes('mailto:jpk.kh.24@gmail.com'), `${page}: support contact`);
  assert.ok(!/<script\b|<form\b|\sdownload(?:=|\s|>)/i.test(html), `${page}: informational page only`);
  assert.ok(!/expo\.dev|\.apk(?:["?#])|\.aab(?:["?#])|TODO|PLACEHOLDER/.test(html), `${page}: no download links or placeholders`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page}: duplicate IDs`);
  for (const [, attribute, reference] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:)/.test(reference)) continue;
    const [relative, fragment] = reference.split('#');
    let target = relative ? path.resolve(path.dirname(file), relative) : file;
    assert.ok(target === root || target.startsWith(root + path.sep), `${page}: path outside site`);
    assert.ok(fs.existsSync(target), `${page}: missing ${reference}`);
    if (fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    assert.ok(fs.existsSync(target), `${page}: missing index for ${reference}`);
    if (fragment) assert.ok(fs.readFileSync(target, 'utf8').includes(`id="${fragment}"`), `${page}: broken anchor ${reference}`);
    if (attribute === 'src' && target.endsWith('.png')) assert.ok(fs.statSync(target).size > 0);
    links++;
  }
  for (const [, tag] of html.matchAll(/(<img\b[^>]+>)/g)) {
    assert.ok(/\balt="[^"]*"/.test(tag), `${page}: image missing alt`);
    const src = tag.match(/\bsrc="([^"]+)"/)[1];
    const image = fs.readFileSync(path.resolve(path.dirname(file), src));
    const width = Number(tag.match(/\bwidth="(\d+)"/)[1]);
    const height = Number(tag.match(/\bheight="(\d+)"/)[1]);
    assert.ok(Math.abs(width / height - image.readUInt32BE(16) / image.readUInt32BE(20)) < 0.001, `${page}: incorrect image aspect ratio for ${src}`);
  }
}
assert.ok(fs.existsSync(path.join(root, 'assets/LilitaOne-Regular.ttf')));
assert.ok(fs.existsSync(path.join(root, 'assets/FONT-LICENSE.txt')));
console.log(`${pages.length} pages checked; ${links} local links/assets/anchors resolve; no app download links, scripts, forms, or placeholders.`);
