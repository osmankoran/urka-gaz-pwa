// Müşteri bilgileri
export const customers = [
  {
    phone: "05321234567",
    name: "Mehmet Demir",
    company: "Demir Kaynak Atölyesi",
    address: "OSB 5. Cadde No:42, Bursa",
    city: "Bursa",
    priceGroup: "A",
    smsCode: "1234"
  },
  {
    phone: "05329876543",
    name: "Ayşe Yılmaz",
    company: "Yılmaz Metal İşleme",
    address: "Sanayi Mah. Atatürk Cad. No:15, İstanbul",
    city: "İstanbul",
    priceGroup: "B",
    smsCode: "5678"
  },
  {
    phone: "05325554433",
    name: "Ali Kaya",
    company: "Kaya Endüstri",
    address: "Organize Sanayi Bölgesi 2. Cadde, Ankara",
    city: "Ankara",
    priceGroup: "C",
    smsCode: "9012"
  },
  {
    phone: "05321112233",
    name: "Fatma Şahin",
    company: "Şahin Gaz Tüpleri",
    address: "İnönü Cad. No:78, İzmir",
    city: "İzmir",
    priceGroup: "A",
    smsCode: "3456"
  },
  {
    phone: "05324445566",
    name: "Mustafa Özkan",
    company: "Özkan Kaynak Malzemeleri",
    address: "Sanayi Sitesi 3. Blok No:12, Antalya",
    city: "Antalya",
    priceGroup: "B",
    smsCode: "7890"
  }
];

// Telefon numarasına göre müşteri bulma
export const findCustomerByPhone = (phone) => {
  // Telefon numarasını temizle (boşluk, tire, parantez kaldır)
  const cleanPhone = phone.replace(/\s|-|\(|\)/g, '');
  return customers.find(customer => customer.phone === cleanPhone);
};

