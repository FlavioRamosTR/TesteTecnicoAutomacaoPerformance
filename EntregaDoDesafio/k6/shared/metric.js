// metrics.js - Módulo compartilhado de métricas
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';

// Criação das métricas
const requestTrend = new Trend('request_duration');
const serverProcessingTrend = new Trend('server_processing_time');
const dbQueryTrend = new Trend('db_query_time');
const externalApiTrend = new Trend('external_api_time');

const cpuUsageGauge = new Gauge('cpu_usage');
const memoryUsageGauge = new Gauge('memory_usage');
const diskLatencyTrend = new Trend('disk_latency');

const dnsLookupTrend = new Trend('dns_lookup_time');
const tcpHandshakeTrend = new Trend('tcp_handshake_time');
const sslHandshakeTrend = new Trend('ssl_handshake_time');

const errorCounters = {
    validation_errors: new Counter('validation_errors'),
    auth_errors: new Counter('auth_errors'),
    not_found_errors: new Counter('not_found_errors'),
    server_errors: new Counter('server_errors'),
    db_errors: new Counter('db_errors'),
    timeout_errors: new Counter('timeout_errors'),
    network_errors: new Counter('network_errors')
};

// Função segura para adicionar métricas
function safeAdd(metric, value) {
    if (value !== undefined && value !== null && !isNaN(value)) {
        metric.add(value);
    }
}
// Função para rastrear operações e medir tempo
export function trackOperation(operationName, fn) {
    const start = Date.now();
    const result = fn();
    const duration = Date.now() - start;
    
    metrics[`${operationName}Time`].add(duration);
    return result;
}
// Função para registrar métricas de uma resposta HTTP
export function recordMetrics(res) {
    // Métricas de tempo
    safeAdd(requestTrend, res.timings.duration);
    safeAdd(serverProcessingTrend, res.timings.sending + res.timings.receiving);
    
    // Métricas de rede
    if (res.timings) {
        safeAdd(dnsLookupTrend, res.timings.dns_lookup);
        safeAdd(tcpHandshakeTrend, res.timings.tcp_handshake);
        safeAdd(sslHandshakeTrend, res.timings.ssl_handshake);
    }

    // Métricas de infraestrutura
    if (res.headers) {
        safeAdd(cpuUsageGauge, parseFloat(res.headers['X-CPU-Usage']));
        safeAdd(memoryUsageGauge, parseFloat(res.headers['X-Memory-Usage']));
        safeAdd(diskLatencyTrend, parseFloat(res.headers['X-Disk-Latency']));
        safeAdd(dbQueryTrend, parseFloat(res.headers['X-DB-Query-Time']));
        safeAdd(externalApiTrend, parseFloat(res.headers['X-Ext-API-Time']));
    }

    // Análise de erros
    analyzeError(res);
}

// Função para análise de erros
function analyzeError(response) {
    if (!response) {
        errorCounters.network_errors.add(1);
        return;
    }

    switch(response.status) {
        case 400:
            errorCounters.validation_errors.add(1);
            break;
        case 401:
        case 403:
            errorCounters.auth_errors.add(1);
            break;
        case 404:
            errorCounters.not_found_errors.add(1);
            break;
        case 500:
            errorCounters.server_errors.add(1);
            if (response.headers && response.headers['X-Error-Type'] === 'DB') {
                errorCounters.db_errors.add(1);
            }
            break;
        case 502:
        case 503:
        case 504:
            errorCounters.server_errors.add(1);
            break;
    }

    if (response.timings && response.timings.duration > 10000) {
        errorCounters.timeout_errors.add(1);
    }
}

// Exporta configurações padrão de thresholds
export const metricThresholds = {
    'http_req_failed': ['rate<0.01'], // Menos de 1% de falhas
    'http_req_duration': ['p(95)<500'], // 95% das requisições abaixo de 500ms
    'server_processing_time': ['p(95)<300'],
    'db_query_time': ['p(95)<200'],
    'cpu_usage': ['value<80'], // CPU abaixo de 80%
    'memory_usage': ['value<90'], // Memória abaixo de 90%
    'disk_latency': ['p(95)<50'],
    'validation_errors': ['count<5'], // Sintaxe correta para contagem
    'server_errors': ['count<1'] // Sintaxe correta - menos de 1 erro
};