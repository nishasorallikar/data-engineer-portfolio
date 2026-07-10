import fs from 'fs';
import path from 'path';

const walk = (dir, callback) => {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath, callback);
        } else if (filepath.endsWith('.jsx') || filepath.endsWith('.js')) {
            callback(filepath);
        }
    });
};

const replacements = [
    { regex: /purple-500/g, replacement: 'blue-500' },
    { regex: /purple-600/g, replacement: 'blue-600' },
    { regex: /purple-400/g, replacement: 'blue-400' },
    { regex: /yellow-400/g, replacement: 'sky-400' },
    { regex: /yellow-200/g, replacement: 'slate-100' },
    { regex: /yellow-500/g, replacement: 'emerald-500' },
    { regex: /#8b5cf6/g, replacement: '#3b82f6' }, // purple -> blue
    { regex: /#fde047/g, replacement: '#38bdf8' }, // yellow -> sky
    { regex: /#0f0a1a/g, replacement: '#16161d' }, // specific dark bg to lighter obsidian
    { regex: /#160f24/g, replacement: '#1c1c24' }, // input bg
];

walk('./src', (filepath) => {
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;
    
    replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
    });

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated ${filepath}`);
    }
});
