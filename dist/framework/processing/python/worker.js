var pyScript;
onmessage = function (event) {
    var eventType = event.data.eventType;
    switch (eventType) {
        case 'initialise':
            initialise().then(function () {
                self.postMessage({ eventType: 'initialiseDone' });
            });
            break;
        case 'loadScript':
            loadScript(event.data.script);
            self.postMessage({ eventType: 'loadScriptDone' });
            break;
        case 'firstRunCycle':
            pyScript = self.pyodide.runPython(pyWorker());
            runCycle(null);
            break;
        case 'nextRunCycle':
            var response = event.data.response;
            unwrap(response).then(function (userInput) {
                runCycle(userInput);
            });
            break;
        default:
            console.log('[ProcessingWorker] Received unsupported event: ', eventType);
    }
};
function runCycle(payload) {
    console.log('[ProcessingWorker] runCycle ' + JSON.stringify(payload));
    scriptEvent = pyScript.send(payload);
    self.postMessage({
        eventType: 'runCycleDone',
        scriptEvent: scriptEvent.toJs({
            create_proxies: false,
            dict_converter: Object.fromEntries
        })
    });
}
function unwrap(response) {
    console.log('[ProcessingWorker] unwrap response: ' + JSON.stringify(response.payload));
    return new Promise(function (resolve) {
        switch (response.payload.__type__) {
            case 'PayloadFile':
                copyFileToPyFS(response.payload.value, resolve);
                break;
            default:
                resolve(response.payload);
        }
    });
}
function copyFileToPyFS(file, resolve) {
    var reader = file.stream().getReader();
    var pyFile = self.pyodide.FS.open(file.name, 'w');
    var writeToPyFS = function (_a) {
        var done = _a.done, value = _a.value;
        if (done) {
            resolve({ __type__: 'PayloadString', value: file.name });
        }
        else {
            self.pyodide.FS.write(pyFile, value, 0, value.length);
            reader.read().then(writeToPyFS);
        }
    };
    reader.read().then(writeToPyFS);
}
function initialise() {
    console.log('[ProcessingWorker] initialise');
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js');
    console.log('[ProcessingWorker] loading Pyodide');
    return loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.21.2/full/'
    }).then(function (pyodide) {
        console.log('[ProcessingWorker] loading packages');
        self.pyodide = pyodide;
        return self.pyodide.loadPackage(['micropip', 'numpy', 'pandas']);
    });
}
function loadScript(script) {
    console.log('[ProcessingWorker] loadScript');
    self.pyodide.runPython(pyPortApi);
    self.pyodide.runPython(script);
}
var pyPortApi = "\nclass CommandUIRender:\n  __slots__ = \"page\"\n  def __init__(self, page):\n    self.page = page\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"CommandUIRender\"\n    dict[\"page\"] = self.page.toDict()\n    return dict\n\nclass CommandSystemDonate:\n  __slots__ = \"key\", \"data\"\n  def __init__(self, key, data):\n    self.key = key\n    self.data = data\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"CommandSystemDonate\"\n    dict[\"key\"] = self.key\n    dict[\"data\"] = self.data\n    return dict\n\n\nclass PropsUIHeader:\n  __slots__ = \"title\"\n  def __init__(self, title):\n    self.title = title\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIHeader\"\n    dict[\"title\"] = self.title.toDict()\n    return dict\n\n\nclass PropsUIPromptConfirm:\n  __slots__ = \"text\", \"ok\", \"cancel\"\n  def __init__(self, text, ok, cancel):\n    self.text = text\n    self.ok = ok\n    self.cancel = cancel\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptConfirm\"\n    dict[\"text\"] = self.text.toDict()\n    dict[\"ok\"] = self.ok.toDict()\n    dict[\"cancel\"] = self.cancel.toDict()\n    return dict\n\n\nclass PropsUISpinner:\n  __slots__ = \"text\"\n  def __init__(self, text):\n    self.text = text\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUISpinner\"\n    dict[\"text\"] = self.text.toDict()\n    return dict\n\n\nclass PropsUIPromptConsentForm:\n  __slots__ = \"title\", \"description\", \"tables\"\n  def __init__(self, title, description, tables):\n    self.title = title\n    self.description = description            \n    self.tables = tables\n  def translate_tables(self):\n    tables_output = []\n    for table in self.tables:\n      tables_output.append(table.toDict())\n    return tables_output\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptConsentForm\"\n    dict[\"title\"] = self.title.toDict()\n    dict[\"description\"] = self.description.toDict()\n    dict[\"tables\"] = self.translate_tables()\n    return dict\n\n\nclass PropsUIPromptConsentFormTable:\n  __slots__ = \"id\", \"title\", \"data_frame\"\n  def __init__(self, id, title, data_frame):\n    self.id = id\n    self.title = title\n    self.data_frame = data_frame\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptConsentFormTable\"\n    dict[\"id\"] = self.id\n    dict[\"title\"] = self.title\n    dict[\"data_frame\"] = self.data_frame.to_json()\n    return dict\n\n\nclass PropsUIPromptFileInput:\n  __slots__ = \"title\", \"description\", \"extensions\"\n  def __init__(self, title, description, extensions):\n    self.title = title\n    self.description = description\n    self.extensions = extensions\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptFileInput\"\n    dict[\"title\"] = self.title.toDict()\n    dict[\"description\"] = self.description.toDict()\n    dict[\"extensions\"] = self.extensions\n    return dict\n\n\nclass PropsUIPromptRadioInput:\n  __slots__ = \"title\", \"description\", \"items\"\n  def __init__(self, title, description, items):\n    self.title = title\n    self.description = description\n    self.items = items\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptRadioInput\"\n    dict[\"title\"] = self.title.toDict()\n    dict[\"description\"] = self.description.toDict()\n    dict[\"items\"] = self.items\n    return dict\n\n\nclass PropsUIPageDonation:\n  __slots__ = \"header\", \"body\", \"spinner\"\n  def __init__(self, header, body, spinner):\n    self.header = header\n    self.body = body\n    self.spinner = spinner\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPageDonation\"\n    dict[\"header\"] = self.header.toDict()\n    dict[\"body\"] = self.body.toDict()\n    dict[\"spinner\"] = self.spinner.toDict()\n    return dict\n\n\nclass PropsUIPageStart:\n  __slots__ = \"header\", \"spinner\"\n  def __init__(self, header, spinner):\n    self.header = header\n    self.spinner = spinner\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPageStart\"\n    dict[\"header\"] = self.header.toDict()\n    dict[\"spinner\"] = self.spinner.toDict()\n    return dict\n\n\nclass PropsUIPageEnd:\n  __slots__ = \"header\" \n  def __init__(self, header):\n    self.header = header\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPageEnd\"\n    dict[\"header\"] = self.header.toDict()\n    return dict\n\n\nclass Translatable:\n  __slots__ = \"translations\"\n  def __init__(self, translations):\n    self.translations = translations\n  def toDict(self):\n    dict = {}\n    dict[\"translations\"] = self.translations\n    return dict  \n";
function pyWorker() {
    return "\n  from collections.abc import Generator\n  import json\n  import html\n  import pandas as pd\n\n\n  class ScriptWrapper(Generator):\n    def __init__(self, script):\n        self.script = script\n    def send(self, data):\n        command = self.script.send(data)\n        return command.toDict()\n    def throw(self, type=None, value=None, traceback=None):\n        raise StopIteration\n  script = process()\n  ScriptWrapper(script)\n  ";
}
