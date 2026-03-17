import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Search, Plus, Box } from 'lucide-react';

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const catalog = useStore((state) => state.catalog);
    const addFurniture = useStore((state) => state.addFurniture);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = ['all', 'seating', 'tables', 'storage', 'beds', 'decor'];

    const filtered = catalog.filter(item => {
        const matchesCat = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        return matchesCat && matchesSearch;
    });

    return (
        <div className={`flex flex-col h-full ${className}`}>
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-heading font-semibold text-charcoal mb-4">Furniture Catalog</h3>

                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? 'bg-charcoal text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {filtered.map(item => (
                    <div key={item.id} className="group bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:border-forest/30 hover:shadow-md transition-all flex flex-col">
                        <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden text-gray-400 group-hover:text-forest transition-colors">
                            {item.thumbnailPath ? (
                                <img src={item.thumbnailPath} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            ) : (
                                <Box className="w-8 h-8" strokeWidth={1.5} />
                            )}
                        </div>

                        <div className="flex flex-col flex-1">
                            <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">{item.category}</div>
                            <h4 className="font-semibold text-charcoal text-sm leading-tight mb-2">{item.name}</h4>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="font-medium text-sm text-forest">${item.price.toFixed(2)}</span>
                                <button
                                    onClick={() => addFurniture(item.id)}
                                    className="w-7 h-7 bg-ivory border border-gray-200 rounded-md flex items-center justify-center text-gray-600 hover:bg-forest hover:text-white hover:border-forest transition-colors"
                                    title="Add to Scene"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-8 text-sm text-gray-500">
                        No items found.
                    </div>
                )}
            </div>
        </div>
    );
}
