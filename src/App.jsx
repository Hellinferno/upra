import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import {
  Search, Menu, X, ChevronDown, ChevronRight, CheckCircle,
  Shield, User, FileText, Briefcase, Calculator,
  Phone, Mail, Globe, Lock, Bell, LayoutGrid,
  CreditCard, FileCheck, Home, Users, Building,
  Rocket, Award, HelpCircle, ArrowRight, ArrowLeft, Star,
  Plane, Scale, FileSpreadsheet, Percent, Landmark, Quote, Plus, Minus, Smartphone, Key, Briefcase as BriefcaseIcon, UploadCloud, Download, Info, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILITIES ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- FIREBASE CONFIGURATION ---
// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyBIKIbQvBUNOGHY3qO-pS7Y6i6KT4JDw6U",
  authDomain: "upra-filings.firebaseapp.com",
  projectId: "upra-filings",
  storageBucket: "upra-filings.firebasestorage.app",
  messagingSenderId: "628753511218",
  appId: "1:628753511218:web:5fe5825d1a058537815d2b",
  measurementId: "G-E87FQ7KHQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// --- CONSTANTS & DATA MAPPING ---
const SERVICE_PROFESSION_MAP = {
  "Private Limited Company": ["CS", "CA"],
  "Limited Liability Partnership": ["CS", "CA"],
  "One Person Company": ["CS", "CA"],
  "GST Registration": ["CA", "Tax Consultant"],
  "Trademark Registration": ["Lawyer", "CS"],
  "Income Tax Return": ["CA", "Tax Consultant"],
  "FSSAI Registration": ["Other", "CA"],
};

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

const SERVICE_DETAILS = {
  "Limited Liability Partnership": {
    title: "Limited Liability Partnership (LLP) Registration",
    description: "A balanced business structure governed by the Limited Liability Partnership Act, 2008, combining the flexibility of a partnership with the advantages of limited liability.",
    whatIs: "An LLP is a corporate business vehicle that enables professional expertise and entrepreneurial initiative to combine and operate in a flexible, innovative, and efficient manner. It is a separate legal entity from its partners.",
    requirements: [
      "Minimum 2 Designated Partners",
      "At least one Designated Partner must be an Indian Resident",
      "Registered Office Address in India",
      "Digital Signature Certificate (DSC) for partners",
      "LLP Deed Drafting"
    ],
    process: [
      { title: "DSC & DPIN", desc: "Obtain Digital Signature and Designated Partner Identification Number." },
      { title: "Name Approval", desc: "File RUN-LLP form for reserving the unique name." },
      { title: "Incorporation (FiLLiP)", desc: "File Form FiLLiP with the Registrar of Companies (RoC)." },
      { title: "LLP Agreement", desc: "File Form 3 (LLP Agreement) within 30 days of incorporation." }
    ],
    pros: [
      "Limited Liability protection for partners.",
      "No Minimum Capital Contribution.",
      "Lower compliance cost than Pvt Ltd.",
      "Dividend Distribution Tax (DDT) not applicable."
    ],
    cons: [
      "Cannot raise funds via IPO.",
      "Penalty for non-compliance is high (₹100/day).",
      "FDI restrictions in certain sectors."
    ],
    documents: [
      "PAN Card & ID Proof of Partners",
      "Address Proof (Voter ID/Passport/Driving License)",
      "Passport Size Photo",
      "Proof of Registered Office (Rent Agreement + NOC + Utility Bill)"
    ]
  },
  "Private Limited Company": {
    title: "Private Limited Company Registration",
    description: "The most popular legal structure for businesses and startups in India, governed by the Companies Act, 2013.",
    whatIs: "A Private Limited Company is a company held by small group of people. It is registered with the Ministry of Corporate Affairs (MCA). It is a separate legal entity with perpetual succession and limited liability.",
    requirements: [
      "Minimum 2 Directors and 2 Shareholders (can be same)",
      "Maximum 200 Shareholders",
      "At least one Director must be Indian Resident",
      "Registered Office in India",
      "Unique Company Name"
    ],
    process: [
      { title: "DSC Application", desc: "Obtain Digital Signatures for all Directors." },
      { title: "Name Reservation", desc: "Apply via SPICe+ Part A for name availability." },
      { title: "Incorporation (SPICe+)", desc: "File SPICe+ Part B along with MOA (INC-33) and AOA (INC-34)." },
      { title: "PAN & TAN", desc: "Auto-generated along with the Certificate of Incorporation." }
    ],
    pros: [
      "Easy to raise funds (Equity/VC).",
      "Limited Liability for shareholders.",
      "High credibility and trust factor.",
      "Separate Legal Entity status."
    ],
    cons: [
      "High compliance requirement.",
      "Mandatory Statutory Audit every year.",
      "Restrictions on share transfer."
    ],
    documents: [
      "PAN Card of all Directors/Shareholders",
      "Aadhar/Voter ID/Passport",
      "Bank Statement/Utility Bill (latest)",
      "Rent Agreement & NOC for Office",
      "Passport photos"
    ]
  },
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
    <div className="flex items-baseline leading-none">
      <h1 className="text-4xl font-black tracking-tighter text-[#0B2447] m-0 p-0">UPR</h1>
      <div className="relative w-10 h-10 ml-0.5 flex items-end justify-center">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M50 5 L100 95 H78 L65 70 H35 L22 95 H0 L50 5Z" className="fill-cyan-400" />
          <path d="M40 70 L55 40 L55 60 L70 60 L48 95 L48 70 H40Z" fill="white" />
        </svg>
      </div>
    </div>
    <div className="text-[8px] font-bold text-[#0B2447] tracking-wide mt-0.5 uppercase whitespace-nowrap">
      Registration <span className="text-cyan-400">|</span> Taxation <span className="text-cyan-400">|</span> Compliance
    </div>
  </div>
);

// --- Infinite Grid Effect (Pure CSS/SVG version) ---
const InfiniteGrid = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Moving Light Effect */}
      <div
        className="absolute inset-0 z-0 opacity-40 bg-gradient-to-tr from-blue-100/50 via-transparent to-transparent"
        style={{
          animation: 'pulse 5s infinite alternate'
        }}
      ></div>
      <style>{`
         @keyframes pulse {
           0% { opacity: 0.3; transform: scale(1); }
           100% { opacity: 0.5; transform: scale(1.05); }
         }
       `}</style>
    </div>
  );
};

