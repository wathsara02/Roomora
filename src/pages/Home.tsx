import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Sparkles, LayoutPanelLeft, Box } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Home() {
    const catalog = useStore((state) => state.catalog);
    const featuredItems = catalog.slice(0, 4);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full overflow-hidden bg-ivory">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 text-forest text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                <span>Experience furniture in your space</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-heading font-bold text-charcoal leading-tight mb-6">
                                Design your <br />
                                <span className="text-forest italic font-serif opacity-90">perfect room</span> today.
                            </h1>
                            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed font-light">
                                Visualize premium furniture in 2D and immersive 3D.
                                Mix, match, and curate your space before you buy.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    to="/planner"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-white rounded-xl font-medium hover:bg-forest/90 transition-all hover-lift shadow-premium"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                    Try Room Visualizer
                                </Link>
                                <Link
                                    to="/catalog"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-charcoal rounded-xl font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    Browse Collection
                                </Link>
                            </div>
                        </div>

                        {/* Split Visual for Hero */}
                        <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-premium-hover group">
                            <img
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
                                alt="Modern Living Room"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                            {/* Floating UI Element (Simulating visualizer bounds) */}
                            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/80 p-6 rounded-2xl border border-white/40 shadow-xl z-10 flex items-center justify-between">
                                <div>
                                    <h3 className="font-heading font-semibold text-charcoal">Scandi Minimalist Sofa</h3>
                                    <p className="text-sm text-gray-500 font-medium">$899.00</p>
                                </div>
                                <button className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center hover:bg-forest/90 transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop By Category */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-4">Shop by Category</h2>
                            <p className="text-gray-500 max-w-xl">Curated collections designed to inspire every corner of your home.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Seating",
                                id: "seating",
                                image: "/models/cat_seating.png",
                                count: catalog.filter(i => i.category === 'seating').length
                            },
                            {
                                title: "Beds",
                                id: "beds",
                                image: "/models/cat_beds.png",
                                count: catalog.filter(i => i.category === 'beds').length
                            },
                            {
                                title: "Tables",
                                id: "tables",
                                image: "/models/cat_tables.png",
                                count: catalog.filter(i => i.category === 'tables').length
                            },
                            {
                                title: "Decor & Storage",
                                id: "decor",
                                image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
                                count: catalog.filter(i => i.category === 'decor' || i.category === 'storage').length
                            }
                        ].map((cat, i) => (
                            <Link key={i} to={`/catalog?category=${cat.id}`} className="group relative h-80 rounded-2xl overflow-hidden hover-lift shadow-sm">
                                <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6">
                                    <h3 className="text-xl font-heading font-semibold text-white mb-1">{cat.title}</h3>
                                    <p className="text-sm text-white/80">{cat.count} {cat.count === 1 ? 'item' : 'items'}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Furniture */}
            <section className="py-24 bg-ivory">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-4">Featured Pieces</h2>
                            <p className="text-gray-500 max-w-xl">Our most popular designs, carefully crafted for modern living.</p>
                        </div>
                        <Link to="/catalog" className="hidden sm:inline-flex items-center gap-2 text-forest font-medium hover:gap-3 transition-all">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredItems.map((item) => (
                            <div key={item.id} className="group flex flex-col bg-white rounded-2xl p-4 shadow-sm hover:shadow-premium-hover transition-all hover:-translate-y-1">
                                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-4 flex-shrink-0">
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
                                            <Box className="w-16 h-16 text-gray-300" strokeWidth={1} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col hidden-desc">
                                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{item.category}</div>
                                    <h3 className="font-heading font-semibold text-charcoal text-lg mb-2">{item.name}</h3>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="font-medium text-lg">${item.price.toFixed(2)}</span>
                                        <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-forest group-hover:text-white transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visualizer Promotion */}
            <section className="py-24 bg-forest text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Abstract visualizer preview UI */}
                        <div className="relative aspect-video lg:aspect-square bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-medium">RoomPlanner.exe</div>
                            </div>
                            <div className="flex-1 relative border-2 border-dashed border-white/20 rounded-xl overflow-hidden flex items-center justify-center group">
                                <div className="absolute bg-white/5 inset-0 transform rotate-3 scale-105 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-100"></div>
                                <LayoutPanelLeft className="w-24 h-24 text-white/30" strokeWidth={1} />
                                <div className="absolute bottom-6 bg-white text-charcoal px-6 py-3 rounded-full font-semibold shadow-xl flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    3D Render Active
                                </div>
                            </div>
                        </div>

                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">See it before you<br />build it.</h2>
                            <p className="text-white/80 text-lg mb-8 leading-relaxed font-light">
                                Our advanced 2D to 3D room planner lets you map out your space effortlessly. Drag and drop furniture, customize wall colors, and view your exact configuration in beautiful, immersive 3D instantly.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    'Accurate 2D layout planning tools',
                                    'Real-time 3D rendering engine',
                                    'Full scale and rotation controls',
                                    'Accurate pricing and dimension summaries'
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-white/90">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <Sparkles className="w-3 h-3" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/planner"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-forest rounded-xl font-medium hover:bg-gray-100 transition-all shadow-xl"
                            >
                                Launch Visualizer
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-4">Loved by Designers</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-16">See what leading interior designers are saying about Roomora.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            { name: "Sarah Jenkins", role: "Interior Architect", text: "The 2D to 3D pipeline on Roomora is seamless. It takes out all the guesswork from spatial planning and has elevated how I pitch concepts." },
                            { name: "Michael Chen", role: "Homeowner", text: "I designed my entire living room using the visualizer before buying a single piece. The dimensions and rendering lighting are incredibly fast and realistic." },
                            { name: "Elena Rossi", role: "Creative Director", text: "A truly premium experience. The UI is calm, the navigation is fluid, and the quality of the 3D models puts other furniture websites to shame." }
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-ivory p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex gap-1 mb-6 text-yellow-400">
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                    <Star className="w-5 h-5 fill-current" />
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                                <div>
                                    <h4 className="font-bold text-charcoal">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
