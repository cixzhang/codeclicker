/* globals CodeClicker PIXI */

// function loadAsset(src) {
//   var image = new Image();
//   image.src = src;
//   return image;
// }

// // function outline(ctx, x, y, w, h, b, fg, bg) {
// //   ctx.fillStyle = fg;
// //   ctx.fillRect(x, y, w, h);

// //   ctx.fillStyle = bg;
// //   ctx.fillRect(x + b, y + b, w - b*2, h - b*2);
// // }

// CodeClicker.assets = {
//   comp: [ loadAsset('assets/comp.png') ],
//   case: [
//     loadAsset('assets/case-0.png'),
//     loadAsset('assets/case-1.png'),
//     loadAsset('assets/case-2.png')
//   ],
//   human: [
//     loadAsset('assets/human-0.png'),
//     loadAsset('assets/human-1.png'),
//     loadAsset('assets/human-2.png')
//   ],
//   osup: [
//     loadAsset('assets/osup-0.png'),
//     loadAsset('assets/osup-1.png'),
//     loadAsset('assets/osup-2.png'),
//     loadAsset('assets/osup-3.png')
//   ]
// };
CodeClicker.initRender = function() {
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  PIXI.loader
    .add('assets/comp.png')
    .add('assets/case-0.png')
    .add('assets/case-1.png')
    .add('assets/case-2.png')
    .add('assets/human-0.png')
    .add('assets/human-1.png')
    .add('assets/human-2.png')
    .add('assets/osup-0.png')
    .add('assets/osup-1.png')
    .add('assets/osup-2.png')
    .add('assets/osup-3.png')
    .load(function () {
      CodeClicker.canLeaveCrashSequence = true;
    });

  var width = CodeClicker.width;
  var height= CodeClicker.height;
  var fg = CodeClicker.fg;
  var bg = CodeClicker.bg;
  var renderer = PIXI.autoDetectRenderer(width, height);
  renderer.backgroundColor = bg;
  CodeClicker.renderer = renderer;
  document.body.appendChild(renderer.view);

  // Constructing game stage
  var stage = new PIXI.Container();

  // Display
  var display = new PIXI.Container();
  var humanSprite = new PIXI.Sprite();
  var caseSprite = new PIXI.Sprite();
  var compSprite = new PIXI.Sprite();

  humanSprite.interactive = true;
  humanSprite.on('click', () => {
    if (CodeClicker.data.crashSequence) return;
    CodeClicker.programmer.speak(CodeClicker.programmer.poke());
  });

  display.interactiveChildren = true;
  display.addChild(compSprite);
  display.addChild(caseSprite);
  display.addChild(humanSprite);
  display.scale = new PIXI.Point(2, 2);

  // Progress text
  var textOptions = {
    fontFamily: 'VT323',
    fontSize: 22,
    fill: fg,
    align: 'left'
  };
  var progress = new PIXI.Container();
  var progressText = new PIXI.Text('', textOptions);
  var modulesText = new PIXI.Text('', textOptions);

  modulesText.position = new PIXI.Point(0, 30);

  progress.position = new PIXI.Point(50, height - 80);
  progress.addChild(progressText);
  progress.addChild(modulesText);

  // Speech Area
  var speech = new PIXI.Container();
  var speechText = new PIXI.Text('', textOptions);
  var speechBox = new PIXI.Graphics();

  speechBox.beginFill(bg);
  speechBox.lineStyle(2, fg, 1);
  speechBox.drawRect(0, 0, 300, 50);
  speechBox.endFill();

  speechText.position = new PIXI.Point(10, 12);
  speech.position = new PIXI.Point(width - 305, 5);
  speech.addChild(speechBox);
  speech.addChild(speechText);

  // Upgrades
  var upgrades = new PIXI.Container();
  var available = new PIXI.Container();
  var upgradeSprites = {};
  Object.keys(CodeClicker.upgradeMap)
    .forEach(function (upgrade) {
      var sprite = new PIXI.Graphics(); // TODO: convert to sprite asset
      sprite.beginFill(fg);
      sprite.drawRect(0, 0, 64, 64);
      sprite.endFill();

      sprite.interactive = true;
      sprite.on('click', function () {
        CodeClicker.programmer.applyUpgrade(upgrade);
      });
      sprite.visible = false;
      upgradeSprites[upgrade] = sprite;
    });
  available.interactiveChildren = true;
  upgrades.interactiveChildren = true;

  stage.interactiveChildren = true;
  stage.addChild(display);
  stage.addChild(progress);
  stage.addChild(upgrades);

  CodeClicker.render = function (time) {
    time = time || 0;

    // Display updates
    compSprite.texture = PIXI.loader.resources['assets/comp.png'].texture;

    var caseIndex = Math.floor(time / 10) % 3;
    caseSprite.texture = PIXI.loader.resources['assets/case-' + caseIndex + '.png'].texture;

    var typeSpeed = Math.floor(CodeClicker.data.msPerAction / 5);
    var humanIndex = Math.floor(time / typeSpeed) % 3;
    humanSprite.texture = PIXI.loader.resources['assets/human-' + humanIndex + '.png'].texture;

    if (CodeClicker.data.poked) {
      var jitterX = (Math.random() * 2 - 1) * 2;
      var jitterY = (Math.random() * 2 - 1) * 2;
      display.position.set(100 + jitterX, -100 + jitterY);
    } else {
      display.position.set(100, -100);
    }

    // Progress
    progressText.text = `${CodeClicker.data.currentLines} / ${CodeClicker.data.linesPerModule} lines written`;
    modulesText.text = `${CodeClicker.RAM.length} Modules, ${CodeClicker.data.storageUsed} / ${CodeClicker.data.storageMax}MB`;

    // Speech
    speechText.text = CodeClicker.data.speaking;
    if (CodeClicker.data.speaking) {
      stage.addChild(speech);
    } else {
      stage.removeChild(speech);
    }

    // Upgrades
    upgrades.removeChildren();
    available.removeChildren();
    var currentUpgrades = CodeClicker.programmer.getCurrentUpgrades();
    var availableUpgrades = CodeClicker.programmer.getAvailableUpgrades();

    // // Render upgrades
    // var upgrades = Object.keys(CodeClicker.upgrades);
    // var available = CodeClicker.programmer.getAvailableUpgrades().map(up => up.id);

    // upgrades.push.apply(upgrades, available);

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
    renderer.render(stage);
  };


  // Constructing the crash stage
  var crashStage = new PIXI.Container();
  var crashOutline = new PIXI.Graphics();
  var crashProgress = new PIXI.Graphics();
  var crashBG = new PIXI.Graphics();

  crashBG.beginFill(fg);
  crashBG.drawRect(0, 0, width, height);
  crashBG.endFill();

  crashOutline.beginFill(fg);
  crashOutline.lineStyle(2, bg, 1);
  crashOutline.drawRect(0.25 * width, 0.75 * height, 0.5 * width, 20);
  crashOutline.endFill();

  crashProgress.beginFill(bg);
  crashProgress.drawRect(0.25 * width + 3, 0.75 * height + 3, 0.5 * width - 6, 14);
  crashProgress.endFill();

  crashStage.addChild(crashBG);
  crashStage.addChild(crashOutline);
  crashStage.addChild(crashProgress);

  CodeClicker.renderCrashSequence = function (time) {
    if (!CodeClicker.crashStart) {
      CodeClicker.crashStart = time;
    }

    var MAX_TIME = 4000;
    var deltaTime = time - CodeClicker.crashStart;

    var jitter = 100 * (Math.random() * 2 - 1);
    var jitteredDelta = Math.max(Math.min(deltaTime + jitter, MAX_TIME), 0);
    var progress = (jitteredDelta / MAX_TIME) * (0.5 * width - 6);
    crashProgress.width = Math.floor(progress);
    crashProgress.x = 0.5 * width - 6 - progress;

    if (deltaTime > MAX_TIME + 500) {
      CodeClicker.crashStart = null;
      CodeClicker.data.crashSequence = CodeClicker.data.canLeaveCrashSequence;
    }

    renderer.render(crashStage);
  };
};
