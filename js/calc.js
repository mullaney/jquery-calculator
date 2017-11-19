function DisplayedValue() {

  this.set = function (value) {
    if ((typeof value) == 'number') {
      this.value = value;
      this.str = value.toString();
    } else if ((typeof value) == 'string') {
      this.value = Number(value);
      this.str = value;
    } else {
      this.value = 0;
      this.str = '0';
    }
  }

  this.show = function () {
    this.displayedString = this.str;
    if (this.displayedString.length > 10) {
      if (this.value < 0.001 || this.value > 9999999999) {
        this.displayedString = this.value.toExponential(4);
      } else {
        var decimalIndex = this.displayedString.indexOf('.');
        if (decimalIndex > -1) {
          this.displayedString = (this.value.toPrecision(9 - decimalIndex)).toString();
        }
      }
    }
    // console.log(this.displayedString, this.value, this.str);
    $('#display').text(this.displayedString);
  }
}

var setAllClear = function () {
  display.set(0);
  buttonStack = [];
  lastArg1 = null;
  lastArg2 = null;
  memory = 0;
  lastOperator = '';
};

function calculate(arg1, arg2, oper) {
  if (oper === 'divide') {
    return arg1 / arg2;
  } else if (oper === 'multiply') {
    return arg1 * arg2;
  } else if (oper === 'subtract') {
    return arg1 - arg2;
  } else if (oper === 'add') {
    return arg1 + arg2;
  }
}

var display = new DisplayedValue();
var memory = 0;
var buttonStack = [];
var lastArg1 = null;
var lastArg2 = null;
var lastButtonType = '';
var lastOperator = '';

setAllClear();
display.show();

$(".button").on("click", function() {
  buttonStack.push(this.id);
  if(this.id === 'all-clear') {
    setAllClear();
    lastButtonType = 'clear';
  } else if (this.id === 'clear') {
    display.set(0);
    lastButtonType = 'clear';
  } else if (Number(this.id) >= 0) {
    if (display.value === 0 && display.str.indexOf('.') === -1) {
      display.set(this.id);
    } else if (lastButtonType !== 'digit') {
      display.set(this.id);
    } else {
      display.set(display.str + this.id);
    }
    if (lastButtonType === 'equal') {
      lastArg1 = null;
      lastArg2 = null;
      lastOperator = '';
    }
    lastButtonType = 'digit';
  } else if (this.id === 'decimal') {
    if (display.str.indexOf('.') === -1) {
      if (lastButtonType === 'digit' || display.str === '0') {
        display.set(display.str + '.');
        lastButtonType = 'digit';
      }
    }
  } else if (this.id === 'percent') {
    display.set(display.value / 100);
    lastButtonType = 'operator';
  } else if (this.id === 'plus-minus') {
    display.set(-display.value);
    lastButtonType = 'operator';
  } else if (this.id === 'square-root') {
    if (display.value < 0) {
      display.set('Error');
      lastButtonType = 'operator';
    } else {
      display.set(Math.sqrt(display.value));
      lastButtonType = 'operator';
    }
  } else if (this.id === 'mem-clear') {
    memory = 0;
    lastButtonType = 'memory';
  } else if (this.id === 'mem-recall') {
    display.set(memory);
    lastButtonType = 'memory';
  } else if (this.id === 'mem-plus') {
    if (display.str !== 'Error') {
      memory += display.value;
      lastButtonType = 'memory';
    }
  } else if (this.id === 'mem-minus') {
    if (display.str !== 'Error') {
      memory -= display.value;
      lastButtonType = 'memory';
    }
  } else if (['divide', 'multiply', 'subtract', 'add'].indexOf(this.id) >= 0) {
    if (lastButtonType === 'operator') {
      lastOperator = this.id;
    } else if (lastButtonType === 'digit') {
      if (lastArg1 === null) {
        lastArg1 = display.value;
      } else {
        lastArg2 = display.value;
        lastArg1 = calculate(lastArg1, lastArg2, this.id);
        display.set(lastArg1);
      }
      lastOperator = this.id;
    }
    lastButtonType = 'operator';
  } else if (this.id === 'equal') {
    if (lastButtonType === 'operator') {
      if (lastArg1) {
        lastArg2 = lastArg1;
        lastArg1 = calculate(lastArg1, lastArg2, lastOperator);
        display.set(lastArg1);
      }
    } else if (lastButtonType === 'digit') {
      if (lastArg1) {
        lastArg2 = display.value;
        lastArg1 = calculate(lastArg1, lastArg2, lastOperator);
        display.set(lastArg1);
      }
    } else if (lastButtonType === 'equal') {
      if (lastArg1 && lastArg2) {
        lastArg1 = calculate(lastArg1, lastArg2, lastOperator);
        display.set(lastArg1);
      }
    }
    lastButtonType = 'equal';
  }
  // console.log('lastArg1:', lastArg1);
  // console.log('lastArg2:', lastArg2);
  // console.log('lastOperator:', lastOperator);
  // console.log('lastButtonType:', lastButtonType);
  display.show();
});
