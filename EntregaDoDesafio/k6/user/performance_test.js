import http from 'k6/http';
import { check, sleep } from 'k6';
import { recordMetrics,metricThresholds } from '../shared/metric.js';
import { generateUser,generateUserUpdate } from '../shared/userGenerator.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
    stages: [
        { duration: '1s', target: 10 },  // Aquecimento
        { duration: '5s', target: 10 },  // Teste
    ],
    thresholds: metricThresholds,
    noConnectionReuse: true
};

function uploadRandomUser(uploadId) {
    return {
      id: uploadId,
      name: `User ${uploadId}`,
      email: `user${uploadId}@test.com`,
      document: randomIntBetween(10000000000, 99999999999).toString()
    };
}

export default function () {
    // 1. Criação
    const newUser = generateUser();

    let res = http.post('http://localhost:8080/user', JSON.stringify(newUser), {
        headers: { 'Content-Type': 'application/json' }
    });

    recordMetrics(res,'create');
    
    if (res.status === 201) {
        const userId = JSON.parse(res.body).id;
        
        // 2. Consulta
        res = http.get(`http://localhost:8080/user/${userId}`);
        recordMetrics( res,'get',);
        
        // 3. Atualização
        const update = uploadRandomUser(userId);

        res = http.put(`http://localhost:8080/user/`, JSON.stringify(update), {
            headers: { 'Content-Type': 'application/json' }
        });
        recordMetrics(res,'update');
        
        // // 4. Exclusão (opcional)
        // res = http.del(`http://localhost:8080/user/${userId}`);
        // recordMetrics( res,'delete' );
    }
}