import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Menu, X, ChevronDown, ChevronRight, CheckCircle,
  Shield, User, FileText, Briefcase, Calculator,
  Phone, Mail, Globe, Lock, Bell, LayoutGrid,
  CreditCard, FileCheck, Home, Users, Building,
  Rocket, Award, HelpCircle, ArrowRight, ArrowLeft, Star,
  Plane, Scale, FileSpreadsheet, Percent, Landmark, Quote, Plus, Minus
} from 'lucide-react';

// --- Mock Data & Constants ---

const NAV_MENU = {
  Startup: [
    { name: "Proprietorship", link: "#" },
    { name: "Partnership", link: "#" },
    { name: "One Person Company", link: "#" },
    { name: "Limited Liability Partnership", link: "#" },
    { name: "Private Limited Company", link: "#" },
    { name: "Public Limited Company", link: "#" },
    { name: "Section 8 Company", link: "#" },
    { name: "Nidhi Company", link: "#" },
    { name: "Indian Subsidiary", link: "#" },
    { name: "Trust Registration", link: "#" },
    { name: "Producer Company", link: "#" },
  ],
  MCA: [
    { name: "Company Compliance", link: "#" },
    { name: "LLP Compliance", link: "#" },
    { name: "OPC Compliance", link: "#" },
    { name: "Name Change - Company", link: "#" },
    { name: "Registered Office Change", link: "#" },
    { name: "DIN eKYC Filing", link: "#" },
    { name: "DIN Reactivation", link: "#" },
    { name: "Director Change", link: "#" },
    { name: "Remove Director", link: "#" },
    { name: "ADT-1 Filing", link: "#" },
    { name: "DPT-3 Filing", link: "#" },
    { name: "LLP Form 11 Filing", link: "#" },
    { name: "Dormant Status Filing", link: "#" },
    { name: "MOA Amendment", link: "#" },
    { name: "AOA Amendment", link: "#" },
    { name: "Authorized Capital Increase", link: "#" },
    { name: "Share Transfer", link: "#" },
    { name: "Demat of Shares", link: "#" },
    { name: "Winding Up - LLP", link: "#" },
    { name: "Winding Up - Company", link: "#" },
    { name: "Commencement (INC-20A)", link: "#" },
  ],
  Compliance: [
    { name: "Annual Compliance for Pvt Ltd", link: "#" },
    { name: "Annual Compliance for LLP", link: "#" },
    { name: "Payroll Compliance", link: "#" },
    { name: "PF & ESI Return Filing", link: "#" },
    { name: "TDS Return Filing", link: "#" },
    { name: "Professional Tax Return", link: "#" },
    { name: "RoC Compliance", link: "#" },
    { name: "Secretarial Audit", link: "#" },
    { name: "XBRL Filing", link: "#" },
    { name: "FDI Filing with RBI", link: "#" },
    { name: "FLA Return Filing", link: "#" },
    { name: "FSSAI Renewal", link: "#" },
    { name: "FSSAI Return Filing", link: "#" },
    { name: "Business Plan", link: "#" },
    { name: "HR & Payroll", link: "#" },
    { name: "PF Return Filing", link: "#" },
    { name: "ESI Return Filing", link: "#" },
    { name: "Professional Tax Return Filing", link: "#" },
    { name: "Partnership Compliance", link: "#" },
    { name: "Proprietorship Compliance", link: "#" },
    { name: "Bookkeeping", link: "#" },
    { name: "CA Support", link: "#" },
  ],
  Global: [
    { name: "UAE Company", link: "#" },
    { name: "USA Company", link: "#" },
    { name: "Singapore Company", link: "#" },
    { name: "UK Company", link: "#" },
    { name: "USA Trademark Registration", link: "#" },
    { name: "International Trademark", link: "#" },
    { name: "UAE eCommerce", link: "#" },
    { name: "UAE Embassy Attestation", link: "#" },
    { name: "Ajman Free Zone", link: "#" },
    { name: "UAQ Free Zone", link: "#" },
  ],
  Registrations: [
    { name: "Startup India Registration", link: "#" },
    { name: "Legal Entity Identifier Code", link: "#" },
    { name: "12A and 80G Registration", link: "#" },
    { name: "Darpan Registration", link: "#" },
    { name: "Trade License", link: "#" },
    { name: "ISO Registration", link: "#" },
    { name: "12A Registration", link: "#" },
    { name: "Digital Signature", link: "#" },
    { name: "FSSAI Registration", link: "#" },
    { name: "PF Registration", link: "#" },
    { name: "80G Registration", link: "#" },
    { name: "Shop Act Registration", link: "#" },
    { name: "FSSAI License", link: "#" },
    { name: "ESI Registration", link: "#" },
    { name: "APEDA Registration", link: "#" },
    { name: "Drug License", link: "#" },
    { name: "Halal License & Certification", link: "#" },
    { name: "Professional Tax Registration", link: "#" },
    { name: "Barcode Registration", link: "#" },
    { name: "Udyam Registration", link: "#" },
    { name: "ICEGATE Registration", link: "#" },
    { name: "RCMC Registration", link: "#" },
    { name: "BIS Registration", link: "#" },
    { name: "FCRA Registration", link: "#" },
    { name: "Import Export Code", link: "#" },
    { name: "TN RERA Registration for Agents", link: "#" },
    { name: "Certificate of Incumbency", link: "#" },
    { name: "Fire License", link: "#" },
  ],
  Trademark: [
    { name: "Trademark Registration", link: "#" },
    { name: "Trademark Objection", link: "#" },
    { name: "Trademark Certificate", link: "#" },
    { name: "Trademark Opposition", link: "#" },
    { name: "Trademark Hearing", link: "#" },
    { name: "Trademark Rectification", link: "#" },
    { name: "TM Infringement Notice", link: "#" },
    { name: "Trademark Renewal", link: "#" },
    { name: "Trademark Transfer", link: "#" },
    { name: "Expedited TM Registration", link: "#" },
    { name: "Logo Designing", link: "#" },
    { name: "Design Registration", link: "#" },
    { name: "Design Objection", link: "#" },
    { name: "Copyright Registration", link: "#" },
    { name: "Copyright Objection", link: "#" },
    { name: "Patent Registration", link: "#" },
    { name: "Trademark Protection", link: "#" },
  ],
  "Goods & Services Tax": [
    { name: "GST Registration", link: "#" },
    { name: "GST Return Filing by Accountant", link: "#" },
    { name: "GST NIL Return Filing", link: "#" },
    { name: "GST E-Invoicing Software", link: "#" },
    { name: "GST LUT Form", link: "#" },
    { name: "GST Notice", link: "#" },
    { name: "GST Annual Return Filing (GSTR-9)", link: "#" },
    { name: "GST Registration for Foreigners", link: "#" },
    { name: "GST Invoicing & Filing Software", link: "#" },
    { name: "GST Amendment", link: "#" },
    { name: "GST Revocation", link: "#" },
    { name: "GSTR-10", link: "#" },
    { name: "GST Software for Accountants", link: "#" },
    { name: "Virtual Office + GSTIN", link: "#" },
  ],
  "Income Tax": [
    { name: "Income Tax E-Filing", link: "#" },
    { name: "15CA - 15CB Filing", link: "#" },
    { name: "Business Tax Filing", link: "#" },
    { name: "TAN Registration", link: "#" },
    { name: "Partnership Firm / LLP ITR", link: "#" },
    { name: "TDS Return Filing", link: "#" },
    { name: "Company ITR Filing", link: "#" },
    { name: "Income Tax Notice", link: "#" },
    { name: "Trust / NGO Tax Filing", link: "#" },
    { name: "Revised ITR Return (ITR-U)", link: "#" },
  ]
};

