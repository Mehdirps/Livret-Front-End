// Mock console.error, console.warn, and console.log to suppress messages during tests
global.console = {
  ...console,
  error: jest.fn((message) => {
    if (message.includes('Warning:')) {
      return;
    }
    console.error(message);
  }),
  warn: jest.fn((message) => {
    if (message.includes('Warning:')) {
      return;
    }
    console.warn(message);
  }),
  log: jest.fn(),
};
