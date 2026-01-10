import {
    Rocket, FileText, Award, Calculator, Percent, Building, Shield, Globe,
    Briefcase, FileCheck, CheckCircle
} from 'lucide-react';

export const SERVICE_PROFESSION_MAP = {
    "Private Limited Company": ["CS", "CA"],
    "Limited Liability Partnership": ["CS", "CA"],
    "One Person Company": ["CS", "CA"],
    "GST Registration": ["CA", "Tax Consultant"],
    "Trademark Registration": ["Lawyer", "CS"],
    "Income Tax Return": ["CA", "Tax Consultant"],
    "FSSAI Registration": ["Other", "CA"],
};

export const NAV_MENU = {
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

export const SERVICE_DETAILS = {
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

export const POPULAR_SERVICES = [
    { id: 1, title: "Private Limited Company", icon: Briefcase, price: "₹6899", desc: "For businesses looking to raise funds & scale operations." },
    { id: 2, title: "GST Registration", icon: FileCheck, price: "₹1499", desc: "Mandatory for businesses with turnover > ₹20 Lakhs." },
    { id: 3, title: "Trademark Registration", icon: Shield, price: "₹5999", desc: "Protect your brand name, logo and slogan." },
    { id: 4, title: "FSSAI Registration", icon: CheckCircle, price: "₹2999", desc: "Food license for restaurants and food businesses." },
    { id: 5, title: "Income Tax Return", icon: Calculator, price: "₹999", desc: "Expert assisted ITR filing for individuals & businesses." },
    { id: 6, title: "Import Export Code", icon: Globe, price: "₹2499", desc: "License to import or export goods/services from India." },
];

export const STATS = [
    { label: "Happy Customers", value: "1 Million+" },
    { label: "Years of Trust", value: "10+" },
    { label: "Offices in India", value: "8+" },
    { label: "Experts", value: "500+" },
];

export const TESTIMONIALS = [
    { name: "Arjun Mehta", company: "TechFlow Solutions", text: "UPRA Filings handled our private limited incorporation seamlessly. The team was proactive and the process was faster than expected." },
    { name: "Sarah Jenkins", company: "Global Exports", text: "I was worried about the IEC code process, but their platform made it incredibly simple. Highly recommended for startups." },
    { name: "Rajiv Kumar", company: "Kumar Traders", text: "Best service for GST filing. Their experts are knowledgeable and always available to answer queries." }
];

export const FAQS = [
    { q: "How long does it take to register a Private Limited Company?", a: "Typically, it takes 7-10 working days, subject to government processing time and document submission." },
    { q: "Is physical presence required for the registration process?", a: "No, the entire process is 100% online. You can upload documents on our portal and we handle the rest." },
    { q: "What documents are needed for GST Registration?", a: "You need PAN, Aadhaar, Business Address Proof (Rent Agreement/Electricity Bill), and a Cancelled Cheque." }
];

export const HOME_CATEGORIES = [
    { id: 'Startup', label: 'Startup', icon: Rocket, color: 'blue' },
    { id: 'Registrations', label: 'Registrations', icon: FileText, color: 'green' },
    { id: 'Trademark', label: 'Trademark', icon: Award, color: 'rose' },
    { id: 'Goods & Services Tax', label: 'Goods & Services Tax', icon: Calculator, color: 'amber' },
    { id: 'Income Tax', label: 'Income Tax', icon: Percent, color: 'indigo' },
    { id: 'MCA', label: 'MCA Services', icon: Building, color: 'emerald' },
    { id: 'Compliance', label: 'Compliance', icon: Shield, color: 'purple' },
    { id: 'Global', label: 'Global', icon: Globe, color: 'cyan' },
];
