import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, LayoutDashboard, Box, ShoppingCart, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '../lib/utils';

export default function Catalog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'all';
    const catalog = useStore((state) => state.catalog);
    const addToCart = useStore((state) => state.addToCart);

    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleAddToCart = (item: any) => {
        addToCart({
            id: uuidv4(),
            name: item.name,
            price: item.price,
            quantity: 1,
            thumbnailPath: item.thumbnailPath,
        });
        setNotification(`${item.name} added to cart!`);
    };

    const categories = ['all', 'seating', 'tables', 'storage', 'beds', 'decor'];

    const filteredItems = catalog.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-ivory pt-8 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">The Collection</h1>
                    <p className="text-gray-500 max-w-2xl text-lg font-light">
                        Browse our curated selection of premium furniture models.
                        Add your favorites to the 2D planner to see them in your space.
                    </p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSearchParams(cat === 'all' ? {} : { category: cat })}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                                    activeCategory === cat
                                        ? "bg-charcoal text-white shadow-md"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                )}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search pieces..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest/50 focus:border-forest transition-all"
                        />
                    </div>
                </div>

                {/* Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="group flex flex-col bg-white rounded-2xl p-4 shadow-sm hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-1">
                                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-5 flex-shrink-0 border border-gray-100/50">
                                    {item.tags && item.tags[0] && (
                                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-md text-xs font-semibold text-gray-800 z-10">
                                            {item.tags[0]}
                                        </div>
                                    )}
                                    {item.thumbnailPath ? (
                                        <img
                                            src={item.thumbnailPath}
                                            alt={item.name}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                                            <div className="flex flex-col items-center opacity-50">
                                                <Box className="w-16 h-16 text-gray-400 mb-2" strokeWidth={1.5} />
                                                <span className="text-xs font-medium text-gray-500">View 3D Model</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{item.category}</div>
                                            <h3 className="font-heading font-semibold text-charcoal text-lg line-clamp-1" title={item.name}>{item.name}</h3>
                                        </div>
                                        <span className="font-medium text-lg text-forest">${item.price.toFixed(2)}</span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                        <span className="flex items-center gap-1">
                                            W: {item.dimensions.width}m
                                        </span>
                                        <span className="flex items-center gap-1">
                                            D: {item.dimensions.depth}m
                                        </span>
                                        <span className="flex items-center gap-1">
                                            H: {item.dimensions.height}m
                                        </span>
                                    </div>

                                    <div className="mt-auto grid grid-cols-2 gap-3">
                                        <Link
                                            to="/planner"
                                            className="flex items-center justify-center gap-2 py-2.5 bg-forest text-white rounded-lg text-sm font-medium hover:bg-forest/90 transition-colors shadow-sm"
                                        >
                                            <LayoutDashboard className="w-4 h-4" />
                                            Add to Room
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToCart(item);
                                            }}
                                            className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-charcoal rounded-lg text-sm font-medium hover:bg-gray-50 hover:shadow-sm active:scale-95 transition-all"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center flex flex-col items-center justify-center">
                        <Filter className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-xl font-heading font-semibold text-charcoal mb-2">No pieces found</h3>
                        <p className="text-gray-500">We couldn't track down any furniture matching your filters.</p>
                        <button
                            onClick={() => { setSearchParams({}); setSearchQuery(''); }}
                            className="mt-6 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-lg text-sm font-medium transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* Notification Toast */}
            {notification && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-charcoal text-white px-6 py-3 rounded-full shadow-xl font-medium tracking-wide flex items-center gap-3 z-50 transition-all duration-300">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{notification}</span>
                </div>
            )}
        </div>
    );
}
