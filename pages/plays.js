import Head from 'next/head';
import Link from 'next/link';

export default function Plays() {
  return (
    <div>
      <Head>
        <title>Apuestas</title>
      </Head>
      <main>
        <div id="header">
          <div id="header-left">
            <span className="title"></span>
            <span id="title-image" className="title"></span>
            <span>Apuesta Peru</span>
          </div>
          <div id="header-right">
            <span><Link href="/">Home</Link></span>
            <span className="selected-page">Apuestas</span>
            <span><a href="#">Terminos y Condiciones</a></span>
            <span><a href="#">Contactanos</a></span>
          </div>
        </div>
        <div id="content">
          <div id="menu">
            <div><Link href="/plays/football">Futbol</Link></div>
            <div><a href="#">Tenis</a></div>
            <div><a href="#">Basquet</a></div>
          </div>
          <div id="main">
            <div id="form">
              <div className="column-left">
                <span>Home</span>
                <span className="vertical-separator"></span>
                <span>Apuestas</span>                
              </div>
              <div id="profile">
                <div id="avatar">
                  <span></span>
                </div>
                <div>
                  <div className="small-text">Pepe Perez</div>
                  <div className="small-text">online</div>
                </div>
              </div>
              <div className="column-left">
                <span className="subtitle big-text">Apuestas</span>
              </div>
              <div id="account">
                <div id="money">
                  <span></span>
                </div>
                <div>
                  <div className="small-text">S/. 250.00</div>
                  <div className="small-text">saldo cuenta</div>
                </div>
              </div>
            </div>
          </div>
          <div id="ads">
            <div className="ad"></div>
            <div className="ad"></div>
            <div className="ad"></div>
            <div className="ad"></div>
            <div className="ad"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
