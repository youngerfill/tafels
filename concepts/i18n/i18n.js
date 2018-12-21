var i18n = i18n || {};

function TR(key)
{
	var translation = language_dictionary[key];
	
	if (translation)
		return translation;
	else
	{
		tools.warn("Could not find translation of '" + key + "' in 'lang-" + language + ".js'");
		return key;
	}
}

i18n.onLanguageLoaded = function(lang)
{
	tools.log("Language loaded: " + lang);
	
	var key = "lone";
	tools.log("key: " + key);
	tools.log("translation: " + TR(key));
};

i18n.loadLanguage = function(lang, onLoaded)
{
	var onScriptLoaded = undefined;
	
	if (onLoaded)
		onScriptLoaded = function(){ i18n.onLanguageLoaded(lang); onLoaded(); };
	else
		onScriptLoaded = function(){ i18n.onLanguageLoaded(lang); };
		
	tools.loadScript("lang-" + lang + ".js", onScriptLoaded, "idLangScript");
};
