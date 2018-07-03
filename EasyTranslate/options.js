window.onload = function () {
    var default_sl;
    chrome.storage.local.get("sl", function (result) {
        default_sl = result.key;
        console.log(default_sl);
    });
    var default_tl;
    chrome.storage.local.get("tl", function (result) {
        default_tl = result.key;
        console.log(default_tl);
    });
    
    var source_language = document.getElementById("sl");
    var target_language = document.getElementById("tl");

    languages.forEach(element => {
        if (element.value == default_sl) {
            source_language.options.add(new Option(element.name, element.value, true, true));
        } else {
            source_language.options.add(new Option(element.name, element.value));
        }

        if (element.value == default_tl) {
            target_language.options.add(new Option(element.name, element.value, true, true));
        } else {
            target_language.options.add(new Option(element.name, element.value));
        }
    });

    source_language.onchange = function () {
        saveOption("sl", source_language.options[source_language.selectedIndex].value);
        console.log("sl = " + chrome.storage.local.get("sl", function (items) {
            console.log("sl not found!");
        }));
    };

    target_language.onchange = function () {
        saveOption("tl", target_language.options[target_language.selectedIndex].value);
        console.log("tl = " + chrome.storage.local.get("tl", function (items) {
            console.log("tl not found!");
        }));
    };
};

function saveOption (key, value) {
    chrome.storage.local.set({key: value}, function () {
        console.log(key + ": " + value);
    });
};