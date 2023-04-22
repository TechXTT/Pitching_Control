import Head from 'next/head'
import Motors from '../partials/Motors'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Motor Controller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Motors />
    </main>
  )
}
