import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, onUpdateQuantity, onRemoveItem, onCreateOrder, customer }) => {
  const navigate = useNavigate();
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18; // KDV %18
  const total = subtotal + tax;

  const handleQuantityChange = (itemId, change) => {
    const item = cart.find((i) => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        onUpdateQuantity(itemId, newQuantity);
      } else {
        onRemoveItem(itemId);
      }
    }
  };

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }

    if (!deliveryDate || !deliveryTime) {
      alert('Lütfen teslimat tarihi ve saati seçiniz.');
      return;
    }

    setIsSubmitting(true);

    const order = {
      id: Date.now(),
      items: cart,
      subtotal,
      tax,
      total,
      deliveryDate,
      deliveryTime,
      notes,
      status: 'hazırlanıyor',
      date: new Date().toLocaleDateString('tr-TR'),
      address: customer?.address || ''
    };

    await onCreateOrder(order);
    setIsSubmitting(false);
    navigate('/orders');
  };

  // Bugünden itibaren 7 günlük tarih seçenekleri
  const getDateOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      options.push(date.toISOString().split('T')[0]);
    }
    return options;
  };

  const timeSlots = [
    '09:00 - 12:00',
    '12:00 - 15:00',
    '15:00 - 18:00',
    '18:00 - 21:00'
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-40">
        <h1 className="text-xl font-bold text-gray-800">Sepetim</h1>
      </header>

      {cart.length === 0 ? (
        <div className="p-4 text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-600 mb-2">Sepetiniz boş</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ürünlere Git
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          {/* Sepet Ürünleri */}
          <section>
            <h2 className="text-lg font-bold mb-3 text-gray-800">Ürünler</h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                      style={{
                        backgroundColor: `${item.color}15`
                      }}
                    >
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.price} ₺ / {item.unit}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-8 h-8 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-8 h-8 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      {item.price * item.quantity} ₺
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Teslimat Bilgileri */}
          <section>
            <h2 className="text-lg font-bold mb-3 text-gray-800">Teslimat Bilgileri</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teslimat Adresi
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-gray-800 font-medium">{customer?.company}</p>
                  <p className="text-sm text-gray-600">{customer?.address}</p>
                  <p className="text-sm text-gray-600">{customer?.city}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teslimat Tarihi
                </label>
                <select
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full min-h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tarih seçiniz</option>
                  {getDateOptions().map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('tr-TR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teslimat Saati
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setDeliveryTime(time)}
                      className={`min-h-12 border rounded-lg font-medium transition-colors ${
                        deliveryTime === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notlar (Opsiyonel)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Teslimat ile ilgili özel notlarınız..."
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Özet */}
          <section>
            <h2 className="text-lg font-bold mb-3 text-gray-800">Sipariş Özeti</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Ara Toplam</span>
                <span>{subtotal.toFixed(2)} ₺</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>KDV (%18)</span>
                <span>{tax.toFixed(2)} ₺</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Toplam</span>
                  <span>{total.toFixed(2)} ₺</span>
                </div>
              </div>
            </div>
          </section>

          {/* Siparişi Onayla Butonu */}
          <button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || !deliveryDate || !deliveryTime}
            className={`w-full min-h-12 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors ${
              isSubmitting || !deliveryDate || !deliveryTime
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {isSubmitting ? 'Sipariş Oluşturuluyor...' : 'Siparişi Onayla'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;

