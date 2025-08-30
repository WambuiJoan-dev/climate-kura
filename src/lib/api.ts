import { QueryClient } from "@tanstack/react-query";

// API Configuration
export const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1';

// Get admin key from localStorage
export const getAdminKey = (): string | null => {
  return localStorage.getItem('admin_key');
};

// Set admin key in localStorage
export const setAdminKey = (key: string): void => {
  localStorage.setItem('admin_key', key);
};

// API headers with admin key
export const getHeaders = (): HeadersInit => {
  const adminKey = getAdminKey();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (adminKey) {
    headers['X-Admin-Key'] = adminKey;
  }
  
  return headers;
};

// Generic API fetch wrapper
export const apiCall = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// API endpoints
export const api = {
  // Farmers
  createFarmer: (data: { name: string; phone: string; coop_name?: string }) =>
    apiCall<any>('/farmers', { method: 'POST', body: JSON.stringify(data) }),
  
  getFarmerWallet: (farmerId: string) =>
    apiCall<any>(`/farmers/${farmerId}/wallet`),
  
  // Plots
  createPlot: (data: { 
    farmer_id: string; 
    county?: string; 
    soil_class?: string; 
    centroid?: { lat: number; lng: number }; 
    boundary_geojson?: any;
  }) =>
    apiCall<any>('/plots', { method: 'POST', body: JSON.stringify(data) }),
  
  // Events (Practices)
  logPractice: (data: {
    plot_id: string;
    practice_type: 'agroforestry' | 'cover_crop';
    quantity: number;
    media_uri?: string;
    gps_coords?: { lat: number; lng: number };
  }) =>
    apiCall<any>('/events', { method: 'POST', body: JSON.stringify(data) }),
  
  getPendingEvents: () =>
    apiCall<any[]>('/events?status=pending'),
  
  verifyEvent: (eventId: string, action: 'approve' | 'reject') =>
    apiCall<any>(`/events/${eventId}/verify`, { 
      method: 'POST', 
      body: JSON.stringify({ action })
    }),
  
  // Lots
  getLots: () =>
    apiCall<any[]>('/lots'),
  
  poolCredits: (data?: { threshold_tco2e?: number }) =>
    apiCall<any>('/lots/pool', { method: 'POST', body: JSON.stringify(data || {}) }),
  
  purchaseCredits: (data: {
    lot_id: string;
    buyer: { name: string; email: string; company: string };
    price_per_tco2e_kes?: number;
  }) =>
    apiCall<any>('/buyers/purchase', { method: 'POST', body: JSON.stringify(data) }),
  
  getLotReceipt: (lotId: string) =>
    apiCall<any>(`/lots/${lotId}/receipt`),
  
  // Payouts
  runPayouts: (lotId: string) =>
    apiCall<any>('/payouts/run', { method: 'POST', body: JSON.stringify({ lot_id: lotId }) }),
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});