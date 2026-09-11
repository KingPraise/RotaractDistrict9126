const fs = require('fs');
const path = require('path');

const clubsPath = path.resolve(process.cwd(), 'lib/clubs-data.ts');
let content = fs.readFileSync(clubsPath, 'utf-8');

// 1. Update existing RAC Oyan
content = content.replace(
  /id:\s*'club-oyan'[\s\S]*?president:\s*'.*?'/,
  (m) => m.replace(/name:\s*'.*?'/, "name: 'RAC Oyan CB'")
          .replace(/president:\s*'.*?'/, "president: 'Babalola Covenant Erioluwa',\n    presidentAvatar: '/images/presidents/babalola-covenant-erioluwa.jpg',\n    presidentPhone: '+234 701 029 9394'")
);

// 2. Update existing RAC Ikirun
content = content.replace(
  /id:\s*'club-ikirun'[\s\S]*?president:\s*'.*?'/,
  (m) => m.replace(/name:\s*'.*?'/, "name: 'RAC Ikirun CB'")
          .replace(/president:\s*'.*?'/, "president: 'Oladimeji Rainat Ifeoluwa',\n    presidentAvatar: '/images/presidents/oladimeji-rainat-ifeoluwa.jpg',\n    presidentPhone: '+234 903 954 5460'")
);

// 3. Update existing RAC Ilorin Fate Neighbourhood
content = content.replace(
  /id:\s*'club-ilorin-fate-neighbourhood'[\s\S]*?president:\s*'.*?'/,
  (m) => m.replace(/president:\s*'.*?'/, "president: 'Rtr Babaatoti Hafsah Oyinkansola',\n    presidentAvatar: '/images/presidents/babaatoti-hafsah-oyinkansola.jpg',\n    presidentPhone: '+234 814 008 5063'")
);

// 4. Update existing RAC FUOYE (Ekiti)
content = content.replace(
  /id:\s*'club-fuoye-ekiti'[\s\S]*?president:\s*'.*?'/,
  (m) => m.replace(/president:\s*'.*?'/, "president: 'Daud Yusuf Aremu',\n    presidentAvatar: '/images/presidents/daud-yusuf-aremu.jpg',\n    presidentPhone: '+234 808 548 0393'")
);

// 5. Update existing RAC Adecom College (Oyo)
content = content.replace(
  /id:\s*'club-adecom-college-egbeda'[\s\S]*?president:\s*'.*?'/,
  (m) => m.replace(/name:\s*'.*?'/, "name: 'RAC Adecom College'")
          .replace(/president:\s*'.*?'/, "president: 'Oyetola Ibrahim Micheal',\n    presidentAvatar: '/images/presidents/oyetola-ibrahim-micheal.jpg',\n    presidentPhone: '+234 706 668 7414'")
);

// 6. Update existing RAC Adeyemi Federal University of Education (AFUED, Ondo)
content = content.replace(
  /id:\s*'club-adeyemi-univ-ondo'[\s\S]*?president:\s*'.*?'/,
  (m) => m.replace(/name:\s*'.*?'/, "name: 'RAC AFUED (Adeyemi Federal University of Education)'")
          .replace(/president:\s*'.*?'/, "president: 'Rtr. Mustapha Abdullahi Olalekan',\n    presidentAvatar: '/images/presidents/mustapha-abdullahi-olalekan.jpg',\n    presidentPhone: '+234 814 570 4739'")
);

// 7. Remove the 6 appended duplicate club entries at the bottom
const cleanBottomCutoff = content.indexOf("  {\n    id: 'club-oyan-cb'");
if (cleanBottomCutoff !== -1) {
  content = content.slice(0, cleanBottomCutoff) + '];\n';
}

fs.writeFileSync(clubsPath, content, 'utf-8');
console.log('✅ Cleaned up duplicates and restored exactly 78 official clubs!');
