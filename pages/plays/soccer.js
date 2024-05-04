import { useRouter } from 'next/router'
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Soccer({ initialData }) {
  const leagues = [
    {id: 1, name: 'Liga 1 (Peru)'}
  ];

  const router = useRouter();
  const token = router.query;
  
  const [plays, setPlays] = useState({
    items: null
  });

  function initPlaysState(itemsValue) {
    setPlays({
      ...plays,
      items: itemsValue
    });
  }

  const [play, setPlay] = useState({
    user: '1',
    match: '0',
    betOption: '0',
    amount: '0.00',
    benefitAmount: 0,
    labe1BetOption: '...',
    labe2BetOption: '...',
    labe3BetOption: '...',
    rateBetOption: 0
  });

  function initPlayState(matchValue) {
    setPlay({
      ...play,
      match: matchValue,
      betOption: '0',
      amount: '0.00',
      benefitAmount: 0,
      labe1BetOption: '...',
      labe2BetOption: '...',
      labe3BetOption: '...'
    });
  }

  function handleChangeForFieldMatch(event) {
    const fieldValue = event.target.value;
    if (fieldValue == '0') {
      initPlayState(fieldValue);
    } else {
      // Filter matchs from initial data
      const matchId = +fieldValue;
      const bets = initialData.filter(bet =>
        bet.id === matchId
      );

      // Update label for each bet option
      let labe1BetOption = '...';
      let labe2BetOption = '...';
      let labe3BetOption = '...';
      bets.map(bet => {
        bet.options.map(option => {
          if (option.id === 1) {
            labe1BetOption = option.description + " (" + option.rate + ")";
          } else if (option.id === 2) {
            labe2BetOption = option.description + "(" + option.rate + ")";
          } else {
            labe3BetOption = option.description + "(" + option.rate + ")";
          }
        });
      });

      setPlay({
        ...play,
        match: fieldValue,
        labe1BetOption: labe1BetOption,
        labe2BetOption: labe2BetOption,
        labe3BetOption: labe3BetOption
      });
    }    
  }

  function handleChangeForFieldBetOption(event) {
    const fieldValue = event.target.value;

    // Filter matchs from initial data
    const matchId = +play.match;
    const bets = initialData.filter(bet =>
      bet.id === matchId
    );

    // Get rate of selected bet option
    let rateBetOption = 0;
    const selectedBetOptionId = +fieldValue;
    bets.map(bet => {
      bet.options.map(option => {        
        if (option.id === selectedBetOptionId) {
          rateBetOption = option.rate;
        }
      });
    });

    setPlay({
      ...play,
      betOption: fieldValue,
      rateBetOption: rateBetOption,
      benefitAmount: play.amount * rateBetOption
    });
  }

  function calculateBenefitAmount(amount, rateBet) {
    return amount * rateBet;
  }

  function handleChangeForFieldPlayAmount(event) {
    const fieldValue = event.target.value;
    setPlay({
      ...play,
      amount: fieldValue,
      benefitAmount: calculateBenefitAmount(fieldValue, play.rateBetOption)
    });
  }

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page
    event.preventDefault();
    
    // Get data for request body
    const data = {
      betId: event.target.match.value,
      choiceId: event.target.betOption.value,
      amount: event.target.playAmount.value
    };

    // Transform data to JSON format
    const JSONdata = JSON.stringify(data);

    // Set API endpoint
    const endpoint = process.env.NEXT_PUBLIC_PREFIX_ENDPOINT_MICROSERVICE_PLAY + '/workshop/plays';

    // Build the request
    const options1 = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSONdata
    };

    // Send request to API endpoint for saving play
    const response1 = await fetch(endpoint, options1);
    const dataResult = await response1.json();

    alert("Play saved with ID " + dataResult.id);

    // Reset form
    initPlayState('0');

    // Build the request
    const options2 = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };

    // Send request to API endpoint for getting plays
    const response2 = await fetch(endpoint, options2);
    initPlaysState(await response2.json());
  };

  const handleReset = async (event) => {
    initPlayState('0');
  };

  return (
    <div>
      <Head>
        <title>Apuestas de Futbol</title>
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
            <div className="selected-option">Futbol</div>
            <div><a href="#">Tenis</a></div>
            <div><a href="#">Basquet</a></div>
          </div>
          <div id="main">
            <div id="form">
              <div className="column-left">
                <span>Home</span>
                <span className="vertical-separator"></span>
                <span>Apuestas</span>
                <span className="vertical-separator"></span>
                <span>Futbol</span>
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
                <span className="subtitle big-text">Apuestas de Futbol</span>
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
              <div className="column-left">
                <form action="/api/register-play" onSubmit={handleSubmit} onReset={handleReset}>
                  <div id="inputs-first-row">
                    <div className="small-text">Liga</div>
                    <div className="small-text">Partido</div>
                    <div>
                      <select name="league">
                        {leagues.map(({id, name}) => (
                          <option value={id}>{name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select name="match" value={play.match} onChange={handleChangeForFieldMatch}>
                        <option value="0">...</option>
                        {initialData.map(({id, match}) => (
                          <option value={id}>{match}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div id="inputs-second-row">
                    <div className="small-text">Seleccionar apuesta</div>
                    <div></div>
                    <div></div>
                    <div>
                      <input id="option1" name="betOption" type="radio" value="1" onChange={handleChangeForFieldBetOption}></input>
                      <label htmlFor="option1">{play.labe1BetOption}</label>
                    </div>
                    <div>
                      <input id="option2" name="betOption" type="radio" value="2" onChange={handleChangeForFieldBetOption}></input>
                      <label htmlFor="option2">{play.labe2BetOption}</label>
                    </div>
                    <div>
                      <input id="option3" name="betOption" type="radio" value="3" onChange={handleChangeForFieldBetOption}></input>
                      <label htmlFor="option3">{play.labe3BetOption}</label>
                    </div>
                  </div>
                  <div id="inputs-third-row">
                    <div className="small-text">Monto a apostar (minimo S/. 5.00 - maximo S/. 50,000.00)</div>
                    <div className="small-text">Ganancia supuesta</div>
                    <div>
                      <input name="playAmount" value={play.amount} onChange={handleChangeForFieldPlayAmount}></input>
                    </div>
                    <div>
                      <input name="benefitAmount" value={play.benefitAmount} readOnly></input>
                    </div>
                    <div></div>
                    <div id="form-actions">
                      <input type="reset" value="Limpiar" className="button"></input>
                      <input type="submit" value="Apostar"></input>
                    </div>
                  </div>
                </form>
              </div>
              <div></div>
              <div id="error-message" className="column-left medium-text">No se pudo registrar apuesta.</div>
              <div></div>
              <div className="horizontal-separator"></div>
              <div className="horizontal-separator"></div>
              <div id="result" className="column-left">
                <div className="subtitle big-text">Mis apuestas de Futbol</div>
                <div id="result-table-header" className="medium-text">
                  <div className="table-header-left table-header table-column-center">Fecha</div>
                  <div className="table-header table-column-center">Liga</div>
                  <div className="table-header table-column-center">Partido</div>
                  <div className="table-header table-column-center">Apuesta</div>
                  <div className="table-header table-column-right">Monto</div>
                  <div className="table-header table-column-center">Estado</div>
                  <div className="table-header table-column-center">Resultado</div>
                  <div className="table-header-right table-header table-column-right">Ganancia</div>
                </div>
                {plays.items && plays.items.map(({bet, choice, amount, registrationDate, result}) => (
                  <div className="result-table-row medium-text">  
                    <div className="table-row table-column-center">{registrationDate.substring(0, 10)}</div>
                    <div className="table-row table-column-center">{bet.leagueId}</div>
                    <div className="table-row table-column-center">{bet.match}</div>
                    <div className="table-row table-column-center">{choice.description}</div>
                    <div className="table-row table-column-right">S/. {amount}</div>
                    <div className="table-row table-column-center">{bet.status}</div>
                    <div className="table-row table-column-center">{result}</div>
                    <div className="table-row table-column-right">S/. {calculateBenefitAmount(amount, choice.rate)}</div>
                  </div>
                ))}
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

export async function getStaticProps() {
  const token = process.env.NEXT_PUBLIC_TOKEN_AWS_COGNITO;
  
  // Set API endpoint
  const endpoint = process.env.NEXT_PUBLIC_PREFIX_ENDPOINT_MICROSERVICE_BET + '/workshop/bets?leagueId=1' /*+ '&status=1'*/;

  // Build the request
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  // Fetch data from external API
  const response = await fetch(endpoint, options);
  const initialData = await response.json();
 
  // Pass data to the page via props
  return { props: { initialData } }
}

export default Soccer
