import { randomIntBetween, randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import http from 'k6/http';

export async function getRandomProduct(baseUrl) {
    try {
        const response = await http.asyncRequest('GET', `${baseUrl}/products`);
        
        // Verificação mais robusta da resposta
        if (response.status !== 200) {
            console.error(`Erro na API: Status ${response.status}`);
            return null;
        }
        
        let products;
        try {
            products = response.json();
        } catch (e) {
            console.error('Erro ao parsear JSON:', e);
            return null;
        }
        
        if (!Array.isArray(products) || products.length === 0) {
            console.error('Nenhum produto disponível ou array vazio');
            return null;
        }
        
        // Seleciona produto aleatório com verificação de propriedade
        const randomProduct = products[randomIntBetween(0, products.length - 1)];
        if (!randomProduct || !randomProduct.id) {
            console.error('Produto sem ID válido');
            return null;
        }
        
        return randomProduct.id;
    } catch (err) {
        console.error('Falha na requisição de produtos:', err.message);
        return null;
    }
}
export function generateTransactionData() {
    return {
        quantity: randomIntBetween(1, 10),
        total: parseFloat((Math.random() * (5000 - 50) + 50).toFixed(2))
    };
}

export async function getRandomUser(baseUrl) {
    try {
        const response = await http.asyncRequest('GET', `${baseUrl}/users`);
        
        if (response.status !== 200) {
            console.error(`Erro na API: Status ${response.status}`);
            return null;
        }
        
        let users;
        try {
            users = response.json();
        } catch (e) {
            console.error('Erro ao parsear JSON:', e);
            return null;
        }
        
        if (!Array.isArray(users) || users.length === 0) {
            console.error('Nenhum usuário disponível ou array vazio');
            return null;
        }
        
        const randomUser = users[randomIntBetween(0, users.length - 1)];
        if (!randomUser || !randomUser.id) {
            console.error('Usuário sem ID válido');
            return null;
        }
        
        return randomUser.id;
    } catch (err) {
        console.error('Falha na requisição de usuários:', err.message);
        return null;
    }
}