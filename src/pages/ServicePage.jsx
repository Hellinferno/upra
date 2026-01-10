import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Info, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { SERVICE_DETAILS } from '../data/constants';

const ServicePage = ({ serviceName, onBack, onBook }) => {
    const details = SERVICE_DETAILS[serviceName];
    const content = details || {
        title: serviceName,
        description: `Get your ${serviceName} done completely online with expert assistance. We simplify the legal process so you can focus on your business.`,
        whatIs: null,
        requirements: null,
        process: [
            { title: "Fill Application", desc: "Submit your details in our simple online form." },
            { title: "Expert Review", desc: "Our professionals verify your documents and file the application." },
            { title: "Get Delivered", desc: "Receive your registration certificate via email/post." }
        ],
        pros: [],
        cons: [],
        documents: ["PAN Card", "Aadhar Card", "Photo"]
    };

    const [isBooking, setIsBooking] = useState(false);
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });

    const handleBookSubmit = (e) => {
        e.preventDefault();
        // Pass the order details up to App
        onBook({
            service: serviceName,
            ...formData,
            date: new Date().toISOString(),
            status: 'Pending Allocation',
            documents: content.documents
        });
    };

    return (
        <div className="animate-slide-in bg-white min-h-screen">
            <div className="bg-slate-50 border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <button
                        onClick={onBack}
                        className="flex items-center text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                    </button>
                </div>
            </div>

            <section className="bg-white pt-12 pb-16 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-6">
                            FAST & ONLINE
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            {content.title}
                        </h1>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            {content.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={() => setIsBooking(true)}
                                className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                            >
                                Book Now
                            </button>
                            <div className="flex items-center text-slate-600 px-4">
                                <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                                <span className="font-bold mr-1">4.8/5</span> Rating
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 100% Online Process</span>
                            <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Expert Support</span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-slate-50 rounded-2xl p-8 border border-gray-100 shadow-xl relative z-10">
                            {isBooking ? (
                                <div className="animate-fade-in">
                                    <h3 className="font-bold text-xl mb-4 text-slate-900">Finalize Booking</h3>
                                    <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800">
                                        Simulating Payment & Document Upload...
                                    </div>
                                    <form onSubmit={handleBookSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">YOUR NAME</label>
                                            <input required type="text" className="w-full p-2 border rounded" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">EMAIL</label>
                                            <input required type="email" className="w-full p-2 border rounded" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                        <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">
                                            Pay & Submit Order
                                        </button>
                                        <button type="button" onClick={() => setIsBooking(false)} className="w-full text-gray-500 text-sm py-2">Cancel</button>
                                    </form>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-bold text-xl mb-6">Request a Callback</h3>
                                    <form className="space-y-4">
                                        <input type="text" className="w-full p-3 bg-white border border-gray-200 rounded-lg outline-none" placeholder="Full Name" />
                                        <input type="email" className="w-full p-3 bg-white border border-gray-200 rounded-lg outline-none" placeholder="Email" />
                                        <input type="tel" className="w-full p-3 bg-white border border-gray-200 rounded-lg outline-none" placeholder="Phone" />
                                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors">
                                            Get Free Consultation
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                        <div className="absolute top-10 -right-10 w-full h-full bg-blue-600/5 rounded-2xl -z-10"></div>
                    </div>
                </div>
            </section>

            {/* What Is & Requirements Section */}
            {(content.whatIs || content.requirements) && (
                <section className="py-16 px-4 bg-slate-50">
                    <div className="max-w-4xl mx-auto space-y-12">
                        {content.whatIs && (
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <Info className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What is it?</h2>
                                    <p className="text-slate-600 leading-relaxed text-lg">{content.whatIs}</p>
                                </div>
                            </div>
                        )}

                        {content.requirements && (
                            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Eligibility & Requirements</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {content.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start text-slate-600 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 shrink-0"></div>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Pros and Cons */}
            {(content.pros.length > 0 || content.cons.length > 0) && (
                <section className="py-16 px-4 bg-white border-t border-slate-100">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">Is this right for you?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-green-50/50 p-8 rounded-2xl border border-green-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <ThumbsUp className="w-6 h-6 text-green-600" />
                                    <h3 className="text-xl font-bold text-slate-900">Benefits</h3>
                                </div>
                                <ul className="space-y-4">
                                    {content.pros.map((pro, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700">
                                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span>{pro}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50/50 p-8 rounded-2xl border border-red-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <ThumbsDown className="w-6 h-6 text-red-600" />
                                    <h3 className="text-xl font-bold text-slate-900">Disadvantages</h3>
                                </div>
                                <ul className="space-y-4">
                                    {content.cons.map((con, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700">
                                            <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                            <span>{con}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="py-20 bg-gray-50 px-4 border-t border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
                        <p className="text-gray-500">Simple process to get your {serviceName}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.process.map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                                <span className="text-6xl font-black text-gray-50 absolute -right-4 -top-4 group-hover:text-blue-50 transition-colors">{idx + 1}</span>
                                <div className="relative z-10">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-4">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-center">Documents Required</h2>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                        {content.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center p-4 border-b border-slate-200 last:border-0 hover:bg-white transition-colors">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-4"></div>
                                <span className="text-slate-700 font-medium">{doc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicePage;
