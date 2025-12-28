import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import { getPrice } from '../data/priceLists';

const ProductsPage = ({ onAddToCart, priceGroup = 'C' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantity[product.id] || 1;
    // Fiyat grubuna göre fiyatı güncelle
    const productWithPrice = {
      ...product,
      price: getPrice(product.id, priceGroup)
    };
    onAddToCart(productWithPrice, qty);
    setQuantity((prev) => ({ ...prev, [product.id]: 0 }));
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-40">
        <h1 className="text-xl font-bold text-gray-800">Ürünler</h1>
      </header>

      {/* Kategori Tab'ları */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex-shrink-0 px-4 py-2 mx-1 rounded-full font-medium text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Ürün Listesi */}
      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Bu kategoride ürün bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredProducts.map((product) => {
              const qty = quantity[product.id] || 0;
              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
                      style={{
                        backgroundColor: `${product.color}15`
                      }}
                    >
                      {product.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-800">
                            {getPrice(product.id, priceGroup)} ₺
                          </p>
                          <p className="text-xs text-gray-500">
                            / {product.unit} • Stok: {product.stock} • Grup {priceGroup}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Miktar Seçici ve Sepete Ekle */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={qty === 0}
                        className={`w-10 h-10 rounded-lg font-bold ${
                          qty === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } transition-colors`}
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-800">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        disabled={qty >= product.stock}
                        className={`w-10 h-10 rounded-lg font-bold ${
                          qty >= product.stock
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } transition-colors`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={qty === 0}
                      className={`flex-1 min-h-12 rounded-lg font-semibold transition-colors ${
                        qty === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'text-white hover:opacity-90'
                      }`}
                      style={qty === 0 ? {} : { backgroundColor: product.color }}
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

