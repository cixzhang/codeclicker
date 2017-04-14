/* globals CodeClicker _ */

var debuffTimeout = null;

function checkCrash() {
  var roll = Math.random();
  if (roll > CodeClicker.data.crashRate) {
    return;
  }
  CodeClicker.data.crashSequence = true;
  return;
}

function makeBugs() {
  var bugs = Object.keys(CodeClicker.bugMap);
  var roll = Math.random();
  if (roll > CodeClicker.data.bugRate) {
    return null;
  }
  return _.sample(bugs);
}

function makeModules() {
  var storageUsed = CodeClicker.data.storageUsed;
  var storageMax = CodeClicker.data.storageMax;

  var storagePerModule =
    CodeClicker.data.storagePerModule *
    CodeClicker.data.storagePerModuleMod;

  var linesPerModule = CodeClicker.data.linesPerModule;
  var currentLines = CodeClicker.data.currentLines;

  var outOfStorage = storageUsed + storagePerModule > storageMax;
  if (currentLines > linesPerModule && !outOfStorage) {
    CodeClicker.RAM.push({
      lines: linesPerModule,
      storage: storagePerModule,
      bugs: makeBugs()
    });
    CodeClicker.data.currentLines -= linesPerModule;
    CodeClicker.data.storageUsed += storagePerModule;
    return makeModules();
  }

  return outOfStorage ? '** OUT OF STORAGE **' : null;
}

function writeLines(numLines) {
  checkCrash();
  CodeClicker.data.currentLines += Math.max(numLines, 0);
  return makeModules();
}

function beDistracted() {
  var distractions = [
    '* playing with cats *',
    '* watching cat videos *',
    '* chatting on slack *',
    '* posting giphy\'s on slack *',
    '* checking HackerNews *',
    '* playing clicker games *',
    '* watching youtube *',
    '* checking price of bitcoin *',
    '* starting a new side project *'
  ];

  return _.sample(distractions);
}

function perform() {
  var roll = Math.random();
  if (roll > CodeClicker.data.distractionRate) {
    return writeLines(CodeClicker.data.linesPerAction);
  }
  return beDistracted();
}

function poke() {
  var annoyed = [
    'Need something?',
    'Hey!',
    'Ow!',
    'Quit poking me.',
    'All right, all right.',
    'It\'s compiling.'
  ];
  var speech = writeLines(CodeClicker.data.linesPerPoke);

  CodeClicker.data.poked = true;
  // temp debuff
  if (!debuffTimeout) {
    CodeClicker.data.msPerAction += 500;
    debuffTimeout = setTimeout(function () {
      CodeClicker.data.msPerAction -= 500;
      debuffTimeout = null;
    }, 1000);
  }

  return speech || _.sample(annoyed);
}

function apply(numModules) {
  checkCrash();
  var bugged = false;
  var module;
  for (var i = 0; i < numModules; i++) {
    module = CodeClicker.RAM.shift();
    CodeClicker.data.storageUsed -= module.storage;
    if (module.bug) {
      applyBug(module.bug);
      bugged = true;
    }
  }
  return bugged ? 'Oops...Guess I should have tested that...' : null;
}

function applyBug(bug) {
  CodeClicker.bugs[bug] = CodeClicker.bugs[bug] || 0;
  CodeClicker.bugs[bug]++;
}

function fixBug(bug) {
  if (CodeClicker.bugs[bug] === 0) return;
  CodeClicker.bugs[bug] -= 1;
}

function getCurrentUpgrades() {
  var current = Object.keys(CodeClicker.upgrades);
  return current.map(function (upgrade) {
    return CodeClicker.upgradeMap[upgrade];
  });
}

function getAvailableUpgrades() {
  var all = _.toArray(CodeClicker.upgradeMap);

  return all.filter(function (upgrade) {
    return !CodeClicker.upgrades[upgrade.id] &&
      (!upgrade.requires || CodeClicker.upgrades[upgrade.requires]);
  });
}

function applyUpgrade(upgrade) {
  var info = CodeClicker.upgradeMap[upgrade];
  CodeClicker.upgrades[upgrade] = CodeClicker.upgrades[upgrade] || 0;
  if (CodeClicker.RAM.length < info.cost) return;
  CodeClicker.programmer.apply(info.cost);
  CodeClicker.upgrades[upgrade] += 1;
  info.first();
}

function addBot(linesPerAction, msPerAction) {
  CodeClicker.bots.push({
    linesPerAction: linesPerAction,
    msPerAction: msPerAction,
    lastTick: null
  });
}

function canSpeak(phrase, time) {
  var lastSpeech = CodeClicker.lastSpeech;
  if (phrase) return !lastSpeech || lastSpeech + 100 < time;
  return !lastSpeech || lastSpeech + 1200 < time;
}

function speak(phrase, time) {
  if (canSpeak(phrase, time)) {
    CodeClicker.lastSpeech = time;
    CodeClicker.data.speaking = phrase;
  }
}

CodeClicker.programmer = {
  checkCrash: checkCrash,
  writeLines: writeLines,
  poke: poke,
  perform: perform,
  apply: apply,
  applyBug: applyBug,
  fixBug: fixBug,
  getCurrentUpgrades: getCurrentUpgrades,
  getAvailableUpgrades: getAvailableUpgrades,
  applyUpgrade: applyUpgrade,
  addBot: addBot,
  speak: speak
};
