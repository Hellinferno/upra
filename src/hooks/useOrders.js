import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useOrders = (userId, role) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setOrders([]);
            setLoading(false);
            return;
        }

        let q;
        if (role === 'partner') {
            // Partners only see UNASSIGNED jobs or jobs ASSIGNED TO THEM
            q = query(collection(db, "orders"), where("assignedPartnerId", "in", [null, userId]));
        } else {
            // Clients only see THEIR OWN orders
            q = query(collection(db, "orders"), where("userId", "==", userId));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (error) => {
            console.error("Error fetching orders:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId, role]);

    return { orders, loading };
};
