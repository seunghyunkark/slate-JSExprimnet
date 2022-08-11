import Head from 'next/head';
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
          Welcome to <a src='/'>Jiyun's Lab</a>
        </h1>

        <p className={styles.description}>Let's get started !</p>
        <div className={styles.grid}>
          <a href='/wyswyg' className={styles.card}>
            <h2>WYSWYG &rarr;</h2>
            <p>Find some WYSWYG examples.</p>
          </a>

          <a href='/' className={styles.card}>
            <h2>Test2 &rarr;</h2>
            <p>To be continued</p>
          </a>

          <a href='/' className={styles.card}>
            <h2>Test3 &rarr;</h2>
            <p>To be continued</p>
          </a>
          <a href='/' className={styles.card}>
            <h2>Test4 &rarr;</h2>
            <p>To be continued</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>2022.08.11</footer>
    </div>
  );
}

export default Home;
