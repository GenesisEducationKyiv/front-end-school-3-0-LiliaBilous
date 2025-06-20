import { test, expect } from '@playwright/test'

const TEST_TRACK = {
    title: 'Test Track E2E',
    artist: 'Test Artist',
    album: 'Test Album',
    coverImage: 'https://placehold.co/100',
    genres: ['Rock'],
}

test('user can create a new track', async ({ page }) => {
    await page.route('**/api/genres', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(['Rock', 'Jazz', 'Pop']),
        });
    });

    await page.goto('/tracks', { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('[data-testid="loading-tracks"]', { state: 'detached' });

    await expect(page.getByTestId('create-track-button')).toBeVisible();
    await expect(page.getByTestId('create-track-button')).toBeEnabled();

    await page.getByTestId('create-track-button').click();

    await page.getByTestId('title-input').fill(TEST_TRACK.title);
    await page.getByTestId('input-artist').fill(TEST_TRACK.artist);
    await page.getByTestId('input-album').fill(TEST_TRACK.album);
    await page.getByTestId('input-cover-image').fill(TEST_TRACK.coverImage);

    await expect(
        page.locator('select[data-testid="genre-select"] > option:not([value=""])')
    ).toHaveCount(3);

    await page.getByTestId('genre-select').selectOption('Rock');

    await page.getByTestId('submit-button').click();
});


