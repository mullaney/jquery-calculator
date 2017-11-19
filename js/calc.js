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
    console.log(this.displayedString, this.value, this.str);
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

    } else if (lastButtonType === 'digit') {

    } else if (lastButtonType === 'equal') {

    }
    lastButtonType = 'equal';
  }
  display.show();
});


//   } else if (['divide', 'multiply', 'subtract', 'add'].indexOf(this.id) >= 0) {
//     lastNumber = Number(display);
//     lastOperator = this.id;
//     displayNumberExtendable = false;
//   } else if (this.id === 'equal') {
//     if (lastOperator && display != 'Error') {
//       if (lastOperator === 'divide' && Number(display) === 0) {
//           display = 'Error';
//       } else {
//         if (justEqualed == false) {
//           arg1 = lastNumber;
//           arg2 = Number(display);
//         } else {
//           // arg1 = Number(display);
//           // arg2 = lastNumber;
//         }
//         if (lastOperator === 'divide') {
//           display = (arg1 / arg2).toString();
//         } else if (lastOperator === 'multiply') {
//           display = (arg1 * arg2).toString();
//         } else if (lastOperator === 'subtract') {
//           display = (arg1 - arg2).toString();
//         } else if (lastOperator === 'add') {
//           display = (arg1 + arg2).toString();
//         }
//         arg1 = Number(display);
//         displayNumberExtendable = false;
//         justEqualed = true;
//       }
//     }
//   }
//   if (justEqualed == true && this.id !== 'equal') {
//     justEqualed = false;
//   }
//   displayValue(display);
//   console.log(this.id);
// });



// var displayNumberExtendable = true;
// var memory = 0;
// var actionStack = [];
//
//
// var displayValue = function (str) {
//   if (!str) {
//     str = display;
//   }
//   if (str.length > 10) {
//     var decimalIndex = str.indexOf('.');
//     console.log(decimalIndex);
//     if (str.indexOf('.') > -1) {
//       str = (Number(str).toPrecision(9 - decimalIndex)).toString();
//     }
  // }
//
// setAllClear();
// displayValue();
//
