import React from 'react';
import Layout from '@theme/Layout';
import Markdown from 'react-markdown';
import styles from './changelog.module.css';
import { usePluginData } from '@docusaurus/useGlobalData';
import Logo from '../../../static/img/OptiCore.svg';
import { parse, format } from 'date-fns';

export default function Changelog() {
  let changelogs = [];
  try {
    const pluginData = usePluginData('changelog-plugin');
    console.log('Changelog page: Plugin data received:', pluginData);
    changelogs = pluginData?.changelogs || [];
  } catch (error) {
    console.error('Changelog page: Error accessing plugin data:', error);
  }

  return (
    <Layout title="Changelog" description="View the latest updates and changes.">
      <div className="container margin-vert--lg">
        <div className={styles.headerContainer}>
          <div className={styles.logoWrapper}>
            <Logo
              className={styles.logo}
              aria-label="OptiCore Logo"
              onError={(e) => console.error('SVG Logo failed to render:', e)}
            />
          </div>
          <div className={styles.textWrapper}>
            <h1>Changelog</h1>
            <p>Stay updated with the latest changes, features, and fixes.</p>
          </div>
        </div>
        <div className={styles.changelogContainer}>
          {changelogs.length > 0 ? (
            changelogs.map((changelog, index) => {
              // Parse YYYY-MM-DD string to Date in UTC
              const [year, month, day] = changelog.updateDate.split('-').map(Number);
              const displayDate = parse(changelog.updateDate, 'yyyy-MM-dd', new Date());
              return (
                <div key={index} className={styles.changelogEntry}>
                  <h2>{changelog.title}</h2>
                  <p className={styles.changelogMeta}>
                    <strong>Version:</strong> {changelog.version} |{' '}
                    <strong>Date:</strong> {displayDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <div className={styles.changelogContent}>
                    <Markdown>{changelog.content}</Markdown>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No changelogs available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}