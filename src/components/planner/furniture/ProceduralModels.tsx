import { RoundedBox, Cylinder } from '@react-three/drei';

interface FurnitureProps {
    w: number;
    h: number;
    d: number;
    color: string;
}

// 1. Sofa
export const Sofa = ({ w, h, d, color }: FurnitureProps) => {
    const armW = 0.2;
    const backD = 0.2;
    const seatH = h * 0.45;
    const legH = 0.15;
    const baseH = seatH - legH;

    return (
        <group>
            {/* Base */}
            <RoundedBox args={[w, baseH, d]} position={[0, -h / 2 + legH + baseH / 2, 0]} radius={0.02} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.8} />
            </RoundedBox>
            {/* Backrest */}
            <RoundedBox args={[w, h - seatH, backD]} position={[0, h / 2 - (h - seatH) / 2, -d / 2 + backD / 2]} radius={0.05} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.8} />
            </RoundedBox>
            {/* Left Arm */}
            <RoundedBox args={[armW, h - legH - 0.1, d]} position={[-w / 2 + armW / 2, -h / 2 + legH + (h - legH - 0.1) / 2, 0]} radius={0.04} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.8} />
            </RoundedBox>
            {/* Right Arm */}
            <RoundedBox args={[armW, h - legH - 0.1, d]} position={[w / 2 - armW / 2, -h / 2 + legH + (h - legH - 0.1) / 2, 0]} radius={0.04} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.8} />
            </RoundedBox>
            {/* Legs */}
            {[-1, 1].map(x => [-1, 1].map(z => (
                <Cylinder key={`${x}-${z}`} args={[0.02, 0.01, legH, 8]} position={[x * (w / 2 - 0.1), -h / 2 + legH / 2, z * (d / 2 - 0.1)]}>
                    <meshStandardMaterial color="#222" roughness={0.5} />
                </Cylinder>
            )))}
        </group>
    );
};

// 2. Armchair (Similar to Sofa but smaller)
export const Armchair = Sofa;

// 3. Dining Table
export const DiningTable = ({ w, h, d, color }: FurnitureProps) => {
    const topH = 0.05;
    const legW = 0.08;
    return (
        <group>
            {/* Top */}
            <RoundedBox args={[w, topH, d]} position={[0, h / 2 - topH / 2, 0]} radius={0.01} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.6} />
            </RoundedBox>
            {/* Legs */}
            {[-1, 1].map(x => [-1, 1].map(z => (
                <RoundedBox key={`${x}-${z}`} args={[legW, h - topH, legW]} position={[x * (w / 2 - legW), -h / 2 + (h - topH) / 2, z * (d / 2 - legW)]} radius={0.01}>
                    <meshStandardMaterial color={color} roughness={0.6} />
                </RoundedBox>
            )))}
        </group>
    );
};

// 4. Dining Chair
export const DiningChair = ({ w, h, d, color }: FurnitureProps) => {
    const seatH = h * 0.45;
    const thick = 0.04;
    const legW = 0.03;
    return (
        <group>
            <RoundedBox args={[w, thick, d]} position={[0, -h / 2 + seatH, 0]} radius={0.01}>
                <meshStandardMaterial color={color} roughness={0.7} />
            </RoundedBox>
            <RoundedBox args={[w, h - seatH, thick]} position={[0, h / 2 - (h - seatH) / 2, -d / 2 + thick / 2]} radius={0.01}>
                <meshStandardMaterial color={color} roughness={0.7} />
            </RoundedBox>
            {/* Legs */}
            {[-1, 1].map(x => [-1, 1].map(z => (
                <Cylinder key={`${x}-${z}`} args={[legW, legW * 0.6, seatH, 8]} position={[x * (w / 2 - 0.05), -h / 2 + seatH / 2, z * (d / 2 - 0.08)]}>
                    <meshStandardMaterial color="#222" roughness={0.5} />
                </Cylinder>
            )))}
        </group>
    );
};

// 5. Coffee Table
export const CoffeeTable = ({ w, h, d, color }: FurnitureProps) => {
    const topH = 0.03;
    return (
        <group>
            <RoundedBox args={[w, topH, d]} position={[0, h / 2 - topH / 2, 0]} radius={0.01}>
                {/* Fixed transparency by adding depthWrite={false} and adjusting to a solid glassy look */}
                <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} transparent opacity={0.6} depthWrite={false} />
            </RoundedBox>
            {/* Drei's Cylinder args: [radiusTop, radiusBottom, height, radialSegments] */}
            {/* Fixed base geometry so it looks like a sleek cylinder base, not a giant cone */}
            <Cylinder args={[0.15, 0.25, h - topH, 32]} position={[0, -h / 2 + (h - topH) / 2, 0]}>
                <meshStandardMaterial color="#111" roughness={0.4} />
            </Cylinder>
        </group>
    );
};

