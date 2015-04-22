// Better logs, please!

var clc = require("cli-color");

var color = {
  log: clc.magenta,
  info: clc.blue,
  warn: clc.yellow,
  error: function(text) {
    return '\u0007' + clc.red(text);
  }
};

module.exports = function() {
  ["log", "info", "warn", "error"].forEach(function(method) {
    var oldMethod;
    oldMethod = console[method].bind(console);
    console[method] = function() {
      oldMethod.apply(
        console, [
          color[method](
            new Date().toISOString())
        ].concat(
          Array.prototype.slice.call(arguments)
        )
      );
    };
  });
};