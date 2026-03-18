import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store/useStore';
import { Logo } from './Logo';

export function Navbar() {
    const location = useLocation();
    const user = useStore((state) => state.user);
    const cart = useStore((state) => state.cart);
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Catalog', path: '/catalog' },
        { name: 'Rooms', path: '/pre-made-rooms' },
        { name: 'Room Planner', path: '/planner' },
        { name: 'Dashboard', path: '/dashboard' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-18 py-3">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <Logo className="w-9 h-9 group-hover:scale-105 transition-transform" />
                        <span className="font-heading font-bold text-xl tracking-tight text-charcoal">Roomora</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => {
                            const isActive = location.pathname === link.path ||
                                (link.path !== '/' && location.pathname.startsWith(link.path));
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={cn(
                                        'relative text-base font-semibold tracking-wide transition-colors pb-1',
                                        'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:transition-all after:duration-300',
                                        isActive
                                            ? 'text-forest after:w-full after:bg-forest'
                                            : 'text-gray-500 hover:text-forest after:w-0 hover:after:w-full hover:after:bg-forest'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span className="hidden sm:inline-block font-medium">{user?.name}</span>
                        </div>

                        <Link to="/checkout" className="relative p-2 text-gray-500 hover:text-charcoal transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            {cartItemCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-forest rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-gray-500 hover:text-charcoal transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-4">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                'text-base font-medium transition-colors p-2 rounded-lg',
                                location.pathname === link.path ? 'bg-forest/10 text-forest' : 'text-gray-700 hover:bg-gray-50'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
