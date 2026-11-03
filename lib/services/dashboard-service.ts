import { db } from '@/lib/firebase/client';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  setDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { User, DuesStatus } from '@/types';
import {
  getLocalUsers,
  saveLocalUser,
  updateCurrentUserSession,
  getCurrentUser,
  isPlaceholderFirebaseConfig,
} from '@/lib/services/auth-service';

export const DISTRICT_ANNUAL_DUES = 7500;

export interface MemberDashboardState {
  member: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    rotaryId: string;
    riNumber: string;
    clubId: string;
    clubName: string;
    state: string;
    region: string;
    role: string;
    duesStatus: DuesStatus;
    avatarUrl: string;
    occupation: string;
    phoneNumber: string;
  };
  metrics: {
    impactPoints: number;
    eventsAttended: number;
    projectsJoined: number;
    volunteerHours: number;
  };
  monthlyActivity: Array<{
    month: string;
    count: number;
    height: string;
    isCurrent?: boolean;
  }>;
  duesRecords: Array<{
    id: string;
    name: string;
    club: string;
    status: 'Cleared' | 'Pending' | 'Defaulted';
    period: string;
    amount?: number;
    avatar: string;
    date?: string;
  }>;
}

export interface ClubMemberRecord extends User {
  memberType?: 'Active' | 'Alumni';
  attendance?: number;
  clearedDate?: string;
  lastActive?: string;
  verificationStatus?: 'Pending' | 'Verified' | 'Flagged' | 'Rejected';
}

export interface StoredDuesPayment {
  id: string;
  memberId: string;
  name: string;
  email?: string;
  club: string;
  status: 'Cleared' | 'Pending' | 'Defaulted';
  period: string;
  amount: number;
  date: string;
  category: 'Annual Dues' | 'Project Levy' | 'Induction Fee' | 'Donation';
  avatar: string;
}

const LOCAL_DUES_PAYMENTS_KEY = 'district_9126_dues_payments';
const LOCAL_ROSTER_KEY = 'district_9126_club_roster';

const DEFAULT_MONTHLY_DATA = [
  { month: 'Nov', count: 2, height: '18px' },
  { month: 'Dec', count: 3, height: '28px' },
  { month: 'Jan', count: 4, height: '37px' },
  { month: 'Feb', count: 3, height: '28px' },
  { month: 'Mar', count: 5, height: '46px' },
  { month: 'Apr', count: 4, height: '37px' },
  { month: 'May', count: 6, height: '55px' },
  { month: 'Jun', count: 5, height: '46px' },
  { month: 'Jul', count: 12, height: '110px', isCurrent: true },
];

function getLocalDuesPayments(): StoredDuesPayment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_DUES_PAYMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalDuesPayments(payments: StoredDuesPayment[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_DUES_PAYMENTS_KEY, JSON.stringify(payments));
  } catch {
    // Ignore storage error
  }
}

function getLocalRosterRecords(): ClubMemberRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_ROSTER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalRosterRecords(records: ClubMemberRecord[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_ROSTER_KEY, JSON.stringify(records));
  } catch {
    // Ignore storage error
  }
}

/**
 * 1. Fetch comprehensive Member Dashboard Data for UI rendering
 */
