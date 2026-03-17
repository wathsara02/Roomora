export type Vector3 = [number, number, number];

export interface User {
    id: string;
    name: string;
    role: 'student' | 'designer' | 'guest';
}

export interface RoomDimensions {
    width: number;
    length: number;
    height: number;
}

export interface FurnitureCatalogItem {
    id: string;
    name: string;
    category: 'seating' | 'tables' | 'storage' | 'beds' | 'decor';
    dimensions: { width: number; depth: number; height: number }; // in meters
    price: number;
    modelPath: string; // URL or local path to GLTF/GLB
    thumbnailPath?: string;
    defaultColor?: string;
    tags?: string[];
}

export interface PlacedFurnitureItem {
    id: string; // unique instance ID
    catalogItemId: string; // ref to Catalog Item
    position: Vector3; // [x, y, z] in 3D space
    rotation: Vector3; // Euler angles
    scale: Vector3;
    color?: string; // Overridden color
}

export interface ProjectSettings {
    wallColor: string;
    floorTexture: string;
    roomDimensions: RoomDimensions;
}

export interface Project {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    settings: ProjectSettings;
    items: PlacedFurnitureItem[];
}
