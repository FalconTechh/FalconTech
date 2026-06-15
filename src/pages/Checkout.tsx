import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../lib/utils';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      navigate('/cart');
    }
  }, [cart, navigate, isSuccess]);

  const subtotal = cartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Stripe processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 size={80} className="text-[#D4AF37]" />
        </div>
        <h1 className="font-serif text-4xl font-bold mb-6">Payment Successful</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Thank you for your purchase. Your order has been confirmed and is being processed for delivery. You will receive an email shortly with your order details and tracking information.
        </p>
        <Link to="/" className="inline-block bg-[#111111] hover:bg-gray-900 text-white px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-center mb-10 pb-6 border-b border-gray-200">
        <Lock size={20} className="mr-2 text-gray-500" />
        <h1 className="font-serif text-2xl font-bold uppercase tracking-widest text-gray-800">Secure Checkout</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Checkout Form - Simulating Stripe Elements / Payment Method */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-6 font-serif">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input required type="email" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (UAE)</label>
                  <input required type="tel" defaultValue="+971 " className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-lg font-bold mb-6 font-serif">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input required type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input required type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                  <input required type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City / Emirate</label>
                    <select required className="w-full border border-gray-300 p-3 bg-white focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                      <option value="Dubai">Dubai</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Fujairah">Fujairah</option>
                      <option value="Umm Al Quwain">Umm Al Quwain</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input disabled type="text" value="United Arab Emirates" className="w-full border border-gray-300 p-3 bg-gray-50 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-serif flex items-center gap-2 flex-wrap">Payment Method <span className="text-[10px] text-green-600 font-sans tracking-wide px-2 py-0.5 bg-green-50 rounded-full border border-green-100 flex items-center gap-1"><ShieldCheck size={12}/> 100% Secure Stripe Checkout</span></h2>
                <div className="flex gap-2 hidden sm:flex">
                  <span className="text-[10px] font-bold border px-1 py-0.5 rounded text-blue-800 border-blue-200 bg-blue-50">VISA</span>
                  <span className="text-[10px] font-bold border px-1 py-0.5 rounded text-red-600 border-red-200 bg-red-50">MASTER</span>
                </div>
              </div>
              
              <div className="border border-gray-300 rounded p-6 bg-gray-50 mb-6">
                <div className="flex flex-col items-center justify-center text-center">
                   <p className="text-sm text-gray-600 mb-4">This is a secure Stripe payment simulation.</p>
                   <div className="w-full max-w-sm space-y-4 text-left">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
                        <input required type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 p-3 bg-white focus:outline-none focus:border-black font-mono text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input required type="text" placeholder="MM/YY" className="w-full border border-gray-300 p-3 bg-white focus:outline-none focus:border-black font-mono text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">CVC</label>
                          <input required type="password" placeholder="123" maxLength={3} className="w-full border border-gray-300 p-3 bg-white focus:outline-none focus:border-black font-mono text-sm" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              <div className="flex gap-4">
                 <button type="button" className="flex-1 py-3 border border-black hover:bg-gray-50 font-semibold tracking-wide flex items-center justify-center gap-2">
                    Apple Pay
                 </button>
                 <button type="button" className="flex-1 py-3 border border-black hover:bg-gray-50 font-semibold tracking-wide flex items-center justify-center gap-2">
                    G Pay
                 </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full bg-[#111111] text-white py-4 text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${isProcessing ? 'opacity-70 bg-gray-800' : 'hover:bg-[#C5A028]'}`}
            >
              {isProcessing ? (
                <>Processing Payment...</>
              ) : (
                <>Pay {formatCurrency(total)}</>
              )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
              <Lock size={12} /> Payments are secure and encrypted.
            </p>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-gray-50 p-8 rounded-sm sticky top-24">
            <h2 className="font-serif text-lg font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white shrink-0 p-1">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                    <div className="text-sm font-semibold mt-1">{formatCurrency(item.price * item.quantity)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm mb-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-gray-200 pt-6">
              <span className="font-bold">Total</span>
              <span className="font-bold text-xl">{formatCurrency(total)}</span>
            </div>
            
            <div className="mt-8 flex items-start gap-3 bg-white p-4 text-xs text-gray-600 border border-gray-200">
               <ShieldCheck size={20} className="text-[#D4AF37] shrink-0" />
               <p>Your transaction is secured by Stripe. We do not store your credit card information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
