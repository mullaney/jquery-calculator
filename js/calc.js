var display = '0';
var actionStack = [display.value];

var setAllClear = function () {
  display = '0';
  actionStack = [];
  displayValue(display);
};

var displayValue = function (str) {
  $('#display').text(str);
};

setAllClear();

$(".button").on("click", function() {
  if(this.id === 'all-clear') {
    setAllClear();
  } else if (Number(this.id) >= 0) {
    if (Number(display) === 0) {
      display = this.id;
    } else {
      display += this.id;
    }
    displayValue(display);
  } else if (this.id === 'decimal') {
    if (display.indexOf('.') === -1) {
      display += '.';
    }
    displayValue(display);
  }
  console.log(this.id);
});
