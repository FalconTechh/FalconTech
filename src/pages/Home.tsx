import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, ShieldCheck, Truck, CreditCard, RefreshCw, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { useStore } from '../store/useStore';

const reviews = [
  { name: "Khalid M.", location: "Dubai, UAE", text: "Excellent service. Received my iPhone 15 Pro Max the next day. The Stripe payment was seamless and secure.", rating: 5 },
  { name: "Sarah A.", location: "Abu Dhabi, UAE", text: "Trustworthy tech store! Customer support is highly responsive and products are 100% original. Highly recommended.", rating: 5 },
  { name: "James T.", location: "Sharjah, UAE", text: "Loved the easy 14-day return policy. Ordered a monitor, changed my mind to a bigger one, return was instant.", rating: 5 },
  { name: "Fatima R.", location: "Dubai, UAE", text: "Amazing luxury experience. The packaging was premium and delivery was super fast.", rating: 5 },
  { name: "Omar H.", location: "Ajman, UAE", text: "Best prices for authentic Apple products in UAE. Will definitely buy again.", rating: 5 },
];

const infiniteReviews = [...reviews, ...reviews];

const categoryTiles = [
  { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop' },
  { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop' },
  { name: 'Gaming', image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=600&auto=format&fit=crop' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop' },
  { name: 'Smart Watches', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop' },
  { name: 'Tablets', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop' }
];

export default function Home() {
  const { products, addToCart } = useStore();
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  return (
    <div className="w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] bg-[#111111] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2670&auto=format&fit=crop" 
            alt="Luxury Electronics" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          {/* Subtle UAE Design Element */}
          <div className="absolute bottom-10 right-10 opacity-10 flex items-center justify-center pointer-events-none">
             <span className="text-9xl">🇦🇪</span>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <span className="inline-block py-1 px-3 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6 rounded-sm bg-black/50 backdrop-blur-sm shadow-lg">
              🇦🇪 Verified UAE Tech Retailer
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Shop Premium Electronics in UAE
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 font-light max-w-lg leading-relaxed flex items-center gap-2">
              <ShieldCheck className="text-green-500" size={20} /> Trusted by customers across UAE. 100% secure payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/shop" 
                className="bg-[#D4AF37] hover:bg-[#C5A028] text-black px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS FIRST */}
      <section className="py-20 bg-gray-50 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[#D4AF37] font-medium text-xs tracking-widest uppercase mb-2 block flex items-center gap-1">
                <Star size={12} fill="currentColor" /> Top Rated
              </span>
              <h2 className="font-serif text-3xl font-bold mb-2 text-[#111111]">Featured Products</h2>
              <p className="text-gray-500 text-sm">Handpicked premium devices for the discerning buyer</p>
            </div>
            <Link to="/shop" className="text-sm font-medium text-[#D4AF37] hover:text-[#111111] transition-colors border-b border-transparent hover:border-[#111111] pb-0.5 hidden sm:block">
              View All Collection
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {featuredProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="group bg-white flex flex-col p-3 md:p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 relative">
                <div className="relative aspect-square mb-3 md:mb-6 overflow-hidden bg-gray-50 flex items-center justify-center p-2 md:p-4">
                  {product.isNew && (
                    <span className="absolute top-0 left-0 md:top-2 md:left-2 bg-black text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 uppercase tracking-wider z-10">New</span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-0 right-0 md:top-2 md:right-2 bg-red-600 text-white text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 uppercase tracking-wider z-10">Sale</span>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 flex flex-col mt-auto">
                  <span className="text-[10px] md:text-xs text-gray-400 font-medium mb-1 md:mb-2 tracking-wider uppercase hidden sm:block">{product.brand}</span>
                  <h3 className="text-xs md:text-sm font-medium leading-snug mb-1 md:mb-2 line-clamp-2 md:line-clamp-2 group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                  <div className="flex items-center mb-3 md:mb-4 mt-auto">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={`md:h-3 md:w-3 ${i < Math.floor(product.rating) ? "" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-500 ml-1 md:ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm md:text-lg text-black">{formatCurrency(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] md:text-xs text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#D4AF37] transition-colors shrink-0 shadow-md"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag size={16} className="md:h-[18px] md:w-[18px]" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AUTO SCROLLING REVIEW BANNER */}
      <section className="py-16 bg-[#111111] overflow-hidden border-y border-[#333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Real Stories, Real Trust</h2>
            <div className="flex items-center justify-center text-green-500 text-sm font-medium gap-1"><ShieldCheck size={16} /> Over 5,000+ Verified Buyers in UAE</div>
        </div>
        
        <div className="relative w-full">
            {/* Gradient Mask for fading edges */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-[#111111] to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-[#111111] to-transparent z-10"></div>
            
            <div className="animate-scroll">
                {infiniteReviews.map((review, idx) => (
                    <div key={idx} className="w-[300px] md:w-[400px] mx-4 bg-[#1A1A1A] p-6 rounded-lg border border-[#333] shrink-0">
                        <div className="flex text-[#D4AF37] mb-3">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(review.rating) ? "currentColor" : "none"} className={i < Math.floor(review.rating) ? "" : "text-gray-600"} />)}
                        </div>
                        <p className="text-gray-300 text-sm italic mb-4">"{review.text}"</p>
                        <div className="flex items-center justify-between mt-auto">
                            <div>
                                <h4 className="font-bold text-sm text-white">{review.name}</h4>
                                <span className="text-xs text-gray-500">{review.location}</span>
                            </div>
                            <div className="flex items-center text-[10px] text-green-500 bg-green-500/10 px-2 py-1 rounded-sm uppercase tracking-wide font-medium">
                                <ShieldCheck size={12} className="mr-1" /> Verified
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. TRUST BADGE SECTION */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center p-8 bg-gray-50 rounded border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#D4AF37]">
                <CreditCard size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wide">Secure Stripe Payments</h3>
              <p className="text-xs text-gray-500 mt-2">100% Encrypted SSL Checkout</p>
            </div>
            
            <div className="flex flex-col items-center p-8 bg-gray-50 rounded border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#D4AF37]">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wide">Genuine Guarantee</h3>
              <p className="text-xs text-gray-500 mt-2">Original manufacturer products</p>
            </div>

            <div className="flex flex-col items-center p-8 bg-gray-50 rounded border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#D4AF37]">
                <Truck size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wide">Fast UAE Delivery</h3>
              <p className="text-xs text-gray-500 mt-2">24–48 hours to your door</p>
            </div>

            <div className="flex flex-col items-center p-8 bg-gray-50 rounded border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#D4AF37]">
                <RefreshCw size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wide">Easy Returns</h3>
              <p className="text-xs text-gray-500 mt-2">7–14 days hassle-free policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CATEGORY SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left mb-10">
              <h2 className="font-serif text-3xl font-bold mb-2">Shop by Category</h2>
              <p className="text-gray-500 text-sm">Explore our wide selection of premium collections</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categoryTiles.map((cat, idx) => (
                    <Link to={`/shop?category=${cat.name}`} key={idx} className="group flex flex-col items-center text-center">
                        <div className="w-full aspect-square rounded-full overflow-hidden border border-gray-200 mb-4 mx-auto p-1 bg-white shadow-sm group-hover:shadow-md transition-all">
                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold group-hover:text-[#D4AF37] transition-colors">{cat.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* 6. FLASH DEALS SECTION */}
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#111111] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center border border-[#D4AF37]/20 shadow-2xl relative">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-3xl pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="p-8 md:p-16 flex-1 text-white relative z-10">
                <div className="flex items-center gap-2 mb-6 text-[#D4AF37] font-medium text-sm tracking-widest uppercase bg-white/5 inline-flex px-3 py-1.5 rounded border border-white/10">
                  <Clock size={16} />
                  <span>Limited Stock Offer</span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">UAE Flash Deals Gala</h2>
                <p className="text-gray-400 mb-8 max-w-md line-clamp-3">Incredible savings on premium electronics. Secure checkout directly through Stripe with our 100% genuine promise.</p>
                
                {/* Countdown Timer Design */}
                <div className="flex gap-4 mb-8">
                  <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-3 text-center min-w-[70px] shadow-inner">
                    <span className="block text-2xl font-bold font-serif text-[#D4AF37]">47</span>
                    <span className="text-xs text-gray-500 uppercase font-medium">Hours</span>
                  </div>
                  <div className="text-2xl font-serif text-gray-600 self-center pb-4">:</div>
                  <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-3 text-center min-w-[70px] shadow-inner">
                    <span className="block text-2xl font-bold font-serif text-[#D4AF37]">23</span>
                    <span className="text-xs text-gray-500 uppercase font-medium">Mins</span>
                  </div>
                  <div className="text-2xl font-serif text-gray-600 self-center pb-4">:</div>
                  <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-3 text-center min-w-[70px] shadow-inner">
                    <span className="block text-2xl font-bold font-serif text-[#D4AF37]">59</span>
                    <span className="text-xs text-gray-500 uppercase font-medium">Secs</span>
                  </div>
                </div>

                <Link to="/shop" className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-black px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-all rounded-sm">
                  Access Deals Now <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex-1 right-0 h-full min-h-[400px] w-full bg-center bg-cover border-l border-gray-800" style={{backgroundImage: "url('https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop')"}}>
              </div>
            </div>
         </div>
      </section>

    </div>
  );
}