const ServiceCard = ({ service, onClick }) => {
  const Icon = service.icon || FileText;
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

// --- SERVICE PAGE with "Booking" ---
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
          </div>
        </div>
      </section>

      {content.whatIs && (
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What is it?</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{content.whatIs}</p>
              </div>
            </div>
          </div>
        </section>
      )}

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

const PartnersLogin = ({ onBack, setUser, setView }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Extended Registration State
  const [fullName, setFullName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [mobile, setMobile] = useState('');
  const [profession, setProfession] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [error, setError] = useState('');

  // New state for password reset
  const [isResetting, setIsResetting] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handlePartnerAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (!auth) {
      const mockUser = {
        name: isSignUp ? fullName : "Demo Partner",
        email: email,
        isPartner: true,
        profession: isSignUp ? profession : "CA", // Default to CA for demo
        uid: "partner_" + Date.now()
      };
      setUser(mockUser);
      setView('partnerDashboard'); // New specific dashboard
      return;
    }

    try {
      if (isSignUp) {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: `${fullName} (Partner)` });

        // In a real app, you would save these extra details (mobile, city, etc.) to Firestore here
        setUser({
          name: fullName,
          email: email,
          isPartner: true,
          profession: profession,
          uid: userCredential.user.uid
        });
      } else {
        // Login Logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser({
          name: userCredential.user.displayName || "Partner",
          email: userCredential.user.email,
          isPartner: true,
          profession: "CA", // Fallback for demo as we don't have DB here
          uid: userCredential.user.uid
        });
      }
      setView('partnerDashboard');
    } catch (err) {
      console.error(err);
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    if (!resetEmail) return setError("Please enter your email address.");

    if (!auth) {
      setError("Firebase configuration missing.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Check your inbox.");
      setIsResetting(false);
      setResetEmail('');
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-inter">
      <div className={`bg-white w-full ${isSignUp ? 'max-w-2xl' : 'max-w-md'} p-10 rounded-3xl shadow-2xl border border-gray-100 relative transition-all duration-300`}>
        <button onClick={onBack} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
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

            <button type="submit" className="w-full bg-purple-600 text-white py-3.5 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30">
              {isSignUp ? "Register as Partner" : "Access Portal"}
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

// --- CLIENT DASHBOARD (Enhanced to show Orders) ---
const Dashboard = ({ user, onLogout, orders }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Filter orders for this specific user (In mock, user.uid matches)
  // For demo, we show all if no filtering logic is rigorous, but let's try to match
  const myOrders = orders; // In real app: orders.filter(o => o.userId === user.uid)

  return (
    <div className="min-h-screen bg-slate-50 flex font-inter">
      {/* ... [Sidebar Same as before] ... */}
      <div className="w-72 bg-slate-900 text-white hidden md:flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-slate-800"><span className="font-bold text-xl">CLIENT PANEL</span></div>
        <nav className="flex-1 py-8 px-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className="w-full text-left px-4 py-2 text-slate-300 hover:text-white">Overview</button>
          <button onClick={() => setActiveTab('orders')} className="w-full text-left px-4 py-2 text-slate-300 hover:text-white">My Orders</button>
        </nav>
        <div className="p-6"><button onClick={onLogout} className="text-red-400">Logout</button></div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Hello, {user.name}</h1>

            {/* Dynamic Orders List */}
            {activeTab === 'orders' || activeTab === 'overview' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Your Service Requests</h2>
                {myOrders.length === 0 ? (
                  <div className="p-8 bg-white rounded-xl text-center text-slate-500">No active orders found. Book a service to get started!</div>
                ) : (
                  myOrders.map((order, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-lg text-slate-900">{order.service}</h4>
                        <p className="text-sm text-slate-500">Booked on: {new Date(order.date).toLocaleDateString()}</p>
                        <p className="text-xs text-slate-400 mt-1">Order ID: #{1000 + idx}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 
                                        ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'}`}>
                          {order.status}
                        </span>
                        {order.status === 'Completed' && (
                          <button className="flex items-center text-blue-600 text-sm font-bold mt-1">
                            <Download className="w-4 h-4 mr-1" /> Download
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

// --- PARTNER DASHBOARD (New Component) ---
const PartnerDashboard = ({ user, onLogout, orders, onAcceptOrder, onSubmitWork }) => {
  // Filter available jobs based on partner profession
  // e.g. If partner is CA, they see CA jobs.
  const myProfession = user.profession || "CA";

  const availableJobs = orders.filter(o =>
    o.status === 'Pending Allocation' &&
    SERVICE_PROFESSION_MAP[o.service]?.includes(myProfession)
  );

  const myActiveJobs = orders.filter(o => o.assignedPartner === user.name && o.status === 'In Progress');
  const myCompletedJobs = orders.filter(o => o.assignedPartner === user.name && o.status === 'Completed');

  return (
    <div className="min-h-screen bg-slate-50 flex font-inter">
      {/* Partner Sidebar */}
      <div className="w-72 bg-purple-900 text-white hidden md:flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-purple-800">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-xl tracking-tight text-white">PARTNER PANEL</span>
          </div>
          <p className="text-xs text-purple-300 mt-1">{user.name} ({myProfession})</p>
        </div>
        <div className="p-6"><button onClick={onLogout} className="text-white bg-purple-800 px-4 py-2 rounded">Logout</button></div>
      </div>

      <main className="flex-1 overflow-y-auto p-10">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">Workstation</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Jobs Column */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-slate-700 flex items-center"><Bell className="w-5 h-5 mr-2" /> New Opportunities</h2>
            <div className="space-y-4">
              {availableJobs.length === 0 && <p className="text-slate-400 italic">No new jobs matching your profile.</p>}
              {availableJobs.map((job, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                  <h4 className="font-bold text-lg">{job.service}</h4>
                  <p className="text-sm text-slate-500 mb-4">Client: {job.fullName}</p>
                  <button
                    onClick={() => onAcceptOrder(job)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700"
                  >
                    Accept & Start
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Jobs Column */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-slate-700 flex items-center"><BriefcaseIcon className="w-5 h-5 mr-2" /> My Active Jobs</h2>
            <div className="space-y-4">
              {myActiveJobs.length === 0 && <p className="text-slate-400 italic">You have no active jobs.</p>}
              {myActiveJobs.map((job, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                  <h4 className="font-bold text-lg">{job.service}</h4>
                  <div className="my-4 bg-slate-50 p-3 rounded text-xs text-slate-600">
                    <p className="font-bold mb-1">Documents Uploaded by Client:</p>
                    <ul className="list-disc pl-4">
                      {job.documents?.map((d, k) => <li key={k}>{d}</li>)}
                    </ul>
                  </div>
                  <button
                    onClick={() => onSubmitWork(job)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center"
                  >
                    <UploadCloud className="w-4 h-4 mr-2" /> Submit Completed Work
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const HomeLanding = ({ filteredServices, setShowModal, setSearchQuery, searchQuery, onNavigate, onSearchInput }) => {
  const resultsRef = useRef(null);

  const handleSearch = (e) => {
    onSearchInput(e.target.value);
    setSearchQuery(e.target.value);

    if (e.target.value && resultsRef.current) {
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

const StartupLanding = () => (
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

const MCALanding = () => (
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

const ComplianceLanding = () => (
  <div className="animate-slide-in p-10 max-w-7xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-slate-800">Annual Compliance</h1>
    <p className="mb-8 text-slate-600">Stay compliant with mandatory annual filings for Pvt Ltd, LLP, and OPCs.</p>
  </div>
);

const GlobalLanding = () => (
  <div className="animate-slide-in p-10 max-w-7xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-slate-800">Global Expansion</h1>
    <p className="mb-8 text-slate-600">Incorporate your company in USA, Singapore, Dubai, and UK.</p>
  </div>
);

const RegistrationsLanding = () => (
  <div className="animate-slide-in p-10 max-w-7xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-slate-800">Government Registrations</h1>
    <p className="mb-8 text-slate-600">PF, ESI, FSSAI, ISO, MSME and more.</p>
  </div>
);

const TrademarkLanding = () => (
  <div className="animate-slide-in p-10 max-w-7xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-slate-800">Intellectual Property</h1>
    <p className="mb-8 text-slate-600">Protect your brand with Trademark, Copyright, and Patent filing.</p>
  </div>
);

const GSTLanding = () => (
  <div className="animate-slide-in p-10 max-w-7xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-slate-800">Goods & Services Tax</h1>
    <p className="mb-8 text-slate-600">GST Registration, Filing, and Advisory services.</p>
  </div>
);

const IncomeTaxLanding = () => (
  <div className="animate-slide-in p-10 max-w-7xl mx-auto">
    <h1 className="text-4xl font-bold mb-6 text-slate-800">Income Tax</h1>
    <p className="mb-8 text-slate-600">Personal and Corporate Income Tax Filing services.</p>
  </div>
);

// --- Main App Component ---
const App = () => {
  const [view, setView] = useState('home'); // home, service, dashboard, partnerDashboard, login, partnerLogin
  const [activeService, setActiveService] = useState(null);
  const [user, setUser] = useState(null); // null or user object
  const [activeMenu, setActiveMenu] = useState(null); // For Mega Menu
  const [showOTP, setShowOTP] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Database for Orders
  const [orders, setOrders] = useState([
    { id: 1001, service: 'Private Limited Company', status: 'In Progress', date: '2023-10-15', userId: 'user_123', assignedPartner: 'Demo Partner', documents: ['PAN', 'Aadhar'] },
    { id: 1002, service: 'Trademark Registration', status: 'Completed', date: '2023-09-20', userId: 'user_123', assignedPartner: 'Demo Partner', documents: ['Logo'] }
  ]);

  // Navbar Transition
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Services for Search
  const filteredServices = POPULAR_SERVICES.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleServiceClick = (serviceTitle) => {
    // Find service object or create dummy
    const service = POPULAR_SERVICES.find(s => s.title === serviceTitle) || { title: serviceTitle, desc: "Comprehensive professional service.", price: "₹999" };
    setActiveService(service.title); // Use title as ID for simplicity in this demo
    setView('service');
    setActiveMenu(null);
  };

  const handleBookService = (orderDetails) => {
    if (!user) {
      setShowOTP(true); // Force login
      return;
    }
    // Create Order
    const newOrder = {
      ...orderDetails,
      id: Date.now(),
      userId: user.uid,
      fullName: user.name
    };
    setOrders([newOrder, ...orders]);
    alert("Order Placed Successfully!");
    setView('dashboard');
  };

  const handlePartnerAccept = (job) => {
    const updated = orders.map(o => o.id === job.id ? { ...o, status: 'In Progress', assignedPartner: user.name } : o);
    setOrders(updated);
    alert("Job Accepted! Check 'My Active Jobs'.");
  };

  const handlePartnerSubmit = (job) => {
    const updated = orders.map(o => o.id === job.id ? { ...o, status: 'Completed' } : o);
    setOrders(updated);
    alert("Work Submitted Successfully!");
  };

  const renderContent = () => {
    if (view === 'dashboard' && user) return <Dashboard user={user} orders={orders} onLogout={() => { setUser(null); setView('home'); }} />;
    if (view === 'partnerDashboard' && user) return <PartnerDashboard user={user} orders={orders} onLogout={() => { setUser(null); setView('home'); }} onAcceptOrder={handlePartnerAccept} onSubmitWork={handlePartnerSubmit} />;

    if (view === 'partnerLogin') return <PartnersLogin onBack={() => setView('home')} setUser={setUser} setView={setView} />;

    if (view === 'service' && activeService) return (
      <ServicePage
        serviceName={activeService}
        onBack={() => setView('home')}
        onBook={handleBookService}
      />
    );

    // Dynamic Landing Pages for Categories
    switch (view) {
      case 'startup': return <StartupLanding />;
      case 'mca': return <MCALanding />;
      case 'compliance': return <ComplianceLanding />;
      case 'global': return <GlobalLanding />;
      case 'registrations': return <RegistrationsLanding />;
      case 'trademark': return <TrademarkLanding />;
      case 'gst': return <GSTLanding />;
      case 'incometax': return <IncomeTaxLanding />;
      default: return (
        <HomeLanding
          filteredServices={filteredServices}
          setShowModal={(s) => { setActiveService(s.title); setView('service'); }}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          onNavigate={(v) => {
            if (['startup', 'mca', 'compliance', 'global', 'registrations', 'trademark', 'gst', 'incometax'].includes(v)) {
              setView(v);
            } else {
              handleServiceClick(v);
            }
          }}
          onSearchInput={setSearchQuery}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-white font-inter text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation Bar */}
      {view !== 'dashboard' && view !== 'partnerDashboard' && view !== 'partnerLogin' && (
        <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative">
            <div className="flex items-center gap-12">
              <div onClick={() => setView('home')} className="cursor-pointer">
                <Logo />
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-1">
                {Object.keys(NAV_MENU).map((menu) => (
                  <button
                    key={menu}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeMenu === menu ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-gray-50'}`}
                    onMouseEnter={() => setActiveMenu(menu)}
                    onClick={() => {
                      if (menu === 'Startup') setView('startup');
                      // ... simplistic mapping for click
                    }}
                  >
                    {menu}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setShowOTP(true)} className="hidden md:flex items-center gap-2 text-slate-700 font-bold hover:text-blue-600 transition-colors">
                <span className="bg-slate-100 p-2 rounded-full"><Users className="w-4 h-4" /></span>
                Login
              </button>
              <button
                onClick={() => setView('partnerLogin')}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all hover:shadow-lg text-sm flex items-center"
              >
                For Partners <ChevronRight className="w-4 h-4 ml-1" />
              </button>
              {/* Mobile Menu Toggle would go here */}
            </div>

            {/* Mega Menu Overlay */}
            <MegaMenu
              activeMenu={activeMenu}
              closeMenu={() => setActiveMenu(null)}
              onNavigate={(v) => {
                setView(v);
                setActiveMenu(null);
              }}
              onServiceClick={handleServiceClick}
            />
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <div className={`${(view !== 'dashboard' && view !== 'partnerDashboard' && view !== 'partnerLogin') ? 'pt-0' : ''}`}>
        {renderContent()}
      </div>

      {/* Footer */}
      {view !== 'dashboard' && view !== 'partnerDashboard' && (
        <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
              <div className="col-span-2 lg:col-span-2">
                <Logo className="mb-6" />
                <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
                  India's most trusted digital platform for legal, tax, and compliance services. We help entrepreneurs start, manage, and grow their business.
                </p>
                <div className="flex space-x-4">
                  {/* Social Icons */}
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 bg-gray-100 rounded-full hover:bg-blue-600 transition-colors"></div>)}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-6">Startups</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li className="hover:text-blue-600 cursor-pointer">Private Limited</li>
                  <li className="hover:text-blue-600 cursor-pointer">LLP Registration</li>
                  <li className="hover:text-blue-600 cursor-pointer">One Person Company</li>
                  <li className="hover:text-blue-600 cursor-pointer">Nidhi Company</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-6">Intellectual Property</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li className="hover:text-blue-600 cursor-pointer">Trademark Registration</li>
                  <li className="hover:text-blue-600 cursor-pointer">Copyright</li>
                  <li className="hover:text-blue-600 cursor-pointer">Patent Filing</li>
                  <li className="hover:text-blue-600 cursor-pointer">Design Registration</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-6">Contact</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li>help@uprafilings.com</li>
                  <li>+91 98765 43210</li>
                  <li>HSR Layout, Bangalore</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400">© 2024 UPRA Filings Technologies Pvt Ltd. All rights reserved.</p>
              <div className="flex space-x-6 text-sm text-slate-400">
                <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
                <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Login Modal */}
      {showOTP && <OTPModal onClose={() => setShowOTP(false)} />}

      {/* App-wide Infinite Grid Background for aesthetic if needed, disabled for cleanliness in main layout */}
      {/* <InfiniteGrid /> */}
    </div>
  );
};

export default App;