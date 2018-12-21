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
        var buttonNode = function(name, nextState)
		{
			return tools.styledButton("btn" + name + nextState, "Go to state " + nextState, function(){app.gotoState(nextState); return false;}, true);
		}

		var testCode = function()
		{
			tools.elem("dialogwrapper").appendChild(
				tools.createElement(
					"div",
					{ className: "myClass" },
					[
						"div",
						{ className: "yourClass" },
						[
							"div",
							{ className: "myClass" },
							[
								[ "span" ],
								[
									"span",
									{ className: "someSpan" }
								],
								[
									"span",
									[
										"span"
									]
								]
							]
						]
					]
					)
				);
/*				
			tools.elem("dialogwrapper").appendChild(
				tools.createElement(
					"div",
					{ className: "myClass" },
					[ 	[
							"div",
							{ className: "yourClass" },
							[	[
								"div",
								{ className: "myClass" },
								[	[
									"span"
									]
								]
								]
							]
						]
					]
					)
				);
*/				
/*			var elements = tools.getElementsByClassName(tools.body(), "myClass");
			
			tools.log("# elements found: " + elements.length);

			var aNumber = 5;
			var aString = "haha";
			var anArray = [ 1, 2, 3 ];
			var anObject = { id: "someId", value: 37 };
			
			tools.log("typeof aNumber : " + typeof aNumber);
			tools.log("typeof aString : " + typeof aString);
			tools.log("typeof anArray : " + typeof anArray);
			tools.log("typeof anObject : " + typeof anObject);
			
			tools.log("anArray.length : " + anArray.length);
			tools.log("anObject.length : " + anObject.length);
			
			tools.log("tools.isArray(aNumber): " + tools.isArray(aNumber));
			tools.log("tools.isArray(anArray): " + tools.isArray(anArray));
			tools.log("tools.isArray(anObject): " + tools.isArray(anObject));*/
			
/*		
			var myArray = [ "one", "two", "three", "four", "five" ];
			var myWord = "five";
			var found = tools.has(myArray, myWord);

			tools.log("'" + myWord + "' was " + (found ? "" : "not ") + "found in myArray");
*/			
/*			var cutoff = 3;
			
			var interrupted = tools.forEach(
				myArray, 
				function(elem, idx) {
					tools.log("Element #" + idx + " in array: '" + elem + "'");
					if (idx<cutoff)
						return false;
					else
						return true;
					},
				true
				);
				
			tools.log("The loop was " + (interrupted ? "" : "not ") + "interrupted.");*/
			
		}

		var onAClicked = function()
		{
			tools.log("A clicked");
			tools.enableElementTree(tools.elem("wrapperA"), false);
			tools.enableElementTree(tools.elem("wrapperB"), true);
		}
		
		var onBClicked = function()
		{
			tools.log("B clicked");
			tools.enableElementTree(tools.elem("wrapperA"), true);
			tools.enableElementTree(tools.elem("wrapperB"), false);
		}

        var addDialog = function(name, state1, state2)
        {
			tools.elem("dialogwrapper").appendChild(
				tools.createElement(
					"div", 
					{ id: "dialog" + name, className: "dialog ignoreenable", innerHTML: name},
					[ buttonNode(name, state1), buttonNode(name, state2) ]
					)
				);
        };

        var addErrorDialog = function(prevState)
        {
			tools.elem("dialogwrapper").appendChild(
				tools.createElement(
					"div", 
					{ id: "idErrorDialog", className: "errorDialog", innerHTML: "Error" },
					[ tools.styledButton("btnOK", "OK", function(){app.gotoState(prevState)}, true) ]
					)
				);
        };

        var removeDialog = function(name)
        {
            tools.deleteElementById("dialog" + name);
        };

        var enableDialog = function(name, enable)
        {
			tools.enableElementTree(document.getElementById("dialog" + name), enable);
        };

        var gotoState = function(newState)
        {
            var oldState = currentState;
			
            tools.info("Transition from '" + currentState + "' to '" + newState + ".");
				
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
            gotoState : gotoState,
            testCode : testCode,
            onAClicked : onAClicked,
            onBClicked : onBClicked,
        };

    }(); // app

//	app.gotoState("A");

	app.testCode();
/*
	var myObject = { "one" : "The string of one", "two" : "The string of two" };
	var key="";
	
	for (key in myObject)
	{
		tools.log("key = '" + key + "', value = '" + myObject[key] + "'");
	}
*/	
}; // go()
