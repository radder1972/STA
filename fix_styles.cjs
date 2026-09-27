const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

function walkDir(d) {
    let results = [];
    const list = fs.readdirSync(d);
    list.forEach(file => {
        file = path.join(d, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walkDir(dir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Font sizes
    content = content.replace(/fontSize:\s*['"]0\.85rem['"]/g, "fontSize: '1rem'");
    content = content.replace(/fontSize:\s*['"]0\.9rem['"]/g, "fontSize: '1rem'");
    content = content.replace(/fontSize:\s*['"]0\.95rem['"]/g, "fontSize: '1rem'");
    
    // Line heights
    content = content.replace(/lineHeight:\s*['"]1\.4['"]/g, "lineHeight: '1.6'");
    content = content.replace(/lineHeight:\s*['"]1\.5['"]/g, "lineHeight: '1.6'");
    content = content.replace(/lineHeight:\s*['"]1\.7['"]/g, "lineHeight: '1.6'");
    // Also cover plain numbers like lineHeight: 1.5
    content = content.replace(/lineHeight:\s*1\.4/g, "lineHeight: 1.6");
    content = content.replace(/lineHeight:\s*1\.5/g, "lineHeight: 1.6");
    content = content.replace(/lineHeight:\s*1\.7/g, "lineHeight: 1.6");

    // Colors
    content = content.replace(/color:\s*['"]var\(--text-muted\)['"]/g, "color: 'var(--text-main)'");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated ' + path.basename(file));
    }
});
