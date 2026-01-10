import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from "firebase/app";
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
  Plane, Scale, FileSpreadsheet, Percent, Landmark, Quote, Plus, Minus, Smartphone, Key, Briefcase as BriefcaseIcon, UploadCloud, Download,
  Info, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Import Page Components ---
import HomeLanding from './pages/HomeLanding';
import ServicePage from './pages/ServicePage';
import Dashboard from './pages/Dashboard';
import PartnerDashboard from './pages/PartnerDashboard';
import PartnersLogin from './pages/PartnersLogin';
import {
  StartupLanding,
  MCALanding,
  ComplianceLanding,
  GlobalLanding,
  RegistrationsLanding,
  TrademarkLanding,
  GSTLanding,
  IncomeTaxLanding
} from './pages/CategoryLandings';

// --- Import Reusable Components ---
import MegaMenu from './components/MegaMenu';
import OTPModal from './components/OTPModal';

// --- UTILITIES ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- FIREBASE CONFIGURATION ---
// 🔴 REPLACE THESE VALUES WITH YOUR KEYS FROM FIREBASE CONSOLE TO GO LIVE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if we are in Demo Mode (keys haven't been replaced)
const isDemoMode = firebaseConfig.apiKey === "YOUR_API_KEY_HERE";

// Initialize Firebase only if keys are valid
let auth = null;
if (!isDemoMode) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.log("Firebase initialization error:", error);
  }
}

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

