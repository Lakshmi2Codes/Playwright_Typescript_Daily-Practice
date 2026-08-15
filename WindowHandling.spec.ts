import { test, expect } from '@playwright/test';

test('Handle multiple windows using page', async ({ page}) => {

   //parent page - Login page
    await page.goto('https://account.icann.org/login');
    const parentPage = page;
    console.log('Parent URL includes login:',
    parentPage.url().includes('/login'));

//childPage - Privacy page
    const childPagePromise = page.waitForEvent('popup');
    await page.getByText('Privacy Policy').nth(0).click();
    const childPage = await childPagePromise;
    console.log('Child URL includes privacy:',
    childPage.url().includes('/privacy'));

    //return to parent page

    await expect(parentPage).toHaveURL(/login/);
    console.log('Returned to Parent URL:', parentPage.url());

//childpage2 - Cookies page
    const childPagePromise2 = page.waitForEvent('popup')
    await page.getByText('Cookies Policy').nth(0).click();
    const childPage2 = await childPagePromise2;
    console.log('child page 2 URL includes cookies:',
    childPage2.url().includes('/cookies'));

    //to get All pages
    console.log('Parent URL:', parentPage.url());
    console.log('Child URL:', childPage.url());
    console.log('Child Page2 URL:', childPage2.url());
});