const POPULAR_SERVICES = [
  { id: 1, title: "Private Limited Company", icon: Briefcase, price: "₹6899", desc: "For businesses looking to raise funds & scale operations." },
  { id: 2, title: "GST Registration", icon: FileCheck, price: "₹1499", desc: "Mandatory for businesses with turnover > ₹20 Lakhs." },
  { id: 3, title: "Trademark Registration", icon: Shield, price: "₹5999", desc: "Protect your brand name, logo and slogan." },
  { id: 4, title: "FSSAI Registration", icon: CheckCircle, price: "₹2999", desc: "Food license for restaurants and food businesses." },
  { id: 5, title: "Income Tax Return", icon: Calculator, price: "₹999", desc: "Expert assisted ITR filing for individuals & businesses." },
  { id: 6, title: "Import Export Code", icon: Globe, price: "₹2499", desc: "License to import or export goods/services from India." },
];

const STATS = [
  { label: "Happy Customers", value: "1 Million+" },
  { label: "Years of Trust", value: "10+" },
  { label: "Offices in India", value: "8+" },
  { label: "Experts", value: "500+" },
];

const TESTIMONIALS = [
  { name: "Arjun Mehta", company: "TechFlow Solutions", text: "UPRA Filings handled our private limited incorporation seamlessly. The team was proactive and the process was faster than expected." },
  { name: "Sarah Jenkins", company: "Global Exports", text: "I was worried about the IEC code process, but their platform made it incredibly simple. Highly recommended for startups." },
  { name: "Rajiv Kumar", company: "Kumar Traders", text: "Best service for GST filing. Their experts are knowledgeable and always available to answer queries." }
];

const FAQS = [
  { q: "How long does it take to register a Private Limited Company?", a: "Typically, it takes 7-10 working days, subject to government processing time and document submission." },
  { q: "Is physical presence required for the registration process?", a: "No, the entire process is 100% online. You can upload documents on our portal and we handle the rest." },
  { q: "What documents are needed for GST Registration?", a: "You need PAN, Aadhaar, Business Address Proof (Rent Agreement/Electricity Bill), and a Cancelled Cheque." }
];

const HOME_CATEGORIES = [
  { id: 'Startup', label: 'Startup', icon: Rocket, color: 'blue' },
  { id: 'Registrations', label: 'Registrations', icon: FileText, color: 'green' },
  { id: 'Trademark', label: 'Trademark', icon: Award, color: 'rose' },
  { id: 'Goods & Services Tax', label: 'Goods & Services Tax', icon: Calculator, color: 'amber' },
  { id: 'Income Tax', label: 'Income Tax', icon: Percent, color: 'indigo' },
  { id: 'MCA', label: 'MCA Services', icon: Building, color: 'emerald' },
  { id: 'Compliance', label: 'Compliance', icon: Shield, color: 'purple' },
  { id: 'Global', label: 'Global', icon: Globe, color: 'cyan' },
];

