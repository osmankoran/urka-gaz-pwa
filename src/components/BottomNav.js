import { Link, useLocation } from 'react-router-dom';

const BottomNav = ({ cartCount = 0 }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: '🏠' },
    { path: '/products', label: 'Ürünler', icon: '📦' },
    { path: '/cart', label: 'Sepet', icon: '🛒', badge: cartCount },
    { path: '/orders', label: 'Siparişlerim', icon: '📋' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full relative ${
              isActive(item.path)
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            } transition-colors`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute top-1 right-1/4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;

