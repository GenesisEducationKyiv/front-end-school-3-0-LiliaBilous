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
      body: JSON.stringify(['Rock', 'Pop', 'Jazz']),
    })
  })

  await page.goto('/')
  await page.route('**/api/tracks', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'mocked-id',
          ...TEST_TRACK,
          createdAt: new Date().toISOString(),
        }),
      })
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      })
    }
  })

  await page.getByTestId('create-track-button').click()

  await page.getByTestId('title-input').fill(TEST_TRACK.title)
  await page.getByTestId('input-artist').fill(TEST_TRACK.artist)
  await page.getByTestId('input-album').fill(TEST_TRACK.album)
  await page.getByTestId('input-cover-image').fill(TEST_TRACK.coverImage)

  const genreSelect = page.getByTestId('genre-select')

  await expect(genreSelect.locator('option')).toHaveCount(4)

  await genreSelect.selectOption({ label: TEST_TRACK.genres[0] })

  await expect(page.getByTestId('genre-tag')).toContainText(TEST_TRACK.genres[0])

  await page.getByTestId('submit-button').click()
  await expect(page.getByTestId('title-input')).toHaveCount(0)

  await expect(
    page.locator('[data-testid^="track-item-"][data-testid$="-title"]').filter({
      hasText: TEST_TRACK.title,
    })
  ).toHaveCount(1)

})
