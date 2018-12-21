var app = app || {};

var buttonClicked = false;
var clickedMsg = ""; 
var clickedHtml = "";

app.onButtonClicked = function()
{
	if (buttonClicked)
		tools.appendToElement(tools.elem("idMessage"), clickedHtml);
	else
		tools.setElement(tools.elem("idMessage"), clickedHtml);
		
	buttonClicked = true;
}

app.theHtml = function()
{
	var s="";
	s += "<div class=\"dialog\">";
	s += "<input type=\"button\" id=\"idButton\" value=\"" + TR("Press here") + "\" onclick=\"app.onButtonClicked()\">";
	s += "</div>";
	s += "<div id=\"idMessage\" class=\"dialog\">" + TR("Press the button") + "</div>";
	return s;
}

app.onLangLoaded = function()
{
	tools.log("app's own onLangLoaded()");
	
	clickedMsg = TR("Good job!");
	clickedHtml = "<div>" + clickedMsg + "</div>";
}

app.go = function()
{
  tools.clear_console();
  tools.log("app.go() called");
  
  i18n.loadLanguage("nl", app.onLangLoaded);
//  tools.loadScript("lang-en.js", function(){ app.onLanguageLoaded("en"); }, "idModuleScript");

  tools.setElement(tools.body(), app.theHtml());

  return true;
};
