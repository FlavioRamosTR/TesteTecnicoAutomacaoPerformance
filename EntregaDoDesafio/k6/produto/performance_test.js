import http from 'k6/http';
import { check } from 'k6';
import { recordMetrics,metricThresholds } from '../shared/metric.js';
import { generateProduct } from '../shared/productGenerator.js';

//TODO: em uma v2

export const options = {
    stages: [
        { duration: '1s', target: 1 }, // Aquecimento
        { duration: '1s', target: 1 }, // Teste principal
    ],
    thresholds: metricThresholds,
    noConnectionReuse: true // Conexões novas para cada requisição
};

// export default function () {
//     // Criação com medição precisa
//     const start = new Date();
//     const newProduct = generateProduct();
//     let res = http.post('http://localhost:8080/products', JSON.stringify(newProduct), {
//         headers: { 'Content-Type': 'application/json' }
//     });

    
//     //recordMetrics.createTime.add(new Date() - start);
//     recordMetrics(res, 'create');
//     check(res, { 'created product': (r) => r.status === 201 });
    
//     // // Atualização de estoque

 
//     const update = generateProductUpdate();
//     res = http.patch(`http://localhost:8080/products`, 
//         JSON.stringify({ stock: update.stock }), {
//             headers: { 'Content-Type': 'application/json' }
//         });


    
//     recordMetrics(res, 'stockUpdate');
//     check(res, { 'stock updated': (r) => r.status === 200 });
// }

function generateProductUpdate(idUpdate) {
    console.log('Gerando atualização de produto para o ID:', idUpdate);
    return {
        id: idUpdate,
        description: `loadTest-${idUpdate}`,
        name: `LoadTestProduct ${idUpdate}`,
        price: randomIntBetween(10, 1000),
        stock: randomIntBetween(1, 1),
        category: ['Eletrônicos', 'Roupas', 'Alimentos'][randomIntBetween(0, 2)]
    };
}

const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    timeout: '10s'
  };

export default function () {
    // 1. Criação do produto
    const newProduct = generateProduct();
    let res = http.post('http://localhost:8080/products', JSON.stringify(newProduct), {
        headers: { 'Content-Type': 'application/json' }
    });

    // Verifica se a criação foi bem-sucedida e pega o ID
    let productId;
    recordMetrics(res, 'create');
    if (check(res, { 'Produto criado com sucesso': (r) => r.status === 201 })) {
        try {
            // console.log('Resposta da criação do produto:', res.body);
            const responseBody = JSON.parse(res.body);
            productId = responseBody.id; // Supondo que a API retorna { id: "123", ... }
            
            // 2. Atualização do produto (PATCH)
            // let update = generateProductUpdate(productId);
             //console.log('body update', update);

            // const patchRes = http.patch('http://localhost:8080/products', JSON.stringify(update), params);

            // Registra as métricas da atualização
            // recordMetrics(patchRes, 'update');
            // // Verifica a atualização
            // check(patchRes, {
            //     'Estoque atualizado com sucesso': (r) => r.status === 200,
            //     'Estoque foi modificado': (r) => {
            
            //         const updatedProduct = JSON.parse(r.body);
                    
            //         return updatedProduct.stock === update.stock;
            //     }
            // });

        } catch (e) {
            console.error('Erro ao processar resposta:', e);
        }
    }
}