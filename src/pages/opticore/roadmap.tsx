import React from 'react';
import Layout from '@theme/Layout';
import Markdown from 'react-markdown';
import { usePluginData } from '@docusaurus/useGlobalData';
import Logo from '../../../static/img/OptiCore.svg';
import styles from './roadmap.module.css';

type RoadmapItem = {
  id: string;
  title: string;
  status: 'planned' | 'in-progress' | 'completed';
  emoji?: string;
  priority?: number;
  content: string;
};

export default function RoadmapPage() {
  const pluginData = usePluginData('docusaurus-roadmap') as { roadmapItems: RoadmapItem[] };
  const roadmapItems = pluginData.roadmapItems || [];

  const groupByStatus = (status: RoadmapItem['status']) =>
    roadmapItems.filter((item) => item.status === status);

  return (
    <Layout title="OptiCore - Roadmap" description="See what we’re building.">
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
            <h1>OptiCore - Roadmap</h1>
            <p>Stay informed on what we’re planning, building, and shipping next.</p>
          </div>
        </div>

        <div className={styles.roadmapContainer}>
          <Section title="🚧 In Progress" items={groupByStatus('in-progress')} />
          <Section title="✅ Completed" items={groupByStatus('completed')} />
          <Section title="🧭 Planned" items={groupByStatus('planned')} />
        </div>
      </div>
    </Layout>
  );
}

function statusToClass(status: RoadmapItem['status']) {
    switch (status) {
      case 'planned':
        return 'planned';
      case 'in-progress':
        return 'inProgress';
      case 'completed':
        return 'completed';
      default:
        return '';
    }
  }
  
function Section({ title, items }: { title: string; items: RoadmapItem[] }) {
  return (
    <section className="margin-bottom--lg">
      <h2>{title}</h2>
      {items.length === 0 && <p>No items in this category.</p>}
      {items.map((item) => (
        <div key={item.id} className={`${styles.roadmapEntry} ${styles[statusToClass(item.status)]}`}>
          <h3>{item.emoji || '📌'} {item.title}</h3>
          <div className={styles.roadmapContent}>
            <Markdown>{item.content}</Markdown>
          </div>
        </div>
      ))}
    </section>
  );
}