// --- Components ---

const Logo = ({ className = "" }) => (
  <div className={`flex flex-col select-none ${className}`}>
    {/* Upper Logo Part */}
    <div className="flex items-baseline leading-none">
      {/* Dark Blue Text Section */}
      <h1 className="text-4xl font-black tracking-tighter text-[#0B2447] m-0 p-0">
        UPR
      </h1>

      {/* Stylized 'A' Icon */}
      <div className="relative w-10 h-10 ml-0.5 flex items-end justify-center">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* The Teal 'A' shape */}
          <path
            d="M50 5 L100 95 H78 L65 70 H35 L22 95 H0 L50 5Z"
            className="fill-cyan-400"
          />
          {/* The white lightning bolt/cut through effect */}
          <path
            d="M40 70 L55 40 L55 60 L70 60 L48 95 L48 70 H40Z"
            fill="white"
          />
        </svg>
      </div>
    </div>

    {/* Tagline Section */}
    <div className="text-[8px] font-bold text-[#0B2447] tracking-wide mt-0.5 uppercase whitespace-nowrap">
      Registration <span className="text-cyan-400">|</span> Taxation <span className="text-cyan-400">|</span> Compliance
    </div>
  </div>
);

const ServiceCard = ({ service, onClick }) => {
  const Icon = service.icon || FileText; // Default icon if none provided
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
    >
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
        <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-3 tracking-tight">{service.title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2">{service.desc}</p>
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Starts From</span>
          <span className="font-bold text-slate-900 text-lg">{service.price}</span>
        </div>
        <span className="text-xs text-blue-700 font-bold bg-blue-50 px-4 py-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">Get Started</span>
      </div>
    </div>
  );
};

