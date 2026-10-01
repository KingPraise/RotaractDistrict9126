const fs = require('fs');

let dashboardServicePath = 'lib/services/dashboard-service.ts';
let dashboardContent = fs.readFileSync(dashboardServicePath, 'utf8');

// Update function signature
dashboardContent = dashboardContent.replace(
    'export async function getMemberDashboardData(userId: string): Promise<MemberDashboardState>',
    'export async function getMemberDashboardData(userId: string, localAuthUser?: any): Promise<MemberDashboardState>'
);

// Replace fallback variables
dashboardContent = dashboardContent.replace(
    "const firstName = userData?.firstName || 'Tunde';",
    "const firstName = userData?.firstName || localAuthUser?.firstName || 'Tunde';"
);
dashboardContent = dashboardContent.replace(
    "const lastName = userData?.lastName || 'Adeyemi';",
    "const lastName = userData?.lastName || localAuthUser?.lastName || 'Adeyemi';"
);
dashboardContent = dashboardContent.replace(
    "const email = userData?.email || 'tunde.adeyemi@rotaractdistrict9126.com.ng';",
    "const email = userData?.email || localAuthUser?.email || 'tunde.adeyemi@rotaractdistrict9126.com.ng';"
);
dashboardContent = dashboardContent.replace(
    "const role = userData?.role || 'member';",
    "const role = userData?.role || localAuthUser?.role || 'member';"
);

// Replace catch block fallbacks
dashboardContent = dashboardContent.replace(
    "firstName: 'Tunde',",
    "firstName: localAuthUser?.firstName || 'Tunde',"
);
dashboardContent = dashboardContent.replace(
    "lastName: 'Adeyemi',",
    "lastName: localAuthUser?.lastName || 'Adeyemi',"
);
dashboardContent = dashboardContent.replace(
    "email: 'tunde.adeyemi@rotaractdistrict9126.com.ng',",
    "email: localAuthUser?.email || 'tunde.adeyemi@rotaractdistrict9126.com.ng',"
);
dashboardContent = dashboardContent.replace(
    "role: 'member',",
    "role: localAuthUser?.role || 'member',"
);

fs.writeFileSync(dashboardServicePath, dashboardContent, 'utf8');
console.log('Updated dashboard-service.ts');

let pagePath = 'app/portal/dashboard/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Update function call
pageContent = pageContent.replace(
    'getMemberDashboardData(targetUid).then((data) => {',
    'getMemberDashboardData(targetUid, authUser).then((data) => {'
);

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Updated app/portal/dashboard/page.tsx');