export async function getMemberDashboardData(
  userId: string,
  localAuthUser?: any
): Promise<MemberDashboardState> {
  try {
    let userData: any = null;

    if (!isPlaceholderFirebaseConfig()) {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          userData = userDoc.data();
        } else {
          const authUserDoc = await getDoc(doc(db, 'auth_users', userId));
          if (authUserDoc.exists()) {
            userData = authUserDoc.data();
          }
        }
      } catch {
        // Fallback to local session
      }
    }

    const firstName =
      userData?.firstName ||
      localAuthUser?.firstName ||
      localAuthUser?.displayName?.split(' ')[0] ||
      '';
    const lastName =
      userData?.lastName ||
      localAuthUser?.lastName ||
      localAuthUser?.displayName?.split(' ').slice(1).join(' ') ||
      '';
    const email = userData?.email || localAuthUser?.email || '';
    const rotaryId =
      userData?.rotaryId ||
      localAuthUser?.rotaryId ||
      (userData?.riNumber ? `RI-${userData.riNumber}` : `ROT-9126-${userId.slice(-4)}`);
    const riNumber = userData?.riNumber || localAuthUser?.riNumber || '';
    const clubId = userData?.clubId || localAuthUser?.clubId || '';
    const role = userData?.role || localAuthUser?.role || 'member';
    const duesStatus: DuesStatus =
      userData?.duesStatus === 'cleared' || localAuthUser?.duesStatus === 'cleared'
        ? 'cleared'
        : 'pending';
    const avatarUrl = userData?.avatarUrl || localAuthUser?.avatarUrl || '';
    const occupation =
      userData?.occupation ||
      localAuthUser?.occupation ||
      (role === 'club_president'
        ? 'Club President'
        : role === 'district_admin'
        ? 'District Administrator'
        : 'Active Member');
    const phoneNumber = userData?.phoneNumber || localAuthUser?.phoneNumber || '';

    let clubName =
      userData?.clubName || localAuthUser?.clubName || 'Rotaract District 9126';
    let state = userData?.state || localAuthUser?.state || 'District 9126';
    let region = userData?.region || localAuthUser?.region || '';

    if (clubId && !isPlaceholderFirebaseConfig()) {
      try {
        const clubDoc = await getDoc(doc(db, 'clubs', clubId));
        if (clubDoc.exists()) {
          const clubData = clubDoc.data();
          clubName = clubData.name || clubName;
          state = clubData.state ? `${clubData.state} State` : state;
          region = clubData.region || region;
        }
      } catch {
        // Use existing clubName
      }
    }

    // Merge local dues payments for this user
    const localPayments = getLocalDuesPayments().filter(
      (p) => p.memberId === userId || (email && p.email?.toLowerCase() === email.toLowerCase())
    );

    let duesRecords: MemberDashboardState['duesRecords'] = [];

    if (!isPlaceholderFirebaseConfig()) {
      try {
        const duesQuery = query(collection(db, 'dues_payments'), where('memberId', '==', userId));
        const duesSnapshot = await getDocs(duesQuery);

        if (!duesSnapshot.empty) {
          duesRecords = duesSnapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              name: `${firstName} ${lastName}`.trim(),
              club: clubName,
              status: (
                data.status === 'cleared' || data.status === 'Cleared'
                  ? 'Cleared'
                  : data.status === 'defaulted'
                  ? 'Defaulted'
                  : 'Pending'
              ) as 'Cleared' | 'Pending' | 'Defaulted',
              period: data.period || '2026/2027',
              amount: data.amount || DISTRICT_ANNUAL_DUES,
              avatar: avatarUrl,
            };
          });
        }
      } catch {
        // Use local payments
      }
    }

    if (localPayments.length > 0) {
      const existingIds = new Set(duesRecords.map((r) => r.id));
      localPayments.forEach((lp) => {
        if (!existingIds.has(lp.id)) {
          duesRecords.unshift({
            id: lp.id,
            name: lp.name,
            club: lp.club,
            status: lp.status,
            period: lp.period,
            amount: lp.amount,
            avatar: lp.avatar,
            date: lp.date,
          });
        }
      });
    } else if (duesRecords.length === 0 && firstName) {
      duesRecords = [
        {
          id: `PAY-D9126-${rotaryId.replace(/[^0-9]/g, '').slice(-3) || '001'}`,
          name: `${firstName} ${lastName}`.trim(),
          club: clubName,
          status: duesStatus === 'cleared' ? 'Cleared' : 'Pending',
          period: '2026/2027',
          amount: DISTRICT_ANNUAL_DUES,
          avatar: avatarUrl,
        },
      ];
    }

    let totalVolunteerHours = 24;
    let eventsAttendedCount = 12;
    let projectsJoinedCount = 4;
    let monthlyActivity = DEFAULT_MONTHLY_DATA;

    if (!isPlaceholderFirebaseConfig()) {
      try {
        const attendanceQuery = query(
          collection(db, 'event_attendances'),
          where('memberId', '==', userId)
        );
        const attendanceSnapshot = await getDocs(attendanceQuery);

        if (!attendanceSnapshot.empty) {
          eventsAttendedCount = attendanceSnapshot.size;
          let hoursSum = 0;
          const monthCounts: Record<string, number> = {};

          attendanceSnapshot.docs.forEach((docSnap) => {
            const att = docSnap.data();
            hoursSum += Number(att.hours || 2);
            if (att.month) {
              monthCounts[att.month] = (monthCounts[att.month] || 0) + 1;
            }
          });

          if (hoursSum > 0) totalVolunteerHours = hoursSum;

          if (Object.keys(monthCounts).length > 0) {
            monthlyActivity = DEFAULT_MONTHLY_DATA.map((item) => {
              const dynamicCount =
                monthCounts[item.month] !== undefined ? monthCounts[item.month] : item.count;
              const computedHeight = `${Math.min(110, Math.max(15, dynamicCount * 9))}px`;
              return {
                ...item,
                count: dynamicCount,
                height: computedHeight,
              };
            });
          }
        }
      } catch {
        // Preserve default metrics
      }
    }

    const impactPoints =
      eventsAttendedCount * 80 + totalVolunteerHours * 10 + projectsJoinedCount * 70;

    return {
      member: {
        userId,
        firstName,
        lastName,
        email,
        rotaryId,
        riNumber,
        clubId,
        clubName,
        state,
        region,
        role,
        duesStatus,
        avatarUrl,
        occupation,
        phoneNumber,
      },
      metrics: {
        impactPoints,
        eventsAttended: eventsAttendedCount,
        projectsJoined: projectsJoinedCount,
        volunteerHours: totalVolunteerHours,
      },
      monthlyActivity,
      duesRecords,
    };
  } catch (error: unknown) {
    console.error('Error in getMemberDashboardData:', error);
    return {
      member: {
        userId,
        firstName: localAuthUser?.firstName || '',
        lastName: localAuthUser?.lastName || '',
        email: localAuthUser?.email || '',
        rotaryId: `ROT-9126-${userId.slice(0, 4)}`,
        riNumber: '',
        clubId: (localAuthUser as any)?.clubId || '',
        clubName: (localAuthUser as any)?.clubName || '',
        state: (localAuthUser as any)?.state || 'District 9126',
        region: (localAuthUser as any)?.region || '',
        role: localAuthUser?.role || 'member',
        duesStatus: (localAuthUser?.duesStatus as DuesStatus) || 'pending',
        avatarUrl: (localAuthUser as any)?.avatarUrl || '',
        occupation:
          localAuthUser?.role === 'club_president'
            ? 'Club President'
            : localAuthUser?.role === 'district_admin'
            ? 'District Administrator'
            : 'Active Member',
        phoneNumber: (localAuthUser as any)?.phoneNumber || '',
      },
      metrics: {
        impactPoints: 0,
        eventsAttended: 0,
        projectsJoined: 0,
        volunteerHours: 0,
      },
      monthlyActivity: DEFAULT_MONTHLY_DATA,
      duesRecords: [],
    };
  }
}

