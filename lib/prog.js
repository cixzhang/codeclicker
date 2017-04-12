/* globals CodeClicker _ */

var debuffTimeout = null;

function makeBugs() {
  var bugs = [
    'crash',
    'bloatware',
    'videos',
    'broken',
    'cats',
    'os'
  ];

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
  CodeClicker.data.currentLines += numLines;
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
    return writeLines(1);
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
  var bugged = false;
  var module;
  for (var i = 0; i < numModules; i++) {
    module = CodeClicker.RAM.unshift();
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

CodeClicker.programmer = {
  writeLines: writeLines,
  poke: poke,
  perform: perform,
  apply: apply,
  applyBug: applyBug,
  fixBug: fixBug
};
