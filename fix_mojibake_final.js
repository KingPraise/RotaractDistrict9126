const fs = require('fs');

function cleanFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Clean up botched characters
    content = content.replace(/-/g, '-');
    content = content.replace(/•/g, '•');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', filePath);
    }
}

cleanFile('app/about/page.tsx');
cleanFile('app/projects/[id]/page.tsx');
cleanFile('app/projects/page.tsx');
cleanFile('components/sections/ImpactSection.tsx');
cleanFile('components/ui/AwwwardsPreloader.tsx');
cleanFile('app/layout.tsx');
