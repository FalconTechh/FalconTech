import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Heart, Truck, ShieldCheck, Star, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { useStore } from '../store/useStore';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const products = useStore(state => state.products);
  const product = products.find(p => p.id === id);
  const addToCart = useStore(state => state.addToCart);
  const toggleWishlist = useStore(state => state.toggleWishlist);
  const wishlist = useStore(state => state.wishlist);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-[#D4AF37] hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-gray-500 mb-8 uppercase tracking-widest whitespace-nowrap overflow-x-auto no-scrollbar">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight size={14} className="mx-2 shrink-0" />
        <Link to="/shop" className="hover:text-black">Shop</Link>
        <ChevronRight size={14} className="mx-2 shrink-0" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-black">{product.category}</Link>
        <ChevronRight size={14} className="mx-2 shrink-0" />
        <span className="text-black font-semibold truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Product Image */}
        <div className="bg-gray-50 aspect-square flex items-center justify-center p-8 relative">
          {product.isNew && (
             <span className="absolute top-6 left-6 bg-black text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider z-10">New Arrival</span>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 tracking-widest uppercase mb-2">{product.brand}</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.reviews} Customer Reviews</span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Prices include 5% VAT. Free delivery within UAE.</p>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 h-14 w-32 shrink-0">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white border border-black text-black h-14 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide uppercase hover:bg-gray-100 transition-colors"
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-[#111111] hover:bg-gray-900 text-white h-14 flex items-center justify-center text-sm font-semibold tracking-wide uppercase transition-colors"
            >
              Buy Now
            </button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className="w-14 items-center justify-center flex border border-gray-300 hover:border-black text-gray-600 hover:text-red-500 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-200 rounded-sm divide-y divide-gray-200 mb-6">
            <div className="p-4 flex gap-4">
              <Truck className="text-[#D4AF37] shrink-0" />
              <div>
                <h4 className="text-sm font-medium">Fast UAE Delivery</h4>
                <p className="text-xs text-gray-500 mt-1">Order within 4 hrs 30 mins for delivery tomorrow.</p>
              </div>
            </div>
            <div className="p-4 flex gap-4">
              <ShieldCheck className="text-[#D4AF37] shrink-0" />
              <div>
                <h4 className="text-sm font-medium">100% Genuine Guarantee</h4>
                <p className="text-xs text-gray-500 mt-1">Official brand warranty and 14-days return.</p>
              </div>
            </div>
          </div>

          {/* Secure Payment Box */}
          <div className="bg-gray-50 p-4 border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="flex items-center text-green-600 mb-3 text-sm font-medium gap-1.5">
              <ShieldCheck size={16} /> Guaranteed Safe & Secure Checkout
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-[9px] font-bold text-blue-800 shadow-sm">VISA</div>
              <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-[9px] font-bold text-red-600 shadow-sm">MASTER</div>
              <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-[9px] font-bold text-black shadow-sm">Apple Pay</div>
              <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center text-[9px] font-bold text-black shadow-sm">G Pay</div>
            </div>
            <span className="text-[10px] text-gray-400 mt-3 font-medium uppercase tracking-widest">Powered By Stripe</span>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-20">
        <div className="flex border-b border-gray-200 gap-8 mb-8">
          <button 
            className={`pb-4 text-sm font-semibold tracking-wide uppercase transition-colors relative ${activeTab === 'description' ? 'text-black' : 'text-gray-400 hover:text-gray-700'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
            {activeTab === 'description' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>}
          </button>
          <button 
            className={`pb-4 text-sm font-semibold tracking-wide uppercase transition-colors relative ${activeTab === 'specs' ? 'text-black' : 'text-gray-400 hover:text-gray-700'}`}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
            {activeTab === 'specs' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></span>}
          </button>
        </div>

        <div className="prose max-w-none text-gray-600">
          {activeTab === 'description' && (
            <div className="max-w-3xl">
              <h3 className="text-xl font-serif mb-4 text-black">Product Overview</h3>
              <p className="mb-6 leading-relaxed">{product.description}</p>
              <p className="leading-relaxed">Experience uncompromised quality and state-of-the-art technology. Engineered to perfection, this item represents the pinnacle of modern electronics.</p>
            </div>
          )}
          
          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="py-4 font-medium text-black w-1/3">{key}</td>
                      <td className="py-4 text-gray-600">{value}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-gray-100">
                     <td className="py-4 font-medium text-black w-1/3">Brand</td>
                     <td className="py-4 text-gray-600">{product.brand}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mb-20">
          <h2 className="font-serif text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(rp => (
              <Link to={`/product/${rp.id}`} key={rp.id} className="group bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-50 p-4 mb-4">
                  <img src={rp.image} alt={rp.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="text-sm font-medium mb-2 line-clamp-2">{rp.name}</h3>
                <span className="font-semibold block">{formatCurrency(rp.price)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
