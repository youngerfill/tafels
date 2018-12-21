var app = app || {};

app.enableElement = function(el, en, remember)
{
    var enable_core = function(el, en)
        {
            el.disabled = !en;
            if (!en)
                tools.addClass(el, "disabled");
            else
                tools.removeClass(el, "disabled");
        }

    if (el)
        if (!en)
        {
            if (remember)
                el.previous_disabled = tools.hasClass(el, "disabled");
            enable_core(el, false);
        }
        else
            enable_core(el, remember ? !el.previous_disabled : true);
};

app.enableElementTree = function(el, en, remember)
{
    var children = [];

    app.enableElement(el, en, remember);

    children = tools.getAllElements(el);
    if (children)
        for (var i=0; i<children.length; i++)
            app.enableElement(children[i], en, remember);
};

app.onDisableSpan = function()
{
    var enable = !tools.elem("idCheckboxDisableSpan").checked;

    tools.log("app.onDisableSpan(), idCheckboxDisableSpan : " + !enable);

    app.enableElement(tools.elem("idSpan"), enable);
};

app.onDisableDialog = function()
{
    var enable = !tools.elem("idCheckboxDisableDialog").checked;

    tools.log("app.onDisableDialog(): idCheckboxDisableDialog : " + enable);

    app.enableElementTree(tools.elem("idDialog"), enable, true);
};

app.go = function()
{
  tools.clear_console();
  tools.log("app.go() called");

  tools.log(tools.hasName("one two three", "two"));

  return true;
};