// 6. Bookshelf
export const Bookshelf = ({ w, h, d, color }: FurnitureProps) => {
    const thick = 0.03;
    const shelves = 5;
    const spacing = (h - thick) / shelves;
    return (
        <group>
            {/* Sides */}
            <RoundedBox args={[thick, h, d]} position={[-w / 2 + thick / 2, 0, 0]} radius={0.005}>
                <meshStandardMaterial color={color} roughness={0.8} />
            </RoundedBox>
            <RoundedBox args={[thick, h, d]} position={[w / 2 - thick / 2, 0, 0]} radius={0.005}>
                <meshStandardMaterial color={color} roughness={0.8} />
            </RoundedBox>
            {/* Shelves */}
            {Array.from({ length: shelves + 1 }).map((_, i) => (
                <RoundedBox key={i} args={[w - thick * 2, thick, d]} position={[0, -h / 2 + thick / 2 + i * spacing, 0]} radius={0.005}>
                    <meshStandardMaterial color={color} roughness={0.8} />
                </RoundedBox>
            ))}
        </group>
    );
};

// 7. Bed
export const Bed = ({ w, h, d, color }: FurnitureProps) => {
    const baseH = 0.3;
    const mattH = 0.2;
    const headH = h;
    const headD = 0.1;
    return (
        <group>
            {/* Base */}
            <RoundedBox args={[w, baseH, d - headD]} position={[0, -h / 2 + baseH / 2, headD / 2]} radius={0.02}>
                <meshStandardMaterial color="#8B5A2B" roughness={0.7} />
            </RoundedBox>
            {/* Mattress */}
            <RoundedBox args={[w - 0.05, mattH, d - headD - 0.05]} position={[0, -h / 2 + baseH + mattH / 2, headD / 2]} radius={0.05}>
                <meshStandardMaterial color={color} roughness={0.9} />
            </RoundedBox>
            {/* Headboard */}
            <RoundedBox args={[w, headH, headD]} position={[0, 0, -d / 2 + headD / 2]} radius={0.02}>
                <meshStandardMaterial color="#8B5A2B" roughness={0.7} />
            </RoundedBox>
            {/* Pillows */}
            <RoundedBox args={[w * 0.4, 0.1, 0.3]} position={[-w / 4, -h / 2 + baseH + mattH + 0.05, -d / 2 + headD + 0.2]} radius={0.04}>
                <meshStandardMaterial color="#fff" roughness={0.9} />
            </RoundedBox>
            <RoundedBox args={[w * 0.4, 0.1, 0.3]} position={[w / 4, -h / 2 + baseH + mattH + 0.05, -d / 2 + headD + 0.2]} radius={0.04}>
                <meshStandardMaterial color="#fff" roughness={0.9} />
            </RoundedBox>
        </group>
    );
};

// 8. Wardrobe
export const Wardrobe = ({ w, h, d, color }: FurnitureProps) => {
    return (
        <group>
            <RoundedBox args={[w, h, d]} position={[0, 0, 0]} radius={0.01}>
                <meshStandardMaterial color={color} roughness={0.5} />
            </RoundedBox>
            {/* Doors / Panel Splits */}
            <mesh position={[0, 0, d / 2 + 0.005]}>
                <boxGeometry args={[0.01, h - 0.1, 0.01]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Handles */}
            <Cylinder args={[0.01, 0.01, 0.4]} position={[-0.05, 0, d / 2 + 0.02]}>
                <meshStandardMaterial color="#333" metalness={0.8} />
            </Cylinder>
            <Cylinder args={[0.01, 0.01, 0.4]} position={[0.05, 0, d / 2 + 0.02]}>
                <meshStandardMaterial color="#333" metalness={0.8} />
            </Cylinder>
        </group>
    );
};

// 9. Side Table
export const SideTable = ({ w, h, color }: FurnitureProps) => {
    const topH = 0.03;
    const radius = Math.min(w, w) / 2; // Making sure it's bound by w/d
    return (
        <group>
            <Cylinder args={[radius, radius, topH, 32]} position={[0, h / 2 - topH / 2, 0]}>
                <meshStandardMaterial color={color} roughness={0.6} />
            </Cylinder>
            {/* Fixed leg thickness */}
            <Cylinder args={[0.03, 0.1, h - topH, 16]} position={[0, -h / 2 + (h - topH) / 2, 0]}>
                <meshStandardMaterial color="#222" roughness={0.4} />
            </Cylinder>
        </group>
    );
};

