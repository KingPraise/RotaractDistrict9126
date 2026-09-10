const fs = require('fs');
const path = require('path');

const PRESIDENTS_DIR = path.resolve(process.cwd(), 'public/images/presidents');

if (!fs.existsSync(PRESIDENTS_DIR)) {
  fs.mkdirSync(PRESIDENTS_DIR, { recursive: true });
}

const PRESIDENTS_LIST = [
  {
    slug: 'david-t-akinloye',
    name: 'David T Akinloye',
    club: 'Rotaract E-Club Mighty',
    phone: '08142288064',
    driveId: '1f-aPH6ZMy50QIbLJXyPWmrOQAM7bJis9'
  },
  {
    slug: 'adedeji-anjolaoluwa-joy',
    name: 'ADEDEJI ANJOLAOLUWA JOY',
    club: 'Rotaract club of Atiba University',
    phone: '08105675063',
    driveId: '14szbVVR_ALLFKH-TYbeuBJ7C4T0WTVZN'
  },
  {
    slug: 'anifat-aramide-hassan',
    name: 'Anifat Aramide Hassan',
    club: 'Rotaract club of espahms ijero ekiti',
    phone: '08109739386',
    driveId: '1VGps50zhHtAlVJt8f4J-BdGG61pbSCrD'
  },
  {
    slug: 'babalola-covenant-erioluwa',
    name: 'Babalola Covenant Erioluwa',
    club: 'Rac Oyan cb',
    phone: '07010299394',
    driveId: '1Dw9T7W2nLM-5XnygRsBpHqHB2B7edi6r'
  },
  {
    slug: 'ogunrinola-esther-oyinlola',
    name: 'Ogunrinola Esther Oyinlola',
    club: 'Rotaract club of First Technical University',
    phone: '07036209128',
    driveId: '1njVEpeYUvCRzYydDoq_LKSJs4mzlK3eP'
  },
  {
    slug: 'oladimeji-rainat-ifeoluwa',
    name: 'Oladimeji Rainat Ifeoluwa',
    club: 'Rotaract Club of Ikirun CB',
    phone: '09039545460',
    driveId: '11SLPAtxvwsuTWiRpX-vTaB8891HEP7t5'
  },
  {
    slug: 'arowosola-muminat-olaitan',
    name: 'Arowosola Muminat olaitan',
    club: 'Rotaract club of first technical university',
    phone: '09153000506',
    driveId: '11gd2pXEGefjMooxAysrKrd8MPavS7m_-'
  },
  {
    slug: 'attahiru-suleman',
    name: 'Rtr. Attahiru Suleman',
    club: 'Rotaract Club of Idah Community Base',
    phone: '08070440880',
    driveId: '1WSbUbK0uBmgm7RyLuE69cMU6AvhR3RyL'
  },
  {
    slug: 'babaatoti-hafsah-oyinkansola',
    name: 'Rtr Babaatoti Hafsah Oyinkansola',
    club: 'Rotaract club of Ilorin fate Neighbourhood',
    phone: '08140085063',
    driveId: '1I8_yw8Ok6MAuY0b3iF2SZMzhrTF0OziS'
  },
  {
    slug: 'adebiyi-ahmed-olasunkanmi',
    name: 'Adebiyi Ahmed Olasunkanmi',
    club: 'RAC ILORIN GRA',
    phone: '08038099810',
    driveId: '17sMdl_hKyJKx55YtZKif7ddlPIT-tEEC'
  },
  {
    slug: 'odedoyin-ebenezer-feranmi',
    name: 'ODEDOYIN EBENEZER FERANMI',
    club: 'ROTARACT E-CLUB OF NIGERIA NEW DAWN',
    phone: '07017728278',
    driveId: '1RG0n840ttjizWj9Zcq8RlmdqlJ2pK8ce'
  },
  {
    slug: 'olalekan-raodat-olamide',
    name: 'Olalekan Raodat Olamide',
    club: 'Rotaract Club of harvard Polytechnic',
    phone: '09155697847',
    driveId: '1aLCkdRBNZbnf6lyXS0DClM1FGNr4K9j-'
  },
  {
    slug: 'daud-yusuf-aremu',
    name: 'Daud Yusuf Aremu',
    club: 'Rotaract club of Federal University Oye-Ekiti',
    phone: '08085480393',
    driveId: '1DDHQ02rd2_EFA8pI4_2swe_WoUjt-SKO'
  },
  {
    slug: 'oyetola-ibrahim-micheal',
    name: 'Oyetola Ibrahim Micheal',
    club: 'RAC ADECOM COLLEGE',
    phone: '07066687414',
    driveId: '1H-RhWDBPgtDVsHtS5eFoxWyVTOffeu6Q'
  },
  {
    slug: 'akinlolu-elizabeth',
    name: 'Akinlolu Elizabeth',
    club: 'E-Club of One Nigeria',
    phone: '+2347067658239',
    driveId: '1P_InnMsYzbBD6w_rn_GWn-S_RRekFaI-'
  },
  {
    slug: 'ote-joshua-adoga',
    name: 'Ote Joshua Adoga',
    club: 'Rotaract Club of Osun State University Osogbo Campus',
    phone: '09154553008',
    driveId: '1Iq_XW6ualN-TwyZKGsmC51b4HL7rX_tM'
  },
  {
    slug: 'adebusoye-opeyemi-favour',
    name: 'Adebusoye Opeyemi Favour',
    club: 'Rotaract club of federal college of agriculture Ibadan moor plantation',
    phone: '08101668447',
    driveId: '1LTYmKrkj6hI9tNYSSP1mdpkrdJ5qz5ho'
  },
  {
    slug: 'mustapha-abdullahi-olalekan',
    name: 'Rtr. Mustapha Abdullahi olalekan',
    club: 'Rac Afued',
    phone: '08145704739',
    driveId: '1__5ti2y3HlslU8GYb5nWTwopwMtP4Wel'
  },
  {
    slug: 'owolabi-inioluwa-racheal',
    name: 'Owolabi Inioluwa Racheal',
    club: 'Rotaract club of Federal Polytechnic Ede',
    phone: '08154443831',
    driveId: '1CJPVl0cQ_hwS0PhoDMN1OycDccmhUE2C'
  }
];

async function downloadPresidents() {
  console.log(`Starting download of ${PRESIDENTS_LIST.length} club president portraits...`);
  
  for (const pres of PRESIDENTS_LIST) {
    const destPath = path.join(PRESIDENTS_DIR, `${pres.slug}.jpg`);
    const url = `https://drive.google.com/uc?export=download&id=${pres.driveId}`;
    
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`❌ Failed to download ${pres.name} (${pres.driveId}): Status ${res.status}`);
        continue;
      }
      
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      console.log(`✅ Downloaded: ${pres.name} -> /images/presidents/${pres.slug}.jpg (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`❌ Error downloading ${pres.name}:`, err.message);
    }
  }

  console.log('🎉 All president portraits processed!');
}

downloadPresidents();
