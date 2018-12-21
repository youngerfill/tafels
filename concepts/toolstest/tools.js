
function popup(msg)
{
    window.alert(msg);
}




function print(msg)
{
    elem("footer").innerHTML += msg + "<br>";
}




function getRandom(from,to)
{
    return Math.floor((Math.random()*(to-from+1))+from); 
}







function indexToString(n)
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
}




function elem(id)
{
    return document.getElementById(id);
}




function old_IE() 
{ 
	return (navigator.userAgent.toLowerCase().indexOf('msie') != -1); 
} 



if (old_IE())
{
	has = function (array,elem) {
			for (var i=0; i<array.length; i++)
				if(array[i]==elem)
            				return true;
    			return false;};
}
else
{
	has = function (array,elem) { return (a.indexOf(elem) != -1);};
}
