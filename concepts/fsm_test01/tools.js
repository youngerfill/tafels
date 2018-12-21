var tools = tools || {};



tools.getRandom = function (from,to)
{
    return Math.floor((Math.random()*(to-from+1))+from); 
};

tools.indexToString = function (n)
{
    var s="";

    if (n<100)
    {
        s += "0";
        if (n<10)
        {
            s += "0";
        }
    }
    s += n;

    return s;
};

tools.elem = function (id)
{
    return document.getElementById(id);
};

tools.old_IE = function () 
{ 
	return (navigator.userAgent.toLowerCase().indexOf('msie') != -1); 
} 

if (tools.old_IE())
{
	tools.has = function (array,elem) {
			for (var i=0; i<array.length; i++)
				if(array[i]==elem)
            				return true;
    			return false;};
}
else
{
	tools.has = function (array,elem) { return (a.indexOf(elem) != -1); };
}


tools.clear_console = function()
{
  window.console && window.console.clear();
};


tools.log = function(msg)
{
  window.console && console.log(msg);
};


tools.print = function(msg)
{
  window.console && console.log(msg);
};


tools.info = function(msg)
{
  window.console && console.info(msg);
};


tools.warn = function(msg)
{
  window.console && console.warn(msg);
};


tools.error = function(msg)
{
  window.console && console.error(msg);
};

