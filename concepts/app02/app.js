var app = {};

var go = function()
{
    tools.clear_console();

    app = function create_app()
    {
        var states = [ "null", "A", "B", "C", "E" ];
        var transition = {};
        var currentState = "null";
        var previousState = "null";

        ////////////////////////////////////////////////////////////
        // Create transition table and fill it by default
        // with "not allowed" transition functions.
        for (var i=0; i<states.length; i++)
        {
            transition[states[i]] = {};
            for (var j=0; j<states.length; j++)
                transition[states[i]][states[j]] = function() { return false; };
        }

        ////////////////////////////
        // Helper functions
        var buttonHTML = function(name, nextState)
        {
            var s = "";
            s += "<div><input type=\"submit\" onclick=\"app.gotoState('" + nextState + "')";
            s += "\" value=\"Go to state " + nextState + "\" id=\"btn" + name + nextState + "\"></div>";
            return s;
        };

        var addDialog = function(name, state1, state2)
        {
            var s = tools.elem("dialogwrapper").innerHTML;
            s += "<div id=\"dialog" + name + "\" class=\"dialog\">";
            s += name;
            s += buttonHTML(name, state1);
            if (state2 != undefined)
                s += buttonHTML(name, state2);
            tools.elem("dialogwrapper").innerHTML = s;
        };

        var addErrorDialog = function(prevState)
        {
            var s = tools.elem("dialogwrapper").innerHTML;
            s += "<div id=\"idErrorDialog\" class=\"errorDialog\">";
            s += "Error";
            s += "<div><input type=\"submit\" onclick=\"app.gotoState('" + prevState + "')";
            s += "\" value=\"OK\" id=\"btnOK\"></div></div>";
            tools.elem("dialogwrapper").innerHTML = s;
        };

        var removeDialog = function(name)
        {
            tools.elem("dialog" + name).outerHTML = "";
        };

        var enableDialog = function(name, enable)
        {
            var nodes = document.getElementById("dialog" + name).getElementsByTagName('*');
            for (var i=0; i<nodes.length; i++)
            {
                nodes[i].disabled = !enable;
            }
        };

        var gotoState = function(newState)
        {
            var oldState = currentState;
            if (transition[currentState][newState]())
                currentState = newState;
            else
            {
                tools.warn("Transition from '" + oldState + "' to '" + newState + "' not allowed.");

                if (transition[currentState]["E"]())
                    currentState = "E";
                else
                    tools.error("Transition from '" + oldState + "' to 'E' failed!.");
                    return;
            }
            tools.info("Transition from '" + oldState + "' to '" + currentState + "'");
        };

        ////////////////////////////
        // Allowed transitions
        transition["null"]["A"] = function()
        {
            addDialog("A", "B", "C");
            return true;
        };

        transition["A"]["B"] = function()
        {
            addDialog("B", "A", "C");
            enableDialog("A", false);
            return true;
        };

        transition["B"]["A"] = function()
        {
            removeDialog("B");
            enableDialog("A", true);
            return true;
        };

        transition["B"]["C"] = function()
        {
            addDialog("C", "A", "B");
            enableDialog("B", false);
            return true;
        };

        transition["C"]["B"] = function()
        {
            removeDialog("C");
            enableDialog("B", true);
            return true;
        };

        transition["A"]["E"] = function()
        {
            enableDialog(currentState, false);
            addErrorDialog(currentState);
            previousState = currentState;
            return true;
        };

        transition["B"]["E"] = transition["A"]["E"];
        transition["C"]["E"] = transition["A"]["E"];

        transition["E"]["A"] = function()
        {
            tools.elem("idErrorDialog").outerHTML = "";
            enableDialog(previousState, true);
            return true;
        };

        transition["E"]["B"] = transition["E"]["A"];
        transition["E"]["C"] = transition["E"]["A"];

        //////////////////////////////
        // app's public interface
        return {
            gotoState : gotoState
        };

    }(); // app

    app.gotoState("A");

}; // go()
