import server from "./common/util/mocks/MSWServer";
import "@testing-library/react/dont-cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
