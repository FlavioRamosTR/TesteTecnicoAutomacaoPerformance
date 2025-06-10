# 🚀 Desafio Técnico: QA de Performance

Este repositório é destinado a um desafio técnico voltado para profissionais de **QA de Performance**, com o objetivo de avaliar habilidades práticas em análise de gargalos, automação de testes de performance e proposta de soluções escaláveis.

---

## 📋 Objetivos do Desafio

Você deve entregar uma solução que aborde os seguintes pontos:

### 📄 Template de Report (PDF)

Crie um template de relatório que aborde:

- ✅ Identificação de gargalos em **código** (ex: uso ineficiente de queries, algoritmos pesados, etc)
- ✅ Gargalos de **infraestrutura** como:
  - Disco
  - Rede
  - CPU
  - RAM

> **Dica**: Utilize dados e gráficos obtidos da stack Elastic para ilustrar os relatórios.

- 💡 Proponha também uma versão **dinâmica** do relatório (dashboard ou site interativo)

---

## 📊 Suite de Monitoramento: Elastic Stack

Para fins avaliativos, a **stack Elastic (ELK)** deverá ser utilizada. Espera-se que:

- Logs de execução dos testes sejam integrados ao Elasticsearch
- Visualizações (dashboards) sejam feitas com o Kibana
- Alertas ou análises possam ser observadas dinamicamente

---

## 🧪 Criação de Scripts de Teste

Crie scripts de performance utilizando **JMeter** e **k6**, contemplando os seguintes tipos de testes:

| Tipo de Teste   | Objetivo                              |
|------------------|----------------------------------------|
| **Carga**        | Simular múltiplos usuários simultâneos |
| **Performance**  | Avaliar latência, throughput, etc       |
| **Resiliência**  | Testar comportamento sob falhas        |

---

## 📦 Testes Sazonais (Tecnologia Livre)

Crie scripts adicionais com foco em situações sazonais (ex: picos de vendas) utilizando a linguagem/ferramenta de sua escolha. Os alvos devem incluir:

- **Banco de Dados** via ODBC (ex: SQL Server, PostgreSQL)
- **Web Browser** com xk6-browser, Puppeteer, Selenium ou Playwright
- **API SOAP** utilizando xk6-soap, Postman ou ferramentas compatíveis

> **Importante**: os scripts devem ser versionados e organizados em pastas temáticas.

---

## 📈 Escalabilidade: Proposta para 100K Acessos

Apresente uma **proposta técnica** para escalar a execução dos testes de performance para **100 mil acessos simultâneos**. A proposta pode incluir:

- Divisão de carga entre múltiplas instâncias
- Uso de containers (Docker, Kubernetes)
- Orquestração com ferramentas como Terraform, Ansible, etc.
- Estimativas de custo, recursos e viabilidade

---

## ✅ Critérios de Avaliação

- Clareza e organização dos scripts
- Cobertura dos tipos de testes exigidos
- Integração com a stack Elastic
- Qualidade do template de relatório
- Proposta de escalabilidade técnica e realista

---

Boa sorte e aproveite para demonstrar seu domínio em QA de Performance! 💪