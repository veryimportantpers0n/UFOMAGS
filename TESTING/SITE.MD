
Assigning Icons: You can now explicitly assign an icon by adding ICON: [NAME] to the accessNotes field in your JSON files. Options:
ICON: ALIEN -> Alien Head
ICON: CRAFT -> Ufo Craft
ICON: FULLREPORT -> Full Report Folder
ICON: INTELLIGENCE -> Intel Folder
ICON: LEGAL -> Legal Document
ICON: LOGS -> Log File
ICON: MAGAZINE -> Magazine
ICON: RESEARCH -> Research Atom
Example:
json
"accessNotes": "Top Secret. ICON: ALIEN"
Note: If you don't speicify one, it will try to guess based on existing keywords like "log", "report", etc., or use the category default.