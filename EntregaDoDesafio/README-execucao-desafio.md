# 🧪 Desafio Técnico: QA de Performance

Este repositório contém os testes, configurações e instruções para execução do desafio técnico de QA focado em **performance, resiliência e escalabilidade** com o uso de **k6**, **Elastic Stack** e outras tecnologias relevantes.

---

## 📦 Requisitos e Execução

### 1. Subindo Elasticsearch e Kibana com Nerdctl

> As instruções abaixo utilizam o `nerdctl` como alternativa ao Docker CLI padrão. Certifique-se de tê-lo instalado previamente.

#### 📥 Baixe as imagens necessárias:

```bash
nerdctl pull docker.elastic.co/elasticsearch/elasticsearch:8.12.0
nerdctl pull docker.elastic.co/kibana/kibana:8.12.0
```

#### 🌐 Crie uma rede para comunicação entre os containers:

```bash
nerdctl network create elk-net
```

#### 🚀 Inicie o Elasticsearch:

```bash
nerdctl run -d \
  --name elasticsearch \
  --network elk-net \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  docker.elastic.co/elasticsearch/elasticsearch:8.12.0
```

#### 🧭 Inicie o Kibana:

```bash
nerdctl run -d \
  --name kibana \
  --network elk-net \
  -p 5601:5601 \
  -e "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" \
  docker.elastic.co/kibana/kibana:8.12.0
```

---

### 2. Configurar k6 com Suporte ao Elasticsearch

#### 🛠️ Instalação e Build:

1. **Instale o Go (caso ainda não tenha):**
   ```bash
   brew install go
   ```

2. **Instale o `xk6` (builder de extensões):**
   ```bash
   go install go.k6.io/xk6/cmd/xk6@latest
   ```

3. **Compile o `k6` com suporte ao Elasticsearch:**
   ```bash
   xk6 build --with github.com/elastic/xk6-output-elasticsearch@latest -o ./k6-elastic
   ```

> O arquivo `k6-dashboard.ndjson` presente no repositório pode ser importado no Kibana como modelo de dashboard.

---

### 3. Executar Testes com Saída no Elasticsearch

```bash
./k6-elastic run \
  --out output-elasticsearch=server="http://localhost:9200" \
  produto/load_test.js
```
  - produto/load_test.js usado como exemplo, outras rotas da collection configuradas e podem ser acessadas nas pastas de origem.
Você pode adaptar os scripts para os outros cenários (performance/resiliência) conforme desejar.

---

## ✅ Status do Desafio

| Categoria         | Tarefa                                | Status               | Observações                                              |
|-------------------|---------------------------------------|----------------------|----------------------------------------------------------|
| 📄 PDF            | Template de Relatório                 | ❌ Não Iniciado       | Usar metricsBeats para integração de métricas no relatório |
| 📊 Monitoramento  | Dashboard Kibana                      | ✅ Entregue           | Dashboard base funcional                                 |
| ⚙️ Testes (k6)     | Script de Carga                       | ✅ Entregue           | Inclusos em `k6/`                                        |
|                   | Script de Performance                 | ✅ Entregue           |                                                          |
|                   | Script de Resiliência                 | ✅ Entregue           |                                                          |
| 📆 Testes Sazonais| Banco de Dados (ODBC)                 | ✅ Entregue           | Configuração de ambiente concluída                      |
|                   | Web (xk6-browser)                     | ✅ Entregue           | Scripts de navegação básica implementados               |
|                   | API SOAP                              | ✅ Entregue           | Teste com serviço público (WSDL)                        |
| 🚀 Escalabilidade | Proposta para 100k acessos simultâneos | 🟡 Em Desenvolvimento | Documento técnico em revisão                            |
| 🐳 Infraestrutura | Dockerizar solução                     | ✅ Entregue parcial   | Ambiente local com containers básicos                   |
| 🔁 CI/CD          | GitHub Actions                        | 🟡 Em Desenvolvimento | Pipeline em estruturação                                |

---

Para dúvidas, melhorias ou sugestões, abra uma issue ou pull request.

---

🧠 **Dica final:** Utilize os dashboards em tempo real do Kibana para ilustrar gargalos e insights dos testes durante a entrega. Boa sorte! 🎯