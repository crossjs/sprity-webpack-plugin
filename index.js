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
};

module.exports = SprityWebpackPlugin;
