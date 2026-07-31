import { test, expect, type Page } from '@playwright/test';

const nextBtn = (page: Page) => page.locator('.slide-nav .nav-btn[aria-label="Next slide"]');
const prevBtn = (page: Page) => page.locator('.slide-nav .nav-btn[aria-label="Previous slide"]');

async function enter(page: Page) {
  await page.goto('/');
  // The activation button becomes clickable once assets warm up.
  const activate = page.getByRole('button', { name: /enter the ils presentation/i });
  await expect(activate).toBeVisible();
  // Skip the cinematic intro for deterministic tests.
  await page.getByRole('button', { name: /skip the intro/i }).click();
  await expect(nextBtn(page)).toBeVisible();
}

test('intro gateway renders with activation control', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /enter the ils presentation/i })).toBeVisible();
  await expect(page.getByText(/Freight Forwarders Summit/i).first()).toBeVisible();
});

test('every slide loads via next navigation', async ({ page }) => {
  await enter(page);
  for (let i = 1; i <= 11; i++) {
    await expect(page.locator('.slide-counter')).toContainText(String(i).padStart(2, '0'));
    if (i < 11) await nextBtn(page).click();
  }
});

test('previous / next controls work', async ({ page }) => {
  await enter(page);
  await nextBtn(page).click();
  await expect(page.locator('.slide-counter')).toContainText('02');
  await prevBtn(page).click();
  await expect(page.locator('.slide-counter')).toContainText('01');
});

test('keyboard navigation works', async ({ page }) => {
  await enter(page);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.slide-counter')).toContainText('02');
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.slide-counter')).toContainText('01');
  await page.keyboard.press('End');
  await expect(page.locator('.slide-counter')).toContainText('11');
  await page.keyboard.press('Home');
  await expect(page.locator('.slide-counter')).toContainText('01');
});

test('overview opens and thumbnail navigation jumps to a slide', async ({ page }) => {
  await enter(page);
  await page.getByRole('button', { name: 'Slide overview' }).click();
  const overview = page.getByRole('dialog', { name: 'Slide overview' });
  await expect(overview).toBeVisible();
  await overview.getByRole('button', { name: /Slide 6:/i }).click();
  await expect(page.locator('.slide-counter')).toContainText('06');
});

test('keyboard help panel opens', async ({ page }) => {
  await enter(page);
  await page.getByRole('button', { name: 'Keyboard help' }).click();
  await expect(page.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeVisible();
});

test('corridor location drawer opens with detail', async ({ page }) => {
  await enter(page);
  await page.keyboard.press('4');
  await expect(page.locator('.slide-counter')).toContainText('04');
  await page.getByRole('button', { name: /Kabul, Afghanistan/i }).click();
  await expect(page.getByRole('dialog', { name: /Kabul — operational brief/i })).toBeVisible();
});

test('contact links contain correct information', async ({ page }) => {
  await enter(page);
  await page.keyboard.press('End');
  await expect(page.locator('.slide-counter')).toContainText('11');
  await expect(page.getByRole('link', { name: /info@ilsmtc.com/i }).first()).toHaveAttribute(
    'href',
    'mailto:info@ilsmtc.com',
  );
  await expect(page.getByRole('link', { name: /\+971 4 434 3800/i }).first()).toHaveAttribute(
    'href',
    'tel:+97144343800',
  );
  await expect(page.getByRole('link', { name: /\+971 50 466 5474/i }).first()).toHaveAttribute(
    'href',
    'tel:+971504665474',
  );
  await expect(page.getByRole('link', { name: /www.ilsmtc.com/i }).first()).toHaveAttribute(
    'href',
    'https://www.ilsmtc.com',
  );
});

test('no horizontal overflow at 1920x1080', async ({ page }) => {
  await enter(page);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('deep link to a slide hash loads that slide', async ({ page }) => {
  await page.goto('/#/heavy-lift');
  await expect(page.locator('.slide-counter')).toContainText('08');
});
