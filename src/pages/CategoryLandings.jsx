import React from 'react';
import { POPULAR_SERVICES } from '../data/constants';
import ServiceCard from '../components/ServiceCard';

export const StartupLanding = () => (
    <div className="animate-slide-in p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-800">Startup Services</h1>
        <p className="mb-8 text-slate-600 max-w-2xl">Launch your dream startup with our comprehensive incorporation packages. We handle everything from name reservation to incorporation and tax registration.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POPULAR_SERVICES.filter(s => s.title.includes('Private Limited') || s.title.includes('OPC') || s.title.includes('LLP')).map(s => (
                <ServiceCard key={s.id} service={s} onClick={() => { }} />
            ))}
        </div>
    </div>
);

export const MCALanding = () => (
    <div className="animate-slide-in p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-800">MCA Services</h1>
        <p className="mb-8 text-slate-600">Company lifecycle management services including director changes, address changes, and capital changes.</p>
        {/* Mock Content */}
        <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
            <h3 className="font-bold text-xl mb-4 text-blue-800">Featured: DIR-3 KYC</h3>
            <p className="text-slate-700 mb-4">Mandatory annual KYC for all Directors. Failure to file incurs ₹5000 penalty.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">File Now</button>
        </div>
    </div>
);

export const ComplianceLanding = () => (
    <div className="animate-slide-in p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-800">Annual Compliance</h1>
        <p className="mb-8 text-slate-600">Stay compliant with mandatory annual filings for Pvt Ltd, LLP, and OPCs.</p>
    </div>
);

export const GlobalLanding = () => (
    <div className="animate-slide-in p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-800">Global Expansion</h1>
        <p className="mb-8 text-slate-600">Incorporate your company in USA, Singapore, Dubai, and UK.</p>
    </div>
);

export const RegistrationsLanding = () => (
    <div className="animate-slide-in p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-800">Government Registrations</h1>
        <p className="mb-8 text-slate-600">PF, ESI, FSSAI, ISO, MSME and more.</p>
    </div>
);

export const TrademarkLanding = () => (
    <div className="animate-slide-in p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-800">Intellectual Property</h1>
        <p className="mb-8 text-slate-600">Protect your brand with Trademark, Copyright, and Patent filing.</p>
    </div>
);

export const GSTLanding = () => (
    <div className="animate-slide-in p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-800">Goods & Services Tax</h1>
        <p className="mb-8 text-slate-600">GST Registration, Filing, and Advisory services.</p>
    </div>
);

export const IncomeTaxLanding = () => (
    <div className="animate-slide-in p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-slate-800">Income Tax</h1>
        <p className="mb-8 text-slate-600">Personal and Corporate Income Tax Filing services.</p>
    </div>
);
