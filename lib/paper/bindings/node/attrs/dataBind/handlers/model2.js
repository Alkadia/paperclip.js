var _             = require("underscore"),
ChangeAttrBinding = require("./change"),
type              = require("type-component"),
dref              = require("dref");


function ModelAttrBinding () {
  ChangeAttrBinding.apply(this, arguments);
}

ChangeAttrBinding.extend(ModelAttrBinding, {
  bind: function () {
    var self = this;

    if (/^(text|password)$/.test(this.node.getAttribute("type"))) {
      this._autocompleteCheckInterval = setInterval(function () {
        self._onElementChange();
      }, 500);
    }

    ChangeAttrBinding.prototype.bind.apply(this, arguments);

    (this.$element = $(node)).bind(ChangeAttrBinding.events, _.bind(this._onElementChange, this));
    this._onChange();
    this._nameBinding = this.clip.data.bind("name", this._onChange);
  },

  _onElementChange: function (event) {
    if (event) event.stopPropagation();
    clearTimeout(this._changeTimeout);

    var self = this;

    function applyChange () {
      var value = self._elementValue(),
      name      = self._elementName(),
      refs      = self.script.refs,
      model     = self.clip.get("model");

      if (self.clip.get("bothWays") !== false) {
        ref = name || (refs.length ? refs[0] : undefined);

        if (!name) {
          model = self.context;
        }

        self.currentValue = value;

        if (model) {
          if (model.set) {
            model.set(ref, value);
          } else {
            dref.set(model, ref, value);
          }
        }
      }
    }

    if (!process.browser) {
      applyChange();
    } else {
      this._changeTimeout = setTimeout(applyChange, 5);
    }
  },

  unbind: function () {
    ChangeAttrBinding.prototype.unbind.call(this);
    clearInterval(this._autocompleteCheckInterval);
    if (this._modelBinding) this._modelBinding.dispose();
    if (this._nameBinding) this._nameBinding.dispose();
    this.$element.unbind(ChangeAttrBinding.events, this._onElementChange);
  },

  _onChange: function () {
    var model = this.clip.get("model");
    var name = this._elementName();
    if (this._modelBinding) this._modelBinding.dispose();

    if (name) {
      this._modelBinding = model ? model.bind(name, _.bind(this._onValueChange, this)).now() : undefined;
    } else if (type(model) !== "object") {
      this._onValueChange(model);
    }
  },

  _onValueChange: function (value) {
    this._elementValue(value);
  },

  _elementValue: function (value) {

    var isInput = Object.prototype.hasOwnProperty.call(this.node, "value") || /input|textarea|checkbox/.test(this.node.nodeName.toLowerCase())
    if (!arguments.length) return isInput ? this._checkedOrValue() : this.node.innerHTML;

    if (value == null) {
      value = "";
    }

    if (this.currentValue === value) {
      return;
    }

    this.currentValue = value;

    if (isInput) {
      this._checkedOrValue(value);
    } else {
      this.node.innerHTML = value;
    }
  },

  _elementName: function () {
    return $(this.node).attr("name");
  },

  _checkedOrValue: function (value) {
    var isCheckbox    = /checkbox/.test(this.node.type),
    isRadio           = /radio/.test(this.node.type),
    isRadioOrCheckbox = isCheckbox || isRadio;

    if (!arguments.length) {
      if (isCheckbox) {
        return Boolean($(this.node).is(":checked"));
      } else {
        return this.node.value;
      }
    }

    if (isRadioOrCheckbox) {
      if (isRadio) {
        if (String(value) === String($(this.node).val())) {
          $(this.node).prop("checked", true);
        }
      } else {
        this.node.checked = value;
      }
    } else {
      this.node.value = value;
    }
  }
});

module.exports = ChangeAttrBinding;