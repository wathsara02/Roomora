import { useState } from 'react';
import type { Project } from '../../types';
import type { ViewMode } from '../../pages/RoomPlanner';
import { ArrowLeft, Save, LayoutTemplate, Box as BoxIcon, Settings2, Download, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface ToolbarProps {
    project: Project;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
}

export default function Toolbar({ project, viewMode, setViewMode }: ToolbarProps) {
    const navigate = useNavigate();
    const updateProjectSettings = useStore(state => state.updateProjectSettings);
    const catalog = useStore(state => state.catalog);

    const [showSettings, setShowSettings] = useState(false);
    const [showExportSuccess, setShowExportSuccess] = useState(false);

    // Local settings form state
    const [roomWidth, setRoomWidth] = useState(project.settings.roomDimensions.width);
    const [roomLength, setRoomLength] = useState(project.settings.roomDimensions.length);
    const [roomHeight, setRoomHeight] = useState(project.settings.roomDimensions.height || 2.8);

    const handleSaveSettings = () => {
        updateProjectSettings({
            roomDimensions: {
                width: Number(roomWidth),
                length: Number(roomLength),
                height: Number(roomHeight)
            }
        });
        setShowSettings(false);
    };

    const handleExport = () => {
        const totalCost = project.items.reduce((sum, item) => {
            const cItem = catalog.find(c => c.id === item.catalogItemId);
            return sum + (cItem?.price ?? 0);
        }, 0);

        const exportData = {
            projectName: project.name,
            exportedAt: new Date().toISOString(),
            roomDimensions: project.settings.roomDimensions,
            wallColor: project.settings.wallColor,
            floorTexture: project.settings.floorTexture,
            totalFurniturePieces: project.items.length,
            estimatedTotalCost: `$${totalCost.toLocaleString()}`,
            furniture: project.items.map(item => {
                const cItem = catalog.find(c => c.id === item.catalogItemId);
                return {
                    name: cItem?.name ?? item.catalogItemId,
                    category: cItem?.category ?? 'unknown',
                    price: cItem?.price ?? 0,
                    position: { x: item.position[0].toFixed(2), z: item.position[2].toFixed(2) },
                    rotation: `${(item.rotation[1] * 180 / Math.PI).toFixed(0)}°`,
                };
            })
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.name.replace(/\s+/g, '_')}_layout.json`;
        a.click();
        URL.revokeObjectURL(url);

        setShowExportSuccess(true);
        setTimeout(() => setShowExportSuccess(false), 2500);
    };

    return (
        <>
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
                <div className="flex items-center gap-4 border-r border-gray-100 pr-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="flex flex-col hidden sm:flex">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Project</span>
                        <h2 className="text-sm font-semibold text-charcoal">{project.name}</h2>
                    </div>
                </div>

                <div className="flex items-center bg-gray-100/80 p-1 rounded-lg border border-gray-200/50">
                    <button
                        onClick={() => setViewMode('2D')}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${viewMode === '2D' ? 'bg-white shadow-sm text-charcoal' : 'text-gray-500 hover:text-charcoal'}`}
                    >
                        <LayoutTemplate className="w-4 h-4" />
                        <span className="hidden sm:inline">2D Plan</span>
                        <span className="sm:hidden">2D</span>
                    </button>
                    <button
                        onClick={() => setViewMode('3D')}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${viewMode === '3D' ? 'bg-white shadow-sm text-forest' : 'text-gray-500 hover:text-charcoal'}`}
                    >
                        <BoxIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">3D View</span>
                        <span className="sm:hidden">3D</span>
                    </button>
                </div>

                <div className="flex items-center gap-2 pl-2 sm:pl-4 border-l border-gray-100">
                    <div className="hidden sm:flex text-xs text-gray-400 mr-2 items-center gap-1">
                        <Save className="w-3.5 h-3.5" />
                        Auto-saved
                    </div>
                    <button
                        onClick={() => setShowSettings(true)}
                        className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Room Settings"
                    >
                        <Settings2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleExport}
                        className="hidden sm:flex w-9 h-9 items-center justify-center rounded-md bg-forest text-white hover:bg-forest/90 shadow-sm transition-colors relative"
                        title="Export Project as JSON"
                    >
                        {showExportSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Room Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-heading font-bold text-charcoal">Room Settings</h2>
                            <button onClick={() => setShowSettings(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Room Width (m)</label>
                                <input
                                    type="number"
                                    min={2} max={15} step={0.5}
                                    value={roomWidth}
                                    onChange={e => setRoomWidth(parseFloat(e.target.value))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Room Length (m)</label>
                                <input
                                    type="number"
                                    min={2} max={15} step={0.5}
                                    value={roomLength}
                                    onChange={e => setRoomLength(parseFloat(e.target.value))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ceiling Height (m)</label>
                                <input
                                    type="number"
                                    min={2} max={5} step={0.1}
                                    value={roomHeight}
                                    onChange={e => setRoomHeight(parseFloat(e.target.value))}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveSettings}
                                className="flex-1 py-2.5 rounded-xl bg-forest text-white text-sm font-medium hover:bg-forest/90 transition-colors shadow-sm"
                            >
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
