import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  const [token, setToken] = useState('');

  function handleChangeForFieldToken(event) {    
    const fieldValue = event.target.value;
    setToken(fieldValue);
  }

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page
    event.preventDefault();
  };

  const handleReset = async (event) => {
    setToken('');
  };

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
            <span>
              <Link
                href={{
                  pathname: "/plays",
                  query: { authentication: token }
                }}
              >
                Apuestas
              </Link>
            </span>
            <span><a href="#">Terminos y Condiciones</a></span>
            <span><a href="#">Contactanos</a></span>
          </div>
        </div>
        <div id="content">
          <div id="menu"></div>
          <div id="main">
            <div id="form">
              <div className="column-left">
                <form action="/api/create-session" onSubmit={handleSubmit} onReset={handleReset}>
                  <div id="inputs-third-row">
                    <div className="small-text"></div>
                    <div className="small-text">Token temporal de sesion</div>
                    <div></div>
                    <div>
                      <input name="token" value={token} onChange={handleChangeForFieldToken}></input>
                    </div>
                    <div></div>
                    <div id="form-actions">
                      <input type="reset" value="Limpiar" className="button"></input>
                    </div>
                  </div>
                </form>
              </div>
              <div></div>              
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

export default Home
