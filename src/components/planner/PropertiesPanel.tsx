import type { Project } from '../../types';
import { useStore } from '../../store/useStore';
import { Trash2, Edit3, Type, Maximize } from 'lucide-react';

interface PropertiesPanelProps {
    className?: string;
    project: Project;
    selectedItemId: string | null;
    setSelectedItemId: (id: string | null) => void;
}

export default function PropertiesPanel({ className, project, selectedItemId, setSelectedItemId }: PropertiesPanelProps) {
    const catalog = useStore((state) => state.catalog);
    const updateFurniture = useStore((state) => state.updateFurniture);
    const removeFurniture = useStore((state) => state.removeFurniture);

    const selectedItem = project.items.find(i => i.id === selectedItemId);
    const catalogDetails = selectedItem ? catalog.find(c => c.id === selectedItem.catalogItemId) : null;

    const totalCost = project.items.reduce((sum, item) => {
        const cItem = catalog.find(c => c.id === item.catalogItemId);
        return sum + (cItem?.price || 0);
    }, 0);

    if (!selectedItem || !catalogDetails) {
        return (
            <div className={`flex flex-col h-full bg-gray-50/50 ${className}`}>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
                    <Edit3 className="w-12 h-12 mb-4 opacity-50" strokeWidth={1} />
                    <h3 className="font-medium text-gray-600 mb-2">No selection</h3>
                    <p className="text-sm">Click an item in the 2D or 3D view to edit its properties.</p>
                </div>

                {/* Project Summary at bottom if nothing selected */}
                <div className="p-6 bg-white border-t border-gray-100">
                    <h4 className="font-semibold text-charcoal mb-4 text-sm uppercase tracking-wider">Project Summary</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center text-gray-600">
                            <span>Items Placed:</span>
                            <span className="font-medium text-charcoal">{project.items.length}</span>
                        </div>
                        <div className="flex flex-col gap-2 text-gray-600">
                            <span className="text-xs font-semibold uppercase tracking-wider">Room Dimensions</span>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
                                    <span className="text-xs text-gray-400 mr-1">W</span>
                                    <input
                                        type="number"
                                        min="2" max="20" step="0.5"
                                        value={project.settings.roomDimensions.width}
                                        onChange={(e) => useStore.getState().updateProjectSettings({
                                            roomDimensions: { ...project.settings.roomDimensions, width: parseFloat(e.target.value) || 5 }
                                        })}
                                        className="w-full bg-transparent text-sm font-medium text-charcoal outline-none no-spinners"
                                    />
                                    <span className="text-xs text-gray-400 ml-1">m</span>
                                </div>
                                <span className="text-gray-300">×</span>
                                <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
                                    <span className="text-xs text-gray-400 mr-1">L</span>
                                    <input
                                        type="number"
                                        min="2" max="20" step="0.5"
                                        value={project.settings.roomDimensions.length}
                                        onChange={(e) => useStore.getState().updateProjectSettings({
                                            roomDimensions: { ...project.settings.roomDimensions, length: parseFloat(e.target.value) || 5 }
                                        })}
                                        className="w-full bg-transparent text-sm font-medium text-charcoal outline-none no-spinners"
                                    />
                                    <span className="text-xs text-gray-400 ml-1">m</span>
                                </div>
                            </div>
                        </div>

                        {/* Room Styles */}
                        <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">Room Styles</span>

                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs text-gray-500">Wall Paint</span>
                                <div className="flex gap-2">
                                    {[
                                        { bg: '#FAFAF8', name: 'Ivory' },
                                        { bg: '#8f9779', name: 'Sage' },
                                        { bg: '#7A8B99', name: 'Dusty Blue' },
                                        { bg: '#333333', name: 'Charcoal' },
                                        { bg: '#E2725B', name: 'Terracotta' }
                                    ].map(color => (
                                        <button
                                            key={color.bg}
                                            onClick={() => useStore.getState().updateProjectSettings({ wallColor: color.bg })}
                                            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${project.settings.wallColor === color.bg ? 'border-charcoal scale-110 shadow-sm' : 'border-gray-200'}`}
                                            style={{ backgroundColor: color.bg }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs text-gray-500">Floor Texture</span>
                                <select
                                    value={project.settings.floorTexture}
                                    onChange={(e) => useStore.getState().updateProjectSettings({ floorTexture: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 text-sm outline-none focus:border-forest transition-colors text-charcoal"
                                >
                                    <option value="light-oak">Light Oak Wood</option>
                                    <option value="dark-walnut">Dark Walnut Wood</option>
                                    <option value="polished-concrete">Polished Concrete</option>
                                    <option value="ceramic-tile">Ceramic Tile</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                            <span className="font-medium text-gray-600">Total Est. Price:</span>
                            <span className="font-bold text-lg text-forest">${totalCost.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFurniture(selectedItem.id, { color: e.target.value });
    };

    const handleDelete = () => {
        removeFurniture(selectedItem.id);
        setSelectedItemId(null);
    };

    return (
        <div className={`flex flex-col h-full ${className} shadow-[-4px_0_24px_-10px_rgba(0,0,0,0.05)]`}>
            <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                <div>
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                        {catalogDetails.category}
                    </div>
                    <h3 className="font-heading font-semibold text-charcoal text-lg">{catalogDetails.name}</h3>
                    <p className="text-forest font-medium mt-1">${catalogDetails.price.toFixed(2)}</p>
                </div>
                <button
                    onClick={handleDelete}
                    className="w-8 h-8 rounded-md bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete Item"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-8">
                {/* Transform Properties */}
                <section>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Type className="w-3.5 h-3.5" /> Transform
                    </h4>

                    <div className="space-y-4">
                        {/* Simple rotation control for demo */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-2">Rotation (Y-Axis)</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0" max="360" step="15"
                                    value={(selectedItem.rotation[1] * 180 / Math.PI) || 0}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        const rad = val * Math.PI / 180;
                                        updateFurniture(selectedItem.id, { rotation: [selectedItem.rotation[0], rad, selectedItem.rotation[2]] });
                                    }}
                                    className="flex-1 accent-forest"
                                />
                                <span className="text-sm text-gray-500 w-12 text-right">
                                    {Math.round((selectedItem.rotation[1] * 180 / Math.PI)) || 0}°
                                </span>
                            </div>
                        </div>

                        {/* Scale control */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 block mb-2">Uniform Scale</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="0.5" max="2" step="0.1"
                                    value={selectedItem.scale[0]}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        updateFurniture(selectedItem.id, { scale: [val, val, val] });
                                    }}
                                    className="flex-1 accent-forest"
                                />
                                <span className="text-sm text-gray-500 w-12 text-right">{selectedItem.scale[0].toFixed(1)}x</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Appearance */}
                <section>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Appearance</h4>
                    <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">Material Color</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={selectedItem.color || catalogDetails.defaultColor || '#ffffff'}
                                onChange={handleColorChange}
                                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                            />
                            <span className="text-sm text-gray-500 uppercase font-mono">
                                {selectedItem.color || catalogDetails.defaultColor || '#ffffff'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Info */}
                <section>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Maximize className="w-3.5 h-3.5" /> Dimensions
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-gray-50 p-2 text-center rounded-md border border-gray-100">
                            <div className="text-[10px] text-gray-400 uppercase font-medium">Width</div>
                            <div className="text-sm font-medium text-charcoal">{catalogDetails.dimensions.width}m</div>
                        </div>
                        <div className="bg-gray-50 p-2 text-center rounded-md border border-gray-100">
                            <div className="text-[10px] text-gray-400 uppercase font-medium">Depth</div>
                            <div className="text-sm font-medium text-charcoal">{catalogDetails.dimensions.depth}m</div>
                        </div>
                        <div className="bg-gray-50 p-2 text-center rounded-md border border-gray-100">
                            <div className="text-[10px] text-gray-400 uppercase font-medium">Height</div>
                            <div className="text-sm font-medium text-charcoal">{catalogDetails.dimensions.height}m</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
