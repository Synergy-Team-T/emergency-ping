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
    "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
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