// --- Service Details Content ---
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
  "One Person Company": {
    title: "One Person Company (OPC) Registration",
    description: "A hybrid structure for solo entrepreneurs allowing them to create a separate legal entity with limited liability.",
    whatIs: "Introduced in the Companies Act 2013, an OPC allows a single person to register a company. It has all benefits of a Private Limited Company but with only one member.",
    requirements: [
      "Only 1 Member (Owner) required",
      "1 Nominee is mandatory (must be Indian Citizen & Resident)",
      "Director can be the same person",
      "Paid-up capital limit applies"
    ],
    process: [
      { title: "DSC", desc: "Get Digital Signature for the Director." },
      { title: "Name Approval", desc: "Apply for name reservation via SPICe+." },
      { title: "Nominee Consent", desc: "File Form INC-3 for Nominee consent." },
      { title: "Incorporation", desc: "File SPICe+ forms with MCA." }
    ],
    pros: [
      "Sole ownership and control.",
      "Limited Liability protection.",
      "Perpetual Succession.",
      "Easy to manage compared to Pvt Ltd."
    ],
    cons: [
      "Cannot issue ESOPs.",
      "High tax rate (30% flat).",
      "Mandatory conversion to Pvt Ltd if turnover > 2 Cr."
    ],
    documents: [
      "PAN & Aadhar of Owner and Nominee",
      "Bank Statements",
      "Registered Office Proof",
      "Passport Size Photos"
    ]
  },
  "Proprietorship": {
    title: "Sole Proprietorship Registration",
    description: "The simplest form of business entity owned and managed by a single person.",
    whatIs: "It is an unregistered business entity owned, managed, and controlled by one person. It is not a separate legal entity from its owner. Registration is usually done via GST or MSME/Shop Act.",
    requirements: [
      "Single Person Owner",
      "PAN Card of the Proprietor",
      "Business Name",
      "Bank Account"
    ],
    process: [
      { title: "Decide Name", desc: "Choose a unique trade name." },
      { title: "Govt Registration", desc: "Register under MSME (Udyam) or GST or Shop & Establishment Act." },
      { title: "Bank Account", desc: "Open a current bank account using the registration certificate." },
      { title: "Start Business", desc: "No further incorporation certificate needed." }
    ],
    pros: [
      "Easiest and cheapest to start.",
      "Minimal compliance.",
      "Complete control.",
      "Easy to close."
    ],
    cons: [
      "Unlimited Liability (Personal assets at risk).",
      "No separate legal identity.",
      "Hard to raise funds or loans.",
      "Death of owner dissolves business."
    ],
    documents: [
      "PAN Card & Aadhar Card",
      "Address Proof of Business",
      "Cancelled Cheque",
      "Passport Photo"
    ]
  },
  "Partnership": {
    title: "Partnership Firm Registration",
    description: "A popular business structure for small businesses owned by two or more people.",
    whatIs: "Governed by the Indian Partnership Act, 1932. It is created by a Partnership Deed between partners to share profits and losses.",
    requirements: [
      "Minimum 2 Partners",
      "Partnership Deed (Agreement)",
      "Registered Office",
      "PAN Card for the Firm"
    ],
    process: [
      { title: "Draft Deed", desc: "Draft Partnership Deed on Stamp Paper." },
      { title: "Notarize", desc: "Sign and notarize the deed." },
      { title: "PAN Card", desc: "Apply for PAN card in the firm's name." },
      { title: "Registration (Optional)", desc: "Register with Registrar of Firms (RoF) for legal benefits." }
    ],
    pros: [
      "Easy to form.",
      "Sharing of risk.",
      "More capital than proprietorship.",
      "Flexible operations."
    ],
    cons: [
      "Unlimited Liability of partners.",
      "No perpetual succession.",
      "Conflict between partners can dissolve firm.",
      "Maximum 20 partners (usually)."
    ],
    documents: [
      "Partnership Deed",
      "PAN/Aadhar of all Partners",
      "Address Proof of Office",
      "Affidavit"
    ]
  },
  "GST Registration": {
    title: "GST Registration",
    description: "Mandatory tax registration for businesses supplying goods or services in India.",
    whatIs: "Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services. Registration is mandatory if turnover exceeds ₹40 Lakhs (Goods) or ₹20 Lakhs (Services), or for inter-state supply.",
    requirements: [
      "Business Name",
      "PAN of Business/Owner",
      "Aadhar of Authorized Signatory",
      "Valid Mobile & Email"
    ],
    process: [
      { title: "Application", desc: "File REG-01 on GST Portal." },
      { title: "ARN Generation", desc: "Application Reference Number is generated." },
      { title: "Verification", desc: "Tax officer verifies documents (may ask for clarification)." },
      { title: "Approval", desc: "GSTIN and Certificate (REG-06) issued." }
    ],
    pros: [
      "Legal recognition as supplier.",
      "Input Tax Credit (ITC) benefits.",
      "Inter-state sales permitted.",
      "E-commerce selling enabled."
    ],
    cons: [
      "Mandatory monthly/quarterly returns.",
      "Penalties for late filing.",
      "Complex compliance for small players."
    ],
    documents: [
      "PAN Card",
      "Aadhar Card",
      "Proof of Place of Business (Electricity Bill/Rent Agreement)",
      "Bank Account Proof",
      "Photo of Owner/Signatory"
    ]
  },
  "Trademark Registration": {
    title: "Trademark Registration",
    description: "Legal protection for your brand name, logo, or slogan under the Trade Marks Act, 1999.",
    whatIs: "A trademark is a unique identity that distinguishes your product/service from others. Registration gives exclusive rights to use the ® symbol and take legal action against infringement.",
    requirements: [
      "Unique Brand Name/Logo",
      "Appropriate Class Selection (1-45)",
      "Usage Date (User date or Proposed to be used)"
    ],
    process: [
      { title: "Search", desc: "Conduct a public search to ensure uniqueness." },
      { title: "Filing (TM-A)", desc: "File application with Registry. Use 'TM' symbol." },
      { title: "Examination", desc: "Registry checks for objections." },
      { title: "Publication", desc: "Published in Journal for 4 months for opposition." },
      { title: "Registration", desc: "Certificate issued. Use '®' symbol." }
    ],
    pros: [
      "Legal protection of brand.",
      "Asset creation (Valuation).",
      "Trust and Goodwill.",
      "Valid for 10 years."
    ],
    cons: [
      "Long process (6-18 months).",
      "Risk of objection/opposition."
    ],
    documents: [
      "Logo/Brand Name copy",
      "PAN & ID Proof",
      "Udyam (for 50% govt fee discount)",
      "Signed Power of Attorney (Form 48)"
    ]
  },
  "FSSAI Registration": {
    title: "FSSAI Food License",
    description: "Mandatory license for any food business operator (FBO) in India.",
    whatIs: "Governed by FSS Act, 2006. Depending on turnover, you need Basic Registration (<12L), State License (12L-20Cr), or Central License (>20Cr).",
    requirements: [
      "Valid Email & Phone",
      "List of Food Categories",
      "Food Safety Management System Plan"
    ],
    process: [
      { title: "Application", desc: "File Form A (Basic) or Form B (License) on FoSCoS." },
      { title: "Scrutiny", desc: "FSSAI officer reviews documents." },
      { title: "Inspection", desc: "Food Inspector may visit premises (for licenses)." },
      { title: "Issuance", desc: "License issued with 14-digit number." }
    ],
    pros: [
      "Legal mandate compliance.",
      "Consumer trust.",
      "Avoid heavy penalties."
    ],
    cons: [
      "Strict hygiene standards required.",
      "Periodic renewal mandatory."
    ],
    documents: [
      "Photo of FBO",
      "Identity Proof",
      "Address Proof",
      "List of Food Products"
    ]
  },
  "Import Export Code": {
    title: "Import Export Code (IEC)",
    description: "A 10-digit code required for import/export activities in India issued by DGFT.",
    whatIs: "IEC is mandatory for any commercial import/export. It is a one-time registration and valid for a lifetime.",
    requirements: [
      "Active Bank Account",
      "PAN Card",
      "Firm Registration details"
    ],
    process: [
      { title: "Application", desc: "Apply online on DGFT portal." },
      { title: "Link DSC", desc: "Digital Signature is required for submission." },
      { title: "Fee Payment", desc: "Pay govt fee (approx ₹500)." },
      { title: "Issuance", desc: "IEC Certificate generated instantly or within days." }
    ],
    pros: [
      "Global market access.",
      "Lifetime validity.",
      "No return filing required (unless updated yearly)."
    ],
    cons: [
      "Annual updation is now mandatory even if no changes."
    ],
    documents: [
      "PAN Card",
      "Voter ID/Aadhar/Passport",
      "Cancelled Cheque",
      "Rent Agreement/Electricity Bill"
    ]
  },
  "Income Tax Return": {
    title: "Income Tax Return (ITR) Filing",
    description: "Annual filing of income earned and taxes paid to the government.",
    whatIs: "Mandatory for individuals/businesses earning above basic exemption limit. Forms vary (ITR-1 to ITR-7) based on income source.",
    requirements: [
      "Form 16 (Salaried)",
      "Bank Statements",
      "Investment Proofs (80C, 80D)",
      "Aadhar-PAN link"
    ],
    process: [
      { title: "Login", desc: "Access IT Portal." },
      { title: "Select Form", desc: "Choose correct ITR form (1/2/3/4)." },
      { title: "Fill Data", desc: "Enter income and deduction details." },
      { title: "Verify", desc: "E-verify using Aadhar OTP." }
    ],
    pros: [
      "Claim Refunds.",
      "Visa Application proof.",
      "Loan approvals."
    ],
    cons: [
      "Penalty for late filing (up to ₹5000).",
      "Defective return if wrong form used."
    ],
    documents: [
      "Form 16 / 16A",
      "Capital Gains Statement",
      "Bank Interest Certificates",
      "Form 26AS / AIS"
    ]
  },
  "Company Compliance": {
    title: "Annual Company Compliance",
    description: "Mandatory annual filings for Private Limited Companies with MCA.",
    whatIs: "Every company must hold AGMs, file Annual Returns (MGT-7), and Financial Statements (AOC-4) irrespective of turnover.",
    requirements: [
      "Audited Financial Statements",
      "Director's Report",
      "AGM Notice"
    ],
    process: [
      { title: "Bookkeeping", desc: "Finalize accounts." },
      { title: "Audit", desc: "Statutory Auditor audits financials." },
      { title: "AGM", desc: "Hold Annual General Meeting." },
      { title: "Filing", desc: "File AOC-4 (30 days) and MGT-7 (60 days) from AGM." }
    ],
    pros: [
      "Maintain 'Active' status.",
      "Avoid Director Disqualification.",
      "Avoid heavy late fees."
    ],
    cons: [
      "High penalty for delay.",
      "Strict deadlines."
    ],
    documents: [
      "Balance Sheet & P&L",
      "Audit Report",
      "List of Shareholders"
    ]
  },
  "DIN eKYC Filing": {
    title: "DIN eKYC (DIR-3 KYC)",
    description: "Annual KYC for every person holding a Director Identification Number (DIN).",
    whatIs: "Mandatory for all Directors with active DIN to verify their email and mobile number annually.",
    requirements: [
      "Personal Mobile & Email",
      "DSC of Director"
    ],
    process: [
      { title: "Prepare Form", desc: "Fill DIR-3 KYC WEB or Form." },
      { title: "OTP", desc: "Verify Email and Mobile via OTP." },
      { title: "Submit", desc: "File form on MCA portal." }
    ],
    pros: [
      "Keeps DIN status 'Approved'.",
      "Director can sign documents."
    ],
    cons: [
      "Penalty of ₹5000 if missed (after due date)."
    ],
    documents: [
      "DSC",
      "Proof of Address (if changed)"
    ]
  }
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

