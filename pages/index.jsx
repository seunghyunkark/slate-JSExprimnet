import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tests for Next</title>
        <meta name='description' content='Many experiments here' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href='/'>{`Jiyun's Lab`}</Link>
        </h1>

        <p className={styles.description}>{`Let's get started !`}</p>
        <div className={styles.grid}>
          <Link href='/wyswyg' className={styles.card}>
            <div className={styles.card}>
              <h2>WYSWYG &rarr;</h2>
              <p>Find some WYSWYG examples.</p>
            </div>
          </Link>

          <Link href='/slate' className={styles.card}>
            <div className={styles.card}>
              <h2>Slate Test &rarr;</h2>
              <p>Experimnets of slate component</p>
            </div>
          </Link>

          <Link href='/'>
            <div className={styles.card}>
              <h2>Test3 &rarr;</h2>
              <p>To be continued</p>
            </div>
          </Link>
          <Link href='/' className={styles.card}>
            <div className={styles.card}>
              <h2>Test4 &rarr;</h2>
              <p>To be continued</p>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>2022.08.11</footer>
    </div>
  );
}

export default Home;
