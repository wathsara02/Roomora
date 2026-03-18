import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Trash2, ShoppingBag, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
    const cart = useStore((state) => state.cart);
    const removeFromCart = useStore((state) => state.removeFromCart);
    const clearCart = useStore((state) => state.clearCart);

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutComplete, setCheckoutComplete] = useState(false);

    const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate an API call or logic processing delay
        setTimeout(() => {
            setIsCheckingOut(false);
            setCheckoutComplete(true);
            clearCart();
        }, 1500);
    };

    if (checkoutComplete) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
                <CheckCircle className="w-24 h-24 text-forest mb-6" />
                <h1 className="text-4xl font-heading font-bold text-charcoal mb-4 text-center">
                    Order Placed Successfully!
                </h1>
                <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
                    Thank you for your simulated purchase. Your items will not be shipped since this is a demo.
                </p>
                <Link
                    to="/"
                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-forest hover:bg-[#2A3F32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest transition-colors"
                >
                    Return Home
                </Link>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8 text-center">
                <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
                <h2 className="text-3xl font-heading font-bold text-charcoal mb-4">
                    Your Cart is Empty
                </h2>
                <p className="text-lg text-gray-500 mb-8 max-w-md">
                    Looks like you haven't added any items or room designs to your cart yet.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/catalog"
                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-forest hover:bg-[#2A3F32] transition-colors"
                    >
                        Browse Catalog
                    </Link>
                    <Link
                        to="/pre-made-rooms"
                        className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-charcoal bg-white hover:bg-gray-50 transition-colors"
                    >
                        View Rooms
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-4xl font-heading font-bold text-charcoal">Checkout</h1>
                    <p className="mt-2 text-lg text-gray-600">Review your items and complete your order.</p>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-2xl border border-gray-100">
                    <ul role="list" className="divide-y divide-gray-200">
                        {cart.map((item) => (
                            <li key={item.id} className="p-6 sm:p-8 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150">
                                <div className="flex items-center space-x-6">
                                    {item.thumbnailPath ? (
                                        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-gray-100">
                                            <img
                                                src={item.thumbnailPath}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gray-100 flex items-center justify-center">
                                            <ShoppingBag className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-heading font-semibold text-charcoal">{item.name}</h3>
                                        <p className="mt-1 flex items-center text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-4">
                                    <p className="text-xl font-semibold text-charcoal">${(item.price * item.quantity).toFixed(2)}</p>
                                    <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white shadow sm:rounded-2xl border border-gray-100 p-6 sm:p-8 sticky bottom-0">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-2xl font-heading font-bold text-charcoal">Total Amount</span>
                        <span className="text-3xl font-bold text-forest">${totalAmount.toFixed(2)}</span>
                    </div>

                    <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-forest hover:bg-[#2A3F32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest disabled:opacity-75 disabled:cursor-not-allowed transition-all"
                    >
                        {isCheckingOut ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing Order...
                            </span>
                        ) : (
                            'Place Order'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
