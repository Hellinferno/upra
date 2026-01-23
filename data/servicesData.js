import {
    Briefcase, FileCheck, Shield, CheckCircle, Calculator, Globe,
    Rocket, FileText, Award, Percent, Building
} from 'lucide-react';

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
        price: "₹6,999*",
        timeline: "10-15 Days",
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
            "Passport Size Photos",
            "Latest Bank Statement/Utility Bill (Residence Proof)",
            "Rent Agreement & NOC for Office",
            "Utility Bill for Office (Electricity/Gas)"
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
        price: "₹1,499*",
        timeline: "3-7 Days",
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
            "Aadhar Card of Owner",
            "Passport Size Photo",
            "Business Address Proof (Electricity Bill/Rent Agreement)",
            "Bank Proof (Cancelled Cheque/Passbook)"
        ]
    },
    "Trademark Registration": {
        title: "Trademark Registration",
        description: "Legal protection for your brand name, logo, or slogan under the Trade Marks Act, 1999.",
        whatIs: "A trademark is a unique identity that distinguishes your product/service from others. Registration gives exclusive rights to use the ® symbol and take legal action against infringement.",
        price: "₹5,999* + Govt Fees",
        timeline: "1-3 Days (Filing)",
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
            "Long process (6-18 months for final grant).",
            "Risk of objection/opposition."
        ],
        documents: [
            "Logo/Brand Name copy",
            "PAN & ID Proof",
            "Udyam Registration (for 50% govt fee discount)",
            "Signed Power of Attorney (Form 48)",
            "User Affidavit (if logo is already in use)"
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
