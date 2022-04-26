import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import RegisterForm from '../components/RegisterForm'

const Register: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Find a Player</title>
        <meta name="description" content="Find your new gaming pal!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Get started
        </h1>

        <p className={styles.description}>
          Get started by creating an <a href="http://localhost:3000/register">account{' '} </a>
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Add user</h2>
            <RegisterForm />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Register
