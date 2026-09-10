const fs = require('fs');
const path = require('path');

const clubsPath = path.resolve(process.cwd(), 'lib/clubs-data.ts');
let content = fs.readFileSync(clubsPath, 'utf-8');

const newClubs = [
  {
    id: 'club-oyan-cb',
    name: 'RAC Oyan Community Base',
    rotaryId: '8828601',
    memberCount: 8,
    type: 'Community',
    state: 'Osun',
    city: 'Oyan',
    region: 'South-West',
    meetingVenue: 'Oyan Community Hall, Oyan, Osun State',
    meetingSchedule: 'Every 2nd & 4th Sunday · 4:00 PM',
    president: 'Babalola Covenant Erioluwa',
    presidentAvatar: '/images/presidents/babalola-covenant-erioluwa.jpg',
    presidentPhone: '+234 701 029 9394',
    coordinates: { lat: 7.9015, lng: 4.7672 }
  },
  {
    id: 'club-ikirun-cb',
    name: 'RAC Ikirun Community Base',
    rotaryId: '8828602',
    memberCount: 9,
    type: 'Community',
    state: 'Osun',
    city: 'Ikirun',
    region: 'South-West',
    meetingVenue: 'Akinrun Palace Hall Axis, Ikirun, Osun State',
    meetingSchedule: 'Every 1st & 3rd Sunday · 4:00 PM',
    president: 'Oladimeji Rainat Ifeoluwa',
    presidentAvatar: '/images/presidents/oladimeji-rainat-ifeoluwa.jpg',
    presidentPhone: '+234 903 954 5460',
    coordinates: { lat: 7.9135, lng: 4.6734 }
  },
  {
    id: 'club-ilorin-fate',
    name: 'RAC Ilorin Fate Neighbourhood',
    rotaryId: '8828603',
    memberCount: 12,
    type: 'Community',
    state: 'Kwara',
    city: 'Ilorin',
    region: 'North-Central',
    meetingVenue: 'Fate Road Community Center, GRA / Fate Axis, Ilorin',
    meetingSchedule: 'Every 2nd & 4th Saturday · 4:00 PM',
    president: 'Rtr Babaatoti Hafsah Oyinkansola',
    presidentAvatar: '/images/presidents/babaatoti-hafsah-oyinkansola.jpg',
    presidentPhone: '+234 814 008 5063',
    coordinates: { lat: 8.4892, lng: 4.5681 }
  },
  {
    id: 'club-fuoye',
    name: 'RAC Federal University Oye-Ekiti (FUOYE)',
    rotaryId: '8828604',
    memberCount: 15,
    type: 'Campus',
    state: 'Ekiti',
    city: 'Oye-Ekiti',
    region: 'South-West',
    meetingVenue: 'Faculty of Science Lecture Theatre, FUOYE Campus, Oye-Ekiti',
    meetingSchedule: 'Every Wednesday · 4:00 PM',
    president: 'Daud Yusuf Aremu',
    presidentAvatar: '/images/presidents/daud-yusuf-aremu.jpg',
    presidentPhone: '+234 808 548 0393',
    coordinates: { lat: 7.7983, lng: 5.3289 }
  },
  {
    id: 'club-adecom-college',
    name: 'RAC Adecom College of Business and Management',
    rotaryId: '8828605',
    memberCount: 10,
    type: 'Campus',
    state: 'Oyo',
    city: 'Ibadan',
    region: 'South-West',
    meetingVenue: 'Adecom College Campus Hall, Ibadan',
    meetingSchedule: 'Every Thursday · 4:00 PM',
    president: 'Oyetola Ibrahim Micheal',
    presidentAvatar: '/images/presidents/oyetola-ibrahim-micheal.jpg',
    presidentPhone: '+234 706 668 7414',
    coordinates: { lat: 7.3912, lng: 3.8821 }
  },
  {
    id: 'club-afued',
    name: 'RAC Adeyemi Federal University of Education (AFUED)',
    rotaryId: '8828606',
    memberCount: 14,
    type: 'Campus',
    state: 'Ondo',
    city: 'Ondo City',
    region: 'South-West',
    meetingVenue: 'AFUED Campus SUB Hall, Ondo City',
    meetingSchedule: 'Every Tuesday · 4:30 PM',
    president: 'Rtr. Mustapha Abdullahi Olalekan',
    presidentAvatar: '/images/presidents/mustapha-abdullahi-olalekan.jpg',
    presidentPhone: '+234 814 570 4739',
    coordinates: { lat: 7.0921, lng: 4.8344 }
  }
];

// Append new clubs before closing brackets
const appendIndex = content.lastIndexOf('];');
if (appendIndex !== -1) {
  const newClubsCode = newClubs.map(c => `  {
    id: '${c.id}',
    name: '${c.name}',
    rotaryId: '${c.rotaryId}',
    memberCount: ${c.memberCount},
    type: '${c.type}',
    state: '${c.state}',
    city: '${c.city}',
    region: '${c.region}',
    meetingVenue: '${c.meetingVenue}',
    meetingSchedule: '${c.meetingSchedule}',
    president: '${c.president}',
    presidentAvatar: '${c.presidentAvatar}',
    presidentPhone: '${c.presidentPhone}',
    coordinates: { lat: ${c.coordinates.lat}, lng: ${c.coordinates.lng} },
  },`).join('\n');

  content = content.slice(0, appendIndex) + newClubsCode + '\n' + content.slice(appendIndex);
  fs.writeFileSync(clubsPath, content, 'utf-8');
  console.log('✅ Added all newly registered clubs to clubs-data.ts!');
}