// 10. Desk
export const Desk = ({ w, h, d, color }: FurnitureProps) => {
    const topH = 0.04;
    const legW = 0.05;
    const drawersW = 0.35;
    return (
        <group>
            {/* Top */}
            <RoundedBox args={[w, topH, d]} position={[0, h / 2 - topH / 2, 0]} radius={0.01}>
                <meshStandardMaterial color={color} roughness={0.6} />
            </RoundedBox>
            {/* Drawers (Right side) */}
            <RoundedBox args={[drawersW, h - topH, d - 0.05]} position={[w / 2 - drawersW / 2 - 0.02, -h / 2 + (h - topH) / 2, 0]} radius={0.01}>
                <meshStandardMaterial color={color} roughness={0.6} />
            </RoundedBox>
            {/* Left Legs */}
            <RoundedBox args={[legW, h - topH, legW]} position={[-w / 2 + legW + 0.02, -h / 2 + (h - topH) / 2, d / 2 - legW - 0.02]} radius={0.01}>
                <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
            </RoundedBox>
            <RoundedBox args={[legW, h - topH, legW]} position={[-w / 2 + legW + 0.02, -h / 2 + (h - topH) / 2, -d / 2 + legW + 0.02]} radius={0.01}>
                <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
            </RoundedBox>
        </group>
    );
};

// 11. Rug
export const Rug = ({ w, d, color }: FurnitureProps) => {
    return (
        <group>
            <RoundedBox args={[w, 0.02, d]} position={[0, -0.01, 0]} radius={0.005}>
                <meshStandardMaterial color={color} roughness={1} metalness={0} />
            </RoundedBox>
        </group>
    );
}

// 12. Plant (Monstera)
export const Plant = ({ w, h, d }: FurnitureProps) => {
    const potH = h * 0.4;
    const potW = Math.min(w, d) * 0.8;
    return (
        <group>
            {/* Pot */}
            <Cylinder args={[potW / 2, potW / 2 - 0.05, potH, 32]} position={[0, -h / 2 + potH / 2, 0]}>
                <meshStandardMaterial color="#EAEAEA" roughness={0.2} />
            </Cylinder>
            {/* Dirt */}
            <Cylinder args={[potW / 2 - 0.02, potW / 2 - 0.02, 0.02, 32]} position={[0, -h / 2 + potH, 0]}>
                <meshStandardMaterial color="#2d1a11" roughness={0.9} />
            </Cylinder>
            {/* Leaves (Abstracted) */}
            <RoundedBox args={[w * 0.8, h - potH, d * 0.2]} position={[0, h / 2 - (h - potH) / 2, 0]} radius={0.05}>
                <meshStandardMaterial color="#2d5a27" roughness={0.8} />
            </RoundedBox>
            <RoundedBox args={[w * 0.2, h - potH, d * 0.8]} position={[0, h / 2 - (h - potH) / 2, 0]} radius={0.05}>
                <meshStandardMaterial color="#2d5a27" roughness={0.8} />
            </RoundedBox>
        </group>
    );
}

// 13. Floor Lamp
export const FloorLamp = ({ w, h, d, color }: FurnitureProps) => {
    const baseW = Math.min(w, d);
    const shadeH = 0.3;
    const shadeW = baseW * 0.8;
    return (
        <group>
            {/* Base */}
            <Cylinder args={[baseW / 2, baseW / 2, 0.05, 32]} position={[0, -h / 2 + 0.025, 0]}>
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.8} />
            </Cylinder>
            {/* Pole */}
            <Cylinder args={[0.02, 0.02, h - shadeH - 0.05, 16]} position={[0, -h / 2 + 0.05 + (h - shadeH - 0.05) / 2, 0]}>
                <meshStandardMaterial color="#111" roughness={0.5} metalness={0.8} />
            </Cylinder>
            {/* Shade */}
            <Cylinder args={[shadeW / 2.5, shadeW / 2, shadeH, 32]} position={[0, h / 2 - shadeH / 2, 0]}>
                {/* Emissive to simulate light */}
                <meshStandardMaterial color={color} roughness={0.2} emissive={color} emissiveIntensity={0.2} transparent opacity={0.9} depthWrite={false} />
            </Cylinder>
        </group>
    );
}

// 14. TV Unit
export const TVUnit = ({ w, h, d, color }: FurnitureProps) => {
    const unitH = h * 0.4;
    const tvH = h * 0.5;
    const tvW = w * 0.8;
    const tvD = 0.05;
    return (
        <group>
            {/* Console */}
            <RoundedBox args={[w, unitH, d]} position={[0, -h / 2 + unitH / 2, 0]} radius={0.01}>
                <meshStandardMaterial color={color} roughness={0.7} />
            </RoundedBox>
            {/* Cabinet splits */}
            <mesh position={[-w / 3, -h / 2 + unitH / 2, d / 2 + 0.005]}>
                <boxGeometry args={[0.01, unitH - 0.05, 0.01]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[w / 3, -h / 2 + unitH / 2, d / 2 + 0.005]}>
                <boxGeometry args={[0.01, unitH - 0.05, 0.01]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* TV Screen */}
            <RoundedBox args={[tvW, tvH, tvD]} position={[0, h / 2 - tvH / 2, 0]} radius={0.02}>
                <meshStandardMaterial color="#0A0A0A" roughness={0.1} metalness={0.8} />
            </RoundedBox>
            {/* TV Stand */}
            <RoundedBox args={[0.2, h - unitH - tvH, 0.1]} position={[0, -h / 2 + unitH + (h - unitH - tvH) / 2, 0]} radius={0.01}>
                <meshStandardMaterial color="#222" />
            </RoundedBox>
        </group>
    );
}

