import http from 'k6/http';
import { check, sleep } from 'k6';
import { recordMetrics,metricThresholds } from '../shared/metric.js';
import { generateProduct } from '../shared/productGenerator.js';

export const options = {
    stages: [
        { duration: '2m', target: 10 },
        { duration: '2m', target: 50 },
        { duration: '2m', target: 100 },
        { duration: '2m', target: 10 },
    ],
    thresholds: metricThresholds,
    //discardResponseBodies: true
};
export default function () {
    const product = generateProduct();

    let res = http.post('http://localhost:8080/products', JSON.stringify(product), {
        headers: { 'Content-Type': 'application/json' },
        timeout: '10s'
    });

    check(res, { 'Produto criado com sucesso': (r) => r.status === 201 });
    recordMetrics(res);

    if (res.status === 201) {
        try {
            const responseBody = JSON.parse(res.body);
            const productId = responseBody.id;

            res = http.get(`http://localhost:8080/products/${productId}`);
            recordMetrics(res);
            check(res, { 'product exists': (r) => r.status === 200 });

        } catch (err) {
            console.error('Erro ao parsear body JSON:', res.body);
        }
    } else {
        console.error(`Falha ao criar produto. Status: ${res.status}, Body: ${res.body}`);
    }

    sleep(Math.random() * 3);
}