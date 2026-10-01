const fs = require('fs');

function cleanFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const { from, to } of replacements) {
        content = content.replace(from, to);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed', filePath);
    }
}

cleanFile('components/sections/ImpactSection.tsx', [
    { from: /Health Outreach .* Oyo State/, to: 'Health Outreach • Oyo State' },
    { from: /Digital Skills Academy .* Ibadan/, to: 'Digital Skills Academy • Ibadan' },
    { from: /Ondo .* Ekiti .* Osun .* Oyo .* Kogi .* Niger .* Kwara/, to: 'Ondo • Ekiti • Osun • Oyo • Kogi • Niger • Kwara' },
    { from: /Real moments from across District 9126 .* seven states/, to: 'Real moments from across District 9126 — seven states' }
]);

cleanFile('components/ui/AwwwardsPreloader.tsx', [
    { from: /Oyo .* Osun .* Ondo .* Ekiti .* Kwara .* Kogi .* Niger/, to: 'Oyo • Osun • Ondo • Ekiti • Kwara • Kogi • Niger' }
]);

cleanFile('app/about/page.tsx', [
    { from: /3rd DRR .* Sitting Administration/, to: '3rd DRR • Sitting Administration' },
    { from: /One Shared Vision .* Uniting 78/, to: 'One Shared Vision — Uniting 78' }
]);

cleanFile('app/projects/[id]/page.tsx', [
    { from: /1\. Is it the TRUTH\? .* 2\. Is it FAIR to all concerned\? .* 3\. Will it build GOODWILL and BETTER FRIENDSHIPS\? .* 4\. Will it be BENEFICIAL to all concerned\?/, to: '1. Is it the TRUTH? • 2. Is it FAIR to all concerned? • 3. Will it build GOODWILL and BETTER FRIENDSHIPS? • 4. Will it be BENEFICIAL to all concerned?' }
]);

cleanFile('app/projects/page.tsx', [
    { from: /legacy of District 9126 .* from boreholes/, to: 'legacy of District 9126 — from boreholes' }
]);

