import { test, expect } from '@playwright/test';

test('Handle multiple windows using context.pages()', async ({ page, context }) => {


//current page
    await page.goto('https://account.icann.org/login');
    await expect (page).toHaveURL(/login/);


// Open Privacy Policy
    const [privacyPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByText('Privacy Policy').nth(0).click()
]);
    await expect(privacyPage).toHaveURL(/privacy/);



//Open Cookies policy
    const [cookiesPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByText('Cookies Policy').nth(0).click()
]);
    await expect(cookiesPage).toHaveURL(/cookies/);

// Get ALL pages only once, after opening all windows
    const pages = context.pages();

    console.log('Total pages:', pages.length);

    console.log('Parent URL:', pages[0].url());
    console.log('Privacy URL:', pages[1].url());
    console.log('Cookies URL:', pages[2].url());
});
