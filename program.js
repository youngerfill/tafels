/* program.js */


var sd={};
var td={};


function onPageLoaded()
{
    document.title = "Tafels van vermenigvuldiging";
    buildSetupPanel();
    buildTestData();
}


function onTableChecked()
{
//    var btnStart = elem("btnStart");

    for (var i=1; i<=10; i++)
    {
        if (elem("cb"+indexToString(i)).checked)
        {
            updateMaxNumQuestions();
            return;
        }
    }


    updateMaxNumQuestions();
}


function onAllTablesChecked()
{
    for (var i=1; i<=10; i++)
    {
        cb = elem("cb"+indexToString(i));
        cb.checked=elem("cbat").checked;
    }

    updateMaxNumQuestions();
}


function onZeroIncludedChecked()
{
    updateMaxNumQuestions();
}


function updateMaxNumQuestions()
{
    numTablesSelected = 0;

    for (var i=1; i<=10; i++)
        if (elem("cb"+indexToString(i)).checked)
            numTablesSelected++;

    sd.maxNumQuestions = ((20-numTablesSelected)*numTablesSelected + ( elem("cbzi").checked ? 2*numTablesSelected+1 : 0 ) );

    var e = elem("txtNumQuestions");
    if (elem("cbAllQuestions").checked )
        e.value = sd.maxNumQuestions;
    else
        e.value =  Math.min(e.value, sd.maxNumQuestions);


    updateButtons();

}

function updateButtons()
{
    var e = elem("txtNumQuestions");
    var a = elem("cbAllQuestions");
    elem("btnNumQDec").disabled = a.checked || (parseInt(e.value) == 0);
    elem("btnNumQInc").disabled = a.checked || (parseInt(e.value) == sd.maxNumQuestions);

    btnStart.disabled = (parseInt(e.value) == 0) || (sd.maxNumQuestions <= 1);
}


function onNumQuestionsInc()
{
    var e = elem("txtNumQuestions");

    e.value = Math.max(0,parseInt(e.value));
    e.value = Math.min(sd.maxNumQuestions,parseInt(e.value) + 10);

    updateButtons();
}


function onNumQuestionsDec()
{
    var e = elem("txtNumQuestions");

    e.value = Math.min(sd.maxNumQuestions,parseInt(e.value));
    e.value = Math.max(0,parseInt(e.value) - 10);

    updateButtons();
}


function onAllQuestionsChecked()
{
    var e = elem("txtNumQuestions");

    if (elem("cbAllQuestions").checked)
    {
        e.value = sd.maxNumQuestions;
        e.disabled = true;
    }
    else
    {
        e.disabled = false;
    }

    updateButtons();
}


function onTxtNumQChanged()
{
    updateButtons();
}


function onStart()
{
    validateSetupPanel();
    buildTestData();
    buildTestPanel();
}


function buildTestData()
{

    var i,j,t;
    var multip;

//    td = {};

//    sd = {};
    sd.raffle_hat = [];
    sd.multip_grid = [];
//    sd.numQuestionsDesired = 20;
//    sd.maxNumQuestions = 0;

    for (i=0; i<=10; i++)
    {
        sd.multip_grid[i] = [];

        for (j=0; j<=10; j++)
            sd.multip_grid[i][j] = { "first": i, "second": j, "selected": false };
    }


    var zeroIncluded = elem("cbzi").checked;
    sd.multip_grid[0][0].selected = zeroIncluded;

    for (t=1; t<=10; t++)
    {
        ts = indexToString(t);
        if (elem("cb"+ts).checked)
        {
            for (i=zeroIncluded ? 0 : 1; i<=10; i++)
            {
                sd.multip_grid[i][t].selected = true;
                sd.multip_grid[t][i].selected = true;
            }
        }
    }


    for (i=0; i<=10; i++)
    {
        for (j=0; j<=10; j++)
        {
            multip = sd.multip_grid[i][j];
            if (multip.selected)
            {
                sd.raffle_hat.push(multip);
                multip.selected = false;
            }
        }
    }


    td.q=[];

    for (i=0; i<sd.numQuestionsDesired; i++)
    {
        if (sd.raffle_hat.length==0)
            break;

        var extracted = sd.raffle_hat.splice(getRandom(0,sd.raffle_hat.length-1),1);
        td.q[i] = extracted[0];
    }

}


function onFocusQuestion(is)
{
    elem("qi" + is).style.borderColor="black";
    elem("q" + is).style.borderColor="#DDDDDD";
}


