import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { findCustomerByPhone } from '../data/customers';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
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

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setError('');
  };

  const handleSmsCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setSmsCode(value);
    setError('');
  };

  const handleSendSms = () => {
    const cleanPhone = phone.replace(/\s/g, '');
    
    if (cleanPhone.length !== 11 || !cleanPhone.startsWith('05')) {
      setError('Lütfen geçerli bir telefon numarası giriniz (05XX XXX XX XX)');
      return;
    }

    const customer = findCustomerByPhone(cleanPhone);
    if (!customer) {
      setError('Bu telefon numarasına kayıtlı müşteri bulunamadı.');
      return;
    }

    setSmsSent(true);
    setError('');
    // Mock SMS gönderimi - gerçekte SMS servisi çağrılacak
  };

  const handleLogin = async () => {
    if (!smsSent) {
      setError('Lütfen önce SMS kodu gönderiniz.');
      return;
    }

    if (smsCode.length !== 4) {
      setError('Lütfen 4 haneli SMS kodunu giriniz.');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      const cleanPhone = phone.replace(/\s/g, '');
      const customer = findCustomerByPhone(cleanPhone);

      if (!customer) {
        setError('Müşteri bulunamadı.');
        setIsLoading(false);
        return;
      }

      if (customer.smsCode !== smsCode) {
        setError('SMS kodu hatalı. Lütfen tekrar deneyiniz.');
        setIsLoading(false);
        return;
      }

      // Giriş başarılı
      onLogin(customer, rememberMe);
      setIsLoading(false);
      navigate('/');
    }, 500);
  };

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
          <p className="text-gray-600 text-sm">Hoş Geldiniz</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
          {/* Telefon Numarası */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Telefon Numarası
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="0532 123 45 67"
                maxLength={14}
                className="flex-1 h-12 border-2 border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                disabled={smsSent}
              />
              <button
                onClick={handleSendSms}
                disabled={smsSent || phone.length < 11}
                className={`h-12 px-6 rounded-lg font-semibold transition-colors ${
                  smsSent || phone.length < 11
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {smsSent ? '✓ Gönderildi' : 'Gönder'}
              </button>
            </div>
          </div>

          {/* SMS Kodu */}
          {smsSent && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SMS Kodu
              </label>
              <input
                type="text"
                value={smsCode}
                onChange={handleSmsCodeChange}
                placeholder="1234"
                maxLength={4}
                className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl font-bold tracking-widest"
              />
              <p className="text-xs text-gray-500 mt-2">
                SMS kodunuz telefonunuza gönderildi.
              </p>
            </div>
          )}

          {/* Beni Hatırla */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              Beni Hatırla
            </label>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          {/* Giriş Butonu */}
          <button
            onClick={handleLogin}
            disabled={!smsSent || smsCode.length !== 4 || isLoading}
            className={`w-full h-12 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors ${
              !smsSent || smsCode.length !== 4 || isLoading
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>

          {/* Kayıt Ol Linki */}
          <div className="pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Hesabınız yok mu?{' '}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                Kayıt Ol
              </Link>
            </p>
          </div>

          {/* Test Bilgisi */}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Test için: 0532 123 45 67 - Kod: 1234
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