/**
 * 2. Update Member Dues Status and create an immutable audit record
 */
export async function updateMemberDuesStatus(
  memberId: string,
  status: 'cleared' | 'pending',
  clearedBy: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    // 1. Update local roster & registered users
    if (typeof window !== 'undefined') {
      const roster = getLocalRosterRecords();
      const updatedRoster = roster.map((r) =>
        r.userId === memberId
          ? {
              ...r,
              duesStatus: status,
              clearedDate:
                status === 'cleared'
                  ? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : ' - ',
            }
          : r
      );
      saveLocalRosterRecords(updatedRoster);

      const localUsers = getLocalUsers();
      Object.values(localUsers).forEach((u) => {
        if (u.uid === memberId || u.email === memberId) {
          saveLocalUser({ ...u, duesStatus: status });
        }
      });

      const current = getCurrentUser();
      if (current && (current.uid === memberId || current.email === memberId)) {
        updateCurrentUserSession({ duesStatus: status });
      }
    }

    // 2. Sync to Firestore when live keys are configured
    if (!isPlaceholderFirebaseConfig()) {
      const userRef = doc(db, 'users', memberId);
      await updateDoc(userRef, {
        duesStatus: status,
        updatedAt: new Date().toISOString(),
      }).catch(async () => {
        await setDoc(
          userRef,
          { duesStatus: status, updatedAt: new Date().toISOString() },
          { merge: true }
        );
      });

      const authUserRef = doc(db, 'auth_users', memberId);
      await setDoc(authUserRef, { duesStatus: status }, { merge: true }).catch(() => {});

      const auditCollection = collection(db, 'dues_audit_log');
      await addDoc(auditCollection, {
        memberId,
        newStatus: status,
        clearedBy: clearedBy || 'system_officer',
        timestamp: serverTimestamp(),
        updatedAt: new Date().toISOString(),
      });
    }

    return {
      success: true,
      message: `Member dues status successfully updated to ${status}.`,
    };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Failed to update dues status.';
    console.error('Error in updateMemberDuesStatus:', error);
    return {
      success: false,
      error: errMsg,
    };
  }
}

