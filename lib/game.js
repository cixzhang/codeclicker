/* globals CodeClicker */

CodeClicker.lastTick = null;
CodeClicker.lastAction = null;
CodeClicker.lastSpeech = null;

CodeClicker.init = function () {
  // CodeClicker.canvas = document.getElementById('game');
  // CodeClicker.canvas.width = CodeClicker.width;
  // CodeClicker.canvas.height = CodeClicker.height;
  // CodeClicker.context = CodeClicker.canvas.getContext('2d');

  // CodeClicker.els.upgrades = document.getElementById('upgrades');
  // CodeClicker.els.available = document.getElementById('available-upgrades');
  // CodeClicker.els.bugs = document.getElementById('bugs');

  // CodeClicker.els.lines = document.getElementById('lines-written');
  // CodeClicker.els.modules = document.getElementById('modules');
  // CodeClicker.els.storage = document.getElementById('storage');
  // CodeClicker.els.docs = document.getElementById('documentation');
  // CodeClicker.els.speech = document.getElementById('speech');

  // CodeClicker.canvas.addEventListener('click', function () {
  //   if (CodeClicker.data.crashSequence) return;
  //   speak(CodeClicker.programmer.poke());
  // });

  // $(document.body).on('click', '.upgrade', function (e) {
  //   applyUpgrade(e.currentTarget.dataset.id);
  // });

  // renderAvailableUpgrades();

  CodeClicker.initRender();
  CodeClicker.loop();
};

CodeClicker.loop = function (time) {
  if (!CodeClicker.lastTick) {
    CodeClicker.lastTick = time;
  }

  if (!CodeClicker.data.crashSequence) {
    if (!CodeClicker.lastAction) CodeClicker.lastAction = time;

    if (time - CodeClicker.lastAction > CodeClicker.data.msPerAction) {
      CodeClicker.programmer.speak(CodeClicker.programmer.perform(), time);
      CodeClicker.lastAction = time;
    }

    if (CodeClicker.data.poked) {
      if (!CodeClicker.lastPoked) CodeClicker.lastPoked = time;
      if (time - CodeClicker.lastPoked > 80) {
        CodeClicker.data.poked = false;
        CodeClicker.lastPoked = null;
      }
    }

    CodeClicker.bots.forEach(function (bot) {
      if (!bot.lastTick) bot.lastTick = time;
      if (time - bot.lastTick > bot.msPerAction) {
        CodeClicker.programmer.writeLines(bot.linesPerAction);
        bot.lastTick = time;
      }
    });

    // renderProgress();
    CodeClicker.render(time);
  } else {
    CodeClicker.renderCrashSequence(time);
  }

  CodeClicker.lastTick = time;
  requestAnimationFrame(CodeClicker.loop);
};

// function applyUpgrade(upgrade) {
//   var info = CodeClicker.upgradeMap[upgrade];
//   CodeClicker.upgrades[upgrade] = CodeClicker.upgrades[upgrade] || 0;
//   if (CodeClicker.RAM.length < info.cost) return;
//   CodeClicker.programmer.apply(info.cost);
//   CodeClicker.upgrades[upgrade] += 1;
//   info.first();
//   renderUpgrade(upgrade);
//   renderAvailableUpgrades();
// }

// function makeContainer(id, className) {
//   var container = document.createElement('div');
//   container.setAttribute('data-id', id);
//   container.classList.add(className);
//   return container;
// }

// var upgradeTemplate = _.template(`
//   <span><%- count || '' %></span>
//   <span>Cost: <%- info.cost %></span>
// `);
// function renderUpgrade(upgrade, parent) {
//   parent = parent || CodeClicker.els.upgrades;
//   var info = CodeClicker.upgradeMap[upgrade];
//   var count = CodeClicker.upgrades[upgrade];

//   var existing = parent.querySelector(`[data-id=${upgrade}]`);
//   var content = upgradeTemplate({
//     info: info,
//     count: count || 0
//   });

//   if (existing) {
//     existing.innerHTML = content;
//   } else {
//     var container = makeContainer(upgrade, 'upgrade');
//     container.innerHTML = content;
//     parent.appendChild(container);
//   }
// }

// function renderAvailableUpgrades() {
//   var parent = CodeClicker.els.available;
//   var available = CodeClicker.programmer.getAvailableUpgrades();
//   var availableIds = _.map(available, function (upg) { return upg.id; });
//   var exiting = _.filter(_.toArray(parent.querySelectorAll('[data-id]')),
//     function (node) {
//       return _.indexOf(availableIds, node.dataset.id) === -1;
//     });

//   console.log(availableIds);
//   exiting.forEach(function (node) { parent.removeChild(node); });
//   availableIds.forEach(function (upgrade) {
//     renderUpgrade(upgrade, parent);
//   });
// }

// function renderProgress() {
//   CodeClicker.els.lines.innerHTML =
//     `${CodeClicker.data.currentLines} / ${CodeClicker.data.linesPerModule} lines written`;

//   CodeClicker.els.modules.innerHTML =
//     `Modules: ${CodeClicker.RAM.length}`;

//   CodeClicker.els.storage.innerHTML =
//     `${CodeClicker.data.storageUsed} / ${CodeClicker.data.storageMax}MB`;
// }
