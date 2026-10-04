const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync('dist/index.html','utf8');
new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
for(const m of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(m[1]))throw Error('Missing target '+m[1]);
if(new Set(ids).size!==ids.length)throw Error('Duplicate ID');
console.log('JavaScript syntax, section links and unique IDs verified.');
