declare function runCycle(payload: any): void;
declare function unwrap(response: any): Promise<any>;
declare function copyFileToPyFS(file: any, resolve: any): void;
declare function initialise(): any;
declare function loadScript(script: any): void;
declare function pyWorker(): string;
declare let pyScript: any;
declare const pyPortApi: "\nclass CommandUIRender:\n  __slots__ = \"page\"\n  def __init__(self, page):\n    self.page = page\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"CommandUIRender\"\n    dict[\"page\"] = self.page.toDict()\n    return dict\n\nclass CommandSystemDonate:\n  __slots__ = \"key\", \"json_string\"\n  def __init__(self, key, json_string):\n    self.key = key\n    self.json_string = json_string\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"CommandSystemDonate\"\n    dict[\"key\"] = self.key\n    dict[\"json_string\"] = self.json_string\n    return dict\n\n      \nclass PropsUIHeader:\n  __slots__ = \"title\"\n  def __init__(self, title):\n    self.title = title\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIHeader\"\n    dict[\"title\"] = self.title.toDict()\n    return dict\n\n\nclass PropsUIPromptConfirm:\n  __slots__ = \"text\", \"ok\", \"cancel\"\n  def __init__(self, text, ok, cancel):\n    self.text = text\n    self.ok = ok\n    self.cancel = cancel\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptConfirm\"\n    dict[\"text\"] = self.text.toDict()\n    dict[\"ok\"] = self.ok.toDict()\n    dict[\"cancel\"] = self.cancel.toDict()\n    return dict\n\n\nclass PropsUISpinner:\n  __slots__ = \"text\"\n  def __init__(self, text):\n    self.text = text\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUISpinner\"\n    dict[\"text\"] = self.text.toDict()\n    return dict\n\n\nclass PropsUIPromptConsentForm:\n  __slots__ = \"title\", \"description\", \"tables\", \"meta_tables\"\n  def __init__(self, title, description, tables, meta_tables):\n    self.title = title\n    self.description = description            \n    self.tables = tables\n    self.meta_tables = meta_tables\n  def translate_tables(self):\n    output = []\n    for table in self.tables:\n      output.append(table.toDict())\n    return output\n  def translate_meta_tables(self):\n    output = []\n    for table in self.meta_tables:\n      output.append(table.toDict())\n    return output\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptConsentForm\"\n    dict[\"title\"] = self.title.toDict()\n    dict[\"description\"] = self.description.toDict()\n    dict[\"tables\"] = self.translate_tables()\n    dict[\"metaTables\"] = self.translate_meta_tables()\n    return dict\n\n\nclass PropsUIPromptConsentFormTable:\n  __slots__ = \"id\", \"title\", \"data_frame\"\n  def __init__(self, id, title, data_frame):\n    self.id = id\n    self.title = title\n    self.data_frame = data_frame\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptConsentFormTable\"\n    dict[\"id\"] = self.id\n    dict[\"title\"] = self.title\n    dict[\"data_frame\"] = self.data_frame.to_json()\n    return dict\n\n\nclass PropsUIPromptFileInput:\n  __slots__ = \"title\", \"description\", \"extensions\"\n  def __init__(self, title, description, extensions):\n    self.title = title\n    self.description = description\n    self.extensions = extensions\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptFileInput\"\n    dict[\"title\"] = self.title.toDict()\n    dict[\"description\"] = self.description.toDict()\n    dict[\"extensions\"] = self.extensions\n    return dict\n\n\nclass PropsUIPromptRadioInput:\n  __slots__ = \"title\", \"description\", \"items\"\n  def __init__(self, title, description, items):\n    self.title = title\n    self.description = description\n    self.items = items\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPromptRadioInput\"\n    dict[\"title\"] = self.title.toDict()\n    dict[\"description\"] = self.description.toDict()\n    dict[\"items\"] = self.items\n    return dict\n\n\nclass PropsUIPageDonation:\n  __slots__ = \"header\", \"body\", \"spinner\"\n  def __init__(self, header, body, spinner):\n    self.header = header\n    self.body = body\n    self.spinner = spinner\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPageDonation\"\n    dict[\"header\"] = self.header.toDict()\n    dict[\"body\"] = self.body.toDict()\n    dict[\"spinner\"] = self.spinner.toDict()\n    return dict\n\n\nclass PropsUIPageStart:\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPageStart\"\n    return dict\n\n\nclass PropsUIPageEnd:\n  __slots__ = \"header\" \n  def __init__(self, header):\n    self.header = header\n  def toDict(self):\n    dict = {}\n    dict[\"__type__\"] = \"PropsUIPageEnd\"\n    dict[\"header\"] = self.header.toDict()\n    return dict\n\n\nclass Translatable:\n  __slots__ = \"translations\"\n  def __init__(self, translations):\n    self.translations = translations\n  def toDict(self):\n    dict = {}\n    dict[\"translations\"] = self.translations\n    return dict  \n";
