const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const { from, to } of replacements) {
        content = content.replace(from, to);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', filePath);
    }
}

// 77 -> 78 specifically
replaceInFile('app/layout.tsx', [{ from: /77 chartered clubs/g, to: '78 chartered clubs' }]);
replaceInFile('app/about/page.tsx', [{ from: /77 chartered clubs/g, to: '78 chartered clubs' }]);
replaceInFile('app/blog/layout.tsx', [{ from: /77 clubs across/g, to: '78 clubs across' }]);
replaceInFile('app/clubs/layout.tsx', [{ from: /77 Chartered Clubs/g, to: '78 Chartered Clubs' }]);
replaceInFile('app/projects/page.tsx', [{ from: />77</g, to: '>78<' }]);
replaceInFile('components/sections/DistrictGovernorSection.tsx', [{ from: /77 Clubs/g, to: '78 Clubs' }]);
replaceInFile('components/sections/HeroSection.tsx', [{ from: /end=\{77\}/g, to: 'end={78}' }]);
replaceInFile('components/sections/InteractiveTimelineStack.tsx', [{ from: /77 Clubs/g, to: '78 Clubs' }]);
replaceInFile('components/sections/WhoWeAreSection.tsx', [{ from: /77 chartered/g, to: '78 chartered' }]);
replaceInFile('components/seo/JsonLd.tsx', [{ from: /77 chartered/g, to: '78 chartered' }]);
replaceInFile('components/ui/AwwwardsPreloader.tsx', [{ from: /77 Chartered/g, to: '78 Chartered' }]);
replaceInFile('components/ui/GlobalSearch.tsx', [{ from: /77 chartered/g, to: '78 chartered' }]);
replaceInFile('components/ui/RotaryTooltip.tsx', [{ from: /77 chartered/g, to: '78 chartered' }]);

// And "47 Clubs" -> "78 Clubs" ? Wait, user quoted "47 Clubs" - it might be 47 or 77 somewhere.
// Let's replace '47 Clubs' to '78 Clubs' across codebase.
// And encoding artifacts: "â€”" to "—" and "Â·" to "·" (or just replace the literal messed up chars).

const walkSync = function(dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
                filelist = walkSync(path.join(dir, file), filelist);
            }
        }
        else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                filelist.push(path.join(dir, file));
            }
        }
    });
    return filelist;
};

const allFiles = walkSync('.');
allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace encoding artifacts
    content = content.replace(/â€”/g, '—');
    content = content.replace(/Ã¢â‚¬â€/g, '—');
    content = content.replace(/Â·/g, '·');
    content = content.replace(/47 Clubs/g, '78 Clubs'); // User's screenshot shows 47 Clubs

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed artifacts in', file);
    }
});
