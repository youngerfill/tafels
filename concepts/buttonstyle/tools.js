var tools = tools || {};

tools.indexToString = function (n)
{
    var s="";

    if (n<100)
    {
        s += "0";
        if (n<10)
            s += "0";
    }
    s += n;

    return s;
};

tools.isArray = ('isArray' in Array) ? Array.isArray : function (value) {
	return Object.prototype.toString.call(value) === '[object Array]';
};


tools.getRandom = function (from,to)
{
    return Math.floor((Math.random()*(to-from+1))+from);
};


tools.elem = function (id)
{
    return document.getElementById(id);
};


tools.body = function ()
{
    return document.getElementsByTagName("body")[0];
};

// TODO : to be removed (HTML --> DOM)
tools.setElement = function(element, html)
{
    if ( (element) && (html) )
        element.innerHTML = html;
};

tools.deleteChildren = function(element)
{
    if (element)
		while (element.firstChild)
			element.removeChild(element.firstChild);
};

// TODO : to be removed (HTML --> DOM)
tools.appendToElement = function(element, html)
{
    if ( (element) && (html) )
    {
        var wrapper = document.createElement('div');
        if (wrapper)
        {
            wrapper.innerHTML = html;

            while (wrapper.firstChild)
                element.appendChild(wrapper.firstChild);
        }
    }
};


tools.deleteElementById = function(id)
{
    var element = document.getElementById(id);

    if (element)
        if (element.parentNode)
            element.parentNode.removeChild(element);
};

tools.createElement = function(type, arg2, arg3)
{
	var theNode = undefined;
	var key="";
	var i=0;
	var properties = undefined;
	var children = undefined;

	if (type)
	{
		if (type == "span")
		{
			tools.log("type: " + type);
		}
		
		if (tools.isArray(arg3))
		{
			properties = arg2;
			children = arg3;
		}
		else
			if (tools.isArray(arg2))
				children = arg2;
			else
				properties = arg2;
	
		theNode = document.createElement(type);
		
		if (theNode)
		{
			if (properties)
				for (key in properties)
					theNode[key] = properties[key];
					
			if (children)
				if (typeof children[0] === "string")
					theNode.appendChild(tools.createElement(children[0], children[1], children[2]));
				else
					tools.forEach(
						children,
						function(elem){
							if (tools.isArray(elem))
								theNode.appendChild(tools.createElement(elem[0], elem[1], elem[2]));
							else
								theNode.appendChild(elem);
							}
						);
		}
	}

	return theNode;
}

tools.oldIE = function ()
{
    return (navigator.userAgent.toLowerCase().indexOf('msie') != -1);
};

if (tools.oldIE())
{
    tools.has = function (array,elem) {
		return tools.forEach(
			array,
			function(arrayElem){ 
				if (arrayElem == elem)
					return true;
				},
			true
			);
		};
}
else
{
    tools.has = function (array,elem) { return (a.indexOf(elem) != -1); };
}


if (document.getElementsByClassName)
{
    tools.getElementsByClassName = function(rootElem, className)
    {
        return rootElem.getElementsByClassName(className);
    };
}
else
{
    tools.getElementsByClassName = function(rootElem, className)
    {
        var i = 0;
        var j = 0;
        var a = [];
        var els = rootElem.getElementsByTagName("*");
		tools.forEach(
			els,
			function(elem){
				if (tools.hasClass(elem, className))
					a.push(elem);
				}
			)
        return a;
    };
}

tools.getAllElements = function(rootElem)
{
    if (rootElem)
        return rootElem.getElementsByTagName("*");
    else
        return false;
};

tools.forEach = function(array, loopFun, breakable)
{
	var i=0, element;
	while (element = array[i++])
		if (breakable)
		{
			if (loopFun(element,i))
				return true;
		}
		else
			loopFun(element,i);

	return false;
};

tools.clear_console = function()
{
    window.console && window.console.clear();
};

tools.outputEnabled = true;
tools.logEnabled = true;
tools.infoEnabled = true;
//tools.printEnabled = true;
tools.warnEnabled = true;
tools.errorEnabled = true;

tools.log = function(msg)
{
    tools.outputEnabled && tools.logEnabled && window.console && window.console.log(msg);
};

/*
tools.print = function(msg)
{
    tools.outputEnabled && tools.printEnabled && window.console && window.console.log(msg);
};
*/

tools.info = function(msg)
{
    tools.outputEnabled && tools.infoEnabled && window.console && window.console.info(msg);
};


