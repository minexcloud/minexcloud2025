import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await axios.get('/api/mining/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        setMessage('Session expired, please login again.');
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    fetchDashboard();

    const interval = setInterval(async () => {
      try {
        await axios.post('/api/mining/simulate', {}, { headers: { Authorization: `Bearer ${token}` } });
        fetchDashboard();
      } catch {}
    }, 60000);

    return () => clearInterval(interval);
  }, [token, router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      <p>Email: {user.email}</p>
      <p>Hashrate: {user.hashrate} GH/s</p>
      <p>Balance ETC: {user.balanceETC.toFixed(6)}</p>
      <p>Free hashrate valid until: {user.freeHashrateExpires ? new Date(user.freeHashrateExpires).toLocaleString() : 'No free hashrate'}</p>
    </div>
  );
}
