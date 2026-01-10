import React, { useState } from 'react';
import { Download } from 'lucide-react';

const Dashboard = ({ user, onLogout, orders }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Filter orders for this specific user (In mock, user.uid matches)
    // For demo, we show all if no filtering logic is rigorous, but let's try to match
    const myOrders = orders; // In real app: orders.filter(o => o.userId === user.uid)

    return (
        <div className="min-h-screen bg-slate-50 flex font-inter">
            {/* Sidebar - Assuming simplistic sidebar here or reusing one if componentized. Logic copied from App.jsx */}
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

export default Dashboard;
