
function popup(msg)
{
    window.alert(msg);
}


function print(msg)
{
    document.getElementById("footer").innerHTML += msg + "<br>";
}

function getRandom(from,to)
{
    return Math.floor((Math.random()*(to-from+1))+from); 
}

function hasElement(array,elem)
{
    for (var i=0; i<array.length; i++)
        if(array[i]==elem)
            return true;

    return false;
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

