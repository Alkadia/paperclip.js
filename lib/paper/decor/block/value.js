// Generated by CoffeeScript 1.6.2
var ValueDecor, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ValueDecor = (function(_super) {
  __extends(ValueDecor, _super);

  function ValueDecor() {
    _ref = ValueDecor.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  /*
  */


  ValueDecor.prototype.load = function(context) {
    var v;

    v = this.clip.get("value");
    if (v != null) {
      return context.buffer.push(v);
    }
  };

  /*
  */


  ValueDecor.prototype._onChange = function(value) {
    return this.node.section.html(value);
  };

  return ValueDecor;

})(require("./base"));

module.exports = ValueDecor;