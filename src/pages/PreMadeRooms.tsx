import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShoppingCart, Edit2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function PreMadeRooms() {
    const navigate = useNavigate();
    const preMadeRooms = useStore((state) => state.preMadeRooms);
    const addToCart = useStore((state) => state.addToCart);
    const createProjectFromTemplate = useStore((state) => state.createProjectFromTemplate);

    const handleAddToCart = (room: any) => {
        addToCart({
            id: uuidv4(),
            name: `${room.name} Bundle`,
            price: room.totalPrice,
            quantity: 1,
            thumbnailPath: room.imageUrl,
        });
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">
                    Pre-Made Room Designs
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Browse our curated collection of complete room designs.
                    Add an entire look to your cart with a single click.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {preMadeRooms.map((room) => (
                    <div
                        key={room.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={room.imageUrl}
                                alt={room.name}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-charcoal shadow-sm">
                                ${room.totalPrice}
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-heading font-bold text-charcoal mb-2">
                                {room.name}
                            </h3>
                            <p className="text-gray-600 flex-1 mb-6 text-sm">
                                {room.description}
                            </p>

                            <div className="flex flex-col gap-3 mt-auto">
                                <button
                                    onClick={() => handleAddToCart(room)}
                                    className="w-full bg-forest text-white py-3 px-4 rounded-xl font-medium tracking-wide hover:shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add Bundle to Cart
                                </button>

                                <button
                                    onClick={() => {
                                        createProjectFromTemplate(room);
                                        navigate('/planner');
                                    }}
                                    className="w-full bg-white text-charcoal border border-gray-200 py-3 px-4 rounded-xl font-medium tracking-wide hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Edit2 className="w-5 h-5" />
                                    Edit in Planner
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