/**
 * Record an online/Paystack dues payment, persist receipt, and clear member dues status.
 */
export async function recordDuesPayment(params: {
  memberId: string;
  memberName: string;
  email?: string;
  clubName: string;
  amount?: number;
  reference?: string;
  period?: string;
  category?: StoredDuesPayment['category'];
  avatar?: string;
}): Promise<{ success: boolean; payment: StoredDuesPayment }> {
  const amount = params.amount || DISTRICT_ANNUAL_DUES;
  const refId =
    params.reference || `PSTK-D9126-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const payment: StoredDuesPayment = {
    id: refId,
    memberId: params.memberId,
    name: params.memberName || 'Rotaract Member',
    email: params.email,
    club: params.clubName || 'Rotaract District 9126',
    status: 'Cleared',
    period: params.period || '2026/2027',
    amount,
    date: dateStr,
    category: params.category || 'Annual Dues',
    avatar: params.avatar || '',
  };

  const existing = getLocalDuesPayments().filter((p) => p.id !== refId);
  saveLocalDuesPayments([payment, ...existing]);

  await updateMemberDuesStatus(params.memberId, 'cleared', 'paystack_online');

  if (!isPlaceholderFirebaseConfig()) {
    try {
      await setDoc(
        doc(db, 'dues_payments', refId),
        {
          ...payment,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch {
      // Non-fatal fallback
    }
  }

  return { success: true, payment };
}

/**
 * 3. Retrieve all active and alumni members for a specified club
 * Combines Firestore `users` with registered users in localStorage and custom roster additions.
 * Never returns hardcoded fake profiles.
 */
export async function getClubRoster(clubId: string): Promise<ClubMemberRecord[]> {
  const combinedMap = new Map<string, ClubMemberRecord>();

  // 1. Include registered users from localStorage
  if (typeof window !== 'undefined') {
    const localUsers = getLocalUsers();
    Object.values(localUsers).forEach((u) => {
      const uid = u.uid || u.email;
      if (!uid) return;
      combinedMap.set(uid, {
        userId: uid,
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        email: u.email || '',
        rotaryId: u.rotaryId || `ROT-9126-${uid.slice(-4)}`,
        clubId: u.clubId || clubId || 'rac-ibadan-ring-road',
        role:
          u.role === 'club_president'
            ? 'president'
            : u.role === 'district_admin'
            ? 'district_admin'
            : 'member',
        duesStatus: u.duesStatus === 'cleared' ? 'cleared' : 'pending',
        memberType: 'Active',
        avatarUrl: '',
        occupation:
          u.role === 'club_president'
            ? 'Club President'
            : u.role === 'district_admin'
            ? 'District Administrator'
            : 'Active Member',
        phoneNumber: u.phoneNumber || '',
        attendance: 100,
        clearedDate: u.duesStatus === 'cleared' ? 'Verified' : ' - ',
        lastActive: 'Active',
      });
    });

    // Also include current active session user if not yet in localUsers
    const current = getCurrentUser();
    if (current && current.uid && !combinedMap.has(current.uid)) {
      combinedMap.set(current.uid, {
        userId: current.uid,
        firstName: current.firstName || '',
        lastName: current.lastName || '',
        email: current.email || '',
        rotaryId: current.rotaryId || `ROT-9126-${current.uid.slice(-4)}`,
        clubId: current.clubId || clubId || 'rac-ibadan-ring-road',
        role:
          current.role === 'club_president'
            ? 'president'
            : current.role === 'district_admin'
            ? 'district_admin'
            : 'member',
        duesStatus: current.duesStatus === 'cleared' ? 'cleared' : 'pending',
        memberType: 'Active',
        avatarUrl: '',
        occupation:
          current.role === 'club_president'
            ? 'Club President'
            : current.role === 'district_admin'
            ? 'District Administrator'
            : 'Active Member',
        phoneNumber: current.phoneNumber || '',
        attendance: 100,
        clearedDate: current.duesStatus === 'cleared' ? 'Verified' : ' - ',
        lastActive: 'Online',
      });
    }

    // Merge explicitly added club roster records
    getLocalRosterRecords().forEach((rec) => {
      combinedMap.set(rec.userId, rec);
    });
  }

  // 2. Query Firestore when live keys are configured
  if (clubId && !isPlaceholderFirebaseConfig()) {
    try {
      const usersQuery = query(collection(db, 'users'), where('clubId', '==', clubId));
      const snapshot = await getDocs(usersQuery);

      if (!snapshot.empty) {
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          combinedMap.set(docSnap.id, {
            userId: docSnap.id,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            rotaryId: data.rotaryId || `ROT-9126-${docSnap.id.slice(0, 4)}`,
            clubId: data.clubId || clubId,
            role: data.role || 'member',
            duesStatus: (data.duesStatus === 'cleared' ? 'cleared' : 'pending') as DuesStatus,
            memberType: data.memberType || (data.status === 'alumni' ? 'Alumni' : 'Active'),
            avatarUrl: data.avatarUrl || '',
            occupation: data.occupation || 'Active Member',
            phoneNumber: data.phoneNumber || '',
            joinedDate: data.createdAt || data.joinedDate,
            attendance: Number(data.attendance ?? 100),
            clearedDate: data.duesStatus === 'cleared' ? 'Verified' : ' - ',
            lastActive: 'Active',
          });
        });
      }
    } catch (error: unknown) {
      console.error('Error in getClubRoster:', error);
    }
  }

  return Array.from(combinedMap.values());
}

/**
 * Add a new member to the club roster and persist in local storage + Firestore.
 */
export async function addClubMemberRecord(input: {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  duesStatus?: 'cleared' | 'pending';
  clubId?: string;
}): Promise<ClubMemberRecord> {
  const parts = input.name.trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  const userId = `mbr-${Date.now()}`;
  const duesStatus: DuesStatus = input.duesStatus === 'cleared' ? 'cleared' : 'pending';

  const newRecord: ClubMemberRecord = {
    userId,
    firstName,
    lastName,
    email: input.email.trim().toLowerCase(),
    rotaryId: `ROT-9126-${String(Date.now()).slice(-4)}`,
    clubId: input.clubId || 'rac-ibadan-ring-road',
    role: input.role === 'President' ? 'president' : 'member',
    duesStatus,
    memberType: 'Active',
    avatarUrl: '',
    occupation: input.role || 'Member',
    phoneNumber: input.phone || '',
    attendance: 100,
    clearedDate: duesStatus === 'cleared' ? 'Today' : ' - ',
    lastActive: 'Just registered',
    verificationStatus: 'Pending',
  };

  const existing = getLocalRosterRecords();
  saveLocalRosterRecords([newRecord, ...existing]);

  if (!isPlaceholderFirebaseConfig()) {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...newRecord,
        createdAt: new Date().toISOString(),
      });
    } catch {
      // Non-fatal
    }
  }

  return newRecord;
}

/**
 * Retrieve finance transactions for the Club President or Executive ledger.
 */
export async function getClubFinanceLedger(clubFilter?: string): Promise<StoredDuesPayment[]> {
  const localPayments = getLocalDuesPayments();
  if (!clubFilter) return localPayments;
  const filtered = localPayments.filter(
    (p) =>
      !p.club ||
      p.club.toLowerCase().includes(clubFilter.toLowerCase()) ||
      clubFilter.toLowerCase().includes(p.club.toLowerCase())
  );
  return filtered.length > 0 ? filtered : localPayments;
}

/**
 * Retrieve real registered members for the District Executive Verification Queue.
 */
export async function getExecutiveVerificationQueue(): Promise<
  Array<{
    id: string;
    name: string;
    email: string;
    club: string;
    state: string;
    date: string;
    status: 'Pending' | 'Flagged' | 'Verified';
    avatar: string;
  }>
> {
  const roster = await getClubRoster('rac-ibadan-ring-road');
  return roster
    .filter((r) => r.verificationStatus !== 'Verified' && r.verificationStatus !== 'Rejected')
    .map((r) => ({
      id: r.userId,
      name: `${r.firstName} ${r.lastName}`.trim() || r.email,
      email: r.email,
      club: r.clubId || 'Rotaract District 9126',
      state: 'Oyo',
      date: r.joinedDate
        ? new Date(r.joinedDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'Current Session',
      status: r.verificationStatus === 'Flagged' ? 'Flagged' : 'Pending',
      avatar: r.avatarUrl || '',
    }));
}

/**
 * Update member verification status from the District Executive Console
 */
export async function updateMemberVerificationStatus(
  memberIds: string[],
  status: 'Verified' | 'Rejected'
): Promise<void> {
  if (typeof window === 'undefined') return;
  const idSet = new Set(memberIds);
  const roster = getLocalRosterRecords();
  const updated = roster.map((r) =>
    idSet.has(r.userId) ? { ...r, verificationStatus: status } : r
  );
  saveLocalRosterRecords(updated);
}
