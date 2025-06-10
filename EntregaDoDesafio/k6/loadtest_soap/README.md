# 📌 Testes de API SOAP com k6

Este projeto demonstra como executar testes de carga em APIs SOAP utilizando o **k6** com o módulo **xk6-soap**.  
O exemplo usa o serviço TempConvert da W3Schools para converter Celsius para Fahrenheit.

---

## 📋 Pré-requisitos

- k6 instalado  
- Go 1.20+ (para compilar o xk6-soap)  
- Docker (opcional, para execução via container)

---

## 🚀 Como Executar

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/soap-load-test.git
cd soap-load-test
```

2. Compile o k6 com o módulo SOAP

```bash
xk6 build --with github.com/grafana/xk6-soap@latest -o ./k6
```

3. Execute o teste

```bash
./k6 run scripts/soap_test.js --out html=results/report.html
```

4. (Opcional) Execute via Docker

```bash
docker-compose up
```

---

## 📂 Estrutura do Projeto

```plaintext
soap-load-test/
├── scripts/
│   ├── soap_test.js          # Script principal de teste
│   └── helpers/              # (Opcional) Funções auxiliares
├── results/                  # Relatórios gerados
│   └── report.html           # Saída em HTML
├── docker-compose.yml        # Configuração do Docker
└── README.md                 # Este arquivo
```

---

## 🛠 Configuração

### Variáveis do Script (`soap_test.js`)

| Parâmetro     | Descrição                    | Valor Padrão                                |
|---------------|------------------------------|----------------------------------------------|
| `WSDL_URL`    | Endereço do WSDL             | `https://.../tempconvert.asmx?WSDL`          |
| `stages`      | Cenários de carga            | 10 VUs → 50 VUs                              |
| `thresholds`  | SLAs (sucesso, latência)     | `rate > 99%`                                 |

---

### Payload SOAP

O script gera dinamicamente:

```xml
<CelsiusToFahrenheit xmlns="https://www.w3schools.com/xml/">
  <Celsius>36</Celsius>
</CelsiusToFahrenheit>
```

---

## 📊 Métricas Coletadas

- Taxa de sucesso das requisições
- Latência (avg, p95, max)
- Throughput (requisições/segundo)

**Exemplo de saída:**

```plaintext
  ✓ Status 200
  ✓ Resposta válida

  checks.........................: 100.00% ✓ 1500     ✗ 0
  http_req_duration..............: avg=120ms min=80ms med=110ms max=300ms
```

---

## 🔍 Troubleshooting

| Problema             | Solução                                      |
|----------------------|----------------------------------------------|
| Erro de compilação   | Verifique a versão do Go (≥1.20)             |
| Timeout              | Aumente `timeout` no `client.call()`        |
| XML inválido         | Valide o payload com XML Validator           |

---

## 💡 Melhorias Futuras

- Adicionar autenticação WS-Security  
- Testar outras operações do WSDL  
- Integrar com Grafana para monitoramento

---

## 📄 Licença

MIT. Consulte o arquivo `LICENSE`.

---

## 🔗 Recursos Úteis

- [Documentação do k6](https://k6.io/docs/)
- [Exemplos de WSDL](https://www.w3schools.com/xml/xml_examples.asp)

Execute com:

```bash
./k6 run scripts/soap_test.js
```

E comece a testar! 🚀