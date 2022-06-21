import React, { useEffect, useState} from "react";
import api from "./Api";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import aguardando from './assets/aguardando.png';
import feita from './assets/feitas.png';
import recebida from './assets/recebidas.png';
import atendendo from './assets/atendendo.png';
import espera from './assets/espera.png';
import operacao from './assets/operacao.png';
import triste from './assets/triste.png';
import feliz from './assets/feliz.png';


function fmtMSS(s) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + parseInt(s); }

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function App() {

  const [fila, setData] = useState([]);
  const [feitas, setData_feitas] = useState([]);
  const [abandonadas, setData_abandonadas] = useState([]);
  const [recebidas, setData_rescebidas] = useState([]);
  const [atendiadas, setData_atendidas] = useState([]);
  const [tmes, setData_tmes] = useState([]);
  const [tmas, setData_tmas] = useState([]);
  const [nivel, setData_nivel] = useState([]);
  const [notificacao, setNotificacao] = useState([]);
  const emFila = fila.length;
  var {height, width} = getWindowDimensions();
  var inicio = 0;

  if (notificacao.length == 0 && inicio == 0) {
    inicio = 1;
    getNotificacao();
  }

    useEffect(() => { setInterval(setInterval(getNotificacao, 180000))}, [])

  function getNotificacao() {
    fetch('http://200.229.156.16:3001/db')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setNotificacao(data);
      });
  }
  

  const fetchMyAPI = async () => {
    var response = await api.get("../monitor/calls_in_queue");
    if (Array.isArray(response.data.result))
    {
      setData(response.data.result)
    }
    else
    {
      setData(fila)
    }
  }


  useEffect(() => { setInterval(fetchMyAPI, 5000) }, [])


  //////////////////////


  const fetchMyAPI_feitas = async () => {
    var response = await api.get("../dashboard/supervisor");
    setData_feitas(response.data.result.stats.stats_all.stats.counts.outgoing_answer.start_of_this.day);
  }

  useEffect(() => { setInterval(fetchMyAPI_feitas, 40000) }, [])

  const fetchMyAPI_abandonadas = async () => {
    var response = await api.get("../dashboard/supervisor");
    setData_abandonadas(response.data.result.stats.stats_all.stats.counts.incoming_lost.start_of_this.day);
  }

  useEffect(() => { setInterval(fetchMyAPI_abandonadas, 40000) }, [])

  const fetchMyAPI_rescebidas = async () => {
    var response = await api.get("../dashboard/supervisor");
    setData_rescebidas(response.data.result.stats.stats_all.stats.counts.incoming.start_of_this.day);
  }

  useEffect(() => { setInterval(fetchMyAPI_rescebidas, 40000) }, [])

  const fetchMyAPI_atendidas = async () => {
    var response = await api.get("../dashboard/supervisor");
    setData_atendidas(response.data.result.stats.stats_all.stats.counts.incoming_answer.start_of_this.day);
  }

  useEffect(() => { setInterval(fetchMyAPI_atendidas, 40000) }, [])

  /////////////////////////////////////////////////////////////


  //////////////////////////

  const fetchMyAPI_tmes = async () => {
    var response = await api.get("../monitor/stats_summary");
    setData_tmes(response.data.result.stats.avgs.wait_time.start_of_this.day.avg);
  }

  useEffect(() => { setInterval(fetchMyAPI_tmes, 40000) }, [])

  const fetchMyAPI_tmas = async () => {
    var response = await api.get("../monitor/stats_summary");
    setData_tmas(response.data.result.stats.avgs.talk_time.start_of_this.day.avg);
  }

  useEffect(() => { setInterval(fetchMyAPI_tmas, 40000) }, [])

  const fetchMyAPI_nivel = async () => {
    var response = await api.get("../monitor/stats_summary");
    setData_nivel(response.data.result.stats.service_levels.start_of_this.day);
  }

  useEffect(() => { setInterval(fetchMyAPI_nivel, 40000) }, [])


  return (
    <Container fluid style={{fontFamily: 'arial black' , color:'white',backgroundColor: '#60DD60',paddingBottom:'100%'}} xs>
      <Row>
        <Col xs={12} style={{ backgroundColor: 'red', maxBlockSize:height*0.15, minBlockSize:height*0.15}}>
        {notificacao.length > 0 ? (
          <Carousel autoPlay={true} infiniteLoop={true} showIndicators={false} interval={15000}>
          {notificacao.map(notificacao => (
              <text  key={notificacao.id_atendimento} style={{ fontSize: 50}}>{notificacao.descricao_abertura}</text>
          ))}
        </Carousel>) : <text style={{fontsSize: 50}}>Nenhuma notificação</text>}
        </Col>
      </Row>

      <Row style={{ backgroundColor: '#60DD60' }}>
        <Col style={{ fontSize: 40, justifyContent: 'center', fontFamily:'arial' }}>
          <text className="row justify-content-center align-items-center">ATENDIMENTO URA</text>
        </Col>
      </Row>

      <Row style={{ backgroundColor: '#60DD60', }}>
        <Col xs={2}>
          <h1>Fila Atual</h1>
          <Row>
          <ul style={{ listStyle: 'none' }}>
            {fila.map ( fila => (
                <li key={fila.linkid}  className='row' style={{marginBottom:'5%'}}>
                  <Col xs={1}>
                  <text  style={{ fontSize: 25, backgroundColor: 'white', borderRadius: '110%',marginRight:5,paddingLeft:5,paddingRight:5,color:'black'}} >{fila.position}ª</text>
                  </Col>
                  <Col style={{ backgroundColor: '#074A08', color: 'black', borderRadius: 8, marginLeft: 25}}>
                  <text style={{ fontSize: 20, color: 'white' }}>{fila.src}</text>
                  <h4 style={{ color: 'white' }}>{fila.queue}</h4>
                  <h4 style={{ color: 'white' }}>{fmtMSS(fila.wait)}</h4>
              </Col>
                </li>
            ))}
          </ul>
          </Row>
        </Col>
        <Col xs={8}>
          <Row className="border-bottom border-dark text-center">
            

          <Col xs>
              <p style={{ backgroundColor: '#074A08', color: 'white', borderRadius: 8, padding: 5, margin: 5}} className='row'>
              <Col xs >
                  <img src={espera} style={{ width: 70}} alt="teste" className="justify-content-md-center"></img>
              </Col>
              <Col xs >
                  <h1 className="text-center">{fmtMSS(tmes)}</h1>
                  <h3>TME</h3>
                  </Col>
              </p>
              </Col>

            

              <Col xs>
              <p style={{ backgroundColor: '#074A08', color: 'white', borderRadius: 8, padding: 5, margin: 5}} className='row'>
              <Col xs >
                  <img src={atendendo} style={{ width: 70}} alt="teste" className="justify-content-md-center"></img>
              </Col>
              <Col xs >
                  <h1 className="text-center">{fmtMSS(tmas)}</h1>
                  <h3>TMA</h3>
                  </Col>
              </p>
              </Col>

            

              <Col xs>
              <p style={{ backgroundColor: '#074A08', color: 'white', borderRadius: 8, padding: 5, margin: 5}} className='row'>
              <Col xs >
                  <img src={operacao} style={{ width: 70}} alt="teste" className="justify-content-md-center"></img>
              </Col>
              <Col xs >
                  <h1 className="text-center">{fmtMSS(tmes+tmas)}</h1>
                  <h3>TMO</h3>
                  </Col>
              </p>
              </Col>

              </Row>
            <Row className="border-bottom border-dark">
              <Col xs={12} className='text-center'>
                  <p style={{ backgroundColor: '#074A08', color: 'white', borderRadius: 8, padding: 5, margin: 5 }}>
                    <text style={{ fontSize: 25 }} className="align-middle">Nivel de Serviço </text>
                    <br></br>
                    <text style={{ fontSize: 60 }}>{nivel}</text>
                  </p>
              </Col>
              </Row>
              <Row className="border-bottom border-dark">

              <Col xs>
              <p style={{ backgroundColor: '#074A08', color: 'white', borderRadius: 8, padding: 5, margin: 5}} className='row align-items-center'>
              <Col xs>
                  <img src={aguardando} style={{ width: 35}} alt="teste"></img>
              </Col>
              <Col xs >
                  <h2 className="text-center">{emFila}</h2>
                  <h6>EM FILA</h6>
                  </Col>
              </p>
              </Col>              

              <Col xs>
              <p style={{ backgroundColor: '#074A08', color: 'white', borderRadius: 8, padding: 5, margin: 5}} className='row align-items-center'>
              <Col xs>
                  <img src={feita} style={{ width: 25}} alt="teste"  className="justify-content-center"></img>
              </Col>
              <Col xs>
                  <h2 className="text-center">{feitas}</h2>
                  <h6>REALIZADAS</h6>
                  </Col>
              </p>
              </Col>

              <Col xs>
              <p style={{ backgroundColor: '#074A08', color: 'white', borderRadius: 8, padding: 5, margin: 5}} className='row align-items-center'>
              <Col xs>
                  <img src={recebida} style={{ width: 30}} alt="teste"  className="align-middle"></img>
              </Col>
              <Col xs>
                  <h2 className="text-center">{recebidas}</h2>
                  <h6>RECEBIDAS</h6>
                  </Col>
              </p>
              </Col>

              <Col xs>
              <p style={{ backgroundColor: '#074A08', color: 'white', borderRadius: 8, padding: 5, margin: 5}} className='row align-items-center'>
              <Col xs>
                  <img src={feliz} style={{ width: 27}} alt="teste"  className="justify-content-center"></img>
              </Col>
              <Col xs>
                  <h2 className="text-center">{atendiadas}</h2>
                  <h6> ATENDIDAS</h6>
                  </Col>
              </p>
              </Col>

              <Col xs>
              <p style={{ backgroundColor: '#074A08', color: 'white', borderRadius: 8, padding: 5, margin: 5}} className='row align-items-center'>
              <Col xs>
                  <img src={triste} style={{ width: 30}} alt="teste"  className="justify-content-center"></img>
              </Col>
              <Col xs>
                  <h2 className="text-center">{abandonadas}</h2>
                  <h6>PERDIDAS</h6>
                  </Col>
              </p>
              </Col>

              </Row>
        </Col>
      </Row>
    </Container>

  );
}