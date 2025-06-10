import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export function generateProduct() {
    const id = randomIntBetween(1000, 9999);
    return {
        description: `loadTest-${id}`,
        name: `LoadTestProduct ${id}`,
        price: randomIntBetween(10, 1000),
        stock: randomIntBetween(1, 1),
        category: ['Eletrônicos', 'Roupas', 'Alimentos'][randomIntBetween(0, 2)]
    };
}

