/* globals CodeClicker _ */

CodeClicker.upgradeMap = {
  meditation: {
    cost: 5,
    upgradeCost: 3,
    first: function () { CodeClicker.data.distractionRate -= 0.05; },
    upgrade: function () { CodeClicker.data.distractionRate -= 0.01; },
    downgrade: function () { CodeClicker.data.distractionRate += 0.01; },
    last: function () { CodeClicker.data.distractionRate += 0.05; },
    type: 'human'
  },
  patience: {
    cost: 3,
    upgradeCost: 2,
    first: function () { CodeClicker.data.linesPerPoke += 3; },
    upgrade: function () { CodeClicker.data.linesPerPoke += 1; },
    downgrade: function () { CodeClicker.data.linesPerPoke -= 1; },
    last: function () { CodeClicker.data.linesPerPoke -= 3; },
    requires: 'meditation',
    type: 'human'
  },
  testing: {
    cost: 10,
    upgradeCost: 6,
    first: function () {
      CodeClicker.data.linesPerModule += 100;
      CodeClicker.data.bugRate -= 0.1;
    },
    upgrade: function () { CodeClicker.data.bugRate -= 0.02; },
    downgrade: function () { CodeClicker.data.bugRate += 0.02; },
    last: function () {
      CodeClicker.data.linesPerModule -= 100;
      CodeClicker.data.bugRate += 0.1;
    },
    requires: 'meditation',
    type: 'human'
  },
  dexterity: {
    cost: 20,
    upgradeCost: 12,
    first: function () { CodeClicker.data.msPerAction -= 200; },
    upgrade: function () { CodeClicker.data.msPerAction -= 50; },
    downgrade: function () { CodeClicker.data.msPerAction += 50; },
    last: function () { CodeClicker.data.msPerAction += 200; },
    requires: 'meditation',
    type: 'human'
  },
  robohands: {
    cost: 50,
    upgradeCost: 24,
    first: function () {
      CodeClicker.data.msPerAction += 500;
      CodeClicker.data.bugRate -= 0.1;
      CodeClicker.data.linesPerPoke += 3;
    },
    upgrade: function () {
      CodeClicker.data.msPerAction += 10;
      CodeClicker.data.bugRate -= 0.05;
      CodeClicker.data.linesPerPoke += 1;
    },
    downgrade: function () {
      CodeClicker.data.msPerAction -= 10;
      CodeClicker.data.bugRate += 0.05;
      CodeClicker.data.linesPerPoke -= 1;
    },
    last: function () {
      CodeClicker.data.msPerAction -= 500;
      CodeClicker.data.bugRate += 0.1;
      CodeClicker.data.linesPerPoke -= 3;
    },
    requires: 'dexterity',
    type: 'human'
  },
  opensource: {
    cost: 80,
    upgradeCost: 50,
    first: function () {
      CodeClicker.programmer.addBot(10, 10000);
      CodeClicker.data.bugRate -= 0.04;
      CodeClicker.data.linesPerPoke -= 1;
    },
    upgrade: function () {
      CodeClicker.programmer.addBot(5, 10000);
      CodeClicker.data.bugRate += 0.01;
    },
    downgrade: function () {},
    last: function () {},
    requires: 'robohands',
    type: 'human'
  },
  storage: {
    cost: 20,
    upgradeCost: 12,
    first: function () { CodeClicker.data.storageMax += 1024; },
    upgrade: function () { CodeClicker.data.storageMax += 128; },
    downgrade: function () { CodeClicker.data.storageMax -= 128; },
    last: function () { CodeClicker.data.storageMax -= 1024; },
    type: 'machine'
  },
  cores: {
    cost: 50,
    upgradeCost: 24,
    first: function () {
      CodeClicker.data.msPerAction -= 600;
      CodeClicker.data.bugRate += 0.1;
    },
    upgrade: function () { CodeClicker.data.msPerAction -= 10; },
    downgrade: function () { CodeClicker.data.msPerAction += 10; },
    last: function () {
      CodeClicker.data.msPerAction += 600;
      CodeClicker.data.bugRate -= 0.1;
    },
    requires: 'storage',
    type: 'machine'
  },
  upgradeOS: {
    cost: 80,
    first: function () {
      CodeClicker.data.linesPerAction += 10;
      CodeClicker.data.storageUsed += 1024;
      CodeClicker.data.bugRate += 0.1;
      var existing = Object.keys(CodeClicker.bugs);
      var allBugs = Object.keys(CodeClicker.bugMap);
      var newBugs = _.sample(_.difference(allBugs, existing), 2);
      CodeClicker.programmer.applyBug(newBugs[0]);
      CodeClicker.programmer.applyBug(newBugs[1]);
    },
    upgrade: function () {},
    downgrade: function () {},
    last: function() {
      CodeClicker.data.linesPerAction -= 10;
      CodeClicker.data.storageUsed -= 1024;
      CodeClicker.data.bugRate -= 0.1;
    },
    requires: 'cores',
    type: 'machine'
  },
  clone: {
    cost: 100,
    first: function () { CodeClicker.programmer.addBot(20, 3000); },
    upgrade: function () {},
    downgrade: function () {},
    last: function() {},
    requires: 'upgradeOS',
    type: 'machine'
  }
};
