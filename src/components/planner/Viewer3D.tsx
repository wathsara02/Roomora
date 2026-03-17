import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { Project, PlacedFurnitureItem } from '../../types';
import { useStore } from '../../store/useStore';
import {
    Sofa, Armchair, DiningTable, DiningChair,
    CoffeeTable, Bookshelf, Bed, Wardrobe, SideTable, Desk,
    Rug, Plant, FloorLamp, TVUnit,
    DoubleBed, WideBookshelf, RoundCoffeeTable, LoungeChair
} from './furniture/ProceduralModels';

interface Viewer3DProps {
    project: Project;
    selectedItemId: string | null;
    setSelectedItemId: (id: string | null) => void;
}

const ProceduralFurniture = ({
    item,
    isSelected,
    onSelect
}: {
    item: PlacedFurnitureItem,
    isSelected: boolean,
    onSelect: () => void
}) => {
    const catalog = useStore(state => state.catalog);
    const meshRef = useRef<THREE.Group>(null);

    const cItem = catalog.find(c => c.id === item.catalogItemId);
    if (!cItem) return null;

    // Center alignment: R3F places center at 0,0,0
    // Note: item.position[1] is Y (elevation). Assuming 0 sits on floor.
    // Dimensions
    const w = cItem.dimensions.width * item.scale[0];
    const d = cItem.dimensions.depth * item.scale[2];
    const h = cItem.dimensions.height * item.scale[1];

    const yPosition = h / 2 + item.position[1];
    const color = item.color || cItem.defaultColor || '#cccccc';

    let ModelComponent = Sofa; // fallback
    switch (item.catalogItemId) {
        case 'item-1': ModelComponent = Sofa; break;
        case 'item-2': ModelComponent = Armchair; break;
        case 'item-3': ModelComponent = DiningTable; break;
        case 'item-4': ModelComponent = DiningChair; break;
        case 'item-5': ModelComponent = CoffeeTable; break;
        case 'item-6': ModelComponent = Bookshelf; break;
        case 'item-7': ModelComponent = Bed; break;
        case 'item-8': ModelComponent = Wardrobe; break;
        case 'item-9': ModelComponent = SideTable; break;
        case 'item-10': ModelComponent = Desk; break;
        case 'item-11': ModelComponent = Rug; break;
        case 'item-12': ModelComponent = Plant; break;
        case 'item-13': ModelComponent = FloorLamp; break;
        case 'item-14': ModelComponent = TVUnit; break;
        case 'item-15': ModelComponent = DoubleBed; break;
        case 'item-16': ModelComponent = WideBookshelf; break;
        case 'item-17': ModelComponent = RoundCoffeeTable; break;
        case 'item-18': ModelComponent = LoungeChair; break;
    }

    return (
        <group
            position={[item.position[0], yPosition, item.position[2]]}
            rotation={[item.rotation[0], item.rotation[1], item.rotation[2]]}
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            ref={meshRef}
        >
            {/* Selection Highlight outline effect */}
            {isSelected && (
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[w + 0.1, h + 0.1, d + 0.1]} />
                    <meshBasicMaterial color="#1E3F33" wireframe transparent opacity={0.3} />
                </mesh>
            )}

            {/* Main Procedural Body */}
            <ModelComponent w={w} h={h} d={d} color={color} />
        </group>
    );
};

export default function Viewer3D({ project, selectedItemId, setSelectedItemId }: Viewer3DProps) {
    const roomW = project.settings.roomDimensions.width;
    const roomL = project.settings.roomDimensions.length;
    const roomH = project.settings.roomDimensions.height || 2.8;

    // Map floor texture string to PBR material properties
    const getFloorMaterialContent = () => {
        const type = project.settings.floorTexture;
        switch (type) {
            case 'dark-walnut':
                return <meshStandardMaterial color="#3b2b20" roughness={0.6} metalness={0.1} />;
            case 'polished-concrete':
                return <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.2} />;
            case 'ceramic-tile':
                return <meshStandardMaterial color="#E5E4E2" roughness={0.1} metalness={0.1} />;
            case 'light-oak':
            default:
                return <meshStandardMaterial color="#c2a382" roughness={0.5} metalness={0.05} />;
        }
    };
    // const roomH = project.settings.roomDimensions.height;

    return (
        <div className="flex-1 w-full h-full relative bg-gray-900 overflow-hidden">
            {/* UI Overlay */}
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium text-white/90 z-10 border border-white/10 shadow-lg pointer-events-none">
                3D Render Mode: <span className="opacity-70">Interactive</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 text-xs font-medium text-white/70 z-10 font-mono pointer-events-none">
                Left Click: Rotate | Right Click: Pan | Scroll: Zoom
            </div>

            {/* R3F Canvas */}
            <Canvas
                shadows
                camera={{ position: [5, 4, 5], fov: 45 }}
                onPointerMissed={() => setSelectedItemId(null)}
            >
                <SoftShadows size={10} samples={16} focus={0.5} />
                <color attach="background" args={['#F5F5F0']} />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    castShadow
                    position={[5, 8, -5]}
                    intensity={1.5}
                    shadow-mapSize={[1024, 1024]}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />

                {/* Decorative Environment Lighting */}
                <Environment preset="city" />

                {/* Smart Walls */}
                <group position={[0, roomH / 2, 0]}>
                    <mesh position={[0, 0, -roomL / 2]} receiveShadow>
                        <planeGeometry args={[roomW, roomH]} />
                        <meshStandardMaterial color={project.settings.wallColor} />
                    </mesh>
                    <mesh position={[0, 0, roomL / 2]} rotation={[0, Math.PI, 0]} receiveShadow>
                        <planeGeometry args={[roomW, roomH]} />
                        <meshStandardMaterial color={project.settings.wallColor} />
                    </mesh>
                    <mesh position={[-roomW / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                        <planeGeometry args={[roomL, roomH]} />
                        <meshStandardMaterial color={project.settings.wallColor} />
                    </mesh>
                    <mesh position={[roomW / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
                        <planeGeometry args={[roomL, roomH]} />
                        <meshStandardMaterial color={project.settings.wallColor} />
                    </mesh>
                </group>

                {/* Room Bounds (Floor) */}
                <group position={[0, -0.01, 0]}>
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); setSelectedItemId(null); }}>
                        <planeGeometry args={[roomW, roomL]} />
                        {getFloorMaterialContent()}
                    </mesh>
                    <Grid
                        renderOrder={-1}
                        position={[0, 0.01, 0]}
                        infiniteGrid
                        cellSize={1}
                        cellThickness={0.5}
                        sectionSize={1}
                        sectionThickness={1.5}
                        cellColor="#cccccc"
                        sectionColor="#dddddd"
                        fadeDistance={25}
                    />
                    {/* Room outline walls visual */}
                    <lineSegments position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <edgesGeometry args={[new THREE.PlaneGeometry(roomW, roomL)]} />
                        <lineBasicMaterial color={project.settings.wallColor} linewidth={2} />
                    </lineSegments>
                </group>

                {/* High Quality Contact Shadows */}
                <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={10} color="#111111" />

                {/* Furniture Items */}
                <Suspense fallback={null}>
                    {project.items.map(item => (
                        <ProceduralFurniture
                            key={item.id}
                            item={item}
                            isSelected={selectedItemId === item.id}
                            onSelect={() => setSelectedItemId(item.id)}
                        />
                    ))}
                </Suspense>

                {/* Controls */}
                <OrbitControls
                    makeDefault
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2 - 0.05} // don't go below ground
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={2}
                    maxDistance={30}
                />
            </Canvas>
        </div>
    );
}
