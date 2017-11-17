var display = '0';
var actionStack = [display.value];
var displayNumberExtendable = true;
var memory = 0;

var setAllClear = function () {
  display = '0';
  actionStack = [];
  var memory = 0;
  displayNumberExtendable = true;
};

var displayValue = function (str) {
  if (!str) {
    str = display;
  }
  if (str.length > 10) {
    var decimalIndex = str.indexOf('.');
    if (str.indexOf('.') > -1) {
      str = (Number(str).toPrecision(9)).toString();
    }
  }
  if (display === 'NaN') {
    displayNumberExtendable = false;
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
  }
  displayValue(display);
  console.log(this.id);
});
