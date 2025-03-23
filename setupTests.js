/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
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
