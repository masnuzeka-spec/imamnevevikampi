export default async function handler(req, res) {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.PROJECT_ID;

  if (!token || !projectId) {
    return res.status(200).json({ visitors: 0 });
  }

  try {
    const response = await fetch(
      `https://api.vercel.com/v1/query/web-analytics/visits/count?projectId=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();
    const visitors = data.data?.visitors || 0;

    // 10 dakika önbellekte tut (Vercel sınırını korur, siteni hızlandırır)
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
    return res.status(200).json({ visitors });
  } catch (error) {
    return res.status(500).json({ error: 'Sayaç okunamadı' });
  }
}