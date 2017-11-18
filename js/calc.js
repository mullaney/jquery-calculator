var display = '0';
var displayNumberExtendable = true;
var memory = 0;
var lastNumber = 0;
var lastOperator = '';
var justEqualed = false;
var arg1 = 0;
var arg2 = 0;

var setAllClear = function () {
  display = '0';
  actionStack = [];
  var memory = 0;
  displayNumberExtendable = true;
  lastNumber = 0;
  lastOperator = '';
  justEqualed = false;
  arg1 = 0;
  arg2 = 0;
};

var displayValue = function (str) {
  if (!str) {
    str = display;
  }
  if (str.length > 10) {
    var decimalIndex = str.indexOf('.');
    console.log(decimalIndex);
    if (str.indexOf('.') > -1) {
      str = (Number(str).toPrecision(9 - decimalIndex)).toString();
    }
  }
  $('#display').text(str);
};

setAllClear();
displayValue();

$(".button").on("click", function() {
  if(this.id === 'all-clear') {
    setAllClear();
  } else if (Number(this.id) >= 0) {
    if ((Number(display) === 0 && display.indexOf('.') === -1) || !displayNumberExtendable) {
      display = this.id;
      displayNumberExtendable = true;
    } else {
      display += this.id;
    }
  } else if (this.id === 'decimal') {
    if (display.indexOf('.') === -1) {
      display += '.';
    }
  } else if (this.id === 'percent') {
    display = (Number(display) / 100).toString();
    displayNumberExtendable = false;
  } else if (this.id === 'plus-minus') {
    display = (- Number(display)).toString();
  } else if (this.id === 'square-root') {
    if (Number(display) < 0) {
      display = 'Error';
    } else {
      display = (Math.sqrt(Number(display))).toString();
    }
    displayNumberExtendable = false;
  } else if (this.id === 'clear') {
    display = '0';
  } else if (this.id === 'mem-clear') {
    memory = 0;
  } else if (this.id === 'mem-recall') {
    display = memory.toString();
    displayNumberExtendable = false;
  } else if (this.id === 'mem-plus') {
    if (Number(display) !== NaN) {
      memory += Number(display);
      displayNumberExtendable = false;
    }
  } else if (this.id === 'mem-minus') {
    if (Number(display) !== NaN) {
      memory += Number(display);
      displayNumberExtendable = false;
    }
  } else if (['divide', 'multiply', 'subtract', 'add'].indexOf(this.id) >= 0) {
    lastNumber = Number(display);
    lastOperator = this.id;
    displayNumberExtendable = false;
  } else if (this.id === 'equal') {
    if (lastOperator && display != 'Error') {
      if (lastOperator === 'divide' && Number(display) === 0) {
          display = 'Error';
      } else {
        if (justEqualed == false) {
          arg1 = lastNumber;
          arg2 = Number(display);
        } else {
          // arg1 = Number(display);
          // arg2 = lastNumber;
        }
        if (lastOperator === 'divide') {
          display = (arg1 / arg2).toString();
        } else if (lastOperator === 'multiply') {
          display = (arg1 * arg2).toString();
        } else if (lastOperator === 'subtract') {
          display = (arg1 - arg2).toString();
        } else if (lastOperator === 'add') {
          display = (arg1 + arg2).toString();
        }
        arg1 = Number(display);
        displayNumberExtendable = false;
        justEqualed = true;
      }
    }
  }
  if (justEqualed == true && this.id !== 'equal') {
    justEqualed = false;
  }
  displayValue(display);
  console.log(this.id);
});
