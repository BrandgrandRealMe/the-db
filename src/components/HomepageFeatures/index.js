import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Programming',
    Svg: require('@site/static/img/keyboard.svg').default,
    description: (
      <>
        Comprehensive documentation for various, projects, programming languages, frameworks, 
        and tools to help you build better software.
      </>
    ),
  },
  {
    title: '3D Printing Resources',
    Svg: require('@site/static/img/3d-printer.svg').default,
    description: (
      <>
        From beginner tutorials to advanced techniques, find everything you need 
        to master 3D printing and modeling.
      </>
    ),
  },
  {
    title: 'Multi-Tech Knowledge Base',
    Svg: require('@site/static/img/hard-drive.svg').default,
    description: (
      <>
        A growing collection of documentation covering various technologies, 
        maker projects, and DIY solutions.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
