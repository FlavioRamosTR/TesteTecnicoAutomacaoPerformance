import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export function generateUser() {
    const id = randomIntBetween(1000, 9999);
    return {
        name: `UserLoadTest ${id}`,
        email: `userloadtest${id}@example.com`,
        document: randomIntBetween(10000000000, 99999999999).toString()
    };
}

export function generateUserUpdate() {
    return {
        name: `Updated ${randomIntBetween(1, 1000)}`
    };
}