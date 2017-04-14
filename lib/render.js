/* globals CodeClicker */

function loadAsset(src) {
  var image = new Image();
  image.src = src;
  return image;
}

function outline(ctx, x, y, w, h, b, fg, bg) {
  ctx.fillStyle = fg;
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = bg;
  ctx.fillRect(x + b, y + b, w - b*2, h - b*2);
}

CodeClicker.assets = {
  comp: [ loadAsset('assets/comp.png') ],
  case: [
    loadAsset('assets/case-0.png'),
    loadAsset('assets/case-1.png'),
    loadAsset('assets/case-2.png')
  ],
  human: [
    loadAsset('assets/human-0.png'),
    loadAsset('assets/human-1.png'),
    loadAsset('assets/human-2.png')
  ],
  osup: [
    loadAsset('assets/osup-0.png'),
    loadAsset('assets/osup-1.png'),
    loadAsset('assets/osup-2.png'),
    loadAsset('assets/osup-3.png')
  ]
};

CodeClicker.rects = {
  upgrades: {},
  bugs: {}
};

// Element positions for click targets
CodeClicker.render = function (time) {
  time = time || 0;
  var ctx = CodeClicker.context;
  var width = CodeClicker.width;
  var height = CodeClicker.height;
  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = false;

  // Render visual
  var DX = 200;
  var DY = 100;
  ctx.drawImage(CodeClicker.assets.comp[0], DX, DY);

  var caseIndex = Math.floor(time / 10) % CodeClicker.assets.case.length;
  ctx.drawImage(CodeClicker.assets.case[caseIndex], DX, DY);

  var typeSpeed = Math.floor(CodeClicker.data.msPerAction / 5);
  var humanIndex = Math.floor(time / typeSpeed) % CodeClicker.assets.human.length;
  ctx.drawImage(CodeClicker.assets.human[humanIndex], DX, DY);

  // Render upgrades
  var upgrades = Object.keys(CodeClicker.upgrades);
  var available = CodeClicker.programmer.getAvailableUpgrades().map(up => up.id);

  upgrades.push.apply(upgrades, available);

  // upgrades.forEach((upgrade) => {
  //   if (!CodeClicker.rects.upgrades[upgrade]) {
  //     // build rect
  //   }

  //   var rect = CodeClicker.rects.upgrades[upgrade];
  //   outline(ctx, rect.x, rect.y, rect.w, rect.h, 1, CodeClicker.fg, CodeClicker.bg);
  // });

  // // Upgrades
  // var UPDRAGE_TOP = 100;
  // var UPGRADE_LEFT = 100;
  // var UPGRADE_SIZE = 80;
  // var UPGRADE_PAD = 20;

  // var upgrades = CodeClicker.programmer.getCurrentUpgrades();
  // var available = CodeClicker.programmer.getAvailableUpgrades();
  // upgrades.push.apply(upgrades, available);

  // CodeClicker.renderData.upgrades =
  //   _.map(upgrades, function (upgr, i) {
  //     return {
  //       data: upgr,
  //       type: 'outline_with_subtext_and_tooltip',
  //       x: UPGRADE_LEFT,
  //       y: (UPGRADE_SIZE + UPGRADE_PAD) * i + UPDRAGE_TOP,
  //       w: UPGRADE_SIZE,
  //       h: UPGRADE_SIZE,
  //       subtext: CodeClicker.upgrades[upgr],
  //       tooltip: 'TODO'
  //     };
  //   });

  // compute render positions
  // render background
  // render character (animated)
  // render any speech
  // render upgrades
};

CodeClicker.renderCrashSequence = function (time) {
  if (!CodeClicker.crashStart) {
    CodeClicker.crashStart = time;
  }
  var ctx = CodeClicker.context;
  var width = CodeClicker.width;
  var height = CodeClicker.height;
  var fg = CodeClicker.fg;
  var bg = CodeClicker.bg;
  var MAX_TIME = 4000;
  var deltaTime = time - CodeClicker.crashStart;

  ctx.clearRect(0,0,width,height);

  // BG
  ctx.fillStyle = fg;
  ctx.fillRect(0,0,width,height);

  // Loading Bar
  outline(ctx, 0.25 * width, 0.75 * height, 0.5 * width, 20, 2, bg, fg);

  // Loading bar fill
  var jitter = 100 * (Math.random() * 2 - 1);
  var jitteredDelta = Math.max(Math.min(deltaTime + jitter, MAX_TIME), 0);
  var progress = (jitteredDelta / MAX_TIME) * (0.5 * width - 6);
  ctx.fillStyle = bg;
  ctx.fillRect(0.25 * width + 3, 0.75 * height + 3, progress, 14);

  if (deltaTime > MAX_TIME + 500) {
    CodeClicker.crashStart = null;
    CodeClicker.data.crashSequence = false;
  }
};
