import { db } from "@/lib/db";

export default async function Home() {
  // This tries to count users in your database
  const userCount = await db.user.count();

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui' }}>
      <h1>🚀 Treat Tracker Pro</h1>
      <p>Status: <strong>Connected to Database</strong></p>
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        background: '#f0f0f0', 
        borderRadius: '8px' 
      }}>
        <h2>Database Stats:</h2>
        <p>Total Users in System: {userCount}</p>
      </div>
    </div>
  );
}
