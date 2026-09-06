export default async function handler(req, res) {
  // Google Apps Script uç noktan artık sadece Vercel sunucusunda güvenle saklanıyor:
  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbxemdQxu8xlRiBWtfBlOGc5VD3uKKDfweXdPA_pFwHQzTyD0DVP_DLWkUBZ2QHLpCe_/exec";
  
  // URL parametresi varsa (?tip=duyuru gibi) onu da ekle
  const tip = req.query.tip ? `?tip=${encodeURIComponent(req.query.tip)}` : '';

  try {
    const response = await fetch(`${GOOGLE_URL}${tip}`);
    const data = await response.json();
    
    // ⚡ 5 dakika Vercel hafızasında tutulur: Kotayı korur, derslerin anında açılmasını sağlar
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Veri çekilirken bir sorun oluştu.' });
  }
}