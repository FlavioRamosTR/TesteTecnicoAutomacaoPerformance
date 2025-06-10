import { browser } from 'k6/x/browser';
import { check } from 'k6';


/*Teste para validação de simulaçao de usuario*/

export default function () {

  const page = browser.newPage({
    headless: true,       
    timeout: '30s',       
  });

  try {
    page.goto('https://automationexercise.com/', { waitUntil: 'networkidle' });
    check(page, {
      'Homepage carregada': p => p.locator('a[href="/"]').isVisible(),
    });

    page.locator('a[href="/login"]').click();
    page.waitForNavigation();
    check(page, {
      'Página de login carregada': p => p.locator('input[data-qa="login-email"]').isVisible(),
    });

    page.locator('input[data-qa="login-email"]').type('test@example.com');
    page.locator('input[data-qa="login-password"]').type('123456');
    page.locator('button[data-qa="login-button"]').click();

    check(page, {
      'Login válido': p => p.url().includes('/account') || p.locator('a[href="/logout"]').isVisible(),
    });

    page.screenshot({ path: 'screenshots/login_attempt.png' });

  } finally {
    page.close();
  }
}

export const options = {
  scenarios: {
    web: {
      executor: 'per-vu-iterations',
      vus: 5,              // 5 usuários virtuais
      iterations: 3,       // 3 iterações por VU
    },
  },
  thresholds: {
    checks: ['rate > 0.95'], // 95% de sucesso
  },
};