// 15. Premium Double Bed
export const DoubleBed = ({ w, h, d, color }: FurnitureProps) => {
    const frameH = 0.25;
    const mattressH = 0.25;
    const headboardD = 0.15;
    return (
        <group>
            {/* Frame */}
            <RoundedBox args={[w, frameH, d - headboardD]} position={[0, -h / 2 + frameH / 2, headboardD / 2]} radius={0.02} smoothness={4}>
                <meshStandardMaterial color="#4A4A4A" roughness={0.7} />
            </RoundedBox>
            {/* Mattress */}
            <RoundedBox args={[w - 0.1, mattressH, d - headboardD - 0.1]} position={[0, -h / 2 + frameH + mattressH / 2, headboardD / 2]} radius={0.05} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.9} />
            </RoundedBox>
            {/* Headboard */}
            <RoundedBox args={[w + 0.1, h, headboardD]} position={[0, 0, -d / 2 + headboardD / 2]} radius={0.05} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.8} />
            </RoundedBox>
            {/* Pillows */}
            {[-0.25, 0.25].map(x => (
                <RoundedBox key={x} args={[w * 0.38, 0.1, 0.3]} position={[x * w, -h / 2 + frameH + mattressH + 0.05, -d / 2 + headboardD + 0.22]} radius={0.04} smoothness={4}>
                    <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
                </RoundedBox>
            ))}
        </group>
    );
};

// 16. Wide Bookshelf
export const WideBookshelf = ({ w, h, d, color }: FurnitureProps) => {
    const th = 0.04;
    const numShelves = 4;
    return (
        <group>
            {/* Left side */}
            <mesh position={[-w / 2 + th / 2, 0, 0]}>
                <boxGeometry args={[th, h, d]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            {/* Right side */}
            <mesh position={[w / 2 - th / 2, 0, 0]}>
                <boxGeometry args={[th, h, d]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            {/* Shelves */}
            {Array.from({ length: numShelves + 1 }).map((_, i) => (
                <mesh key={i} position={[0, -h / 2 + i * (h / numShelves) + th / 2, 0]}>
                    <boxGeometry args={[w - th * 2, th, d]} />
                    <meshStandardMaterial color={color} roughness={0.7} />
                </mesh>
            ))}
            {/* Centre divider */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[th, h - th * 2, d]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
        </group>
    );
};

// 17. Round Coffee Table
export const RoundCoffeeTable = ({ w, h, color }: FurnitureProps) => {
    return (
        <group>
            {/* Round top */}
            <Cylinder args={[w / 2, w / 2, 0.05, 32]} position={[0, h / 2 - 0.025, 0]}>
                <meshStandardMaterial color={color} roughness={0.5} />
            </Cylinder>
            {/* Tapered base */}
            <Cylinder args={[w / 5, w / 3.5, h - 0.05, 16]} position={[0, -0.025, 0]}>
                <meshStandardMaterial color="#222" roughness={0.5} />
            </Cylinder>
        </group>
    );
};

// 18. Lounge Accent Chair
export const LoungeChair = ({ w, h, d, color }: FurnitureProps) => {
    const legH = 0.18;
    const seatH = 0.12;
    return (
        <group>
            {/* Seat cushion */}
            <RoundedBox args={[w, seatH, d]} position={[0, -h / 2 + legH + seatH / 2, 0]} radius={0.04} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.8} />
            </RoundedBox>
            {/* Backrest */}
            <RoundedBox args={[w, h - legH - seatH, 0.14]} position={[0, 0, -d / 2 + 0.07]} rotation={[0.15, 0, 0]} radius={0.05} smoothness={4}>
                <meshStandardMaterial color={color} roughness={0.8} />
            </RoundedBox>
            {/* Thin metal legs */}
            {([-1, 1] as const).flatMap(x => [-1, 1].map(z => (
                <Cylinder key={`${x}-${z}`} args={[0.022, 0.018, legH, 8]} position={[x * (w / 2 - 0.08), -h / 2 + legH / 2, z * (d / 2 - 0.08)]}>
                    <meshStandardMaterial color="#888" roughness={0.3} metalness={0.8} />
                </Cylinder>
            )))}
        </group>
    );
};
