import http from 'k6/http';
import { check, sleep } from 'k6';
import { recordMetrics,metricThresholds } from '../shared/metric.js';
import { generateProduct } from '../shared/productGenerator.js';

export const options = {
    stages: [
        { duration: '5m', target: 100 },
        { duration: '30m', target: 100 },
        { duration: '5m', target: 0 },
    ],
    thresholds: metricThresholds,
    rps: 50
};

export default function () {
    const newProduct = generateProduct();
    
    // Criação de produto
    let res = http.post('http://localhost:8080/products', JSON.stringify(newProduct), {
        headers: { 'Content-Type': 'application/json' }
    });
    
    recordMetrics(res, 'create');
    check(res, { 'created product': (r) => r.status === 201 });
    
    // Busca de produto
    res = http.get(`http://localhost:8080/products?category=${newProduct.category}`);
    recordMetrics(res, 'search');
    check(res, { 'search ok': (r) => r.status === 200 });
    
    sleep(1);
}