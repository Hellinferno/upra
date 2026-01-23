import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-12 text-sm text-gray-600">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">UPRAFilings</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:underline">About UPRAFilings</Link></li>
                        <li><Link href="#" className="hover:underline">Careers</Link></li>
                        <li><Link href="#" className="hover:underline">Contact Us</Link></li>
                        <li><Link href="#" className="hover:underline">Platforms</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Search</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:underline">Business Search</Link></li>
                        <li><Link href="#" className="hover:underline">Trademark Search</Link></li>
                        <li><Link href="#" className="hover:underline">Filings.AE for UAE</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Usage</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:underline">Terms & Conditions</Link></li>
                        <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:underline">Refund Policy</Link></li>
                        <li><Link href="#" className="hover:underline">Legal</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">More</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:underline">Confidentiality Policy</Link></li>
                        <li><Link href="#" className="hover:underline">Disclaimer Policy</Link></li>
                        <li><Link href="#" className="hover:underline">UPRAFilings Review</Link></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
                <small>© UPRA — All rights reserved</small>
            </div>
        </footer>
    );
}
