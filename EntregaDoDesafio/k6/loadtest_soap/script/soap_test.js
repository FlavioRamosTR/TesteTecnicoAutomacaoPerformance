import { SOAP } from 'k6/x/soap';
import { check } from 'k6';

// Configuração
const WSDL_URL = 'https://www.w3schools.com/xml/tempconvert.asmx?WSDL';
const client = new SOAP();
client.load(WSDL_URL);

// Payload dinâmico
function generatePayload(celsius) {
  return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Body>
        <CelsiusToFahrenheit xmlns="https://www.w3schools.com/xml/">
          <Celsius>${celsius}</Celsius>
        </CelsiusToFahrenheit>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
}

export default function () {
  const celsius = Math.floor(Math.random() * 100); // Dados variáveis
  const response = client.call(
    'CelsiusToFahrenheit',
    generatePayload(celsius),
    {
      headers: { 'Content-Type': 'text/xml' },
      timeout: '30s', // Opcional
    }
  );

  // Validações
  check(response, {
    'Status 200': (r) => r.status === 200,
    'Resposta válida': (r) => 
      r.body.includes('<Fahrenheit>') && !r.body.includes('Error'),
  });
}

export const options = {
  stages: [
    { duration: '1m', target: 10 },  // Rampa
    { duration: '3m', target: 50 },  // Carga sustentada
  ],
  thresholds: {
    'checks{type:success}': ['rate>0.99'],
  },
};