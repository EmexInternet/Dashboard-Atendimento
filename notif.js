async componentDidMount(){

    this.interval = setInterval(async () => {
    const response = await api.get("../monitor/calls_in_queue");
    this.setState({ clientes: response.data.result });
  }, 5000);

  this.interval = setInterval(async () => {
    const fila = await api.get("../dashboard/supervisor");
    this.setState({ feitas: fila.data.result.stats.stats_all.stats.counts.outgoing_answer.start_of_this.day});
    this.setState({ abandonadas: fila.data.result.stats.stats_all.stats.counts.incoming_lost.start_of_this.day});
    this.setState({ recebidas: fila.data.result.stats.stats_all.stats.counts.incoming.start_of_this.day});
    this.setState({ atendiadas: fila.data.result.stats.stats_all.stats.counts.incoming_answer.start_of_this.day});
  }, 5000);

  this.interval = setInterval(async () => {
    const service = await api.get("../monitor/stats_summary");
    this.setState({ tmes: service.data.result.stats.avgs.wait_time.start_of_this.day.avg });
    this.setState({ tmas: service.data.result.stats.avgs.talk_time.start_of_this.day.avg });
    this.setState({ nivel: service.data.result.stats.service_levels.start_of_this.day });
  }, 5000);

  const response = await notif.get("/");
  this.setState({ notifs: response.data.result });
}



render(){
  const { clientes } = this.state;
  let { tmas } =this.state;
  let { tmes } =this.state;
  const { nivel } = this.state;
  const emFila = clientes.length;
  const { feitas } = this.state;
  const { recebidas } = this.state;
  const { atendiadas } = this.state;
  const { abandonadas } = this.state;
 


  <Container fluid style={{fontFamily:'arial black'}} xs>
      <Row>
        <Col md={12}>
        <ul style={{listStyle: 'none'}}>
          <p style={{color:'black',borderRadius:8,padding:5,margin:5}}>
          </p>
          </ul>
        </Col>
      </Row>

      <Row style={{backgroundColor:'#60DD60'}}>
        <Col style={{fontSize:40,justifyContent:'center'}}>
          <text class="row justify-content-center align-items-center">ATENDIMENTO URA</text>
        </Col>
      </Row>

      <Row style={{backgroundColor:'#60DD60'}}>
        <Col xs={2}>
        <h1>Fila Atual</h1>
        </Col>
        <Col xs={8}>
          <Table class="table table-borderless text-center" style={{marginBottom:'100%'}}>
            <thead  class="text-center">
              <tr>
                <th colSpan='2'>
                  <p style={{backgroundColor:'#074A08',color:'white',borderRadius:8,padding:5,margin:5}}>
                  <text style={{fontSize:45}}>{fmtMSS(tmes)}</text>
                  <br></br>
                  <text style={{fontSize:25}}>TME</text>
                  </p>
                  </th>
                <th  colSpan='2'>
                  <p style={{backgroundColor:'#074A08',color:'white',borderRadius:8,padding:5,margin:5}}>
                  <text style={{fontSize:45}}>{fmtMSS(tmas)}</text>
                  <br></br>
                  <text style={{fontSize:25}}>TMA</text>
                  </p>
                </th>
                <th  colSpan='2'>
                  <p style={{backgroundColor:'#074A08',color:'white',borderRadius:8,padding:5,margin:5}}>
                  <text style={{fontSize:45}}>{fmtMSS(tmas+tmes)}</text>
                  <br></br>
                  <text style={{fontSize:25}}>TMO</text>
                  </p>
                </th>  
                </tr>
                </thead>
                <tbody>
                  <tr class="text-center align-middle">
                    <td colSpan='5'>
                      <p style={{backgroundColor:'#074A08',color:'white',borderRadius:8,padding:5,margin:5}}>
                      <text style={{fontSize:25}} class="align-middle">Nivel de Serviço </text> 
                      <br></br>
                      <text style={{fontSize:60}}>{nivel}</text>
                      </p>
                    </td>
                    </tr>
                    <tr class="text-end">
                    <td>
                      <p style={{backgroundColor:'#074A08',color:'white',borderRadius:8,padding:5,margin:5}}>
                      <h1>{emFila}</h1>
                      <h2>Em fila</h2>
                      </p>
                    </td>
                    <td>
                      <p style={{backgroundColor:'#074A08',color:'white',borderRadius:8,padding:5,margin:5}}>
                      <h1>{feitas}</h1>
                      <h2>Realizadas</h2>
                      </p>
                    </td>
                    <td >
                      <p style={{backgroundColor:'#074A08',color:'white',borderRadius:8,padding:5,margin:5}}>
                      <h1>{recebidas}</h1>
                      <h2>Recebidas</h2>
                      </p>
                    </td>
                    <td>
                      <p style={{backgroundColor:'#074A08',color:'white',borderRadius:8,padding:5,margin:5}}>
                      <h1>{atendiadas}</h1>
                      <h2>Atendidas</h2>
                      </p>
                    </td>
                    <td>
                      <p style={{backgroundColor:'#074A08',color:'white',borderRadius:8,padding:5,margin:5}}>
                      <h1>{abandonadas}</h1>
                      <h2>Abandonadas</h2>
                      </p>
                    </td>
                    </tr>
                </tbody>
            </Table>
        </Col>
      </Row>
    </Container>

  );
        }