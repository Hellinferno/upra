import { create } from 'zustand';

export const useOrderStore = create((set) => ({
    user: null, // { name, email, uid, role, isPartner, status, profession, ... }
    orders: [],
    loading: true,

    setUser: (user) => set({ user }),

    logout: () => set({ user: null }),

    setLoading: (loading) => set({ loading }),

    // Order Actions
    addOrder: (order) => set((state) => ({
        orders: [order, ...state.orders]
    })),

    updateOrderStatus: (orderId, status, assignedPartnerName = null) => set((state) => ({
        orders: state.orders.map((order) =>
            order.id === orderId
                ? {
                    ...order,
                    status,
                    assignedPartner: assignedPartnerName || order.assignedPartner
                }
                : order
        )
    })),

    // For Demo/Mocking: Initialize with some dummy data if needed
    setOrders: (orders) => set({ orders }),
}));
