import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { FurnitureCatalogItem, Project, User, PlacedFurnitureItem, Vector3 } from '../types';

// Mock Seed Data for Catalog
export const CATALOG_ITEMS: FurnitureCatalogItem[] = [
    { id: 'item-1', name: 'Scandi Minimalist Sofa', category: 'seating', dimensions: { width: 2.2, depth: 0.9, height: 0.8 }, price: 899, modelPath: '/models/sofa.glb', thumbnailPath: '/models/sofa.png', defaultColor: '#d1d1d1', tags: ['Best Seller', 'Scandi'] },
    { id: 'item-2', name: 'Lounge Armchair', category: 'seating', dimensions: { width: 0.8, depth: 0.8, height: 0.9 }, price: 349, modelPath: '/models/armchair.glb', thumbnailPath: '/models/armchair.png', defaultColor: '#8f9779', tags: ['Modern'] },
    { id: 'item-3', name: 'Oak Dining Table', category: 'tables', dimensions: { width: 1.8, depth: 0.9, height: 0.75 }, price: 550, modelPath: '/models/dining-table.glb', thumbnailPath: '/models/dining-table.png', defaultColor: '#8B5A2B', tags: ['Wood', 'Dining'] },
    { id: 'item-4', name: 'Dining Chair', category: 'seating', dimensions: { width: 0.45, depth: 0.5, height: 0.85 }, price: 120, modelPath: '/models/dining-chair.glb', thumbnailPath: '/models/dining-chair.png', defaultColor: '#4A4A4A' },
    { id: 'item-5', name: 'Glass Coffee Table', category: 'tables', dimensions: { width: 1.2, depth: 0.6, height: 0.4 }, price: 220, modelPath: '/models/coffee-table.glb', thumbnailPath: '/models/coffee-table.png', defaultColor: '#e0e0e0', tags: ['Modern'] },
    { id: 'item-6', name: 'Modular Bookshelf', category: 'storage', dimensions: { width: 1.0, depth: 0.35, height: 2.0 }, price: 410, modelPath: '/models/bookshelf.glb', thumbnailPath: '/models/bookshelf.png', defaultColor: '#222222' },
    { id: 'item-7', name: 'Platform Bed', category: 'beds', dimensions: { width: 1.8, depth: 2.1, height: 0.9 }, price: 799, modelPath: '/models/bed.glb', thumbnailPath: '/models/bed.png', defaultColor: '#FAFAF8', tags: ['Comfort'] },
    { id: 'item-8', name: 'Minimalist Wardrobe', category: 'storage', dimensions: { width: 1.2, depth: 0.6, height: 2.2 }, price: 650, modelPath: '/models/wardrobe.glb', thumbnailPath: '/models/wardrobe.png', defaultColor: '#111111' },
    { id: 'item-9', name: 'Round Side Table', category: 'tables', dimensions: { width: 0.5, depth: 0.5, height: 0.55 }, price: 150, modelPath: '/models/side-table.glb', thumbnailPath: '/models/side-table.png', defaultColor: '#EEEEEE' },
    { id: 'item-10', name: 'Modern Wood Desk', category: 'tables', dimensions: { width: 1.4, depth: 0.7, height: 0.75 }, price: 420, modelPath: '/models/desk.glb', thumbnailPath: '/models/desk.png', defaultColor: '#8f7a66' },
    { id: 'item-11', name: 'Woven Area Rug', category: 'decor', dimensions: { width: 2.5, depth: 3.0, height: 0.02 }, price: 299, modelPath: '', thumbnailPath: '/models/woven-rug.png', defaultColor: '#E8E4DF', tags: ['Cozy'] },
    { id: 'item-12', name: 'Potted Monstera', category: 'decor', dimensions: { width: 0.6, depth: 0.6, height: 1.2 }, price: 85, modelPath: '', thumbnailPath: '/models/potted-monstera.png', defaultColor: '#EAEAEA', tags: ['Plant'] },
    { id: 'item-13', name: 'Arch Floor Lamp', category: 'decor', dimensions: { width: 0.4, depth: 0.4, height: 1.8 }, price: 180, modelPath: '', thumbnailPath: '/models/floor-lamp.png', defaultColor: '#ffffff' },
    { id: 'item-14', name: 'Oak TV Console', category: 'storage', dimensions: { width: 1.8, depth: 0.4, height: 0.45 }, price: 450, modelPath: '', thumbnailPath: '/models/tv-console.png', defaultColor: '#8B5A2B', tags: ['Media'] },
    { id: 'item-15', name: 'Premium Double Bed', category: 'beds', dimensions: { width: 1.8, depth: 2.1, height: 1.1 }, price: 1099, modelPath: '', thumbnailPath: '/models/bed.png', defaultColor: '#EEEEEE', tags: ['Comfort', 'Premium'] },
    { id: 'item-16', name: 'Wide Bookshelf', category: 'storage', dimensions: { width: 1.6, depth: 0.35, height: 1.8 }, price: 499, modelPath: '', thumbnailPath: '/models/bookshelf.png', defaultColor: '#222222' },
    { id: 'item-17', name: 'Round Coffee Table', category: 'tables', dimensions: { width: 1.0, depth: 1.0, height: 0.45 }, price: 280, modelPath: '', thumbnailPath: '/models/coffee-table.png', defaultColor: '#8B5A2B', tags: ['Wood'] },
    { id: 'item-18', name: 'Lounge Accent Chair', category: 'seating', dimensions: { width: 0.85, depth: 0.85, height: 0.95 }, price: 390, modelPath: '', thumbnailPath: '/models/armchair.png', defaultColor: '#B0C4DE', tags: ['Modern'] },
];