// --- Main App Component ---
const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [orders, setOrders] = useState([]);

  // Auth state
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Auth Listener with timeout
  useEffect(() => {
    let mounted = true;
    const timeoutFn = setTimeout(() => {
      if (mounted && loading) {
        console.warn("Auth timeout - fallback to guest mode");
        setLoading(false);
      }
    }, 3000);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    if (auth) {
      try {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (!mounted) return;
          if (currentUser) {
            setUser({
              name: currentUser.displayName || "User",
              email: currentUser.email,
              uid: currentUser.uid
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        });
        return () => {
          mounted = false;
          clearTimeout(timeoutFn);
          window.removeEventListener('scroll', handleScroll);
          unsubscribe();
        };
      } catch (err) {
        console.error("Auth error:", err);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
      clearTimeout(timeoutFn);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handlers
  const handleBookService = (orderDetails) => {
    const newOrder = { ...orderDetails, id: Date.now(), assignedPartner: null };
    setOrders([newOrder, ...orders]);
    if (!user) {
      setUser({ name: orderDetails.fullName, email: orderDetails.email, isPartner: false });
    }
    setView('dashboard');
  };

  const handleAcceptOrder = (order) => {
    setOrders(orders.map(o =>
      o.id === order.id ? { ...o, status: 'In Progress', assignedPartner: user.name } : o
    ));
  };

  const handleSubmitWork = (order) => {
    setOrders(orders.map(o =>
      o.id === order.id ? { ...o, status: 'Completed' } : o
    ));
    alert("Work submitted!");
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!auth) {
      // Demo mode login
      setUser({ name: name || "Demo User", email: email, isPartner: false });
      setView('dashboard');
      return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        setUser({ name: name, email: email });
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser({ name: userCredential.user.displayName || "User", email: userCredential.user.email });
      }
      setView('dashboard');
    } catch (error) {
      if (error.code?.includes('api-key')) {
        // Fallback to demo mode
        setUser({ name: name || "Demo User", email: email, isPartner: false });
        setView('dashboard');
      } else {
        setAuthError(error.message.replace("Firebase: ", ""));
      }
    }
  };

  const handleLogout = async () => {
    if (auth) await signOut(auth).catch(() => { });
    setUser(null);
    setView('home');
  };

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    setView('service');
    setMobileMenuOpen(false);
  };

  const handleNavClick = (menuName) => {
    const viewMap = {
      'Startup': 'startup', 'MCA': 'mca', 'Compliance': 'compliance',
      'Global': 'global', 'Registrations': 'registrations', 'Trademark': 'trademark',
      'Goods & Services Tax': 'gst', 'Income Tax': 'incometax'
    };
    setView(viewMap[menuName] || 'home');
  };

  const filteredServices = searchQuery
    ? POPULAR_SERVICES.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : POPULAR_SERVICES;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Logo />
          <p className="mt-4 text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Login View
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-inter">
        {showOTPModal && <OTPModal onClose={() => setShowOTPModal(false)} />}
        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-100 relative">
          <button onClick={() => setView('home')} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
            <p className="text-slate-500 mt-2">{isSignUp ? "Sign up to get started" : "Sign in to access your dashboard"}</p>
            {isDemoMode && <p className="text-xs text-amber-600 mt-2 bg-amber-50 p-2 rounded">Demo Mode Active</p>}
          </div>
          {authError && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{authError}</div>}
          <form onSubmit={handleAuth} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input type="text" required className="w-full px-5 py-3 border border-gray-200 rounded-xl" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input type="email" required className="w-full px-5 py-3 border border-gray-200 rounded-xl" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input type="password" required className="w-full px-5 py-3 border border-gray-200 rounded-xl" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700">{isSignUp ? "Sign Up" : "Login"}</button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600 font-bold">{isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}</button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Views
  if (view === 'dashboard' && user) {
    return <Dashboard user={user} onLogout={handleLogout} orders={orders} />;
  }
  if (view === 'partnerDashboard' && user?.isPartner) {
    return <PartnerDashboard user={user} onLogout={handleLogout} orders={orders} onAcceptOrder={handleAcceptOrder} onSubmitWork={handleSubmitWork} />;
  }
  if (view === 'partners') {
    return <PartnersLogin onBack={() => setView('home')} setUser={setUser} setView={setView} />;
  }
  if (view === 'service') {
    return <ServicePage serviceName={selectedService} onBack={() => setView('home')} onBook={handleBookService} />;
  }

  // Main Public View
  return (
    <div className="min-h-screen bg-white font-inter text-slate-800 antialiased">
      {/* Top Bar */}
      <div className="bg-[#0B2447] text-slate-300 text-xs py-2.5 px-4 md:px-8 flex justify-between items-center">
        <div className="flex space-x-6">
          <span className="flex items-center"><Phone className="w-3 h-3 mr-2 text-cyan-400" /> 044-4000-4000</span>
          <span className="flex items-center"><Mail className="w-3 h-3 mr-2 text-cyan-400" /> help@uprafillings.com</span>
        </div>
        <div className="flex space-x-6">
          <button onClick={() => setView('partners')} className="text-cyan-400 font-bold">Partners</button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-3' : 'bg-white border-b border-gray-100 py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <div className="cursor-pointer" onClick={() => setView('home')}><Logo /></div>
            <div className="hidden xl:flex space-x-8">
              {Object.keys(NAV_MENU).map((menu) => (
                <div key={menu} className="relative group" onMouseEnter={() => setActiveMenu(menu)}>
                  <button onClick={() => handleNavClick(menu)} className="flex items-center text-sm font-semibold py-2 text-slate-600 hover:text-blue-600">
                    {menu} <ChevronDown className="w-3 h-3 ml-1.5 opacity-50" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 w-64">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input type="text" placeholder="Search services..." className="bg-transparent border-none outline-none text-sm w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button onClick={() => setView('login')} className="hidden md:flex items-center px-6 py-2.5 bg-[#0B2447] text-white rounded-full font-bold text-sm hover:bg-slate-800">
              <User className="w-4 h-4 mr-2" /> Login
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2 text-slate-600">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div onMouseLeave={() => setActiveMenu(null)}>
          <MegaMenu activeMenu={activeMenu} closeMenu={() => setActiveMenu(null)} onNavigate={handleNavClick} onServiceClick={handleServiceClick} />
        </div>
      </nav>

      {/* Content */}
      {view === 'home' && <HomeLanding filteredServices={filteredServices} setShowModal={setShowModal} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onNavigate={handleNavClick} onSearchInput={(v) => setSearchQuery(v)} />}
      {view === 'startup' && <StartupLanding onServiceClick={handleServiceClick} />}
      {view === 'mca' && <MCALanding onServiceClick={handleServiceClick} />}
      {view === 'compliance' && <ComplianceLanding onServiceClick={handleServiceClick} />}
      {view === 'global' && <GlobalLanding onServiceClick={handleServiceClick} />}
      {view === 'registrations' && <RegistrationsLanding onServiceClick={handleServiceClick} />}
      {view === 'trademark' && <TrademarkLanding onServiceClick={handleServiceClick} />}
      {view === 'gst' && <GSTLanding onServiceClick={handleServiceClick} />}
      {view === 'incometax' && <IncomeTaxLanding onServiceClick={handleServiceClick} />}

      {/* Footer */}
      <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Logo />
          <p className="mt-4">&copy; 2026 UPRA Filings Private Limited. All rights reserved.</p>
        </div>
      </footer>

      {/* Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl">
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
              <button onClick={() => setShowModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <p className="text-slate-600 mb-8">Start your {showModal.title} process completely online.</p>
            <div className="flex space-x-4">
              <button onClick={() => { setShowModal(null); handleServiceClick(showModal.title); }} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold">Get Started</button>
              <button onClick={() => setShowModal(null)} className="flex-1 bg-white border-2 border-gray-100 text-slate-700 py-4 rounded-xl font-bold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;