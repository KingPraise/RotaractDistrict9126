const fs = require('fs');
const path = require('path');

const clubsPath = path.resolve(process.cwd(), 'lib/clubs-data.ts');
let content = fs.readFileSync(clubsPath, 'utf-8');

const updates = [
  {
    targetMatch: /id:\s*'club-eclub-mighty'[\s\S]*?president:\s*'.*?'/,
    slug: 'david-t-akinloye',
    name: 'David T Akinloye',
    phone: '+234 814 228 8064'
  },
  {
    targetMatch: /id:\s*'club-atiba-university'[\s\S]*?president:\s*'.*?'/,
    slug: 'adedeji-anjolaoluwa-joy',
    name: 'Adedeji Anjolaoluwa Joy',
    phone: '+234 810 567 5063'
  },
  {
    targetMatch: /id:\s*'club-espahms-ijero'[\s\S]*?president:\s*'.*?'/,
    slug: 'anifat-aramide-hassan',
    name: 'Anifat Aramide Hassan',
    phone: '+234 810 973 9386'
  },
  {
    targetMatch: /id:\s*'club-oyan-cb'[\s\S]*?president:\s*'.*?'/,
    slug: 'babalola-covenant-erioluwa',
    name: 'Babalola Covenant Erioluwa',
    phone: '+234 701 029 9394'
  },
  {
    targetMatch: /id:\s*'club-tech-u-ibadan'[\s\S]*?president:\s*'.*?'/,
    slug: 'ogunrinola-esther-oyinlola',
    name: 'Ogunrinola Esther Oyinlola',
    phone: '+234 703 620 9128'
  },
  {
    targetMatch: /id:\s*'club-ikirun-cb'[\s\S]*?president:\s*'.*?'/,
    slug: 'oladimeji-rainat-ifeoluwa',
    name: 'Oladimeji Rainat Ifeoluwa',
    phone: '+234 903 954 5460'
  },
  {
    targetMatch: /id:\s*'club-idah-cb'[\s\S]*?president:\s*'.*?'/,
    slug: 'attahiru-suleman',
    name: 'Rtr. Attahiru Suleman',
    phone: '+234 807 044 0880'
  },
  {
    targetMatch: /id:\s*'club-ilorin-fate'[\s\S]*?president:\s*'.*?'/,
    slug: 'babaatoti-hafsah-oyinkansola',
    name: 'Rtr Babaatoti Hafsah Oyinkansola',
    phone: '+234 814 008 5063'
  },
  {
    targetMatch: /id:\s*'club-ilorin-gra'[\s\S]*?president:\s*'.*?'/,
    slug: 'adebiyi-ahmed-olasunkanmi',
    name: 'Adebiyi Ahmed Olasunkanmi',
    phone: '+234 803 809 9810'
  },
  {
    targetMatch: /id:\s*'club-eclub-ng-new-dawn'[\s\S]*?president:\s*'.*?'/,
    slug: 'odedoyin-ebenezer-feranmi',
    name: 'Odedoyin Ebenezer Feranmi',
    phone: '+234 701 772 8278'
  },
  {
    targetMatch: /id:\s*'club-harvard-poly'[\s\S]*?president:\s*'.*?'/,
    slug: 'olalekan-raodat-olamide',
    name: 'Olalekan Raodat Olamide',
    phone: '+234 915 569 7847'
  },
  {
    targetMatch: /id:\s*'club-fuoye'[\s\S]*?president:\s*'.*?'/,
    slug: 'daud-yusuf-aremu',
    name: 'Daud Yusuf Aremu',
    phone: '+234 808 548 0393'
  },
  {
    targetMatch: /id:\s*'club-adecom-college'[\s\S]*?president:\s*'.*?'/,
    slug: 'oyetola-ibrahim-micheal',
    name: 'Oyetola Ibrahim Micheal',
    phone: '+234 706 668 7414'
  },
  {
    targetMatch: /id:\s*'club-eclub-one-nigeria'[\s\S]*?president:\s*'.*?'/,
    slug: 'akinlolu-elizabeth',
    name: 'Akinlolu Elizabeth',
    phone: '+234 706 765 8239'
  },
  {
    targetMatch: /id:\s*'club-uniosun-osogbo'[\s\S]*?president:\s*'.*?'/,
    slug: 'ote-joshua-adoga',
    name: 'Ote Joshua Adoga',
    phone: '+234 915 455 3008'
  },
  {
    targetMatch: /id:\s*'club-fca-ibadan'[\s\S]*?president:\s*'.*?'/,
    slug: 'adebusoye-opeyemi-favour',
    name: 'Adebusoye Opeyemi Favour',
    phone: '+234 810 166 8447'
  },
  {
    targetMatch: /id:\s*'club-afued'[\s\S]*?president:\s*'.*?'/,
    slug: 'mustapha-abdullahi-olalekan',
    name: 'Rtr. Mustapha Abdullahi Olalekan',
    phone: '+234 814 570 4739'
  },
  {
    targetMatch: /id:\s*'club-fed-poly-ede'[\s\S]*?president:\s*'.*?'/,
    slug: 'owolabi-inioluwa-racheal',
    name: 'Owolabi Inioluwa Racheal',
    phone: '+234 815 444 3831'
  }
];

let applied = 0;
for (const u of updates) {
  if (u.targetMatch.test(content)) {
    content = content.replace(u.targetMatch, (match) => {
      return match.replace(
        /president:\s*'.*?'/,
        `president: '${u.name}',\n    presidentAvatar: '/images/presidents/${u.slug}.jpg',\n    presidentPhone: '${u.phone}'`
      );
    });
    applied++;
    console.log(`✅ Applied update for: ${u.name}`);
  } else {
    console.warn(`⚠️ Target match not found for: ${u.name}`);
  }
}

fs.writeFileSync(clubsPath, content, 'utf-8');
console.log(`🎉 Successfully updated clubs-data.ts with ${applied} of ${updates.length} presidents!`);
