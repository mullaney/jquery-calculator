var display = '0';
var actionStack = [display.value];
var displayNumberExtendable = true;
var currentError = '';

var setAllClear = function () {
  display = '0';
  actionStack = [];
  displayNumberExtendable = true;
  // displayValue(display);
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

var displayError = function (str) {
  if (!str) {
    str = currentError;
  }
  $('#error').text(currentError);
}

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
      currentError = 'Square root of a negative number is not a real number.';
    } else {
      display = (Math.sqrt(Number(display))).toString();
      displayNumberExtendable = false;
    }
  } else if (this.id === 'clear') {
    display = '0';
  }
  displayError(currentError);
  currentError = '';
  displayValue(display);
  console.log(this.id);
});
