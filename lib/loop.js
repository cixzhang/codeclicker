/* globals CodeClicker */

CodeClicker.lastTick = null;
CodeClicker.lastAction = null;
CodeClicker.loop = function (time) {
  if (!CodeClicker.lastTick) {
    CodeClicker.lastTick = time;
    CodeClicker.lastAction = time;
  }

  if (time - CodeClicker.lastAction > CodeClicker.data.msPerAction) {
    var speech = CodeClicker.programmer.perform();
    console.log(speech);
    CodeClicker.lastAction = time;
  }

  CodeClicker.lastTick = time;
  requestAnimationFrame(CodeClicker.loop);
};
