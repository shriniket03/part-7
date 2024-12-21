const { test, expect, beforeEach, describe } = require('@playwright/test')

const login = async (page,username,password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', {name: 'login'}).click()
}

describe('Init Blog App', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('login to application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

})

describe('Login', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003')
  })

  test('succeeds with correct credentials', async ({ page }) => {
    await page.getByTestId('username').fill('leer')
    await page.getByTestId('password').fill('pray')
    await page.getByRole('button', {name: 'login'}).click()
    await expect(page.getByRole('button', {name: 'logout'})).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await page.getByTestId('username').fill('standee')
    await page.getByTestId('password').fill('pray')
    await page.getByRole('button', {name: 'login'}).click()
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003')
    login(page, 'leer', 'pray')
  })

  test('a new blog can be created', async ({ page }) => {
    const create = await page.getByRole('button', {name: 'create note'})
    await expect(create).toBeVisible()
    await create.click()
    await page.getByTestId('title').fill('CS1101S SICP')
    await page.getByTestId('author').fill('Martin Henz')
    await page.getByTestId('url').fill('https://sourceacademy.org')
    await page.getByRole('button', {name: 'create'}).click()
    await expect(page.getByText('Created CS1101S SICP')).toBeVisible()
  })

  test('a blog can be liked', async ({page}) => {
    await page.getByRole('button', {name: 'view'}).first().click()
    const likes = page.getByText('likes', {exact:false}).first()
    await expect(likes).toBeVisible()

    const btn =  page.getByRole('button', {name:'like'})
    await expect(btn).toBeVisible()
    await btn.click()

    const likesAft = page.getByText('likes', {exact:false}).first()
    await expect(likesAft).toBeVisible()
  })

  test('a user can delete a blog', async ({page}) => {
    await page.getByRole('button', {name: 'view'}).last().click()
    page.on('dialog', dialog => {
      console.log("Alert text: " + dialog.message());
      dialog.accept();  // Close the alert by accepting it
   })
    await page.getByText('remove', {exact:false}).last().click()
  })
})

describe('Check that other user does not see remove button', ()=> {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003')
    login(page, 'john', 'cena')
  })

  test('check that other user does not see remove', async({page}) => {
    await page.getByRole('button', {name:'view'}).first().click()
    await expect(page.getByText('remove', {exact:false}).first()).toHaveCount(0)
  })
})

describe('Check that likes are arranged in order', ()=> {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003')
    login(page, 'john', 'cena')
  })

  test('check that likes arranged', async({page}) => {
    const a = page.getByText('likes', {exact:false}).first()
    const liket = await a.textContent()
    const like1 = liket.split(' ')[1]

    const b = page.getByText('likes', {exact:false}).nth(1)
    const liket2 = await b.textContent()
    const like2 = liket2.split(' ')[1]

    const c = page.getByText('likes', {exact:false}).last()
    const liket3 = await c.textContent()  
    const like3 = liket3.split(' ')[1] 
    
    expect(like1>=like2).toBeTruthy()
    expect(like2>=like3).toBeTruthy()
  })
})