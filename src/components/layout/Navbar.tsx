import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Search, User, Menu, X, ChevronDown, ShieldCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { categories } from '../../data/mockData';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useStore(state => state.cart);
  const wishlist = useStore(state => state.wishlist);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      {/* Top Bar - Black/Gold themed */}
      <div className="bg-[#111111] text-white py-2 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="text-sm">🇦🇪</span> <span className="hidden sm:inline">Proudly Serving </span>UAE</span>
            <span className="hidden sm:inline text-[#D4AF37]">|</span>
            <span className="text-[#D4AF37] hidden sm:inline">Express Delivery</span>
          </div>
          <div className="hidden md:flex gap-4 items-center">
            <span className="flex items-center gap-1.5 text-green-400"><ShieldCheck size={14} /> 100% Secure Payments</span>
            <span className="text-gray-600">|</span>
            <Link to="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-900 hover:text-[#D4AF37] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto absolute md:relative left-0 pointer-events-none md:pointer-events-auto">
            <Link to="/" className="font-serif text-2xl font-bold tracking-tight pointer-events-auto">
              FALCON<span className="text-[#D4AF37]">TECH</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg ml-8 mr-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search premium electronics..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-none py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] text-sm transition-shadow"
              />
              <button className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-[#111111] transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <Link to="/admin" className="p-2 text-gray-900 hover:text-[#D4AF37] transition-colors hidden md:block">
              <User size={22} strokeWidth={1.5} />
            </Link>
            
            <Link to="/wishlist" className="p-2 text-gray-900 hover:text-[#D4AF37] transition-colors relative hidden sm:block">
              <Heart size={22} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-0.5 bg-[#D4AF37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="p-2 text-gray-900 hover:text-[#D4AF37] transition-colors relative flex items-center space-x-2">
              <div className="relative">
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden md:block font-medium text-sm">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Bar (Desktop) */}
      <div className="hidden md:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex space-x-8 items-center h-12 overflow-x-auto no-scrollbar">
            <li>
              <Link to="/shop" className="text-sm font-medium hover:text-[#D4AF37] transition-colors whitespace-nowrap">
                All Products
              </Link>
            </li>
            {categories.slice(0, 8).map(category => (
              <li key={category}>
                <Link to={`/shop?category=${category}`} className="text-sm text-gray-600 hover:text-[#111111] transition-colors whitespace-nowrap">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full max-h-[calc(100vh-100px)] overflow-y-auto shadow-xl">
          <div className="p-4 space-y-4">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-gray-50 border border-gray-200 py-2.5 pl-4 pr-10 focus:outline-none text-sm"
              />
              <Search size={18} className="absolute right-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex justify-around py-2 border-b border-gray-100">
              <Link to="/admin" className="flex flex-col items-center text-sm text-gray-600">
                <User size={20} className="mb-1" /> Profile
              </Link>
              <Link to="/wishlist" className="flex flex-col items-center text-sm text-gray-600 relative">
                <Heart size={20} className="mb-1" /> Wishlist
                {wishlist.length > 0 && <span className="absolute top-0 right-1 w-2 h-2 bg-[#D4AF37] rounded-full"></span>}
              </Link>
            </div>

            <div className="pt-2">
              <h3 className="font-serif font-medium text-lg mb-3">Categories</h3>
              <ul className="space-y-3">
                <li><Link to="/shop" className="text-gray-600 block">All Products</Link></li>
                {categories.map(cat => (
                  <li key={cat}><Link to={`/shop?category=${cat}`} className="text-gray-600 block">{cat}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
