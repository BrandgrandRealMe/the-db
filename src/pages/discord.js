import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

const DiscordRedirect = () => {
  // Implement 5-second redirect to Discord invite
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://discord.gg/MjcG8SzDpm';
    }, 5000); // 5000ms = 5 seconds
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Inline styles
  const styles = {
    body: {
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#2C2F33', // Discord dark theme background
      fontFamily: "'Arial', sans-serif",
      color: '#FFFFFF',
    },
    container: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#36393F', // Discord secondary background
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      maxWidth: '400px',
    },
    h1: {
      fontSize: '24px',
      marginBottom: '10px',
      color: '#5865F2', // Discord blurple
    },
    p: {
      fontSize: '16px',
      marginBottom: '20px',
      color: '#B9BBBE',
    },
    link: {
      color: '#5865F2',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #5865F2',
      borderTop: '4px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px',
    },
  };

  return (
    <Layout title="Redirecting to Brandon's DB Discord">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
      <div style={styles.body}>
        <div style={styles.container}>
          <div style={styles.spinner}></div>
          <h1 style={styles.h1}>Joining Brandon's DB Discord Server</h1>
          <p style={styles.p}>
            Redirecting to our Discord server for Programming, 3D Printing, Graphic Design, and more in 5 seconds... <br />
            <a href="https://discord.gg/MjcG8SzDpm" style={styles.link}>
              Click here
            </a>{' '}
            if not redirected.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DiscordRedirect;