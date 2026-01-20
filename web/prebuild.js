const fs = require('fs');
const path = require('path');

console.log('Running Prebuild: Copying content...');

const src = path.resolve(__dirname, '../content');
const dest = path.resolve(__dirname, 'content');

try {
    if (fs.existsSync(src)) {
        // Create dest if not exists
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        // Copy recursive
        fs.cpSync(src, dest, { recursive: true });
        console.log(`Successfully copied content from ${src} to ${dest}`);
    } else {
        console.warn(`Warning: Source content directory ${src} not found. Skipping copy.`);
    }
} catch (e) {
    console.error('Prebuild Error:', e);
    // Don't fail build, just log
}
