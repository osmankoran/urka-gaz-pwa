// Fiyat listeleri - Her ürün için A, B, C grupları
export const priceLists = {
  1: { // Argon Gazı
    A: 450,
    B: 430,
    C: 410
  },
  2: { // Oksijen Gazı
    A: 380,
    B: 360,
    C: 340
  },
  3: { // Azot Gazı
    A: 320,
    B: 300,
    C: 280
  },
  4: { // LPG Tüpü
    A: 280,
    B: 270,
    C: 260
  },
  5: { // Argon + CO2 Karışımı
    A: 420,
    B: 400,
    C: 380
  },
  6: { // Saf Oksijen
    A: 450,
    B: 430,
    C: 410
  },
  7: { // Sıvı Azot
    A: 550,
    B: 530,
    C: 510
  },
  8: { // LPG Büyük Tüp
    A: 950,
    B: 920,
    C: 900
  },
  9: { // Helyum Gazı
    A: 680,
    B: 660,
    C: 640
  },
  10: { // Asetilen Gazı
    A: 520,
    B: 500,
    C: 480
  }
};

// Ürün ID'sine ve fiyat grubuna göre fiyat getirme
export const getPrice = (productId, priceGroup = 'C') => {
  return priceLists[productId]?.[priceGroup] || priceLists[productId]?.C || 0;
};

