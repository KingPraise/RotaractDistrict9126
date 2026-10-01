const fs = require('fs');
let content = fs.readFileSync('components/ui/AwwwardsPreloader.tsx', 'utf8');
content = content.replace(/subtitle: 'Oyo .* Niger'/g, "subtitle: 'Oyo \u2022 Osun \u2022 Ondo \u2022 Ekiti \u2022 Kwara \u2022 Kogi \u2022 Niger'");
fs.writeFileSync('components/ui/AwwwardsPreloader.tsx', content, 'utf8');

// I also used PowerShell Set-Content for fix_hardcoded.js without -Encoding UTF8, so I might have corrupted those as well! Let's fix them with \u2022 and \u2014.
function fix(file, replacements) {
    let content = fs.readFileSync(file, 'utf8');
    for (const { from, to } of replacements) {
        content = content.replace(from, to);
    }
    fs.writeFileSync(file, content, 'utf8');
}

fix('components/sections/ImpactSection.tsx', [
    { from: /Health Outreach .* Oyo State/, to: 'Health Outreach \u2022 Oyo State' },
    { from: /Digital Skills Academy .* Ibadan/, to: 'Digital Skills Academy \u2022 Ibadan' },
    { from: /Ondo .* Ekiti .* Osun .* Oyo .* Kogi .* Niger .* Kwara/, to: 'Ondo \u2022 Ekiti \u2022 Osun \u2022 Oyo \u2022 Kogi \u2022 Niger \u2022 Kwara' },
    { from: /Real moments from across District 9126 .* seven states/, to: 'Real moments from across District 9126 \u2014 seven states' }
]);

fix('app/about/page.tsx', [
    { from: /3rd DRR .* Sitting Administration/, to: '3rd DRR \u2022 Sitting Administration' },
    { from: /One Shared Vision .* Uniting 78/, to: 'One Shared Vision \u2014 Uniting 78' }
]);

fix('app/projects/[id]/page.tsx', [
    { from: /1\. Is it the TRUTH\? .* 2\. Is it FAIR to all concerned\? .* 3\. Will it build GOODWILL and BETTER FRIENDSHIPS\? .* 4\. Will it be BENEFICIAL to all concerned\?/, to: '1. Is it the TRUTH? \u2022 2. Is it FAIR to all concerned? \u2022 3. Will it build GOODWILL and BETTER FRIENDSHIPS? \u2022 4. Will it be BENEFICIAL to all concerned?' }
]);

fix('app/projects/page.tsx', [
    { from: /legacy of District 9126 .* from boreholes/, to: 'legacy of District 9126 \u2014 from boreholes' }
]);
