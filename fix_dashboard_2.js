const fs = require('fs');

let dashboardServicePath = 'lib/services/dashboard-service.ts';
let dashboardContent = fs.readFileSync(dashboardServicePath, 'utf8');

dashboardContent = dashboardContent.replace(
    "const duesStatus: DuesStatus = userData?.duesStatus === 'cleared' ? 'cleared' : 'pending';",
    "const duesStatus: DuesStatus = userData?.duesStatus === 'cleared' || localAuthUser?.duesStatus === 'cleared' ? 'cleared' : 'pending';"
);

fs.writeFileSync(dashboardServicePath, dashboardContent, 'utf8');
console.log('Updated dashboard-service.ts again');