const DEFAULT_ROOM: Project['settings'] = {
    wallColor: '#FAFAF8',
    floorTexture: 'hardwood-1',
    roomDimensions: { width: 5, length: 5, height: 2.8 }
};

interface AppState {
    user: User | null;
    catalog: FurnitureCatalogItem[];
    projects: Project[];
    activeProjectId: string | null;

    // Actions
    login: (user: User) => void;
    logout: () => void;
    createProject: (name: string) => string;
    loadProject: (id: string) => void;
    deleteProject: (id: string) => void;
    updateProjectSettings: (settings: Partial<Project['settings']>) => void;

    // Planner Actions (Operates on active project)
    addFurniture: (catalogItemId: string, position?: Vector3) => void;
    updateFurniture: (instanceId: string, updates: Partial<PlacedFurnitureItem>) => void;
    removeFurniture: (instanceId: string) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            user: { id: 'test-user-1', name: 'Student Designer', role: 'student' },
            catalog: CATALOG_ITEMS,
            projects: [],
            activeProjectId: null,

            login: (user) => set({ user }),
            logout: () => set({ user: null }),

            createProject: (name) => {
                const newProject: Project = {
                    id: uuidv4(),
                    name,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    settings: DEFAULT_ROOM,
                    items: []
                };
                set((state) => ({
                    projects: [...state.projects, newProject],
                    activeProjectId: newProject.id
                }));
                return newProject.id;
            },

            loadProject: (id) => set({ activeProjectId: id }),

            deleteProject: (id) => set((state) => ({
                projects: state.projects.filter(p => p.id !== id),
                activeProjectId: state.activeProjectId === id ? null : state.activeProjectId
            })),

            updateProjectSettings: (settings) => set((state) => {
                if (!state.activeProjectId) return state;
                return {
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? { ...p, settings: { ...p.settings, ...settings }, updatedAt: Date.now() }
                            : p
                    )
                };
            }),

            addFurniture: (catalogItemId, position = [0, 0, 0]) => set((state) => {
                if (!state.activeProjectId) return state;
                const catalogItem = state.catalog.find(c => c.id === catalogItemId);
                if (!catalogItem) return state;

                const newItem: PlacedFurnitureItem = {
                    id: uuidv4(),
                    catalogItemId,
                    position,
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                    color: catalogItem.defaultColor
                };

                return {
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? { ...p, items: [...p.items, newItem], updatedAt: Date.now() }
                            : p
                    )
                };
            }),

            updateFurniture: (instanceId, updates) => set((state) => {
                if (!state.activeProjectId) return state;
                return {
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? {
                                ...p,
                                items: p.items.map(i => i.id === instanceId ? { ...i, ...updates } : i),
                                updatedAt: Date.now()
                            }
                            : p
                    )
                };
            }),

            removeFurniture: (instanceId) => set((state) => {
                if (!state.activeProjectId) return state;
                return {
                    projects: state.projects.map(p =>
                        p.id === state.activeProjectId
                            ? { ...p, items: p.items.filter(i => i.id !== instanceId), updatedAt: Date.now() }
                            : p
                    )
                };
            })
        }),
        {
            name: 'hci-furniture-storage',
            partialize: (state) => ({ projects: state.projects, user: state.user }),
        }
    )
);
