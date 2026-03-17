
export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <Logo className="w-8 h-8" />
                            <span className="font-heading font-bold text-xl text-charcoal tracking-tight">Roomora</span>
                        </div>
                        <p className="text-gray-500 text-sm max-w-sm">
                            A premium 2D and 3D room visualization tool for visualizing high-end furniture in realistic room layouts. Built for HCI Coursework.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-charcoal mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="/catalog" className="hover:text-forest transition-colors">Catalog</a></li>
                            <li><a href="/planner" className="hover:text-forest transition-colors">Room Planner</a></li>
                            <li><a href="/dashboard" className="hover:text-forest transition-colors">Dashboard</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-charcoal mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-forest transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-forest transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-forest transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Roomora. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">HCI Module Coursework</p>
                </div>
            </div>
        </footer>
    );
}
