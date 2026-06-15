import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const subtotal = cartTotal();
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over 500 AED
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="font-serif text-4xl font-bold mb-6">Your Shopping Bag is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Discover our collection of premium electronics and find something exceptional.</p>
        <Link to="/shop" className="inline-block bg-[#111111] hover:bg-gray-900 text-white px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-serif text-3xl font-bold mb-10">Shopping Bag ({cart.reduce((acc, item) => acc + item.quantity, 0)} Items)</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="border-t border-gray-200">
            {cart.map(item => (
              <div key={item.id} className="flex py-8 border-b border-gray-200 relative group">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-8 right-0 text-gray-400 hover:text-black transition-colors"
                  aria-label="Remove item"
                >
                  <X size={20} />
                </button>
                
                <Link to={`/product/${item.id}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 p-2 shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </Link>
                
                <div className="ml-6 flex-1 flex flex-col justify-between pr-8">
                  <div>
                    <span className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-1 block">{item.brand}</span>
                    <Link to={`/product/${item.id}`} className="text-sm sm:text-base font-medium leading-snug hover:underline">
                      {item.name}
                    </Link>
                    <div className="mt-2 text-sm font-semibold">{formatCurrency(item.price)}</div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <div className="flex items-center border border-gray-300 h-10 w-28">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="flex-1 text-center font-medium text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-gray-50 p-8 rounded-sm">
            <h2 className="font-serif text-2xl font-bold mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping (UAE)</span>
                <span className="font-medium">{shipping === 0 ? 'Complimentary' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (5% Included)</span>
                <span className="font-medium">{formatCurrency(total * 0.05)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8 block">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-2xl relative block">{formatCurrency(total)}
                 <span className="block text-[10px] text-gray-400 font-normal absolute -bottom-4 right-0 text-right w-full">in AED</span>
              </span>
            </div>

            <Link 
              to="/checkout" 
              className="w-full bg-[#111111] hover:bg-gray-900 text-white h-14 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide uppercase transition-colors"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={16} className="text-[#D4AF37]" />
              Secure Checkout via Stripe
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3 block">Accepted Payment Methods</span>
              <div className="flex gap-2 opacity-60">
                <div className="h-8 w-12 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-blue-800">VISA</div>
                <div className="h-8 w-12 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-red-600">MASTER</div>
                <div className="h-8 w-12 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-black">Apple Pay</div>
                <div className="h-8 w-12 bg-white border border-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-black">G Pay</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
