const fs = require('fs');

let content = fs.readFileSync('components/ui/AwwwardsPreloader.tsx', 'utf8');
content = content.replace(/subtitle: 'Oyo .* Niger'/g, "subtitle: 'Oyo • Osun • Ondo • Ekiti • Kwara • Kogi • Niger'");
fs.writeFileSync('components/ui/AwwwardsPreloader.tsx', content, 'utf8');
console.log('Fixed preloader');
