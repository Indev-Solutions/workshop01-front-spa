import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <div id="header">
          <div id="header-left">
            <span className="title"></span>
            <span id="title-image" className="title"></span>
            <span>Apuesta Peru</span>
          </div>
          <div id="header-right">
            <span className="selected-page">Home</span>
            <span><Link href="/plays">Apuestas</Link></span>
            <span><a href="#">Terminos y Condiciones</a></span>
            <span><a href="#">Contactanos</a></span>
          </div>
        </div>        
      </main>
    </div>
  )
}
