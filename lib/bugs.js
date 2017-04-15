/* globals CodeClicker */

CodeClicker.bugMap = {
  crash: {
    cost: 4,
    invoke: function () {
      CodeClicker.data.crashRate += 0.02;
      CodeClicker.data.linesPerPoke += 3;
    },
    unvoke: function () {
      CodeClicker.data.crashRate -= 0.02;
      CodeClicker.data.linesPerPoke -= 3;
    },
    description: 'Random crashing.\nPoking adds more lines,\nbut crashes can occur.',
    lastTick: null,
    frames: 4,
    repeatFrames: false
  },
  bloatware: {
    cost: 4,
    invoke: function () {
      CodeClicker.data.storagePerModuleMod += 1;
    },
    unvoke: function () {
      CodeClicker.data.storagePerModuleMod -= 1;
    },
    description: 'Bloatware.\nUnused modules take up more space.',
    lastTick: null,
    frames: 6,
    repeatFrames: false
  },
  videos: {
    cost: 2,
    invoke: function () {
      CodeClicker.data.distractionRate += 0.2;
    },
    unvoke: function () {
      CodeClicker.data.distractionRate -= 0.2;
    },
    description: 'Infected by cat videos.\nMore distractions.',
    lastTick: null,
    frames: 8,
    repeatFrames: true
  },
  missingfont: {
    cost: 1,
    invoke: function () {
      CodeClicker.data.linesPerPoke -= 1;
      CodeClicker.data.msPerAction += 1000;
    },
    unvoke: function () {
      CodeClicker.data.linesPerPoke += 1;
      CodeClicker.data.msPerAction -= 1000;
    },
    description: 'Missing fonts make it a bit harder\nto write code.',
    lastTick: null,
    frames: 1,
    repeatFrames: false
  }
};
