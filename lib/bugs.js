/* globals CodeClicker _ */

CodeClicker.bugMap = {
  crash: {
    invoke: function () {
      CodeClicker.crashRate += 0.2;
      CodeClicker.linesPerPoke += 5;
    },
    unvoke: function () {
      CodeClicker.crashRate -= 0.2;
      CodeClicker.linesPerPoke -= 5;
    },
    description: 'Random crashing. Poking adds more lines, but crashes can occur.'
  },
  bloatware: {
    invoke: function () {
      CodeClicker.data.storagePerModuleMod += 1;
    },
    unvoke: function () {
      CodeClicker.data.storagePerModuleMod -= 1;
    },
    description: 'Bloatware. Unused modules take up more space.'
  },
  videos: {
    invoke: function () {
      CodeClicker.data.distractionRate += 0.2;
    },
    unvoke: function () {
      CodeClicker.data.distractionRate -= 0.2;
    },
    description: 'Videos. More distractions.'
  },
  missingFont: {
    invoke: function () {
      CodeClicker.data.linesPerPoke -= 1;
      CodeClicker.data.msPerAction += 1000;
    },
    unvoke: function () {
      CodeClicker.data.linesPerPoke += 1;
      CodeClicker.data.msPerAction -= 1000;
    },
    description: 'Missing fonts make it a bit harder to write code.'
  },
  upgrade: {
    invoke: function() {
      var existing = Object.keys(CodeClicker.bugs);
      var allBugs = Object.keys(CodeClicker.bugMap);
      var newBugs = _.sample(_.difference(allBugs, existing), 2);
      CodeClicker.programmer.applyBug(newBugs[0]);
      CodeClicker.programmer.applyBug(newBugs[1]);
      return newBugs;
    },
    unvoke: function(newBugs) {
      CodeClicker.programmer.fixBug(newBugs[0]);
      CodeClicker.programmer.fixBug(newBugs[1]);
    },
    description: 'Upgrade OS. The computer feels like it works better. Adds 2 new bugs.'
  }
};
