import React, { useState } from 'react';
import { X, Smartphone } from 'lucide-react';

const OTPModal = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (mobile.length === 10) {
            setStep(2);
        } else {
            alert("Please enter a valid 10-digit mobile number");
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (otp === '1234') {
            alert("Verified Successfully! (Mock)");
            onClose();
        } else {
            alert("Invalid OTP (Try 1234)");
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                </button>
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                        {step === 1 ? "Login with Mobile" : "Verify OTP"}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        {step === 1 ? "We'll send a 4-digit code to your number." : `Enter code sent to +91 ${mobile}`}
                    </p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Mobile Number</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-bold">+91</span>
                                <input
                                    type="tel"
                                    className="block w-full flex-1 rounded-none rounded-r-lg border border-gray-300 p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="98765 43210"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    maxLength={10}
                                />
                            </div>
                        </div>
                        <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                            Get OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <div className="flex justify-center gap-2 my-4">
                            <input
                                type="text"
                                className="w-32 text-center text-2xl tracking-widest border-b-2 border-slate-300 focus:border-blue-600 outline-none py-2"
                                placeholder="• • • •"
                                maxLength={4}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
                            Verify & Login
                        </button>
                        <button type="button" onClick={() => setStep(1)} className="w-full text-xs text-blue-600 font-bold hover:underline">
                            Change Number?
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OTPModal;
