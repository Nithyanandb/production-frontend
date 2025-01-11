import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Header from '../Header/Header'; // Import the Header component

const Settings = () => {
  const { user } = useAuth(); // Fetch user data from authentication context
  const [name, setName] = useState(user?.name || '');
  const [headline, setHeadline] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // Default active tab

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings (e.g., send to backend or update state)
    console.log('Updated Settings:', {
      name,
      headline,
      email,
      notificationsEnabled,
    });
    alert('Settings saved successfully!');
  };

  // Fetch user data on component mount
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <section style={{ marginBottom: '32px', backgroundColor: '#111', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px', color: '#fff' }}>Profile</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#fff',
                }}
              >
                {name ? name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    backgroundColor: '#222',
                    color: '#fff',
                    width: '100%',
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="headline" style={{ fontSize: '16px', fontWeight: '500', display: 'block', marginBottom: '8px', color: '#fff' }}>
                Headline
              </label>
              <input
                type="text"
                id="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Add a professional headline"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: '16px',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  backgroundColor: '#222',
                  color: '#fff',
                }}
              />
            </div>
          </section>
        );
      case 'notifications':
        return (
          <section style={{ marginBottom: '32px', backgroundColor: '#111', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px', color: '#fff' }}>Notifications</h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '16px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#007AFF',
                  }}
                />
                Enable Notifications
              </label>
            </div>
          </section>
        );
      case 'account':
        return (
          <section style={{ marginBottom: '32px', backgroundColor: '#111', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px', color: '#fff' }}>Account Security</h2>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="email" style={{ fontSize: '16px', fontWeight: '500', display: 'block', marginBottom: '8px', color: '#fff' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new email"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: '16px',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  backgroundColor: '#222',
                  color: '#fff',
                }}
              />
            </div>
          </section>
        );
      case 'payments':
        return (
          <section style={{ marginBottom: '32px', backgroundColor: '#111', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px', color: '#fff' }}>Payment History</h2>
            <div style={{ color: '#fff' }}>
              <p>No payment history available.</p>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Add the Header component at the top */}
      <Header />

      <div  style={{ display: 'flex', gap: '24px', marginTop: '24px', paddingTop:'32px' }}>
        {/* Sidebar for Tab Switching */}
        <div style={{ width: '300px', backgroundColor: '#111', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>Settings</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li
              style={{
                marginBottom: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'profile' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'profile' ? '#fff' : '#aaa',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onClick={() => setActiveTab('profile')}
            >
              User Profile
            </li>
            <li
              style={{
                marginBottom: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'notifications' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'notifications' ? '#fff' : '#aaa',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </li>
            <li
              style={{
                marginBottom: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'account' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'account' ? '#fff' : '#aaa',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onClick={() => setActiveTab('account')}
            >
              Account Preferences
            </li>
            <li
              style={{
                marginBottom: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'payments' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: activeTab === 'payments' ? '#fff' : '#aaa',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onClick={() => setActiveTab('payments')}
            >
              Payment History
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: '#fff' }}>{activeTab === 'profile' ? 'User Profile' : activeTab === 'notifications' ? 'Notifications' : activeTab === 'account' ? 'Account Preferences' : 'Payment History'}</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;