function onBlurQuestion(is)
{
    elem("qi" + is).style.borderColor="transparent";
    elem("q" + is).style.borderColor="transparent";
}


function onKeyUpQuestion(event)
{
    var charCode = (typeof event.which === "number") ? event.which : event.keyCode;

    switch(charCode)
    {
        case 13:
//          execute code block 1
          break;
        case 38:
//          execute code block 2
          break;
        case 40:
//          execute code block 2
          break;
        default:
            print(charCode);
            break;
    }
}


function buildTestPanel()
{
    var s="";
    var is="";

    s += "<div id=\"testPanel\" class=\"paneldiv\">";
    for (var i=0; i<td.q.length; i++)
    {
        is = indexToString(i);
        s += "<div class=\"question\" id=\"q" + is + "\">";
        s += "<div class=\"qindex\">" + (i+1) + ".</div>";
        s += "<div class=\"qif\">";
        s += "<input type=\"text\" class=\"qinput\" id=\"qi" + is + "\" onfocus=\"onFocusQuestion('" + is + "')\" onblur=\"onBlurQuestion('" + is + "')\" onkeyup=\"onKeyUpQuestion(event)\">";
        s += "<div class=\"qfeedback\" id=\"qf" + is + "\"></div>";
        s += "</div>";
        s += "<div class=\"qtext\">" + td.q[i].first + " &times; " + td.q[i].second + " = </div>";
        s += "</div>";
    }

    s += "<input type=\"submit\" onclick=\"onSubmit()\" value=\"Klaar\" id=\"btnReady\">"
    s += "</div>";

    elem("main").innerHTML = s;
    elem("qi000").focus();
}



function buildSetupPanel()
{
    var s="";
    var is="";

    s += "<div id=\"setupPanel\" class=\"paneldiv\">";
    s += "<div>Kies de tafels die je wilt oefenen:</div>";
    s += "<div><label><input type=\"checkbox\" onclick=\"onAllTablesChecked()\" id=\"cbat\"/>Alle tafels</label></div>";
    s += "<div>De tafel van: "

    for (var i=1; i<=10; i++)
    {
        is = indexToString(i);
        s += "<label><input type=\"checkbox\" onclick=\"onTableChecked()\" id=\"cb" + is + "\"/>" + i + "</label>";
    }

    s += "</div>";
    s += "<div><label><input type=\"checkbox\" onclick=\"onZeroIncludedChecked()\" id=\"cbzi\"/>Ook vermenigvuldigingen met 0</label></div>";
    s += "<div><label><input type=\"checkbox\" id=\"cbdt\"/>Ook deeltafels</label></div>";
    s += "<div>Aantal oefeningen: ";
    s += "<input type=\"submit\" onclick=\"onNumQuestionsDec()\" value=\"-10\" id=\"btnNumQDec\">";
    s += "<input type=\"text\" id=\"txtNumQuestions\" onkeyup=\"onTxtNumQChanged()\">";
    s += "<input type=\"submit\" onclick=\"onNumQuestionsInc()\" value=\"+10\" id=\"btnNumQInc\">";
    s += "<label><input type=\"checkbox\" onclick=\"onAllQuestionsChecked()\" id=\"cbAllQuestions\">Alle mogelijkheden</label>";
    s += "</div>";
    s += "<div><input type=\"submit\" onclick=\"onStart()\" value=\"Start\" id=\"btnStart\"></div>";
    s += "</div>";


    elem("main").innerHTML = s;
    updateMaxNumQuestions();
}


function validateSetupPanel()
{
    var e = elem("txtNumQuestions");

    e.value = Math.max(0,parseInt(e.value));
    e.value = Math.min(sd.maxNumQuestions,parseInt(e.value));

    sd.numQuestionsDesired = parseInt(e.value);
//    print("sd.numQuestionsDesired = " + sd.numQuestionsDesired);
}

function validateAnswers()
{
    var is="";
    var answer=0;

    for (var i=0; i<td.q.length; i++)
    {
        is = indexToString(i);
        answer = parseInt(elem("qi"+is).value);
        if (answer == td.q[i].first * td.q[i].second)
        {
            elem("qf"+is).innerHTML = "OK";
        }
        else
        {
            elem("qf"+is).innerHTML = "X";
        }
    }
}


function onSubmit()
{
    validateAnswers();
}


function onAction()
{
    print("onAction() called");
}
