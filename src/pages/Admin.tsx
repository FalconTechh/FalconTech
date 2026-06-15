import { useState } from 'react';
import { LayoutDashboard, ShoppingCart, Users, Package, BarChart3, Settings, LogOut, Search, Bell, Edit, Trash2, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatCurrency } from '../lib/utils';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { products, deleteProduct } = useStore();

  const stats = [
    { title: "Total Revenue", value: "AED 124,500", change: "+14.5%", isPositive: true },
    { title: "Total Orders", value: "452", change: "+5.2%", isPositive: true },
    { title: "Active Customers", value: "1,204", change: "-1.4%", isPositive: false },
    { title: "Products in Stock", value: products.length.toString(), change: "+12.1%", isPositive: true },
  ];

  const recentOrders = [
    { id: "ORD-7842", customer: "Ahmed Al Mansoori", date: "Today, 14:30", amount: "AED 5,099", status: "Processing" },
    { id: "ORD-7841", customer: "Sarah Johnson", date: "Today, 11:15", amount: "AED 13,499", status: "Shipped" },
    { id: "ORD-7840", customer: "Mohammed Tariq", date: "Yesterday", amount: "AED 1,999", status: "Delivered" },
    { id: "ORD-7839", customer: "Elena Petrova", date: "Yesterday", amount: "AED 3,699", status: "Delivered" },
    { id: "ORD-7838", customer: "Faisal Rahman", date: "Oct 24", amount: "AED 15,098", status: "Processing" },
  ];

  return (
    <div className="min-h-[80vh] flex bg-gray-50">
      {/* Admin Sidebar */}
      <div className="w-64 bg-[#111111] text-white shrink-0 hidden lg:block">
        <div className="p-6">
          <h2 className="font-serif text-xl font-bold tracking-tight text-white mb-2">
            FALCON<span className="text-[#D4AF37]">TECH</span>
          </h2>
          <span className="text-xs text-gray-400 uppercase tracking-widest">Admin Portal</span>
        </div>
        
        <nav className="mt-6 px-4 space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'orders', icon: ShoppingCart, label: 'Orders' },
            { id: 'products', icon: Package, label: 'Products' },
            { id: 'customers', icon: Users, label: 'Customers' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm rounded transition-colors ${activeTab === item.id ? 'bg-[#D4AF37] text-black font-semibold' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
            >
              <item.icon size={18} className="mr-3 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
          <button className="flex items-center text-sm text-gray-400 hover:text-white transition-colors w-full px-4 py-2 hover:bg-white/10 rounded">
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shrink-0">
          <div className="font-semibold text-lg lg:hidden">Admin Portal</div>
          <div className="hidden lg:flex relative w-96">
            <input 
              type="text" 
              placeholder="Search orders, products..." 
              className="w-full bg-gray-50 border border-gray-200 rounded py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-black"
            />
            <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500 hover:text-black">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-2xl font-bold">Overview Dashboard</h1>
                <div className="flex bg-white border border-gray-200 rounded overflow-hidden text-sm">
                  <button className="px-4 py-2 bg-gray-50 border-r border-gray-200 font-medium">Today</button>
                  <button className="px-4 py-2 hover:bg-gray-50 border-r border-gray-200">7 Days</button>
                  <button className="px-4 py-2 hover:bg-gray-50">30 Days</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 border border-gray-200 rounded shadow-sm">
                      <h3 className="text-gray-500 text-sm font-medium mb-2">{stat.title}</h3>
                      <div className="flex items-end justify-between">
                          <span className="text-2xl font-bold font-serif">{stat.value}</span>
                          <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                          </span>
                      </div>
                    </div>
                ))}
              </div>

              <div className="flex flex-col xl:flex-row gap-8">
                {/* Recent Orders Table */}
                <div className="flex-1 bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">Recent Orders</h3>
                      <button className="text-[#D4AF37] hover:text-black text-sm font-medium">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                          <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 font-medium">Order ID</th>
                                <th className="px-6 py-3 font-medium">Customer</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Amount</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {recentOrders.map((order, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 font-medium">{order.id}</td>
                                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                  <td className="px-6 py-4 font-medium">{order.amount}</td>
                                  <td className="px-6 py-4">
                                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {order.status}
                                      </span>
                                  </td>
                                </tr>
                            ))}
                          </tbody>
                      </table>
                    </div>
                </div>

                {/* Top Selling Products */}
                <div className="w-full xl:w-96 shrink-0 bg-white border border-gray-200 rounded shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="font-bold text-gray-800">Top Selling Products</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      {[
                          {name: "iPhone 15 Pro Max", sales: 124},
                          {name: "Samsung Galaxy S24 Ultra", sales: 86},
                          {name: "MacBook Pro 16\"", sales: 64},
                          {name: "Sony PlayStation 5", sales: 52},
                      ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="w-6 text-center text-sm font-bold text-gray-400">{i+1}</span>
                                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                            </div>
                            <span className="text-sm font-bold text-[#D4AF37]">{item.sales} sold</span>
                          </div>
                      ))}
                    </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="font-serif text-2xl font-bold mb-1">Product Management</h1>
                  <p className="text-sm text-gray-500">Manage your store inventory, prices, and images from one place.</p>
                </div>
                <button className="bg-[#111111] hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium flex items-center rounded transition-colors gap-2">
                  <Plus size={16} /> Add Product
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 font-medium">Product</th>
                        <th className="px-6 py-3 font-medium">Brand</th>
                        <th className="px-6 py-3 font-medium">Category</th>
                        <th className="px-6 py-3 font-medium">Price (AED)</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-50 border border-gray-100 p-1 rounded shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 max-w-[200px] truncate" title={product.name}>{product.name}</h4>
                                {product.isNew && <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 mr-2">New</span>}
                                {product.featured && <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">Featured</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{product.brand}</td>
                          <td className="px-6 py-4 text-gray-600">{product.category}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {formatCurrency(product.price)}
                            {product.originalPrice && <span className="block text-[10px] text-gray-400 line-through mt-0.5">{formatCurrency(product.originalPrice)}</span>}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">In Stock</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit Product">
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => {
                                  if(confirm('Are you sure you want to delete this product?')) {
                                    deleteProduct(product.id);
                                  }
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
                                title="Delete Product"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}
