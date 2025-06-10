import http from 'k6/http';
import { check, sleep } from 'k6';
import { recordMetrics,metricThresholds } from '../shared/metric.js';
import { getRandomUser, getRandomProduct,generateTransactionData } from '../shared/transactionHelper.js';

const BASE_URL = 'http://localhost:8080';

export const options = {
    stages: [
        { duration: '2m', target: 50 },  // Rampa de carga
        { duration: '10m', target: 50 }, // Carga sustentada
        { duration: '2m', target: 0 },   // Desligamento
    ],
    thresholds: metricThresholds,
};

export default async function () {
    // Pré-requisitos: Busca usuário e produto aleatórios
    const [userId, productId] = await Promise.all([
        getRandomUser(BASE_URL),
        getRandomProduct(BASE_URL)
    ]);
    
    if (!userId || !productId) {
        console.log('Pré-requisitos não atendidos, pulando iteração');
        return;
    }
    
    // 1. Criação da transação
    const transactionData = generateTransactionData();
    const createRes = http.post(`${BASE_URL}/transaction`, JSON.stringify({
        user_id: userId,
        product_id: productId,
        ...transactionData
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
    
    recordMetrics(createRes,'create');
    
    // 2. Processamento da transação (se criada com sucesso)
    if (createRes.status === 201) {
        const transactionId = createRes.json().id;
        const processRes = http.post(`${BASE_URL}/transactions/${transactionId}/process`, null, {
            headers: { 'Content-Type': 'application/json' }
        });
        recordMetrics(processRes,'process');
    }
    
    sleep(1);
}