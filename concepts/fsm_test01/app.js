var app = app || {};



app.build_fsm = function()
{
  var states = [ "A", "B", "C" ];
  var transition = {};
  var currentState = "Start";

  // Create transition table and fill it with "not allowed" transition functions.
  for (var i=0; i<states.length; i++)
  {
    transition[states[i]] = {};
    for (var j=0; j<states.length; j++)
      transition[states[i]][states[j]] = function(src,dest) 
      {
        return function() 
        { 
          tools.error("Transition from '" + src + "' to '" + dest + "' not allowed.");
          return false; 
        };
      }(states[i],states[j]);
  }

  // Some helper functions 
  buttonHTML = function(name, nextState)
  {
    var s = "";
    s += "<div><input type=\"submit\" onclick=\"app.gotoState('" + nextState + "')";
    s += "\" value=\"Go to state " + nextState + "\" id=\"btn" + name + nextState + "\"></div>";
    return s;
  }

  addDialog = function(name, state1, state2)
  {
    var s = tools.elem("dialogwrapper").innerHTML;
    s += "<div id=\"dialog" + name + "\" class=\"dialog\">";
    s += name;
    s += buttonHTML(name, state1);
    if (state2 != undefined)
      s += buttonHTML(name, state2);
    tools.elem("dialogwrapper").innerHTML = s;
  }

  removeDialog = function(name)
  {
    tools.elem("dialog" + name).outerHTML = "";
  }
  
  enableDialog = function(name, enable)
  {
    var nodes = document.getElementById("dialog" + name).getElementsByTagName('*');
    for (var i=0; i<nodes.length; i++)
    {
      nodes[i].disabled = !enable; 
    }
  }
  
  // Specify the allowed transitions.
  transition["A"]["B"] = function()
  {
    addDialog("B", "A", "C");
    enableDialog("A", false);
    tools.info("Transition from 'A' to 'B'");
    return true;
  };
  
  transition["B"]["A"] = function()
  {
    removeDialog("B");
    enableDialog("A", true);
    tools.info("Transition from 'B' to 'A'");
    return true;
  };
  
  transition["B"]["C"] = function()
  {
    addDialog("C", "B");
    enableDialog("B", false);
    tools.info("Transition from 'B' to 'C'");
    return true;
  };
  
  transition["C"]["B"] = function()
  {
    removeDialog("C");
    enableDialog("B", true);
    tools.info("Transition from 'C' to 'B'");
    return true;
  };

  addDialog("A", "B");
  currentState = "A";

  return {
    gotoState : function(newState)
    {
      if (transition[currentState][newState]())
        currentState = newState;
    },

    getCurrentState : function()
    {
      return currentState;
    }
  };

};

app.testfun = function(arg1, arg2)
{
  tools.log("app.testfun() called");
  tools.log("arg1 = " + arg1);
  if (arg2 != undefined)
    tools.log("arg2 = " + arg2);
  tools.log("----------");
}

app.gotoState = function(name)
{
  app.fsm.gotoState(name);
}

app.go = function() 
{
  tools.clear_console();
  tools.log("app.go() called");
  
  app.testfun("one","two");
  
  app.fsm = app.build_fsm();
  
  tools.log("Current state: " + app.fsm.getCurrentState())
  
  return true;
};
