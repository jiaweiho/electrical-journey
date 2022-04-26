import type { InferGetServerSidePropsType, GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchForm from '../components/SearchForm'
import Link from 'next/link'
import { CarSpecification } from '../lib/schema';

interface CarSpecificationApi {
  data: CarSpecification[]
}

const Home: NextPage = ( { data }: InferGetServerSidePropsType<typeof getServerSideProps> ) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Find a Player</title>
        <meta name="description" content="Find your new gaming pal!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to your new electrical journey
        </h1>

        <p className={styles.description}>
          Start by finding your new car <a href="http://localhost:3000/register">Next.js!</a> account{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Find a car &rarr;</h2>
            <SearchForm data={data}/>
          </div>

          <Link href='/register'>
            <a className={styles.card}>
              <h2>Register a Car (dev) &rarr;</h2>
            </a>
          </Link>
          
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('hello');
  console.log(process.env.SERVER_HOST);
  
  const res = await fetch(process.env.SERVER_HOST + '/api/cars');
  console.log('fetch response api cars res');
  console.log(res);
  
  const result = await res.json();
  console.log('getserversideprops result');
  console.log(result);
  console.log(result.cars[0].list);
  return { props: { result } }
}

export default Home
