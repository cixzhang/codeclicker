window.CodeClicker = {};

/* globals CodeClicker */

CodeClicker.data = {
  crashRate: 0,
  crashSequence: true,
  storageUsed: 0,
  storageMax: 1024,
  distractionRate: 0.2,
  bugRate: 0.1,
  msPerAction: 2500,
  linesPerModule: 20,
  linesPerPoke: 1,
  storagePerModule: 48,
  storagePerModuleMod: 1,
  currentLines: 0
};

// Random Access Modules
// { lines, storage, bugs }
CodeClicker.RAM = [];
CodeClicker.bots = [];
CodeClicker.bugs = {}; // map
CodeClicker.upgrades = {}; // map
