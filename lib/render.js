/* globals CodeClicker PIXI */

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
    .add('assets/blck/clone.png')
    .add('assets/blck/coffee.png')
    .add('assets/blck/dexterity.png')
    .add('assets/blck/duocore.png')
    .add('assets/blck/meditate.png')
    .add('assets/blck/opensource.png')
    .add('assets/blck/osupgrade.png')
    .add('assets/blck/patience.png')
    .add('assets/blck/robothands.png')
    .add('assets/blck/storage.png')
    .add('assets/blck/testing.png')
    .add('assets/whte/clone.png')
    .add('assets/whte/coffee.png')
    .add('assets/whte/dexterity.png')
    .add('assets/whte/duocore.png')
    .add('assets/whte/meditate.png')
    .add('assets/whte/opensource.png')
    .add('assets/whte/osupgrade.png')
    .add('assets/whte/patience.png')
    .add('assets/whte/robothands.png')
    .add('assets/whte/storage.png')
    .add('assets/whte/testing.png')
    .add('assets/typing/popup0.png')
    .add('assets/typing/popup1.png')
    .add('assets/typing/popup2.png')
    .add('assets/typing/popup3.png')
    .add('assets/typing/popup4.png')
    .add('assets/typing/type0.png')
    .add('assets/typing/type1.png')
    .add('assets/typing/type2.png')
    .add('assets/typing/type3.png')
    .add('assets/typing/type4.png')
    .add('assets/typing/type5.png')
    .add('assets/typing/type6.png')
    .add('assets/typing/type7.png')
    .add('assets/typing/type8.png')
    .add('assets/typing/type9.png')
    .add('assets/typing/type10.png')
    .add('assets/typing/type11.png')
    .add('assets/typing/type12.png')
    .add('assets/typing/type13.png')
    .add('assets/typing/type14.png')
    .add('assets/typing/type15.png')
    .add('assets/typing/type16.png')
    .add('assets/typing/type17.png')
    .add('assets/typing/type18.png')
    .add('assets/typing/type19.png')
    .add('assets/typing/type20.png')
    .add('assets/typing/type21.png')
    .add('assets/typing/type22.png')
    .add('assets/typing/type23.png')
    .add('assets/typing/type24.png')
    .add('assets/typing/type25.png')
    .add('assets/typing/type26.png')
    .add('assets/typing/type27.png')
    .add('assets/typing/type28.png')
    .add('assets/typing/type29.png')
    .add('assets/typing/type30.png')
    .add('assets/typing/type31.png')
    .add('assets/typing/type32.png')
    .add('assets/typing/type33.png')
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
  var screen = new PIXI.Container();
  var screenProgress = new PIXI.Sprite();
  var screenIdle = new PIXI.Sprite();

  var humanSprite = new PIXI.Sprite();
  var caseSprite = new PIXI.Sprite();
  var compSprite = new PIXI.Sprite();

  var onPoke = () => {
    if (CodeClicker.data.crashSequence) return;
    CodeClicker.programmer.speak(CodeClicker.programmer.poke());
  };

  humanSprite.interactive = true;
  humanSprite.on('click', onPoke);
  humanSprite.on('tap', onPoke);

  screen.addChild(screenProgress);

  display.interactiveChildren = true;
  display.addChild(compSprite);
  display.addChild(screen);
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

  progress.position = new PIXI.Point(10, height - 50);
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
  var upgradeSprites = {};
  var upgradeText = {};
  var upgradeContainers = {};
  var upgradeNumOptions = {
    fontFamily: 'VT323',
    fontSize: 16,
    fill: bg,
    align: 'left'
  };
  Object.keys(CodeClicker.upgradeMap)
    .forEach(function (upgrade) {
      var container = new PIXI.Container();
      var sprite = new PIXI.Sprite();
      var text = new PIXI.Text('', upgradeNumOptions);
      var onClick = function () { CodeClicker.programmer.applyUpgrade(upgrade); };

      text.position.set(5, 50);
      container.addChild(sprite);
      container.addChild(text);
      container.interactive = true;
      container.on('click', onClick);
      container.on('tap', onClick);

      upgradeText[upgrade] = text;
      upgradeSprites[upgrade] = sprite;
      upgradeContainers[upgrade] = container;
    });
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
    var moduleCompletion = Math.round(34 * (CodeClicker.data.currentLines / CodeClicker.data.linesPerModule));
    screenProgress.texture = PIXI.loader.resources[`assets/typing/type${moduleCompletion}.png`].texture;
    progressText.text = `${CodeClicker.data.currentLines} / ${CodeClicker.data.linesPerModule} lines written`;
    modulesText.text = `${CodeClicker.RAM.length} Modules, ${CodeClicker.data.storageUsed} / ${CodeClicker.data.storageMax}MB`;

    // Speech
    speechText.text = CodeClicker.data.speaking;

    if (CodeClicker.data.speaking) {
      stage.addChild(speech);
      screen.addChild(screenIdle);
    } else {
      stage.removeChild(speech);
      screen.removeChild(screenIdle);
    }

    // Idling
    if (CodeClicker.data.idling) {
      var screenIdleIndex = Math.floor((Math.min(time - CodeClicker.lastSpeech, 200) / 200) * 4);
      screenIdle.texture = PIXI.loader.resources[`assets/typing/popup${screenIdleIndex}.png`].texture;
    }

    // Upgrades
    upgrades.removeChildren();
    var currentUpgrades = CodeClicker.upgrades;
    var availableUpgrades = CodeClicker.programmer.getAvailableUpgrades();
    availableUpgrades.forEach(function (upgrade, pos) {
      var sprite = upgradeSprites[upgrade.id];
      var container = upgradeContainers[upgrade.id];
      var color = currentUpgrades[upgrade.id] ? 'blck' : 'whte';

      upgradeText[upgrade.id].text = String(currentUpgrades[upgrade.id] || '');
      sprite.texture = PIXI.loader.resources[`assets/${color}/${upgrade.id}.png`].texture;
      if (pos < 5) {
        container.position.set(0, pos % 5 * 70);
      } else {
        container.position.set(70, pos % 5 * 70);
      }
      upgrades.addChild(container);
    });

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
