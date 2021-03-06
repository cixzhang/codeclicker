/* globals CodeClicker _ */

CodeClicker.upgradeMap = {
  meditate: {
    cost: 3,
    first: function () { CodeClicker.data.distractionRate -= 0.1; },
    type: 'human',
    id: 'meditate',
    requires: 'patience',
    description: 'Reduces rate of distractions.'
  },
  patience: {
    cost: 3,
    first: function () { CodeClicker.data.linesPerPoke += 1; },
    type: 'human',
    id: 'patience',
    description: 'Willing to write more lines\nwhen poked.'
  },
  testing: {
    cost: 8,
    first: function () {
      CodeClicker.data.linesPerModule += 8;
      CodeClicker.data.bugRate -= 0.05;
    },
    requires: 'meditate',
    type: 'human',
    id: 'testing',
    description: 'Reduces the bug rate but\nrequires writing more lines.'
  },
  dexterity: {
    cost: 5,
    first: function () {
      CodeClicker.data.msPerAction -= 150;
      CodeClicker.data.linesPerAction += 2;
    },
    type: 'human',
    id: 'dexterity',
    description: 'Fingers move faster.'
  },
  robothands: {
    cost: 12,
    first: function () {
      CodeClicker.data.msPerAction += 200;
      CodeClicker.data.bugRate -= 0.02;
      CodeClicker.data.linesPerAction += 8;
    },
    requires: 'dexterity',
    type: 'human',
    id: 'robothands',
    description: 'Reduces bug rate and increases lines\nwritten. Feels a bit clunky.'
  },
  opensource: {
    cost: 16,
    first: function () {
      CodeClicker.programmer.addBot(10, 10000);
      CodeClicker.data.bugRate -= 0.02;
    },
    requires: 'testing',
    type: 'human',
    id: 'opensource',
    description: 'Get some help.\nAdds 10 lines every 10 seconds and\nreduces bug rate.'
  },
  storage: {
    cost: 8,
    first: function () { CodeClicker.data.storageMax += 256; },
    type: 'machine',
    id: 'storage',
    description: 'Increases the machine\'s capacity.'
  },
  duocore: {
    cost: 12,
    first: function () {
      CodeClicker.data.msPerAction -= 450;
      CodeClicker.data.bugRate += 0.03;
    },
    requires: 'storage',
    type: 'machine',
    id: 'duocore',
    name: 'Cores',
    description: 'Improves action speed.\nMight cause bugs.'
  },
  osupgrade: {
    cost: 20,
    first: function () {
      CodeClicker.data.linesPerAction += 32;
      CodeClicker.data.storageUsed += 128;
      CodeClicker.data.bugRate += 0.05;
      var existing = CodeClicker.programmer.getCurrentBugs();
      var allBugs = Object.keys(CodeClicker.bugMap);
      var newBugs = _.sample(_.difference(allBugs, existing), 2);
      CodeClicker.programmer.applyBug(newBugs[0]);
      CodeClicker.programmer.applyBug(newBugs[1]);
      CodeClicker.data.crashSequence = true;
    },
    requires: 'duocore',
    type: 'machine',
    id: 'osupgrade',
    description: 'Hmm...Feels faster?\nRequires a restart to take effect.'
  },
  clone: {
    cost: 24,
    first: function () { CodeClicker.programmer.addBot(20, 3000); },
    requires: 'osupgrade',
    type: 'machine',
    id: 'clone',
    description: 'Machine clones...\nAre we out of jobs yet?\nAdds 20 lines of code every 3 seconds.'
  }
};
