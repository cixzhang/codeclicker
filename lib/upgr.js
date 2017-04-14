/* globals CodeClicker _ */

CodeClicker.upgradeMap = {
  meditate: {
    cost: 5,
    first: function () { CodeClicker.data.distractionRate -= 0.1; },
    type: 'human',
    id: 'meditate',
    description: 'Reduces rate of distractions.'
  },
  patience: {
    cost: 3,
    first: function () { CodeClicker.data.linesPerPoke += 1; },
    requires: 'meditate',
    type: 'human',
    id: 'patience',
    description: 'Willing to write more lines\nwhen poked.'
  },
  testing: {
    cost: 10,
    first: function () {
      CodeClicker.data.linesPerModule += 10;
      CodeClicker.data.bugRate -= 0.05;
    },
    requires: 'patience',
    type: 'human',
    id: 'testing',
    description: 'Reduces the bug rate but\nrequires writing more lines.'
  },
  dexterity: {
    cost: 20,
    first: function () { CodeClicker.data.msPerAction -= 50; },
    type: 'human',
    id: 'dexterity',
    description: 'Fingers move faster.'
  },
  robothands: {
    cost: 40,
    first: function () {
      CodeClicker.data.msPerAction += 100;
      CodeClicker.data.bugRate -= 0.05;
      CodeClicker.data.linesPerPoke += 3;
    },
    requires: 'dexterity',
    type: 'human',
    id: 'robothands',
    description: 'Reduces bug rate and increases lines\nwritten when poked. Feels a bit clunky.'
  },
  opensource: {
    cost: 60,
    first: function () {
      CodeClicker.programmer.addBot(10, 10000);
      CodeClicker.data.bugRate -= 0.05;
      CodeClicker.data.linesPerPoke -= 1;
    },
    requires: 'testing',
    type: 'human',
    id: 'opensource',
    description: 'Get some help.\nAdds 10 lines every 10 seconds.'
  },
  storage: {
    cost: 12,
    first: function () { CodeClicker.data.storageMax += 256; },
    type: 'machine',
    id: 'storage',
    description: 'Increases the machine\'s capacity.'
  },
  duocore: {
    cost: 20,
    first: function () {
      CodeClicker.data.msPerAction -= 150;
      CodeClicker.data.bugRate += 0.05;
    },
    requires: 'storage',
    type: 'machine',
    id: 'duocore',
    name: 'Cores',
    description: 'Improves action speed.\nMight cause bugs.'
  },
  osupgrade: {
    cost: 50,
    first: function () {
      CodeClicker.data.linesPerAction += 10;
      CodeClicker.data.storageUsed += 64;
      CodeClicker.data.bugRate += 0.1;
      var existing = CodeClicker.programmer.getCurrentBugs();
      var allBugs = Object.keys(CodeClicker.bugMap);
      var newBugs = _.sample(_.difference(allBugs, existing), 2);
      CodeClicker.programmer.applyBug(newBugs[0]);
      CodeClicker.programmer.applyBug(newBugs[1]);
      CodeClicker.data.crashSequence = true;
    },
    // requires: 'duocore',
    type: 'machine',
    id: 'osupgrade',
    description: 'Hmm...Feels faster?\nRequires a restart to take effect.'
  },
  clone: {
    cost: 100,
    first: function () { CodeClicker.programmer.addBot(20, 3000); },
    requires: 'osupgrade',
    type: 'machine',
    id: 'clone',
    description: 'Machine clones...\nAre we out of jobs yet?\nAdds 20 lines of code every 3 seconds.'
  }
};
