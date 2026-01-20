const path = require('path');
const fs = require('fs');

console.log('CWD:', process.cwd());
const contentDir = path.resolve(process.cwd(), '../content');
console.log('Content Dir:', contentDir);

const testFile = path.join(contentDir, 'VS_Collaboration', 'Requirements.md');
console.log('Test File:', testFile);

if (fs.existsSync(testFile)) {
    console.log('File EXISTS!');
} else {
    console.log('File NOT FOUND');
}
