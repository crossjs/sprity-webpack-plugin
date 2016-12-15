var gaze = require('gaze');
var glob = require('glob');
var sprity = require('sprity');

function SprityWebpackPlugin(options) {
  this.options = options;
}

SprityWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('run', function (compiler, callback) {
    sprity.create(this.options, function() {
      callback();
    });
  }.bind(this));

  var watchStarted = false;
  compiler.plugin('watch-run', function (watching, watchRunCallback) {
    if (watchStarted) {
      return watchRunCallback();
    }
    watchStarted = true;
    gaze(
      this.options.src,
      {},
      function (err, gaze) {
        err && fThrow(err);
        gaze.on('all', function () {
          sprity.create(this.options, function() {});
        }.bind(this));
      }.bind(this)
    );
    return sprity.create(this.options, function() {
      watchRunCallback();
    });
  }.bind(this));
};

module.exports = SprityWebpackPlugin;
