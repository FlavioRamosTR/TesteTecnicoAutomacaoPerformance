# 🚀 Load Testing para E-commerce com k6, Python e Docker

Este projeto simula testes de carga em um banco de dados de e-commerce durante um cenário de pico (ex: Black Friday), utilizando:

- **k6**: Orquestração de carga.
- **Python + ODBC**: Consultas e transações no SQL Server.
- **Docker**: Ambiente isolado e reproduzível.

---

## 📋 Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Como Executar

1. **Clone o repositório**:

- Navegue o diretorio dos testes odbc 
   ```bash
   cd odbc
   ```

2. **Inicie o ambiente**:
   ```bash
   docker-compose up -d --build
   ```

3. **Acompanhe os logs**:
   ```bash
   docker-compose logs -f k6
   ```

4. **Parar e limpar**:
   ```bash
   docker-compose down
   ```

---

## 📂 Estrutura do Projeto

```
ecommerce-load-test/
├── docker-compose.yml          # Configuração dos containers
├── database/
│   ├── Dockerfile             # Imagem do SQL Server
│   ├── init.sql               # Dados iniciais (tabelas + produtos)
├── scripts/
│   ├── ecommerce_db_test.py   # Script Python de testes
│   ├── requirements.txt       # Dependências Python
├── k6/
│   ├── ecommerce_k6_load.js   # Configuração do k6
```

---

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` para personalizar credenciais:
```ini
DB_HOST=sql-server
DB_NAME=master
DB_USER=sa
DB_PASSWORD=123456
```

### Banco de Dados
Tabelas criadas automaticamente (via `init.sql`):
- **produtos**: Catálogo com 100 itens (20% em promoção).
- **estoque**: Quantidade disponível por produto.
- **pedidos**: Registro de transações.

---

## 📊 Cenários de Teste

O k6 executa em 3 fases (definidas em `ecommerce_k6_load.js`):
1. **Rampa inicial**: 20 usuários em 2 minutos.
2. **Pico de carga**: 100 usuários em 5 minutos.
3. **Desligamento**: Redução gradual em 2 minutos.

### Comportamento dos usuários virtuais (VUs):
- **100%** consultam o catálogo de promoções.
- **10%** simulam checkout (INSERT em pedidos + UPDATE em estoque).

---

## 🛠 Troubleshooting

| Problema                  | Solução                                                                 |
|---------------------------|-------------------------------------------------------------------------|
| **ODBC Connection Failed**| Verifique se o SQL Server está saudável: `docker-compose logs sql-server` |
| **Script Python não encontrado** | Confira o volume no `docker-compose.yml` (caminho `/python_scripts`) |
| **Deadlocks no banco**    | Aumente o intervalo entre transações no k6 (adicione `sleep` no script). |

---

## 📈 Ajustes de Performance

Para aumentar a carga, edite as opções em `ecommerce_k6_load.js`:
```javascript
stages: [
  { duration: '1m', target: 50 },  // Rampa mais rápida
  { duration: '10m', target: 200 }, // Pico maior
]
```

---

## 📊 Métricas Coletadas

### Banco de Dados:
- **Tempo de consulta** (SELECT).
- **Throughput de updates** (pedidos).

### k6:
- **Taxa de sucesso** (rate > 95%).
- **Latência p95**.

---

## 💡 Melhorias Futuras

- Adicionar Grafana para visualização em tempo real.
- Implementar testes para APIs REST do e-commerce.
- Adicionar mais cenários (ex: concorrência em estoque).

---

## 📄 Licença

MIT. Consulte o arquivo LICENSE.

---

## 🔗 Recursos Úteis

- [Documentação do k6](https://k6.io/docs/)
- [Guia pyODBC](https://github.com/mkleehammer/pyodbc/wiki)

---

Execute com `docker-compose up` e simule seu Black Friday! 🚀