import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, LayoutDashboard, Trash2, Edit2, LayoutPanelLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Dashboard() {
    const projects = useStore((state) => state.projects);
    const createProject = useStore((state) => state.createProject);
    const loadProject = useStore((state) => state.loadProject);
    const deleteProject = useStore((state) => state.deleteProject);
    const user = useStore((state) => state.user);

    const navigate = useNavigate();
    const [newProjectName, setNewProjectName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProjectName.trim()) return;
        createProject(newProjectName);
        setNewProjectName('');
        setIsCreating(false);
        navigate('/planner');
    };

    const handleOpen = (id: string) => {
        loadProject(id);
        navigate('/planner');
    };

    return (
        <div className="flex flex-col min-h-screen bg-ivory pt-8 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-charcoal mb-2">My Projects</h1>
                        <p className="text-gray-500 font-light">
                            Welcome back, {user?.name || 'Designer'}. Manage your room visualizations.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-forest text-white rounded-xl font-medium hover:bg-forest/90 transition-all shadow-premium"
                    >
                        <Plus className="w-5 h-5" />
                        New Room Design
                    </button>
                </div>

                {/* Create Modal overlay (simple inline version for now) */}
                {isCreating && (
                    <div className="mb-12 bg-white p-6 rounded-2xl shadow-premium border border-gray-100 max-w-xl animate-in slide-in-from-top-4 fade-in duration-300">
                        <h3 className="font-heading font-semibold text-lg mb-4">Start a new project</h3>
                        <form onSubmit={handleCreate} className="flex gap-4">
                            <input
                                type="text"
                                autoFocus
                                placeholder="e.g. Master Bedroom Redesign"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest/50 focus:border-forest transition-all"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-charcoal text-white rounded-xl font-medium hover:bg-black transition-colors"
                            >
                                Create
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="px-6 py-3 bg-gray-100 text-charcoal rounded-xl font-medium hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projects.map((project) => (
                            <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
                                <div
                                    className="aspect-video bg-gray-50 relative flex items-center justify-center cursor-pointer overflow-hidden"
                                    onClick={() => handleOpen(project.id)}
                                >
                                    {project.imageUrl ? (
                                        <img
                                            src={project.imageUrl}
                                            alt={project.name}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <img
                                            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000"
                                            alt="Room placeholder"
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 mix-blend-multiply"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
                                    {!project.imageUrl && (
                                        <LayoutPanelLeft className="w-12 h-12 text-white/50 absolute z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                                    )}

                                    <div className="absolute bottom-3 left-3 flex gap-2 z-10">
                                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-md text-xs font-semibold text-charcoal">
                                            {project.items.length} Items
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                                    <h3
                                        className="font-heading font-semibold text-charcoal text-base sm:text-lg mb-1 cursor-pointer hover:text-forest transition-colors line-clamp-1"
                                        onClick={() => handleOpen(project.id)}
                                    >
                                        {project.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-4 sm:mb-6">
                                        <Clock className="w-3.5 h-3.5" />
                                        {new Date(project.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </div>

                                    <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3 sm:pt-4">
                                        <button
                                            onClick={() => handleOpen(project.id)}
                                            className="text-sm font-medium text-forest hover:text-forest/80 flex items-center gap-1.5 transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" /> Open Editor
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this project?')) {
                                                    deleteProject(project.id);
                                                }
                                            }}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                            title="Delete Project"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <LayoutDashboard className="w-16 h-16 text-gray-200 mb-6" strokeWidth={1} />
                        <h3 className="text-2xl font-heading font-bold text-charcoal mb-2">No projects yet</h3>
                        <p className="text-gray-500 max-w-sm mb-8">
                            Start designing your first room. Mix and match premium furniture to see how it fits your space.
                        </p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="flex items-center gap-2 px-8 py-4 bg-charcoal text-white rounded-xl font-medium hover:bg-black transition-all shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Create First Project
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
