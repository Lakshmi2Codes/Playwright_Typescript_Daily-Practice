import {test, expect} from '@playwright/test';
import {logADefect} from './jiraDefectUtility.js';
//valid Login
    test( 'TC01 - Valid Login', async ({ page }) => {

    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    await page.getByRole("textbox", { name: "Username" }).fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
        page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
});

test('TC02 - Invalid Login create JIRA Bug automatically', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
   await page.getByRole ('textbox',{name:'Username'}).fill('Admin');
   await page.getByPlaceholder('Password').fill('');
   await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
})
//Hooks
test.afterEach("Fetch the test status", async ({}, testInfo) => {
    await logADefect(testInfo);
});