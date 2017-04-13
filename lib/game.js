/* globals CodeClicker _ */

CodeClicker.lastTick = null;
CodeClicker.lastAction = null;
CodeClicker.lastSpeech = null;

CodeClicker.init = function () {
  CodeClicker.canvas = document.getElementById('game');
  CodeClicker.canvas.width = CodeClicker.width;
  CodeClicker.canvas.height = CodeClicker.height;
  CodeClicker.context = CodeClicker.canvas.getContext('2d');

  CodeClicker.els.upgrades = document.getElementById('upgrades');
  CodeClicker.els.available = document.getElementById('available-upgrades');
  CodeClicker.els.bugs = document.getElementById('bugs');

  CodeClicker.els.lines = document.getElementById('lines-written');
  CodeClicker.els.modules = document.getElementById('modules');
  CodeClicker.els.storage = document.getElementById('storage');
  CodeClicker.els.docs = document.getElementById('documentation');
  CodeClicker.els.speech = document.getElementById('speech');

  CodeClicker.canvas.addEventListener('click', function () {
    if (CodeClicker.data.crashSequence) return;
    speak(CodeClicker.programmer.poke());
  });

  CodeClicker.loop();
};

CodeClicker.loop = function (time) {
  if (!CodeClicker.lastTick) {
    CodeClicker.lastTick = time;
  }

  if (!CodeClicker.data.crashSequence) {
    if (!CodeClicker.lastAction) CodeClicker.lastAction = time;

    if (time - CodeClicker.lastAction > CodeClicker.data.msPerAction) {
      speak(CodeClicker.programmer.perform(), time);
      CodeClicker.lastAction = time;
    }

    CodeClicker.bots.forEach(function (bot) {
      if (!bot.lastTick) bot.lastTick = time;
      if (time - bot.lastTick > bot.msPerAction) {
        CodeClicker.programmer.writeLines(bot.linesPerAction);
        bot.lastTick = time;
      }
    });

    CodeClicker.els.lines.innerHTML =
      `${CodeClicker.data.currentLines} / ${CodeClicker.data.linesPerModule} lines written`;

    CodeClicker.els.modules.innerHTML =
      `Modules: ${CodeClicker.RAM.length}`;

    CodeClicker.els.storage.innerHTML =
      `${CodeClicker.data.storageUsed} / ${CodeClicker.data.storageMax}MB`;

    CodeClicker.render(time);
  } else {
    CodeClicker.renderCrashSequence(time);
  }

  CodeClicker.lastTick = time;
  requestAnimationFrame(CodeClicker.loop);
};

CodeClicker.lastSpeech = null;
function canSpeak(phrase, time) {
  var lastSpeech = CodeClicker.lastSpeech;
  if (phrase) return !lastSpeech || lastSpeech + 100 < time;
  return !lastSpeech || lastSpeech + 1200 < time;
}

function speak(phrase, time) {
  if (canSpeak(phrase, time)) {
    CodeClicker.lastSpeech = time;
    CodeClicker.els.speech.innerHTML = phrase;
  }
}

function applyUpgrade(upgrade) {
  var info = CodeClicker.upgrades[upgrade];
  CodeClicker.upgrades[upgrade] = CodeClicker.upgrades[upgrade] || 0;
  CodeClicker.upgrades[upgrade] += 1;
  if (CodeClicker.upgrades[upgrade] === 1) {
    if (CodeClicker.RAM.length < info.cost) return;
    CodeClicker.programmer.apply(info.cost);
    info.first();
  } else {
    if (CodeClicker.RAM.length < info.upgradeCost) return;
    CodeClicker.programmer.apply(info.upgradeCost);
    info.upgrade();
  }
  renderUpgrade(upgrade);
}

// function applyDowngrade(upgrade) {
//   CodeClicker.upgrades[upgrade] -= 1;
//   if (CodeClicker.upgrades[upgrade] === 0) {
//     CodeClicker.upgradeMap[upgrade].last();
//   } else {
//     CodeClicker.upgrades[upgrade].downgrade();
//   }
//   renderUpgrade(upgrade);
// }

function makeContainer(id, className) {
  var container = document.createElement('div');
  container.datasets.id = id;
  container.classList.add(className);
  return container;
}

var upgradeTemplate = _.template(`
  <span>Cost: <%- count < 1 ? info.cost : info.upgradeCost %></span>
`);
function renderUpgrade(upgrade) {
  var info = CodeClicker.upgradeMap[upgrade];
  var count = CodeClicker.upgrades[upgrade];

  var parent = CodeClicker.els.upgrades;
  var existing = parent.querySelector(`[data-id=${upgrade}]`);
  var container = makeContainer(upgrade);
  container.innerHTML = upgradeTemplate({
    info: info,
    count: count
  });

  if (existing && count === 0) parent.removeChild(existing);
  if (existing) {
    parent.replaceChild(container, existing);
  } else {
    parent.appendChild(existing);
  }
}