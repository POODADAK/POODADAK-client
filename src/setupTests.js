/* eslint-disable import/no-extraneous-dependencies */
import server from "./common/util/mocks/MSWServer";
import "@testing-library/react/dont-cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
