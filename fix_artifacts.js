const fs = require('fs');

const walkSync = function(dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
                filelist = walkSync(dir + '/' + file, filelist);
            }
        }
        else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                filelist.push(dir + '/' + file);
            }
        }
    });
    return filelist;
};

const allFiles = walkSync('.');
allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // ImpactSection & AwwwardsPreloader uses � or similar for bullets
    content = content.replace(/�/g, '�');
    content = content.replace(/Ã‚Â�/g, '�');
    content = content.replace(/Ãƒâ€šÃ‚Â�/g, '�');
    content = content.replace(/ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â�/g, '�');
    content = content.replace(/—/g, '�');
    content = content.replace(/·/g, '�');
    content = content.replace(/â€�/g, '�');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed artifacts in', file);
    }
});
