$(document).ready(function() {
  var sum = null;
  var operation = null;

  $("#1-button").click(function() {
    insertToDisplay(1)
  });
  $("#2-button").click(function() {
    insertToDisplay(2)
  });
  $("#3-button").click(function() {
    insertToDisplay(3)
  });
  $("#4-button").click(function() {
    insertToDisplay(4)
  });
  $("#5-button").click(function() {
    insertToDisplay(5)
  });
  $("#6-button").click(function() {
    insertToDisplay(6)
  });
  $("#7-button").click(function() {
    insertToDisplay(7)
  });
  $("#8-button").click(function() {
    insertToDisplay(8)
  });
  $("#9-button").click(function() {
    insertToDisplay(9)
  });

  $("#0-button").click(function() {
    // avoid entering numbers like 0000.5814, although 0234 can still be entered
    if (getDisplayValue() !== "0") {
      insertToDisplay(0);
    }
  });

  $("#dot-button").click(function() {
    // insert a dot if the dot doesn't already exist in the field
    if ($("#display").text().indexOf(".") < 0) {
      insertToDisplay(".");
    }
  });

  $("#ce-button").click(function() {
    clearDisplay();
  });

  $("#ac-button").click(function() {
    clearDisplay();
    sum = null;
    operation = null;
  });

  //
  // operation buttons
  //
  $("#plus-button").click(function() {
    parseOperation();
    operation = "plus";
  });

  $("#minus-button").click(function() {
    parseOperation();
    operation = "minus";
  });

  $("#multiply-button").click(function() {
    parseOperation();
    operation = "multiply";
  });

  $("#divide-button").click(function() {
    parseOperation();
    operation = "divide";
  });

  $("#equals-button").click(function() {
    parseOperation();
    operation = null;
    // avoid odd-looking rounding errors
    insertToDisplay(parseFloat((sum).toFixed(10)));  
    sum = null;
  });

  //
  // display functions
  //
  function insertToDisplay(x) {
    $("#display").text($("#display").text() + x);
  }

  function clearDisplay() {
    $("#display").text("");
  }

  function getDisplayValue() {
    return parseFloat($("#display").text());
  }

  function parseOperation() {
    console.log("sum", sum);
    if (sum === null) {
      sum = getDisplayValue();
    } else {
      // switch for operation
      switch (operation) {
        case "plus":
          sum += getDisplayValue();
          break;
        case "minus":
          sum -= getDisplayValue();
          break;
        case "multiply":
          sum *= getDisplayValue();
          break;
        case "divide":
          sum /= getDisplayValue();
          break;
      }
    }

    clearDisplay();
    //operation = null;
  }
});