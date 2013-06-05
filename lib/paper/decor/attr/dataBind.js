// Generated by CoffeeScript 1.6.2
var DataBindDecor,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DataBindDecor = (function(_super) {
  __extends(DataBindDecor, _super);

  function DataBindDecor(node, name, clip) {
    this.name = name;
    this.clip = clip;
    this._onChange = __bind(this._onChange, this);
    this.attrName = "data-bind";
    this.script = clip.script(this.name);
    this.refs = this.script.script.refs;
    DataBindDecor.__super__.constructor.call(this, node, this.name);
  }

  DataBindDecor.prototype.load = function(context) {
    if (this.watch !== false) {
      this.script.update();
    }
    return DataBindDecor.__super__.load.call(this, context);
  };

  DataBindDecor.prototype.bind = function() {
    this.clip.bind(this.name).to(this._onChange);
    this.element = this.node.section.elements[0];
    if (this.watch !== false) {
      return this.script.watch();
    }
  };

  DataBindDecor.prototype._onChange = function(value) {};

  return DataBindDecor;

})(require("./base"));

module.exports = DataBindDecor;