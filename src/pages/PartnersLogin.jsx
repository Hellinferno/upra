import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Briefcase as BriefcaseIcon } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { auth, storage, db } from '../lib/firebase';
import { toast } from 'react-hot-toast';
import { useOrderStore } from '../store/orderStore';

const PartnersLogin = ({ setView }) => {
    const { setUser } = useOrderStore();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Extended Registration State
    const [fullName, setFullName] = useState('');
    const [agencyName, setAgencyName] = useState('');
    const [mobile, setMobile] = useState('');
    const [profession, setProfession] = useState('');
    const [city, setCity] = useState('');
    const [membershipNumber, setMembershipNumber] = useState('');
    const [experience, setExperience] = useState('');
    const [licenseFile, setLicenseFile] = useState(null);

    const [error, setError] = useState('');
    const [isResetting, setIsResetting] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePartnerAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Fallback to Demo Mode logic
        if (!auth) {
            // --- MOCK LOGIN FOR DEMO IF FIREBASE NOT CONFIGURED ---
            const mockUser = {
                name: isSignUp ? fullName : "Demo Partner",
                email: email,
                isPartner: true,
                profession: isSignUp ? profession : "CA", // Default to CA for demo
                status: isSignUp ? 'Pending Verification' : 'Verified',
                membershipNumber,
                experience,
                uid: "partner_" + Date.now()
            };
            setUser(mockUser);
            if (isSignUp) {
                toast.success("Registration successful! Pending verification.");
            } else {
                toast.success("Welcome back!");
            }
            setView('partnerDashboard'); // Update view using parent's handler
            setLoading(false);
            return;
        }

        try {
            if (isSignUp) {
                // Sign Up Logic
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, { displayName: `${fullName} (Partner)` });

                let licenseUrl = null;
                if (licenseFile && storage) {
                    try {
                        const fileRef = ref(storage, `partners/${userCredential.user.uid}/license_${Date.now()}_${licenseFile.name}`);
                        await uploadBytes(fileRef, licenseFile);
                        licenseUrl = await getDownloadURL(fileRef);
                    } catch (uploadErr) {
                        console.error("License upload failed:", uploadErr);
                        toast.error("License upload failed, proceeding with registration.");
                    }
                }

                const userData = {
                    name: fullName,
                    email: email,
                    isPartner: true,
                    role: 'partner',
                    profession: profession,
                    agencyName,
                    mobile,
                    city,
                    status: 'Pending Verification',
                    membershipNumber,
                    experience,
                    licenseUrl,
                    uid: userCredential.user.uid,
                    createdAt: new Date().toISOString()
                };

                // Save extended profile to Firestore
                if (db) {
                    await setDoc(doc(db, "users", userCredential.user.uid), userData);
                }

                setUser(userData);
            } else {
                // Login Logic
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                // In a real app, we'd fetch the full profile from Firestore here.
                // For now, we construct a basic object, but status might be missing if we don't fetch.
                setUser({
                    name: userCredential.user.displayName || "Partner",
                    email: userCredential.user.email,
                    isPartner: true,
                    role: 'partner',
                    profession: "CA", // Fallback
                    uid: userCredential.user.uid
                });
            }
            setView('partnerDashboard');
        } catch (err) {
            // Handle invalid API key by falling back to demo mode
            if (err.code === 'auth/api-key-not-valid' || err.message.includes('api-key-not-valid')) {
                console.warn("API Key invalid or restricted. Switching to Demo Mode for Partner.");
                const mockUser = {
                    name: isSignUp ? fullName : "Demo Partner",
                    email: email,
                    isPartner: true,
                    profession: isSignUp ? profession : "CA",
                    status: isSignUp ? 'Pending Verification' : 'Verified',
                    membershipNumber,
                    experience,
                    uid: "partner_" + Date.now()
                };
                setUser(mockUser);
                setView('partnerDashboard');
            } else {
                setError(err.message.replace("Firebase: ", ""));
            }
        } finally {
            setLoading(false);
        }
    };

    // ... (rest of reset logic)

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-inter">
            <div className={`bg-white w-full ${isSignUp ? 'max-w-2xl' : 'max-w-md'} p-10 rounded-3xl shadow-2xl border border-gray-100 relative transition-all duration-300`}>
                {/* ... (Header and Error logic same as before) */}
                <button onClick={() => setView('home')} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <div className="inline-block p-3 rounded-full bg-purple-50 mb-4">
                        <BriefcaseIcon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {isResetting ? "Reset Password" : (isSignUp ? "Partner Registration" : "Partner Portal")}
                    </h2>
                    <p className="text-slate-500 mt-2">
                        {isResetting
                            ? "Enter email to receive reset link."
                            : (isSignUp ? "Join our network of professionals." : "Restricted access for authorized partners only.")}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
                        {error}
                    </div>
                )}

                {isResetting ? (
                    // --- PARTNER FORGOT PASSWORD FORM ---
                    <form onSubmit={handlePasswordReset} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Partner Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                placeholder="partner@upra.in"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full bg-purple-600 text-white py-3.5 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30">
                            Send Reset Link
                        </button>
                        <button
                            type="button"
                            onClick={() => { setIsResetting(false); setError(''); }}
                            className="w-full text-slate-500 hover:text-slate-700 font-bold text-sm"
                        >
                            Back to Login
                        </button>
                    </form>
                ) : (
                    // --- PARTNER LOGIN / SIGNUP FORM ---
                    <form onSubmit={handlePartnerAuth} className="space-y-5">
                        {isSignUp ? (
                            // Registration Fields (Grid Layout)
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="Your Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="partner@upra.in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="98765 43210"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Agency/Firm Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="Legal Solutions Co."
                                        value={agencyName}
                                        onChange={(e) => setAgencyName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Profession</label>
                                    <select
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white"
                                        value={profession}
                                        onChange={(e) => setProfession(e.target.value)}
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="CA">Chartered Accountant</option>
                                        <option value="CS">Company Secretary</option>
                                        <option value="Lawyer">Lawyer / Advocate</option>
                                        <option value="Tax Consultant">Tax Consultant</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Membership Number</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="ICAI/ICSI/Bar Council ID"
                                        value={membershipNumber}
                                        onChange={(e) => setMembershipNumber(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Years of Experience</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="e.g. 5"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="Delhi"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Proof of Practice / License <span className="text-gray-400 font-normal">(Optional)</span></label>
                                    <input
                                        type="file"
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                        onChange={(e) => setLicenseFile(e.target.files[0])}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Create Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        ) : (
                            // Login Fields (Simple)
                            <>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Partner Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="partner@upra.in"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        {!isSignUp && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => { setIsResetting(true); setError(''); }}
                                    className="text-sm font-bold text-purple-600 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <button disabled={loading} type="submit" className="w-full bg-purple-600 text-white py-3.5 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? "Processing..." : (isSignUp ? "Register as Partner" : "Access Portal")}
                        </button>
                    </form>
                )}

                {!isResetting && (
                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        <p className="text-sm text-slate-500 mb-2">
                            {isSignUp ? "Already a partner?" : "New to UPRA Filings?"}
                        </p>
                        <button
                            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                            className="text-purple-600 font-bold hover:underline"
                        >
                            {isSignUp ? "Login Here" : "Register as a Partner"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnersLogin;
