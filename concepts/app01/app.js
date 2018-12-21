var app = app || {};

var createApp = function()
{
  var state = "Ready";
  
  return {
    sayHi : function()
    {
      tools.log("Hi!");
    },
    
    showState : function()
    {
      tools.log("state == '" + state + "'");
    }
  };
};

var go = function() 
{
  tools.clear_console();
  app = createApp();
  tools.log("app is ready!");
  return true;
};
