export const loadThresholds = {
    'product_request_duration': ['p(95)<1000', 'p(99)<2000'],
    'product_errors': ['rate<0.05'], // 5% de tolerância para erros
    'http_req_duration': ['p(95)<800']
};

export const performanceThresholds = {
    'product_request_duration': ['p(95)<500'],
    'product_errors': ['rate<0.01'], // 1% de tolerância
    'product_create_time': ['p(95)<300'],
    'product_search_time': ['p(95)<200'],
    'http_req_duration': ['p(95)<300']
};

export const resilienceThresholds = {
    'product_request_duration': ['p(95)<1500'],
    'product_errors': ['rate<0.1'], // 10% de tolerância
    'http_req_failed': ['rate<0.1'],
    'http_req_duration': ['p(95)<1000']
};