/* globals CodeClicker */

CodeClicker.lastTick = null;
CodeClicker.lastAction = null;
CodeClicker.lastSpeech = null;

CodeClicker.init = function () {
  CodeClicker.initRender();
  CodeClicker.loop();
};

CodeClicker.loop = function (time) {
  if (!CodeClicker.lastTick) {
    CodeClicker.lastTick = time;
  }

  if (!CodeClicker.data.crashSequence) {
    if (!CodeClicker.lastAction) CodeClicker.lastAction = time;

    var msPerAction = Math.max(CodeClicker.data.msPerAction, 50);
    if (time - CodeClicker.lastAction > msPerAction) {
      var speech = CodeClicker.programmer.perform();
      CodeClicker.programmer.speak(speech);
      CodeClicker.data.idling = speech;
      CodeClicker.lastAction = time;
    }

    if (CodeClicker.data.poked) {
      if (!CodeClicker.lastPoked) CodeClicker.lastPoked = time;
      if (time - CodeClicker.lastPoked > 80) {
        CodeClicker.data.poked = false;
        CodeClicker.lastPoked = null;
      }
    }

    if (CodeClicker.data.speaking) {
      if (!CodeClicker.lastSpeech) CodeClicker.lastSpeech = time;
      if (time - CodeClicker.lastSpeech > 1200) {
        CodeClicker.data.speaking = false;
        CodeClicker.data.idling = false;
        CodeClicker.lastSpeech = null;
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
