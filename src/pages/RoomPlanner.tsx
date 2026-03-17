import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Toolbar from '../components/planner/Toolbar';
import Sidebar from '../components/planner/Sidebar';
import PropertiesPanel from '../components/planner/PropertiesPanel';
import Editor2D from '../components/planner/Editor2D';
import Viewer3D from '../components/planner/Viewer3D';
import { Library, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '../lib/utils';

export type ViewMode = '2D' | '3D';

export default function RoomPlanner() {
    const activeProjectId = useStore((state) => state.activeProjectId);
    const projects = useStore((state) => state.projects);
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState<ViewMode>('2D');
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    // Mobile Panel State
    const [showSidebar, setShowSidebar] = useState(false);
    const [showProperties, setShowProperties] = useState(false);

    const activeProject = projects.find(p => p.id === activeProjectId);

    useEffect(() => {
        // If no active project, redirect to dashboard or create one
        if (!activeProjectId) {
            navigate('/dashboard');
        }
    }, [activeProjectId, navigate]);

    // Close mobile panels when selecting an item to show properties
    useEffect(() => {
        if (selectedItemId) {
            setShowSidebar(false);
            // On mobile, auto-open properties when something is selected
            if (window.innerWidth < 768) setShowProperties(true);
        }
    }, [selectedItemId]);

    if (!activeProject) return <div className="min-h-screen flex items-center justify-center bg-ivory">Loading...</div>;

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-50 relative">
            {/* Top Toolbar */}
            <Toolbar
                project={activeProject}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />

            {/* Mobile Action Buttons overlay */}
            <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-40">
                <button
                    onClick={() => { setShowSidebar(!showSidebar); setShowProperties(false); }}
                    className="flex items-center gap-2 bg-charcoal text-white px-5 py-3 rounded-full shadow-lg font-medium text-sm"
                >
                    <Library className="w-4 h-4" /> Catalog
                </button>
                <button
                    onClick={() => { setShowProperties(!showProperties); setShowSidebar(false); }}
                    className="flex items-center gap-2 bg-white text-charcoal border border-gray-200 px-5 py-3 rounded-full shadow-lg font-medium text-sm"
                >
                    <SlidersHorizontal className="w-4 h-4" /> Properties
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden relative w-full h-full">
                {/* Left Sidebar (Catalog) - Responsive Drawer */}
                <div className={cn(
                    "absolute md:relative z-30 md:z-0 h-full bg-white transition-transform duration-300 w-80 flex-shrink-0 border-r border-gray-200",
                    showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}>
                    {showSidebar && (
                        <button onClick={() => setShowSidebar(false)} className="md:hidden absolute top-4 right-4 p-2 bg-gray-100 rounded-full z-10">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <Sidebar className="h-full w-full" />
                </div>

                {/* Mobile Backdrop */}
                {(showSidebar || showProperties) && (
                    <div
                        className="md:hidden absolute inset-0 bg-black/20 z-20 backdrop-blur-sm transition-opacity"
                        onClick={() => { setShowSidebar(false); setShowProperties(false); }}
                    />
                )}

                {/* Center Viewer Area */}
                <main className="flex-1 relative outline-none flex w-full h-full min-w-0" tabIndex={0}>
                    {viewMode === '2D' ? (
                        <Editor2D
                            project={activeProject}
                            selectedItemId={selectedItemId}
                            setSelectedItemId={setSelectedItemId}
                        />
                    ) : (
                        <Viewer3D
                            project={activeProject}
                            selectedItemId={selectedItemId}
                            setSelectedItemId={setSelectedItemId}
                        />
                    )}
                </main>

                {/* Right Properties Panel - Responsive Drawer */}
                <div className={cn(
                    "absolute top-0 right-0 md:relative z-30 md:z-0 h-full bg-white transition-transform duration-300 w-80 flex-shrink-0 border-l border-gray-200 flex flex-col",
                    showProperties ? "translate-x-0" : "translate-x-full md:translate-x-0"
                )}>
                    {showProperties && (
                        <button onClick={() => setShowProperties(false)} className="md:hidden absolute top-4 right-4 p-2 bg-gray-100 rounded-full z-10">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <PropertiesPanel
                        className="h-full w-full"
                        project={activeProject}
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                    />
                </div>
            </div>
        </div>
    );
}
