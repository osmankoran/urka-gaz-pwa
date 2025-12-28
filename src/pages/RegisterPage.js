import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addCustomer } from '../data/customers';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    address: '',
    city: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Telefon numarası formatlama (0532 123 45 67)
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    } else if (cleaned.length <= 9) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    } else {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData({
        ...formData,
        [name]: formatPhone(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validasyon
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Lütfen ad ve soyad bilgilerinizi giriniz.');
      setIsLoading(false);
      return;
    }

    if (!formData.company.trim()) {
      setError('Lütfen şirket adını giriniz.');
      setIsLoading(false);
      return;
    }

    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (cleanPhone.length !== 11 || !cleanPhone.startsWith('05')) {
      setError('Lütfen geçerli bir telefon numarası giriniz (05XX XXX XX XX)');
      setIsLoading(false);
      return;
    }

    if (!formData.address.trim() || !formData.city.trim()) {
      setError('Lütfen adres ve şehir bilgilerinizi giriniz.');
      setIsLoading(false);
      return;
    }

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      try {
        // Yeni müşteri ekle
        const newCustomer = {
          phone: cleanPhone,
          name: `${formData.firstName} ${formData.lastName}`,
          company: formData.company,
          address: formData.address,
          city: formData.city,
          priceGroup: 'C',
          smsCode: '0000'
        };

        addCustomer(newCustomer);
        setIsLoading(false);
        setSuccess(true);

        // 3 saniye sonra login sayfasına yönlendir
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        setError('Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.');
        setIsLoading(false);
      }
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Kayıt Başarılı!
            </h2>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-green-700">
                Kayıt işleminiz başarıyla tamamlandı. Hesabınız admin onayından sonra aktif olacaktır.
              </p>
              <p className="text-xs text-green-600 mt-2">
                Onaylandıktan sonra SMS kodu ile giriş yapabilirsiniz.
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Giriş sayfasına yönlendiriliyorsunuz...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-48 mx-auto mb-4">
            <svg viewBox="0 0 200 80" className="w-full">
              <text
                x="100"
                y="35"
                textAnchor="middle"
                className="text-2xl font-bold fill-blue-600"
                style={{ fontSize: '24px', fontWeight: 'bold' }}
              >
                URKA GAZ
              </text>
              <text
                x="100"
                y="55"
                textAnchor="middle"
                className="text-xs fill-gray-600"
                style={{ fontSize: '10px' }}
              >
                Endüstriyel Gaz Tedariki
              </text>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Yeni Hesap Oluştur</h1>
          <p className="text-gray-600 text-sm">Bilgilerinizi doldurun</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
          {/* Ad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ad *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Adınız"
              required
              className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Soyad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Soyad *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Soyadınız"
              required
              className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Şirket */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Şirket Adı *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Şirket adı"
              required
              className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Telefon */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Telefon Numarası *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0532 123 45 67"
              maxLength={14}
              required
              className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Şehir */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Şehir *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Şehir"
              required
              className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Adres */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Adres *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Tam adres bilgisi"
              rows="3"
              required
              className="w-full min-h-12 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          {/* Kayıt Ol Butonu */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          </button>

          {/* Giriş Yap Linki */}
          <div className="pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Zaten hesabınız var mı?{' '}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                Giriş Yap
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

