import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const HomePage = ({ activeOrders = [], customer, onLogout }) => {
  const quickOrderProducts = [
    { id: 1, name: 'Argon Gazı', icon: '🔵', color: '#3B82F6' },
    { id: 2, name: 'Oksijen Gazı', icon: '🟢', color: '#10B981' },
    { id: 3, name: 'LPG Tüpü', icon: '🔴', color: '#EF4444' }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-md">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-xl font-bold">URKA Gaz</h1>
            <p className="text-blue-100 text-sm">Hoş geldiniz, {customer?.name}</p>
          </div>
          <button
            onClick={onLogout}
            className="text-blue-100 hover:text-white text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
        <div className="text-sm">
          <p className="text-blue-100">{customer?.company}</p>
          <p className="text-blue-200">{customer?.city}</p>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Hızlı Sipariş */}
        <section>
          <h2 className="text-lg font-bold mb-3 text-gray-800">Hızlı Sipariş</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickOrderProducts.map((product) => (
              <Link
                key={product.id}
                to="/products"
                className="rounded-lg p-4 text-center transition-colors hover:opacity-80"
                style={{
                  backgroundColor: `${product.color}15`,
                  border: `2px solid ${product.color}`
                }}
              >
                <div className="text-3xl mb-2">{product.icon}</div>
                <div className="text-sm font-medium text-gray-700">{product.name}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Kategoriler */}
        <section>
          <h2 className="text-lg font-bold mb-3 text-gray-800">Kategoriler</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.slice(1).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium text-gray-700">{category.name}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Aktif Siparişler */}
        {activeOrders.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3 text-gray-800">Aktif Siparişler</h2>
            <div className="space-y-3">
              {activeOrders.map((order) => (
                <Link
                  key={order.id}
                  to="/orders"
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow block"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">Sipariş #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'hazırlanıyor' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'yolda' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {order.items.length} ürün • {order.total} ₺
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Tüm Siparişleri Gör */}
        {activeOrders.length === 0 && (
          <section>
            <Link
              to="/orders"
              className="block bg-gray-100 border border-gray-200 rounded-lg p-4 text-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <p className="text-sm">Henüz aktif siparişiniz yok</p>
              <p className="text-xs mt-1">Sipariş geçmişinizi görüntüleyin</p>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;

