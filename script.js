$(function() {
  var functions = {
    'plus': function(a,b){return a+b},
    'minus': function(a,b){return a-b},
    'divide': function(a,b){return a/b},
    'times': function(a,b){return a*b},
    'nowt': function(a,b){return b||a}
  };
  
  function standardForm(s) {
    if (typeof(s) == 'number') s = s+'';
    if (s == '0')return 0;
    var i = 0;
    var e;
    if (Math.abs(+s) < 0.01) {
      while (s[0] == 0) {
        s = (parseFloat(s)*10)+'';
        i++;
      }
      e = 'e-'+i;
    } else if (Math.abs(+s) >= 1e7) {
      while (s[1] != '.') {
        s = (parseFloat(s)/10)+'';
        i++;
      }
      e = 'e'+i;
    }
    if (s.length >= 9) s = s.substr(0, (9-e.length));
    return s+(e||'');
  }
  
  var Display = function(selector) {
    this.el = $(selector);
    this.read = function() {
      return this.el.html();
    };
    this.glow = function() {
      clearTimeout(sg);
      this.el.removeClass('glow');
      this.el.addClass('glow');
      //jquery delay not working
      var sg = setTimeout(function() {
        this.el.removeClass('glow')
      }.bind(this), 1000);
    };
    this.write = function(n) {
      var len = 8;
      if (n[0] == '-' || n != ~~n ) len = 9;
      n = n.length > len?n.substr(0,len):n;
      this.el.html(n);
      //this.glow();
    };
  };
  
  var disp = new Display('.readout');
  var n1 = +disp.read();
  var n2 = 0;
  var func;
  var fbool = false;
  var eq = false;
  
  function highlight(x) {
    $('.highlight').removeClass('highlight');
    $('#'+x).addClass('highlight');
  }
  
  function numericHandler(n) {
    highlight(n);
    if (fbool) {
      disp.write(n);
      fbool = false;
    } else disp.write(disp.read() + n);
  }
  
  function functionHandler(f) {
    highlight(f);
    fbool = true;
    if (f == 'equals') {
      if (eq) n1 = +disp.read();
      	else n2 = +disp.read();
      func = func||'nowt';
      var ans = functions[func](n1,n2);
      ans = standardForm(ans);
      disp.write(ans);
      eq = true;
    } else {
      eq = false;
    	func = f;
    	n1 = +disp.read();
    }
  }
  
  function miscHandler(b) {
    highlight(b);
    var num = +disp.read();
    if (b == 'cancel') {
      if (n2 == 0 && n1 != 0) n1 == 0;
      else {
        n2 = 0;
        func = undefined;
      }
      disp.write('');
    } else if (b == 'percent') {
      func = undefined;
      disp.write(num*(n2||n1)/100);
    }
    else if (b == 'sign') disp.write(num*-1);
    else if (b == 'point') disp.write(num+'.');
  }
  
  $('.key').click(function(){
    eval($(this).attr('class').split(' ')[1]+"Handler($(this).attr('id'))");
  });
  
  $(document).keypress(function(e){
    e.preventDefault();
    var code = e.keyCode || e.charCode || e.which;
    switch (code) {
      case 48||96: numericHandler(0); break;
      case 49||97: numericHandler(1); break;
      case 50||98: numericHandler(2); break;
      case 51||99: numericHandler(3); break;
      case 52||100: numericHandler(4); break;
      case 53||101: numericHandler(5); break;
      case 54||102: numericHandler(6); break;
      case 55||103: numericHandler(7); break;
      case 56||104: numericHandler(8); break;
      case 57||105: numericHandler(9); break;
      
      case 43: functionHandler('plus'); break;
      case 45: functionHandler('minus'); break;
      case 47: functionHandler('divide'); break;
      case 13||61: functionHandler('equals'); break;
      case 42||120: functionHandler('times'); break;
        
      case 46: miscHandler('point'); break;
      case 99: miscHandler('cancel'); break;
      case 37: miscHandler('percent'); break;
    }
  });
  
});