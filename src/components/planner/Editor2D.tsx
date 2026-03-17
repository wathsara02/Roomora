import React, { useRef, useState } from 'react';
import type { Project } from '../../types';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

interface Editor2DProps {
    project: Project;
    selectedItemId: string | null;
    setSelectedItemId: (id: string | null) => void;
}

export default function Editor2D({ project, selectedItemId, setSelectedItemId }: Editor2DProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const catalog = useStore(state => state.catalog);
    const updateFurniture = useStore(state => state.updateFurniture);

    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // PIXELS_PER_METER mapping
    const PPM = 50;

    const roomW = project.settings.roomDimensions.width * PPM;
    const roomL = project.settings.roomDimensions.length * PPM;

    // Handle click outside to deselect
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelectedItemId(null);
        }
    };

    const handlePointerDown = (e: React.PointerEvent, itemId: string) => {
        e.stopPropagation();
        setSelectedItemId(itemId);
        setIsDragging(true);

        // Capture pointer to track outside bounds
        (e.target as HTMLElement).setPointerCapture(e.pointerId);

        const item = project.items.find(i => i.id === itemId);
        if (!item) return;

        // Calculate offset from mouse to the center of the item
        const containerRect = containerRef.current!.getBoundingClientRect();

        // Mouse relative to container
        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;

        // Item center relative to container
        const itemCenterPixelX = (project.settings.roomDimensions.width / 2 + item.position[0]) * PPM;
        const itemCenterPixelY = (project.settings.roomDimensions.length / 2 + item.position[2]) * PPM;

        setDragOffset({
            x: mouseX - itemCenterPixelX,
            y: mouseY - itemCenterPixelY,
        });
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging || !selectedItemId || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();

        // Mouse coords relative to top-left of the room container
        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;

        // Calculate new center
        let newCenterX = mouseX - dragOffset.x;
        let newCenterY = mouseY - dragOffset.y;

        // Convert back to meters relative to room center (0,0,0 is center of room)
        const xMeters = (newCenterX / PPM) - (project.settings.roomDimensions.width / 2);
        const zMeters = (newCenterY / PPM) - (project.settings.roomDimensions.length / 2);

        const item = project.items.find(i => i.id === selectedItemId);
        if (item) {
            updateFurniture(selectedItemId, { position: [xMeters, item.position[1], zMeters] });
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    return (
        <div
            className="flex-1 w-full h-full bg-gray-100/50 relative overflow-auto flex items-center justify-center p-8 active:cursor-grabbing"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            <div className="absolute top-4 left-4 bg-white/90 shadow-sm rounded-lg px-4 py-2 text-sm font-medium z-10 border border-gray-200">
                2D Layout: <span className="text-gray-500">{project.settings.roomDimensions.width}m × {project.settings.roomDimensions.length}m</span>
            </div>

            <div className="absolute top-4 right-4 bg-white/90 shadow-sm rounded-lg px-4 py-2 text-sm font-medium z-10 border border-gray-200 flex flex-col items-end text-gray-400">
                <span className="text-xs">Drag items to move</span>
                <span className="text-xs">Select for properties</span>
            </div>

            {/* 2D Canvas Room Wrapper */}
            <div
                className="relative bg-white shadow-premium ring-1 ring-gray-200/50"
                style={{
                    width: `${roomW}px`,
                    height: `${roomL}px`,
                    backgroundImage: `linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)`,
                    backgroundSize: `${PPM}px ${PPM}px`, // 1m grid
                }}
                ref={containerRef}
                onPointerDown={handleBackgroundClick}
            >
                {/* Walls visually indicated */}
                <div className="absolute inset-0 border-4 border-charcoal/80 pointer-events-none"></div>

                {/* Render Items */}
                {project.items.map(item => {
                    const cItem = catalog.find(c => c.id === item.catalogItemId);
                    if (!cItem) return null;

                    const isSelected = selectedItemId === item.id;

                    // Base dimensions in pixels
                    const widthPx = cItem.dimensions.width * PPM * item.scale[0];
                    const depthPx = cItem.dimensions.depth * PPM * item.scale[2];

                    // Center origin calculation
                    const leftPx = (project.settings.roomDimensions.width / 2 + item.position[0]) * PPM;
                    const topPx = (project.settings.roomDimensions.length / 2 + item.position[2]) * PPM;

                    // Rotation
                    const rotDeg = item.rotation[1] * (180 / Math.PI);

                    return (
                        <div
                            key={item.id}
                            onPointerDown={(e) => handlePointerDown(e, item.id)}
                            style={{
                                position: 'absolute',
                                width: widthPx,
                                height: depthPx,
                                left: leftPx,
                                top: topPx,
                                transform: `translate(-50%, -50%) rotate(${rotDeg}deg)`,
                                backgroundColor: item.color || cItem.defaultColor || '#cbd5e1',
                                touchAction: 'none'
                            }}
                            className={cn(
                                "cursor-grab active:cursor-grabbing hover:ring-2 ring-forest/50 transition-shadow flex items-center justify-center shadow-md",
                                isSelected ? "ring-2 ring-forest ring-offset-2 z-10 opacity-100" : "opacity-90 z-0 border border-black/10"
                            )}
                        >
                            <span
                                className="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md origin-center"
                                style={{ transform: `rotate(${-rotDeg}deg)` }}
                            >
                                {cItem.category.substring(0, 2)}
                            </span>

                            {/* Visual indicator of the front facing part of the furniture */}
                            <div className="absolute top-0 inset-x-0 h-1 bg-black/20"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