tools.warn = function(msg)
{
    tools.outputEnabled && tools.warnEnabled && window.console && window.console.warn(msg);
};


tools.error = function(msg)
{
    tools.outputEnabled && tools.errorEnabled && window.console && window.console.error(msg);
};


tools.loadScript = function(filename, onload, element_id)
{
    var elem;

    if (filename.slice(-3) == ".js")
    {
        elem = document.createElement('script');
        elem.type = "text/javascript";
        elem.src = filename;
    }
    else
    {
        elem = document.createElement('link');
        elem.rel = "stylesheet";
        elem.type = "text/css";
        elem.href = filename;
    }

    elem.async = true;

    if (element_id)
      elem.id = element_id;

    if (onload)
        if (tools.oldIE())
            elem.onreadystatechange = function()
                {
                    if (this.readyState == 'complete')
                        onload();
                }
        else
            elem.onload = onload;

    if (element_id)
    {
      var old_elem = tools.elem(element_id);
      if (old_elem)
      {
        document.getElementsByTagName("head")[0].replaceChild(elem, old_elem);
        return;
      }
    }

    document.getElementsByTagName("head")[0].appendChild(elem);
};


if (String.prototype.trim)
{
  tools.trim = function(s) {
      return s.trim();
    };
}
else
{
  tools.trim = function(s) {
      return s.replace(/^\s+|\s+$/g,"");
    };
}

tools.hasName = function(s, name)
{
  return (s.search(new RegExp("\\b" + name + "\\b", "g"))!=-1);
}

tools.addName = function(s,name)
{
  if (s.search(new RegExp("\\b" + name + "\\b", "g")) == -1)
    return s + " " + name;
  else
    return s;
};

tools.removeName = function(s,name)
{
  return tools.trim(s.replace(new RegExp("\\b" + name + "\\b", "g"), "").replace(/\s{2,}/g, " "));
};

tools.hasClass = function(e, className)
{
  if (e)
    return tools.hasName(e.className, className);
};

tools.addClass = function(e, className)
{
  if (e)
    e.className = tools.addName(e.className, className);
};

tools.removeClass = function(e, className)
{
  if (e)
    e.className = tools.removeName(e.className, className);
};

tools.styledButtonChild = function(label, onclick, enable)
{
	if (enable)
	{
		return tools.createElement(
			"a", 
			{ 
				"className" : "ignoreenable",
				"innerHTML" : label, 
				"href" : "#", 
				"onclick" : onclick, 
				"data-onclick" : onclick 
			}
			);
	}
	else
	{
		return tools.createElement(
			"span", 
			{
				"className": "ignoreenable",
				"innerHTML": label,
				"data-onclick": onclick
			}
			);
	}

	return child;
};

tools.enableString = { "false" : "disabled", "true" : "enabled"};

tools.styledButton = function(id, label, onclick, enable, extraClasses)
{
	var classString = "styledButton " + tools.enableString[enable];

	if (extraClasses)
		classString += " " + extraClasses;

	return tools.createElement(
		"div", 
		{ id:id, className:classString},
		[ tools.styledButtonChild(label, onclick, enable) ]
		);
};

tools.enableElement = function(el, enable, remember)
{
	var enable_core = function(el, enable)
		{
			if (tools.hasClass(el, "styledButton"))
			{
				if ((tools.hasClass(el, tools.enableString[!enable])))
				{
					var oldChild = el.firstChild;
					if (oldChild)
					{
						var newChild = tools.styledButtonChild(oldChild.innerHTML, oldChild["data-onclick"], enable);
						if (newChild)
						{
							el.removeChild(oldChild);
							el.appendChild(newChild);
						}
					}
				}
			}
			else
				el.disabled = !enable;

			tools.removeClass(el, tools.enableString[!enable]);
			tools.addClass(el, tools.enableString[enable]);
		}

	if (el)
		if (!tools.hasClass(el, "ignoreenable"))
			if (!enable)
			{
				if (remember)
					el.previous_disabled = tools.hasClass(el, "disabled");
				enable_core(el, false);
			}
			else
				enable_core(el, remember ? !el.previous_disabled : true);
};

tools.enableElementTree = function(el, enable, remember)
{
	var children = [];

	if (el)
	{
		tools.enableElement(el, enable, remember);

		children = tools.getAllElements(el);
		if (children)
			tools.forEach(
				children, 
				function(elem){
					tools.enableElement(elem, enable, remember);
					}
				);
	}
	else
		tools.warn("tools.enableElementTree() : arg 'el' undefined");
};
