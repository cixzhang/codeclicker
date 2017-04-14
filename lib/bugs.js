/* globals CodeClicker */

CodeClicker.bugMap = {
  crash: {
    cost: 20,
    invoke: function () {
      CodeClicker.crashRate += 0.2;
      CodeClicker.linesPerPoke += 5;
    },
    unvoke: function () {
      CodeClicker.crashRate -= 0.2;
      CodeClicker.linesPerPoke -= 5;
    },
    description: 'Random crashing.\nPoking adds more lines,\nbut crashes can occur.'
  },
  bloatware: {
    cost: 20,
    invoke: function () {
      CodeClicker.data.storagePerModuleMod += 1;
    },
    unvoke: function () {
      CodeClicker.data.storagePerModuleMod -= 1;
    },
    description: 'Bloatware.\nUnused modules take up more space.'
  },
  videos: {
    cost: 10,
    invoke: function () {
      CodeClicker.data.distractionRate += 0.5;
    },
    unvoke: function () {
      CodeClicker.data.distractionRate -= 0.5;
    },
    description: 'Videos.\nMore distractions.'
  },
  missingfont: {
    cost: 2,
    invoke: function () {
      CodeClicker.data.linesPerPoke -= 1;
      CodeClicker.data.msPerAction += 1000;
    },
    unvoke: function () {
      CodeClicker.data.linesPerPoke += 1;
      CodeClicker.data.msPerAction -= 1000;
    },
    description: 'Missing fonts make it a bit harder\nto write code.'
  }
};
