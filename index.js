var sprity = require('sprity');

function SprityWebpackPlugin(options) {
  this.options = options;
}

SprityWebpackPlugin.prototype.apply = function(compiler) {
  sprity.create(this.options, function() {});
};

module.exports = SprityWebpackPlugin;
