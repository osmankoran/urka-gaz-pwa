// Kullanıcı bilgisi
export const user = {
  name: "Mehmet Demir",
  company: "Demir Kaynak Atölyesi",
  city: "Bursa",
  address: "Osmangazi, Bursa",
  phone: "+90 555 123 4567"
};

// Kategoriler
export const categories = [
  { id: 'all', name: 'Tümü', icon: '📦' },
  { id: 'argon', name: 'Argon', icon: '🔵' },
  { id: 'oxygen', name: 'Oksijen', icon: '🟢' },
  { id: 'nitrogen', name: 'Azot', icon: '🟠' },
  { id: 'lpg', name: 'LPG', icon: '🔴' },
  { id: 'other', name: 'Diğer', icon: '⚪' }
];

// Ürünler
export const products = [
  {
    id: 1,
    name: "Argon Gazı",
    category: "argon",
    description: "Kaynak işlemleri için yüksek kaliteli argon gazı",
    price: 450,
    unit: "silindir",
    stock: 25,
    image: "🔵",
    color: "#3B82F6"
  },
  {
    id: 2,
    name: "Oksijen Gazı",
    category: "oxygen",
    description: "Endüstriyel kullanım için saf oksijen",
    price: 380,
    unit: "silindir",
    stock: 18,
    image: "🟢",
    color: "#10B981"
  },
  {
    id: 3,
    name: "Azot Gazı",
    category: "nitrogen",
    description: "Gıda ve endüstriyel kullanım için azot",
    price: 320,
    unit: "silindir",
    stock: 30,
    image: "🟠",
    color: "#F59E0B"
  },
  {
    id: 4,
    name: "LPG Tüpü",
    category: "lpg",
    description: "12 kg LPG tüpü",
    price: 280,
    unit: "adet",
    stock: 50,
    image: "🔴",
    color: "#EF4444"
  },
  {
    id: 5,
    name: "Argon + CO2 Karışımı",
    category: "argon",
    description: "MIG kaynak için özel karışım",
    price: 420,
    unit: "silindir",
    stock: 15,
    image: "🔵",
    color: "#3B82F6"
  },
  {
    id: 6,
    name: "Saf Oksijen",
    category: "oxygen",
    description: "Tıbbi ve endüstriyel kullanım",
    price: 450,
    unit: "silindir",
    stock: 12,
    image: "🟢",
    color: "#10B981"
  },
  {
    id: 7,
    name: "Sıvı Azot",
    category: "nitrogen",
    description: "Soğutma ve dondurma işlemleri için",
    price: 550,
    unit: "litre",
    stock: 8,
    image: "🟠",
    color: "#F59E0B"
  },
  {
    id: 8,
    name: "LPG Büyük Tüp",
    category: "lpg",
    description: "45 kg LPG tüpü",
    price: 950,
    unit: "adet",
    stock: 20,
    image: "🔴",
    color: "#EF4444"
  },
  {
    id: 9,
    name: "Helyum Gazı",
    category: "other",
    description: "Balon ve özel kullanım için helyum",
    price: 680,
    unit: "silindir",
    stock: 10,
    image: "⚪",
    color: "#6B7280"
  },
  {
    id: 10,
    name: "Asetilen Gazı",
    category: "other",
    description: "Kesme ve kaynak işlemleri için",
    price: 520,
    unit: "silindir",
    stock: 14,
    image: "⚪",
    color: "#6B7280"
  }
];

