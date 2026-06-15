import { Link } from 'react-router-dom';
import { ShoppingBag, X, HeartCrack } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, products } = useStore();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="flex justify-center mb-6 text-gray-300">
           <HeartCrack size={64} />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Save the items you love by clicking the heart icon on any product.</p>
        <Link to="/shop" className="inline-block border border-black hover:bg-black hover:text-white px-8 py-3 text-sm font-semibold tracking-wide uppercase transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold mb-10">Your Wishlist ({wishlistedProducts.length})</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {wishlistedProducts.map(product => (
          <div key={product.id} className="group bg-white flex flex-col p-3 md:p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 relative">
            <button 
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-20 text-red-500 hover:text-black transition-colors bg-white/80 rounded-full p-1 border border-transparent hover:border-gray-200"
            >
              <X size={14} className="md:w-[18px] md:h-[18px]" />
            </button>

            <Link to={`/product/${product.id}`} className="block relative aspect-square mb-3 md:mb-6 bg-gray-50 flex items-center justify-center p-2 md:p-4">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
            </Link>

            <div className="flex-1 flex flex-col">
              <Link to={`/product/${product.id}`} className="text-xs md:text-sm font-medium leading-snug mb-3 md:mb-4 line-clamp-2 hover:text-[#D4AF37] transition-colors">
                {product.name}
              </Link>

              <div className="flex items-center justify-between mt-auto mb-3 md:mb-4">
                <span className="font-semibold text-sm md:text-base">{formatCurrency(product.price)}</span>
              </div>
              
              <button 
                onClick={() => {
                  addToCart(product);
                  toggleWishlist(product.id);
                }}
                className="w-full bg-[#111111] hover:bg-gray-900 text-white h-[44px] md:h-10 flex items-center justify-center gap-1 md:gap-2 text-[10px] md:text-xs font-semibold tracking-wide uppercase transition-colors shrink-0"
                aria-label="Move to cart"
              >
                <ShoppingBag size={14} className="md:w-4 md:h-4" /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
