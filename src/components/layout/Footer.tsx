import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight mb-6">
              FALCON<span className="text-[#D4AF37]">TECH</span>
            </h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              The premier destination for luxury electronics and cutting-edge technology in the United Arab Emirates. Experience world-class service and genuine products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6">Shop by Category</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shop?category=Smartphones" className="hover:text-white transition-colors">Premium Smartphones</Link></li>
              <li><Link to="/shop?category=Laptops" className="hover:text-white transition-colors">Laptops & Computers</Link></li>
              <li><Link to="/shop?category=Gaming Consoles" className="hover:text-white transition-colors">Gaming Consoles</Link></li>
              <li><Link to="/shop?category=Smart Watches" className="hover:text-white transition-colors">Luxury Wearables</Link></li>
              <li><Link to="/shop?category=Headphones & Earbuds" className="hover:text-white transition-colors">Audio Equipment</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6">Customer Service</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="#" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Refund Policy (7-14 Days)</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Fast UAE Shipping</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Level 41, Emirates Towers,<br/>Sheikh Zayed Road,<br/>Dubai, UAE</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-[#D4AF37] shrink-0" />
                <span>+971 522445134 (WhatsApp + Call)</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-[#D4AF37] shrink-0" />
                <span>concierge@falcontech.ae</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <p className="text-gray-500 text-xs mb-2">
              &copy; {new Date().getFullYear()} FalconTech UAE. All rights reserved.
            </p>
            <div className="flex items-center mt-1 text-[10px] text-green-500">
              <ShieldCheck size={12} className="mr-1" /> SSL Secure Encrypted Checkout
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="text-[10px] sm:text-xs text-gray-400 mr-1 sm:mr-2">100% Secure Stripe Payments:</span>
            <div className="h-6 w-8 sm:w-10 bg-white rounded flex items-center justify-center text-[7px] sm:text-[8px] font-bold text-blue-800">VISA</div>
            <div className="h-6 w-8 sm:w-10 bg-white rounded flex items-center justify-center text-[7px] sm:text-[8px] font-bold text-red-600">MASTER</div>
            <div className="h-6 w-8 sm:w-10 bg-white rounded flex items-center justify-center text-[7px] sm:text-[8px] font-bold text-black border border-gray-300">Apple Pay</div>
            <div className="h-6 w-8 sm:w-10 bg-white rounded flex items-center justify-center text-[7px] sm:text-[8px] font-bold text-black border border-gray-300">G Pay</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
