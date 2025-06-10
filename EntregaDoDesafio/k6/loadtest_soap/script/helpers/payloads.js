// Exemplo: modularização de payloads
export const celsiusToFahrenheit = (celsius) => `
  <CelsiusToFahrenheit xmlns="https://www.w3schools.com/xml/">
    <Celsius>${celsius}</Celsius>
  </CelsiusToFahrenheit>
`;