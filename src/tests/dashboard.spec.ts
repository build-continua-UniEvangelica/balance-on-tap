import { expect, test } from '@playwright/test';

test('It should be able to create an account', async ({ page }) => {
  await page.goto('http://localhost:8080/balance-on-tap/');
  await expect(page.getByRole('heading', {name: 'Criar Conta'})).toBeVisible()
  await page.getByRole('textbox', {name: 'Nome'}).fill('Gustavo')
  await page.getByRole('textbox', {name: 'Email'}).fill('gustavo@email.com')
  await page.getByRole('textbox', {name: 'Senha'}).fill('123')
  await page.getByRole('button', {name: 'Criar Conta'}).click()
  await page.waitForURL('**/dashboard')
  await expect(page.getByRole('heading', {name: 'Saldo Atual'})).toBeVisible()
});

test("It should be able to add credit to balance", async ({page})=>{
  await page.goto('http://localhost:8080/balance-on-tap/');
  await expect(page.getByRole('heading', {name: 'Criar Conta'})).toBeVisible()
  await page.getByRole('textbox', {name: 'Nome'}).fill('Gustavo')
  await page.getByRole('textbox', {name: 'Email'}).fill('gustavo@email.com')
  await page.getByRole('textbox', {name: 'Senha'}).fill('123')
  await page.getByRole('button', {name: 'Criar Conta'}).click()
  await page.waitForURL('**/dashboard')
  await expect(page.getByRole('heading', {name: 'Saldo Atual'})).toBeVisible()
  await page.getByRole('button', {name: 'Crédito'}).click()
  await page.getByRole('spinbutton', {name:'Valor'}).fill('100')
  await page.getByRole('button', {name:'Confirmar'}).click()
  const balance = await page.getByTestId('balance').textContent()
  const transactionAmount = await page.getByTestId('transaction-amount').textContent()
  await expect(balance).toBe("R$ 100.00")
  await expect(transactionAmount).toBe("R$ 100.00")
})


test("It should be able to debit from balance", async ({page})=>{
  await page.goto('http://localhost:8080/balance-on-tap/');
  await expect(page.getByRole('heading', {name: 'Criar Conta'})).toBeVisible()
  await page.getByRole('textbox', {name: 'Nome'}).fill('Gustavo')
  await page.getByRole('textbox', {name: 'Email'}).fill('gustavo@email.com')
  await page.getByRole('textbox', {name: 'Senha'}).fill('123')
  await page.getByRole('button', {name: 'Criar Conta'}).click()
  await page.waitForURL('**/dashboard')
  await expect(page.getByRole('heading', {name: 'Saldo Atual'})).toBeVisible()
  await page.getByRole('button', {name: 'Débito'}).click()
  await page.getByRole('spinbutton', {name:'Valor'}).fill('50')
  await page.getByRole('button', {name:'Confirmar'}).click()
  const balance = await page.getByTestId('balance').textContent()
  const transactionAmount = await page.getByTestId('transaction-amount').textContent()
  await expect(balance).toBe("R$ -50.00")
  await expect(transactionAmount).toBe("R$ 50.00")
})