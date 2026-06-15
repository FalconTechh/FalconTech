import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, Star, ShoppingBag, Heart } from 'lucide-react';
import { categories, brands } from '../data/mockData';
import { formatCurrency } from '../lib/utils';
import { useStore } from '../store/useStore';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const products = useStore(state => state.products);
  const addToCart = useStore(state => state.addToCart);
  const toggleWishlist = useStore(state => state.toggleWishlist);
  const wishlist = useStore(state => state.wishlist);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-8 uppercase tracking-widest">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-semibold">Shop</span>
        {activeCategory !== 'All' && (
          <>
            <span className="mx-2">/</span>
            <span className="text-black font-semibold">{activeCategory}</span>
          </>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="flex items-center gap-2 mb-6 text-black font-serif text-xl border-b border-gray-200 pb-4">
            <Filter size={20} />
            <h2>Filters</h2>
          </div>
          
          <div className="mb-8">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setActiveCategory('All')}
                  className={`text-sm hover:text-black transition-colors ${activeCategory === 'All' ? 'font-medium text-black' : 'text-gray-500'}`}
                >
                  All Products
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm hover:text-black transition-colors ${activeCategory === cat ? 'font-medium text-black' : 'text-gray-500'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Brands</h3>
             <ul className="space-y-3">
                {brands.slice(0,8).map(brand => (
                  <li key={brand} className="flex items-center gap-3">
                    <input type="checkbox" id={`brand-${brand}`} className="w-4 h-4 rounded border-gray-300 text-[#111111] focus:ring-[#111111]" />
                    <label htmlFor={`brand-${brand}`} className="text-sm text-gray-600">{brand}</label>
                  </li>
                ))}
             </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-3xl font-bold">{activeCategory === 'All' ? 'All Products' : activeCategory}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{filteredProducts.length} Results</span>
              <select className="ml-4 border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:border-black">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredProducts.map(product => {
               const isWishlisted = wishlist.includes(product.id);
               return (
                <div key={product.id} className="group bg-white flex flex-col p-3 md:p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 relative">
                  
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 z-20 text-gray-400 hover:text-red-500 transition-colors bg-white/80 p-1 md:p-0 rounded-full border border-transparent md:border-none"
                  >
                    <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} className={`md:h-5 md:w-5 ${isWishlisted ? "text-red-500" : ""}`} />
                  </button>

                  <Link to={`/product/${product.id}`} className="block relative aspect-square mb-3 md:mb-6 bg-gray-50 flex items-center justify-center p-2 md:p-4">
                    {product.isNew && (
                      <span className="absolute top-0 left-0 bg-black text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 uppercase tracking-wider z-10">New</span>
                    )}
                    {product.originalPrice && (
                       <span className="absolute top-0 left-0 md:left-auto md:right-0 bg-red-600 text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 uppercase tracking-wider z-10 mt-[20px] md:mt-0">Sale</span>
                    )}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <span className="text-[10px] md:text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider hidden sm:block">{product.brand}</span>
                    <Link to={`/product/${product.id}`} className="text-xs md:text-sm font-medium leading-snug mb-2 line-clamp-2 hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </Link>
                    
                    <div className="flex items-center mb-3 md:mb-4 mt-auto">
                      <div className="flex text-[#D4AF37]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={`md:h-3 md:w-3 ${i < Math.floor(product.rating) ? "" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <span className="text-[10px] md:text-xs text-gray-500 ml-1 md:ml-2">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm md:text-base">{formatCurrency(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-[10px] md:text-xs text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                        )}
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-11 h-11 md:w-10 md:h-10 rounded-full md:rounded bg-gray-50 md:bg-black text-black md:text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-colors shrink-0"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag size={18} className="md:h-[18px] md:w-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredProducts.length === 0 && (
             <div className="py-20 text-center">
                <h3 className="font-serif text-2xl font-bold mb-2">No products found</h3>
                <p className="text-gray-500">We couldn't find any products in this category.</p>
                <button onClick={() => setActiveCategory('All')} className="mt-6 border border-black px-6 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-colors">
                   View All Products
                </button>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
