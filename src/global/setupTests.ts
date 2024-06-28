import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { randomUUID } from 'node:crypto';
import { Credentials } from 'src/app/common/types';
const handlers = [
  http.post(`/auth/logout`, () => {
    return HttpResponse.json({ message: 'logout successful' });
  }),
  http.post(`/auth/login`, async ({ request }) => {
    const { username } = (await request.json()) as Credentials;
    if (username === 'errorUser') {
      return HttpResponse.json({ message: 'Simulated Error' }, { status: 400 });
    }
    return HttpResponse.json({ message: 'Login Successful' }, { status: 200 });
  }),
  http.get(`/test-url`, () => {
    return HttpResponse.json({ message: 'success' }, { status: 200 });
  }),
  http.post('/test-url', async ({ request }) => {
    const requestData = await request.json();
    return HttpResponse.json(
      { message: 'success', requestData },
      { status: 200 },
    );
  }),
  http.get(`/error-url`, () => {
    return HttpResponse.json(
      { error: 'Something went wrong' },
      { status: 400 },
    );
  }),
  http.get(`/network-error-url`, () => {
    return HttpResponse.error();
  }),
];

// Setup the server
const server = setupServer(...handlers);

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

window.crypto.randomUUID = randomUUID;

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock('date-fns', () => {
  const originalModule = vi.importActual('date-fns');
  return {
    ...originalModule,
    format: vi.fn((_date, _format) => {
      return 'mocked-date';
    }),
  };
});
window.HTMLElement.prototype.scrollIntoView = vi.fn();
