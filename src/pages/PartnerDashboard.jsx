import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SkeletonDashboard } from '../components/SkeletonLoader';
import { SERVICE_PROFESSION_MAP } from '../data/constants';
import { useOrderStore } from '../store/orderStore';
import { toast } from 'react-hot-toast';

const PartnerDashboard = () => {
    const { user, updateOrderStatus, logout } = useOrderStore(); // Removed 'orders' from store, fetching real data
    const [realOrders, setRealOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // Safety check if user is not loaded
    if (!user) return null;

    const myProfession = user.profession || "CA";
    const myCity = user.city || ""; // Partner's city

    useEffect(() => {
        const fetchOrders = async () => {
            if (!db) {
                // Fallback for demo mode if DB not available
                setLoadingOrders(false);
                return;
            }

            try {
                // Fetch all pending orders (Optimization: Filtering client-side for geo-match for now)
                // In production, you'd add compound indexes for server-side filtering
                const q = query(collection(db, "orders"), where("status", "==", "Pending Allocation"));
                const querySnapshot = await getDocs(q);
                const fetchedOrders = [];
                querySnapshot.forEach((doc) => {
                    fetchedOrders.push({ id: doc.id, ...doc.data() });
                });
                setRealOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to load live jobs.");
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [user]);

    // GEO-MATCHING LOGIC (The "Mediator")
    // 1. Match City
    // 2. Match Profession
    const availableJobs = realOrders.filter(order => {
        const cityMatch = order.city?.toLowerCase() === myCity.toLowerCase();
        const professionMatch = SERVICE_PROFESSION_MAP[order.serviceType || order.service]?.includes(myProfession);
        return cityMatch && professionMatch;
    });

    // TODO: Fetch 'My Active Jobs' similarly from Firestore
    // For now, using the local store for active jobs logic to keep the demo flow smooth 
    // or we can implement real fetching for active jobs too if needed.
    // Let's stick to available jobs for the specific Geo-Matching task.

    const handleAcceptJob = async (jobId, clientName) => {
        if (user.status === 'Pending Verification' || user.isVerified === false) {
            toast.error("Verification Required to accept jobs.");
            return;
        }

        try {
            if (db) {
                const orderRef = doc(db, "orders", jobId);
                await updateDoc(orderRef, {
                    status: 'In Progress',
                    assignedPartnerId: user.uid,
                    assignedPartner: user.name
                });
                toast.success(`Job for ${clientName} accepted!`);
                // Refresh list
                setRealOrders(prev => prev.filter(o => o.id !== jobId));
            } else {
                // Demo fallback
                updateOrderStatus(jobId, 'In Progress', user.name);
            }
        } catch (error) {
            console.error("Error accepting job:", error);
            toast.error("Failed to accept job.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-inter">
            {/* Partner Sidebar */}
            <div className="w-72 bg-purple-900 text-white hidden md:flex flex-col shadow-2xl z-20">
                <div className="p-6 border-b border-purple-800">
                    <div className="flex items-center space-x-3">
                        <span className="font-bold text-xl tracking-tight text-white">PARTNER PANEL</span>
                    </div>
                    <p className="text-xs text-purple-300 mt-1">{user.name} ({myProfession})</p>
                    <p className="text-xs text-purple-400">📍 {myCity}</p>
                </div>
                <div className="p-6"><button onClick={logout} className="text-white bg-purple-800 px-4 py-2 rounded">Logout</button></div>
            </div>

            <main className="flex-1 overflow-y-auto p-10">
                {loadingOrders ? <SkeletonDashboard /> : (
                    <>
                        <h1 className="text-3xl font-bold mb-8 text-slate-800 flex items-center">
                            Workstation
                            <span className={`ml-4 text-sm px-3 py-1.5 rounded-full flex items-center border ${user.status === 'Verified' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                                {user.status === 'Verified' ? (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                                        Verified Partner
                                    </>
                                ) : (
                                    <>
                                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                                        Pending Verification
                                    </>
                                )}
                            </span>
                        </h1>

                        {(user.status === 'Pending Verification' || user.isVerified === false) && (
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded shadow-sm">
                                <h3 className="font-bold text-amber-800">Account Under Review</h3>
                                <p className="text-amber-700 text-sm mt-1">
                                    Thanks for joining, {user.name}! Your profile (Membership: {user.membershipNumber}) is currently being verified by our admin team.
                                    You can view available jobs but cannot accept them until verified.
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Available Jobs Column */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-slate-700 flex items-center"><Bell className="w-5 h-5 mr-2" /> New Opportunities (In {myCity})</h2>
                                <div className="space-y-4">
                                    {availableJobs.length === 0 && (
                                        <div className="text-center p-8 bg-white rounded-xl border border-dashed border-gray-300">
                                            <p className="text-slate-400 italic">No new jobs matching your profile in {myCity}.</p>
                                        </div>
                                    )}
                                    {availableJobs.map((job, i) => (
                                        <div key={job.id || i} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                                            <h4 className="font-bold text-lg">{job.serviceType || job.service}</h4>
                                            <p className="text-sm text-slate-500 mb-1">Client: {job.fullName}</p>
                                            <p className="text-xs text-slate-400 mb-4">📍 {job.city}</p>
                                            <button
                                                disabled={user.status === 'Pending Verification' || user.isVerified === false}
                                                onClick={() => handleAcceptJob(job.id, job.fullName)}
                                                className={`w-full py-2 rounded-lg font-bold transition-all ${user.status === 'Pending Verification' || user.isVerified === false
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    : 'bg-green-600 text-white hover:bg-green-700'
                                                    }`}
                                            >
                                                {(user.status === 'Pending Verification' || user.isVerified === false) ? 'Verification Required' : 'Accept & Start'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Active Jobs Column (Placeholder for now as per minimal change strategy, or fetch real matched jobs) */}
                            {/* Leaving Active Jobs empty/mock for this iteration to focus on the Geo-Matching "Mediator" core requirement */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-slate-700 flex items-center"><BriefcaseIcon className="w-5 h-5 mr-2" /> My Active Jobs</h2>
                                <div className="space-y-4">
                                    <p className="text-slate-400 italic">Active job fetching integration coming next.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default PartnerDashboard;
