import { exec } from 'k6/execution';
import { sleep } from 'k6';

export default function () {
    // 10% de chance de simular checkout
    const should_checkout = Math.random() < 0.1;
    const command = should_checkout 
        ? 'python /python_scripts/ecommerce_db_test.py --checkout' 
        : 'python /python_scripts/ecommerce_db_test.py';
    
    const result = exec(command, { stdout: 'pipe' });
    
    if (result.stdout) {
        console.log(result.stdout);
    } else if (result.stderr) {
        console.error(result.stderr);
    }
    
    sleep(1);
}

export const options = {
    scenarios: {
        ramp_up: {
            executor: 'ramping-vus',
            stages: [
                { duration: '2m', target: 20 },
                { duration: '5m', target: 100 },
                { duration: '2m', target: 0 },
            ],
        },
    },
    thresholds: {
        'checks{type:success}': ['rate>0.95'],
    },
};