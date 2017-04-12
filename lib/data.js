window.CodeClicker = {};

/* globals CodeClicker */

CodeClicker.data = {
  crashRate: 0,
  crashSequence: true,
  storageUsed: 0,
  storageMax: 1024,
  distractionRate: 0.5,
  bugRate: 0.5,
  msPerAction: 2500,
  linesPerAction: 5,
  linesPerModule: 100,
  linesPerPoke: 1,
  storagePerModule: 48,
  storagePerModuleMod: 1,
  currentLines: 0
};

// Random Access Modules
// { lines, storage, bugs }
CodeClicker.RAM = [];

// Clicker bots
// { linesPerAction, msPerAction, lastTick }
CodeClicker.bots = [];

CodeClicker.bugs = {}; // map
CodeClicker.upgrades = {}; // map
