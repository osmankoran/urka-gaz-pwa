const OrdersPage = ({ orders: userOrders = [] }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'hazırlanıyor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'yolda':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'teslim edildi':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'iptal edildi':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hazırlanıyor':
        return '⏳';
      case 'yolda':
        return '🚚';
      case 'teslim edildi':
        return '✅';
      case 'iptal edildi':
        return '❌';
      default:
        return '📦';
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-40">
        <h1 className="text-xl font-bold text-gray-800">Siparişlerim</h1>
      </header>

      {userOrders.length === 0 ? (
        <div className="p-4 text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-600 mb-2">Henüz siparişiniz bulunmuyor</p>
          <p className="text-sm text-gray-500">
            İlk siparişinizi vermek için ürünler sayfasına gidin
          </p>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {userOrders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {/* Sipariş Başlığı */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      Sipariş #{order.id}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{order.date}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    <span className="mr-1">{getStatusIcon(order.status)}</span>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                {/* Ürünler */}
                <div className="mb-3 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.image}</span>
                        <span className="text-gray-700">
                          {item.name} × {item.quantity}
                        </span>
                      </div>
                      <span className="text-gray-600 font-medium">
                        {item.price * item.quantity} ₺
                      </span>
                    </div>
                  ))}
                </div>

                {/* Teslimat Bilgileri */}
                {order.deliveryDate && (
                  <div className="mb-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Teslimat:</span>{' '}
                      {new Date(order.deliveryDate).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}{' '}
                      {order.deliveryTime && `• ${order.deliveryTime}`}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Adres:</span> {order.address}
                    </p>
                  </div>
                )}

                {/* Notlar */}
                {order.notes && (
                  <div className="mb-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Not:</span> {order.notes}
                    </p>
                  </div>
                )}

                {/* Toplam */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ara Toplam</span>
                    <span className="text-sm text-gray-700">
                      {order.subtotal.toFixed(2)} ₺
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600">KDV</span>
                    <span className="text-sm text-gray-700">
                      {order.tax.toFixed(2)} ₺
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Toplam</span>
                    <span className="font-bold text-lg text-gray-800">
                      {order.total.toFixed(2)} ₺
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

