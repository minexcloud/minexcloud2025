import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>MineXcloud</h1>
      <p>Welcome to the MineXcloud mining simulator!</p>
      <Link href="/register"><button>Register</button></Link>
      <Link href="/login"><button style={{ marginLeft: '1rem' }}>Login</button></Link>
      <p style={{ marginTop: '1rem' }}>
        New users get <b>1 GH/s free for 7 days</b> after registration.
      </p>
    </div>
  );
}
