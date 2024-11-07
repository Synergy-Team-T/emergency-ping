import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Sample user auth store; Update model as necessary
const useUserAuthStore = create(
    persist(
        (set) => ({
            userAuth: {
                id: null,
                firstName: null,
                lastName: null,
                roles: [],
                email: null,
            },
            locations: [],
            userInfo: {
                id: null,
                firstName: null,
                lastName: null,
                roles: [],
                email: null,
                status: {
                    status: 'SAFE'
                },
                locationCode: null,
                fullLocation: null,
                address: [],
                phone: null,
                profilePic: null,
            },
            setLocations: (locations) => set({ 
                locations,
            }),
            setUserAuth: (userAuth = {}) => set((state) => ({ 
                userAuth: {
                    ...state.userAuth,
                    id: userAuth.id,
                    firstName: userAuth.firstName,
                    lastName: userAuth.lastName,
                    roles: userAuth.roles,
                    email: userAuth.email,
                }
            })),
            removeUserAuth: () => set({ 
                userAuth: {
                    id: null,
                    firstName: null,
                    lastName: null,
                    roles: [], 
                    email: null
                }
            }),
            setUserInfo: (user = {}) => set(() => ({ 
                userInfo: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roles: user.roles,
                    email: user.email,
                    status: user.status,
                    locationCode: user.locationGroup || user.locationGroup,
                    fullLocation: user.fullLocation,
                    address: user.address,
                    phone: '09123456789',
                    profilePic:
    "https://internalcodev.blob.core.windows.net/internal-public/employees/603/photo/7548aeee-4873-4f55-9025-b80ef9e078f2.jpeg",
                }
            })),
        }),
        {
            name: 'cepa-storage-userAuth'
        }
    )
);

const useMapViewStore = create((set) => ({
    mapView: {
        key: "GUIDE",
        lat: null,
        long: null,
        zoom: null,
    },
    setMapView: (mapView) => set((state) => ({ 
        mapView: {
            ...state.mapView,
            ...mapView
        }
    })),
    removeMapView: () => set({ 
        mapView: {
            key: "GUIDE",
            lat: null,
            long: null,
            zoom: null,
        }
    }),
}));

export {
    useUserAuthStore,
    useMapViewStore
}