const ServicePage = ({ serviceName, onBack }) => {
  return (
    <div className="animate-slide-in bg-white min-h-screen">
      {/* Breadcrumb / Back Navigation */}
      <div className="bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-6">
              FAST & ONLINE
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {serviceName}
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Get your {serviceName} done completely online with expert assistance.
              We simplify the legal process so you can focus on your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                Get Started Now
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
              <h3 className="font-bold text-xl mb-6">Request a Callback</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">FULL NAME</label>
                  <input type="text" className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">EMAIL ADDRESS</label>
                  <input type="email" className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="name@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">PHONE NUMBER</label>
                  <input type="tel" className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91 98765 43210" />
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors">
                  Get Free Consultation
                </button>
              </form>
            </div>
            {/* Decorative background element */}
            <div className="absolute top-10 -right-10 w-full h-full bg-blue-600/5 rounded-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-gray-500">Simple 3-step process to get your {serviceName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Fill Application", desc: "Submit your details in our simple online form." },
              { step: "02", title: "Expert Review", desc: "Our professionals verify your documents and file the application." },
              { step: "03", title: "Get Delivered", desc: "Receive your registration certificate via email/post." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all">
                <span className="text-6xl font-black text-gray-100 absolute -right-4 -top-4 group-hover:text-blue-50 transition-colors">{item.step}</span>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Documents Required for {serviceName}</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {[
              "PAN Card of Applicant",
              "Aadhar Card / Voter ID / Passport",
              "Passport Size Photograph",
              "Proof of Business Address (Electricity Bill/Rent Agreement)",
              "Bank Account Details"
            ].map((doc, idx) => (
              <div key={idx} className="flex items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <CheckCircle className="w-5 h-5 text-green-500 mr-4 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const TestimonialSection = () => (
  <section className="py-24 bg-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-blue-600 font-bold tracking-wider uppercase text-xs mb-2 block">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Trusted by Entrepreneurs</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Don't just take our word for it. Here's what founders and business owners have to say about UPRA Filings.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative hover:shadow-lg transition-shadow duration-300">
            <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />
            <p className="text-slate-700 italic mb-6 relative z-10 leading-relaxed">"{t.text}"</p>
            <div>
              <h4 className="font-bold text-slate-900">{t.name}</h4>
              <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">{t.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-slate-500">Everything you need to know about the process.</p>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-slate-900">{faq.q}</span>
                {openIndex === i ? <Minus className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-gray-400" />}
              </button>
              <div className={`px-6 pb-6 text-slate-600 leading-relaxed ${openIndex === i ? 'block' : 'hidden'}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MegaMenu = ({ activeMenu, closeMenu, onNavigate, onServiceClick }) => {
  if (!activeMenu) return null;

  const getNavKey = (menu) => {
    switch (menu) {
      case 'Startup': return 'startup';
      case 'MCA': return 'mca';
      case 'Compliance': return 'compliance';
      case 'Global': return 'global';
      case 'Registrations': return 'registrations';
      case 'Trademark': return 'trademark';
      case 'Goods & Services Tax': return 'gst';
      case 'Income Tax': return 'incometax';
      default: return 'home';
    }
  };

  return (
    <div
      className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100 py-10 px-4 z-50 transition-all duration-300 animate-fade-in origin-top"
      onMouseLeave={closeMenu}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-10">
        <div className="col-span-1 bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100/50">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">{activeMenu}</h3>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Professional assistance for all your {activeMenu.toLowerCase()} requirements. Fast, secure, and fully online.
          </p>
          <button
            onClick={() => {
              onNavigate(getNavKey(activeMenu));
              closeMenu();
            }}
            className="text-blue-600 font-bold text-sm flex items-center hover:translate-x-1 transition-transform"
          >
            View All Services <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-y-3 gap-x-6">
          {NAV_MENU[activeMenu]?.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onServiceClick(item.name);
                closeMenu();
              }}
              className="group flex items-center text-left text-slate-600 hover:text-blue-700 p-2 rounded-lg transition-colors hover:bg-blue-50/50"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-600 mr-3 shrink-0 transition-colors"></div>
              <span className="font-medium text-sm">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// SVG Icon placeholder for Wallet
const Wallet = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
  </svg>
);

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-50 flex font-inter">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white hidden md:flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">L</div>
            <span className="font-bold text-xl tracking-tight text-white">LEDGERS</span>
          </div>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2">
          {[
            { id: 'overview', icon: LayoutGrid, label: 'Overview' },
            { id: 'services', icon: Briefcase, label: 'My Services' },
            { id: 'compliance', icon: FileCheck, label: 'Compliance' },
            { id: 'documents', icon: FileText, label: 'Documents' },
            { id: 'payments', icon: CreditCard, label: 'Payments' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center space-x-3 mb-6 p-3 bg-slate-800 rounded-xl border border-slate-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm shadow-md">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-white">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full py-2.5 px-4 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 rounded-lg text-sm text-slate-300 font-medium transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between md:hidden shadow-sm z-10">
          <span className="font-bold text-slate-900 text-lg">LEDGERS</span>
          <button onClick={onLogout} className="text-sm text-red-600 font-medium">Logout</button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto">

            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Welcome back to your business command center.</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">Last synced: Just now</span>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div className="bg-green-50 p-3 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">Good Standing</span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Compliance Score</h3>
                    <div className="flex items-end mt-2">
                      <p className="text-4xl font-extrabold text-slate-900">98</p>
                      <span className="text-slate-400 mb-1 ml-1 text-lg">/100</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div className="bg-orange-50 p-3 rounded-xl">
                        <Bell className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full">2 Pending</span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Action Items</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-2">Tax Filing Due</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <Wallet className="w-6 h-6 text-blue-600" />
                      </div>
                      <button className="text-blue-600 text-xs font-bold hover:underline">Add Funds</button>
                    </div>
                    <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Wallet Balance</h3>
                    <p className="text-3xl font-extrabold text-slate-900 mt-2">₹0.00</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-lg text-slate-900">Recent Applications</h3>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All Applications</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {[
                      { service: "GST Registration", status: "Processing", date: "Oct 24, 2025" },
                      { service: "DSC Class 3", status: "Completed", date: "Sep 12, 2025" },
                      { service: "Udyam Registration", status: "Completed", date: "Aug 05, 2025" },
                    ].map((item, i) => (
                      <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-blue-50/30 transition-colors">
                        <div className="flex items-center space-x-5">
                          <div className={`w-2.5 h-2.5 rounded-full ring-4 ring-opacity-20 ${item.status === 'Completed' ? 'bg-green-500 ring-green-500' : 'bg-orange-500 ring-orange-500'}`}></div>
                          <div>
                            <p className="font-semibold text-slate-900">{item.service}</p>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">Ref: <span className="font-mono text-slate-500">#{1000 + i}</span></p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                            {item.status}
                          </span>
                          <p className="text-xs text-slate-400 mt-2 font-medium">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs remain similar but can also be enhanced */}
            {activeTab !== 'overview' && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="p-6 rounded-full bg-slate-100 mb-6">
                  <Lock className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Feature Coming Soon</h3>
                <p className="text-slate-500 max-w-sm mt-2">This section of the dashboard is currently under development in this prototype.</p>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

const HomeLanding = ({ filteredServices, setShowModal, setSearchQuery, searchQuery, onNavigate, onSearchInput }) => {
  const resultsRef = useRef(null);

  const handleSearch = (e) => {
    onSearchInput(e.target.value);
    setSearchQuery(e.target.value);

    // If there is a query, scroll to results
    if (e.target.value && resultsRef.current) {
      // Debounce slightly or just scroll
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="animate-slide-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-24 pb-32 px-4 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-bl from-blue-50 to-transparent skew-x-[-20deg] translate-x-20 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full blur-[100px] opacity-40"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center bg-white border border-blue-100/60 rounded-full px-4 py-1.5 mb-10 shadow-sm animate-fade-in">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[11px] font-bold text-slate-600 tracking-widest uppercase">Trusted by 1 Million+ Businesses</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
            Launch Your Business <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              in Just 10 Minutes
            </span>
          </h1>

          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            India's largest cloud platform for business services.
            From Incorporation to Trademark, GST, and Income Tax — we handle the compliance so you can focus on growth.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto w-full mb-16">
            <div className="relative w-full group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <input
                type="text"
                placeholder="Search 'Private Limited' or 'Trademark'..."
                className="relative w-full px-6 py-5 rounded-xl border border-gray-200 shadow-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg text-slate-700 placeholder:text-slate-400"
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={(e) => e.key === 'Enter' && scrollToResults()}
              />
              <Search
                className="absolute right-6 top-6 text-slate-400 w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={scrollToResults}
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock Partner Logos - Use text with distinct fonts or generic SVGs for now */}
            <span className="font-bold text-2xl text-slate-400">Google</span>
            <span className="font-bold text-2xl text-slate-400">ICICI Bank</span>
            <span className="font-bold text-2xl text-slate-400">Razorpay</span>
            <span className="font-bold text-2xl text-slate-400">DBS</span>
          </div>
        </div>
      </section>

      {/* BROWSE BY CATEGORY SECTION (NEW) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Browse by Category</h2>
            <p className="text-slate-500 text-lg">Select a service category to get started</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {HOME_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => onNavigate(cat.id)}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
                >
                  <div className={`w-14 h-14 rounded-full bg-${cat.color}-50 flex items-center justify-center mb-4 group-hover:bg-${cat.color}-600 transition-colors duration-300`}>
                    <Icon className={`w-6 h-6 text-${cat.color}-600 group-hover:text-white transition-colors duration-300`} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{cat.label}</h3>
                  <span className="text-xs text-slate-400 font-medium">Explore Services &rarr;</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={resultsRef} className="py-24 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Popular Services</h2>
            <p className="text-slate-500 text-lg">Everything you need to start and run your business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => setShowModal(service)}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="px-10 py-4 bg-white border border-gray-200 text-slate-700 font-bold rounded-xl hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm hover:shadow-md">
              View All 200+ Services
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight leading-tight">Why <span className="text-blue-400">UPRA fillings?</span></h2>
              <p className="text-slate-400 text-xl mb-12 leading-relaxed">
                We combine modern technology with traditional expertise to provide you with the best business services experience in India.
              </p>

              <div className="space-y-8">
                {[
                  { title: "AI-Powered Platform", desc: "Our LEDGERS platform automates accounting and compliance." },
                  { title: "Dedicated Experts", desc: "Get assigned a dedicated Relationship Manager for your business." },
                  { title: "Transparent Pricing", desc: "No hidden fees. Pay for what you see." },
                  { title: "Super Fast Service", desc: "We are obsessed with speed and efficiency." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mr-6 group-hover:bg-blue-600 transition-colors duration-300 shrink-0">
                      <CheckCircle className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 shadow-2xl">
              <div className="grid grid-cols-2 gap-8 mb-10">
                {STATS.map((stat, idx) => (
                  <div key={idx} className="text-center p-6 bg-slate-700/30 rounded-2xl border border-slate-600/30">
                    <p className="text-4xl font-extrabold text-blue-400 mb-2">{stat.value}</p>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-center shadow-lg shadow-blue-900/50">
                <h3 className="font-bold text-2xl mb-3">Ready to start?</h3>
                <p className="text-blue-100 mb-6 text-lg">Talk to an expert today for free.</p>
                <button className="bg-white text-blue-700 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 w-full transition-colors shadow-lg">
                  Request Callback
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Sections for Professional Polish */}
      <TestimonialSection />
      <FAQSection />
    </div>
  );
};

const StartupLanding = ({ onServiceClick }) => (
  <div className="animate-slide-in bg-white font-inter">
    {/* Startup Hero */}
    <section className="bg-slate-900 text-white pt-32 pb-40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-20"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block bg-blue-600/20 backdrop-blur-md text-blue-300 text-xs font-bold px-4 py-2 rounded-full mb-8 border border-blue-500/30 uppercase tracking-wider">
            #1 Platform for Startups
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
            Turn Your Idea Into a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Registered Business.</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
            From company registration to IP protection and fundraising, UPRA Fillings is your trusted partner in the startup journey. Join thousands of founders who started here.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg shadow-blue-900/50">
              Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="bg-white/5 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors border border-white/10">
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-gray-50 px-4 -mt-20 relative z-20 rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NAV_MENU.Startup.map((item, idx) => (
            <ServiceCard
              key={idx}
              service={{
                title: item.name,
                desc: "Comprehensive startup registration services with expert guidance.",
                icon: Building,
                price: "Enquire"
              }}
              onClick={() => onServiceClick(item.name)}
            />
          ))}
        </div>
      </div>
    </section>
    <FAQSection />
  </div>
);

const MCALanding = ({ onServiceClick }) => {
  return (
    <div className="animate-slide-in bg-white">
      <section className="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-emerald-600/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-emerald-500/30">
              Ministry of Corporate Affairs Services
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Master Your <br />
              <span className="text-emerald-400">Corporate Compliance.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              From company incorporation to annual filings and director changes, we simplify MCA compliance so you can focus on business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center">
                Explore Services <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50 px-4 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NAV_MENU.MCA.map((item, idx) => (
              <ServiceCard
                key={idx}
                service={{
                  title: item.name,
                  desc: "Expert MCA filing and compliance services for your company.",
                  icon: FileText,
                  price: "Enquire"
                }}
                onClick={() => onServiceClick(item.name)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ComplianceLanding = ({ onServiceClick }) => {
  return (
    <div className="animate-slide-in bg-white">
      <section className="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-indigo-600/30 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-indigo-500/30">
              Complete Compliance Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Stay Compliant, <br />
              <span className="text-indigo-400">Avoid Penalties.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              We handle your TDS, PF, ESI, Payroll, and RoC filings so you can run your business worry-free. Dedicated experts for your company.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center">
                Get Compliant Now <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50 px-4 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NAV_MENU.Compliance.map((item, idx) => (
              <ServiceCard
                key={idx}
                service={{
                  title: item.name,
                  desc: "End-to-end statutory compliance services to keep your business safe.",
                  icon: Shield,
                  price: "Enquire"
                }}
                onClick={() => onServiceClick(item.name)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const GlobalLanding = ({ onServiceClick }) => {
  return (
    <div className="animate-slide-in bg-white">
      <section className="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-600/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-cyan-600/30 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-cyan-500/30">
              International Business Services
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Expand Your Business <br />
              <span className="text-cyan-400">Globally.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              Incorporate in USA, UK, Singapore, or Dubai. We handle cross-border registrations, international taxation, and global IP protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-cyan-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-cyan-700 transition-colors flex items-center justify-center">
                Go Global <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50 px-4 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NAV_MENU.Global.map((item, idx) => (
              <ServiceCard
                key={idx}
                service={{
                  title: item.name,
                  desc: "Expand your business internationally with our expert guidance.",
                  icon: Globe,
                  price: "Enquire"
                }}
                onClick={() => onServiceClick(item.name)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const RegistrationsLanding = ({ onServiceClick }) => {
  return (
    <div className="animate-slide-in bg-white">
      <section className="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-green-600/30 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-green-500/30">
              Government Registrations
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Essential Licenses <br />
              <span className="text-green-400">Made Simple.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              Get FSSAI, Shop Act, Udyam, and other mandatory government registrations online. 100% digital process with expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center">
                Start Registration <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50 px-4 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NAV_MENU.Registrations.map((item, idx) => (
              <ServiceCard
                key={idx}
                service={{
                  title: item.name,
                  desc: "Obtain necessary government registrations and licenses quickly.",
                  icon: FileText,
                  price: "Enquire"
                }}
                onClick={() => onServiceClick(item.name)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const TrademarkLanding = ({ onServiceClick }) => {
  return (
    <div className="animate-slide-in bg-white">
      <section className="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-600/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-rose-600/30 text-rose-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-rose-500/30">
              Intellectual Property Rights
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Protect Your <br />
              <span className="text-rose-400">Brand Identity.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              Secure your brand name, logo, and slogan with our expert trademark services. From search to registration and objection handling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-rose-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-rose-700 transition-colors flex items-center justify-center">
                Secure Your Brand <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50 px-4 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NAV_MENU.Trademark.map((item, idx) => (
              <ServiceCard
                key={idx}
                service={{
                  title: item.name,
                  desc: "Comprehensive IPR services including trademark, copyright, and patent.",
                  icon: Award,
                  price: "Enquire"
                }}
                onClick={() => onServiceClick(item.name)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const GSTLanding = ({ onServiceClick }) => {
  return (
    <div className="animate-slide-in bg-white">
      <section className="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-600/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-amber-600/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-amber-500/30">
              Goods & Services Tax
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Seamless GST <br />
              <span className="text-amber-400">Compliance.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              From fresh registration to monthly return filing and e-invoicing. We ensure your business is always GST compliant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-amber-700 transition-colors flex items-center justify-center">
                Get GST Ready <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50 px-4 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NAV_MENU["Goods & Services Tax"].map((item, idx) => (
              <ServiceCard
                key={idx}
                service={{
                  title: item.name,
                  desc: "Complete GST solutions including registration, filing, and advisory.",
                  icon: Calculator,
                  price: "Enquire"
                }}
                onClick={() => onServiceClick(item.name)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const IncomeTaxLanding = ({ onServiceClick }) => {
  return (
    <div className="animate-slide-in bg-white">
      <section className="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-blue-600/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-blue-500/30">
              Income Tax Services
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Smart Tax <br />
              <span className="text-blue-400">Planning & Filing.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              Maximize your refunds and stay compliant. Expert assisted ITR filing for salaried, businesses, and professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center">
                File ITR Now <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50 px-4 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NAV_MENU["Income Tax"].map((item, idx) => (
              <ServiceCard
                key={idx}
                service={{
                  title: item.name,
                  desc: "Expert income tax filing and planning services.",
                  icon: Percent,
                  price: "Enquire"
                }}
                onClick={() => onServiceClick(item.name)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  // ... [No changes needed in App component logic, just ensure props are passed correctly] ...
  // Re-pasting App for context, but logic remains same as previous step, just ensuring props passed.
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Updated view state to handle all new pages
  const [view, setView] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    setUser({ name: "Demo User", email: "user@example.com" });
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    setView('service');
    setMobileMenuOpen(false);
  };

  const filteredServices = searchQuery
    ? POPULAR_SERVICES.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : POPULAR_SERVICES;

  // View Mapping logic for main nav
  const handleNavClick = (menuName) => {
    switch (menuName) {
      case 'Startup': setView('startup'); break;
      case 'MCA': setView('mca'); break;
      case 'Compliance': setView('compliance'); break;
      case 'Global': setView('global'); break;
      case 'Registrations': setView('registrations'); break;
      case 'Trademark': setView('trademark'); break;
      case 'Goods & Services Tax': setView('gst'); break;
      case 'Income Tax': setView('incometax'); break;
      default: setView('home');
    }
  };

  const handleSearchInput = (value) => {
    // If user types in global search and is not on home, go to home
    if (value && view !== 'home') {
      setView('home');
    }
  };

  // Login View
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-inter">
        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Sign in to access your dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input type="email" required className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="name@company.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input type="password" required className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
              Secure Login
            </button>
          </form>
          <div className="mt-8 text-center">
            <button onClick={() => setView('home')} className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  if (view === 'dashboard' && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // Public Home View
  return (
    <div className="min-h-screen bg-white font-inter text-slate-800 antialiased">
      {/* Inject Global Styles for Animations and Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>

      {/* Top Bar - Made darker for contrast */}
      <div className="bg-[#0B2447] text-slate-300 text-xs py-2.5 px-4 md:px-8 flex justify-between items-center font-medium tracking-wide">
        <div className="flex space-x-6">
          <span className="flex items-center hover:text-white transition-colors cursor-pointer"><Phone className="w-3 h-3 mr-2 text-cyan-400" /> 044-4000-4000</span>
          <span className="flex items-center hover:text-white transition-colors cursor-pointer"><Mail className="w-3 h-3 mr-2 text-cyan-400" /> help@uprafillings.com</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Articles</a>
          <a href="#" className="hover:text-white transition-colors">Nearest Office</a>
        </div>
      </div>

      {/* Main Navbar - Glass Effect */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-500 ${isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 py-3'
            : 'bg-white border-b border-gray-100 py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView('home')}>
              <Logo />
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex space-x-8">
              {Object.keys(NAV_MENU).map((menu) => (
                <div
                  key={menu}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => setActiveMenu(menu)}
                >
                  <button
                    onClick={() => handleNavClick(menu)}
                    className={`flex items-center text-sm font-semibold py-2 transition-colors ${(view === 'startup' && menu === 'Startup') ||
                        (view === 'mca' && menu === 'MCA') ||
                        (view === 'compliance' && menu === 'Compliance') ||
                        (view === 'global' && menu === 'Global') ||
                        (view === 'registrations' && menu === 'Registrations') ||
                        (view === 'trademark' && menu === 'Trademark') ||
                        (view === 'gst' && menu === 'Goods & Services Tax') ||
                        (view === 'incometax' && menu === 'Income Tax')
                        ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                      }`}
                  >
                    {menu} <ChevronDown className="w-3 h-3 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 w-64 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search services..."
                className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-700 placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearchInput(e.target.value);
                }}
              />
            </div>
            <button
              onClick={() => setView('login')}
              className="hidden md:flex items-center px-6 py-2.5 bg-[#0B2447] text-white rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <User className="w-4 h-4 mr-2" /> Login
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2 text-slate-600">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mega Menu Container */}
        <div onMouseLeave={() => setActiveMenu(null)}>
          <MegaMenu
            activeMenu={activeMenu}
            closeMenu={() => setActiveMenu(null)}
            onNavigate={handleNavClick}
            onServiceClick={handleServiceClick}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 pt-24 px-6 overflow-y-auto xl:hidden animate-fade-in">
          <div className="flex flex-col space-y-6 pb-20">
            {Object.keys(NAV_MENU).map((menu) => (
              <div key={menu} className="border-b border-gray-100 pb-4">
                <button
                  onClick={() => { handleNavClick(menu); setMobileMenuOpen(false); }}
                  className="font-bold text-xl text-slate-900 mb-4 block w-full text-left flex justify-between items-center"
                >
                  {menu} <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <div className="pl-4 space-y-3">
                  {NAV_MENU[menu].slice(0, 5).map((sub, i) => ( // Show only first 5 on mobile to save space
                    <button
                      key={i}
                      onClick={() => handleServiceClick(sub.name)}
                      className="block w-full text-left text-slate-500 font-medium py-1"
                    >
                      {sub.name}
                    </button>
                  ))}
                  <button onClick={() => handleNavClick(menu)} className="text-blue-600 font-bold text-sm mt-2">View All...</button>
                </div>
              </div>
            ))}
            <button
              onClick={() => setView('login')}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg mt-4 shadow-lg shadow-blue-300"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      )}

      {/* VIEW CONTENT RENDERER */}
      {view === 'home' && (
        <HomeLanding
          filteredServices={filteredServices}
          setShowModal={setShowModal}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNavigate={handleNavClick}
          onSearchInput={handleSearchInput}
        />
      )}

      {view === 'startup' && <StartupLanding onServiceClick={handleServiceClick} />}
      {view === 'mca' && <MCALanding onServiceClick={handleServiceClick} />}
      {view === 'compliance' && <ComplianceLanding onServiceClick={handleServiceClick} />}
      {view === 'global' && <GlobalLanding onServiceClick={handleServiceClick} />}
      {view === 'registrations' && <RegistrationsLanding onServiceClick={handleServiceClick} />}
      {view === 'trademark' && <TrademarkLanding onServiceClick={handleServiceClick} />}
      {view === 'gst' && <GSTLanding onServiceClick={handleServiceClick} />}
      {view === 'incometax' && <IncomeTaxLanding onServiceClick={handleServiceClick} />}

      {view === 'service' && (
        <ServicePage
          serviceName={selectedService}
          onBack={() => setView('home')}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200 text-sm font-medium text-slate-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Logo />
            </div>
            <p className="mb-8 leading-relaxed">
              India's largest online business services platform dedicated to helping people start and grow their business, at an affordable cost.
            </p>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer shadow-sm">
                  <Globe className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-base">Start A Business</h4>
            <ul className="space-y-3">
              <li><button onClick={() => handleServiceClick('Proprietorship')} className="hover:text-blue-600 transition-colors">Proprietorship</button></li>
              <li><button onClick={() => handleServiceClick('Partnership')} className="hover:text-blue-600 transition-colors">Partnership</button></li>
              <li><button onClick={() => handleServiceClick('Private Limited Company')} className="hover:text-blue-600 transition-colors">Private Limited</button></li>
              <li><button onClick={() => handleServiceClick('LLP Registration')} className="hover:text-blue-600 transition-colors">LLP Registration</button></li>
              <li><button onClick={() => handleServiceClick('One Person Company')} className="hover:text-blue-600 transition-colors">One Person Company</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-base">Registrations</h4>
            <ul className="space-y-3">
              <li><button onClick={() => handleServiceClick('GST Registration')} className="hover:text-blue-600 transition-colors">GST Registration</button></li>
              <li><button onClick={() => handleServiceClick('Trademark Registration')} className="hover:text-blue-600 transition-colors">Trademark</button></li>
              <li><button onClick={() => handleServiceClick('FSSAI License')} className="hover:text-blue-600 transition-colors">FSSAI License</button></li>
              <li><button onClick={() => handleServiceClick('Import Export Code')} className="hover:text-blue-600 transition-colors">Import Export Code</button></li>
              <li><button onClick={() => handleServiceClick('Digital Signature')} className="hover:text-blue-600 transition-colors">Digital Signature</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-base">Compliance</h4>
            <ul className="space-y-3">
              <li><button onClick={() => handleServiceClick('Income Tax Filing')} className="hover:text-blue-600 transition-colors">Income Tax Filing</button></li>
              <li><button onClick={() => handleServiceClick('GST Returns')} className="hover:text-blue-600 transition-colors">GST Returns</button></li>
              <li><button onClick={() => handleServiceClick('TDS Return')} className="hover:text-blue-600 transition-colors">TDS Return</button></li>
              <li><button onClick={() => handleServiceClick('ESI & PF')} className="hover:text-blue-600 transition-colors">ESI & PF</button></li>
              <li><button onClick={() => handleServiceClick('Annual Compliance')} className="hover:text-blue-600 transition-colors">Annual Compliance</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-base">Tools</h4>
            <ul className="space-y-3">
              <li><button onClick={() => handleServiceClick('GST Calculator')} className="hover:text-blue-600 transition-colors">GST Calculator</button></li>
              <li><button onClick={() => handleServiceClick('Business Search')} className="hover:text-blue-600 transition-colors">Business Search</button></li>
              <li><button onClick={() => handleServiceClick('Trademark Search')} className="hover:text-blue-600 transition-colors">Trademark Search</button></li>
              <li><button onClick={() => handleServiceClick('HSN Code Finder')} className="hover:text-blue-600 transition-colors">HSN Code Finder</button></li>
              <li><button onClick={() => handleServiceClick('LEDGERS Software')} className="hover:text-blue-600 transition-colors">LEDGERS Software</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-gray-200 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-400">
          <p>&copy; 2026 UPRA fillings Private Limited. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0 font-semibold">
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Refund Policy</a>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl transform transition-all scale-100">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <showModal.icon className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{showModal.title}</h3>
                  <p className="text-blue-600 font-bold text-lg">{showModal.price}</p>
                </div>
              </div>
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              Start your {showModal.title} process completely online. Our experts will guide you through every step of the way, ensuring compliance and peace of mind.
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-4">What is included?</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-slate-600 font-medium"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Application Filing</li>
                <li className="flex items-center text-sm text-slate-600 font-medium"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Government Fees</li>
                <li className="flex items-center text-sm text-slate-600 font-medium"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Expert Consultation</li>
                <li className="flex items-center text-sm text-slate-600 font-medium"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Document Verification</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => { setShowModal(null); setView('login'); }}
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Buy Now
              </button>
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 bg-white border-2 border-gray-100 text-slate-700 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-200 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-3 md:hidden flex justify-between items-center z-40 pb-safe">
        <div className="flex flex-col items-center flex-1 text-blue-600">
          <Home className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center flex-1 text-gray-400" onClick={() => setView('login')}>
          <LayoutGrid className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </div>
        <div className="flex flex-col items-center flex-1 text-gray-400">
          <Phone className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-medium">Contact</span>
        </div>
        <div className="flex-1">
          <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;