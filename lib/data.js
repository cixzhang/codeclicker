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

// General
CodeClicker.els = {};
CodeClicker.canvas = null;
CodeClicker.context = null;
CodeClicker.width = 800;
CodeClicker.height = 600;
CodeClicker.fg = 'black';
CodeClicker.bg = 'white';

// Timers
CodeClicker.lastTick = null;
CodeClicker.lastAction = null;
CodeClicker.lastSpeech = null;
CodeClicker.crashStart = null;

// Positional Data for renderer and click events
CodeClicker.renderData = [];
