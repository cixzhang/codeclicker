/* globals CodeClicker _ */

CodeClicker.upgradeMap = {
  meditate: {
    cost: 5,
    first: function () { CodeClicker.data.distractionRate -= 0.01; },
    type: 'human',
    id: 'meditate'
  },
  patience: {
    cost: 3,
    first: function () { CodeClicker.data.linesPerPoke += 2; },
    requires: 'meditate',
    type: 'human',
    id: 'patience'
  },
  testing: {
    cost: 10,
    first: function () {
      CodeClicker.data.linesPerModule += 10;
      CodeClicker.data.bugRate -= 0.02;
    },
    requires: 'dexterity',
    type: 'human',
    id: 'testing'
  },
  dexterity: {
    cost: 20,
    first: function () { CodeClicker.data.msPerAction -= 50; },
    requires: 'meditate',
    type: 'human',
    id: 'dexterity'
  },
  robothands: {
    cost: 50,
    first: function () {
      CodeClicker.data.msPerAction += 10;
      CodeClicker.data.bugRate -= 0.05;
      CodeClicker.data.linesPerPoke += 3;
    },
    requires: 'testing',
    type: 'human',
    id: 'robothands'
  },
  opensource: {
    cost: 80,
    first: function () {
      CodeClicker.programmer.addBot(10, 10000);
      CodeClicker.data.bugRate -= 0.02;
      CodeClicker.data.linesPerPoke -= 1;
    },
    requires: 'robothands',
    type: 'human',
    id: 'opensource'
  },
  storage: {
    cost: 20,
    first: function () { CodeClicker.data.storageMax += 128; },
    type: 'machine',
    id: 'storage'
  },
  duocore: {
    cost: 50,
    first: function () {
      CodeClicker.data.msPerAction -= 20;
      CodeClicker.data.bugRate += 0.05;
    },
    requires: 'storage',
    type: 'machine',
    id: 'duocore'
  },
  osupgrade: {
    // cost: 80,
    cost: 5,
    first: function () {
      CodeClicker.data.linesPerAction += 10;
      CodeClicker.data.storageUsed += 64;
      CodeClicker.data.bugRate += 0.1;
      var existing = CodeClicker.programmer.getCurrentBugs();
      var allBugs = Object.keys(CodeClicker.bugMap);
      var newBugs = _.sample(_.difference(allBugs, existing), 2);
      CodeClicker.programmer.applyBug(newBugs[0]);
      CodeClicker.programmer.applyBug(newBugs[1]);
    },
    // requires: 'duocore',
    type: 'machine',
    id: 'osupgrade'
  },
  clone: {
    cost: 100,
    first: function () { CodeClicker.programmer.addBot(20, 3000); },
    requires: 'osupgrade',
    type: 'machine',
    id: 'clone'
  }
};
