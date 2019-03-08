var found = false;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action == "refreshRanks") {
        found = false;
        findRanks();
    }
});

function doFetch(i) {

    var existCondition = setInterval(function () {
        if ($('.isosbo').length && !found) {
            found = true;
            clearInterval(existCondition);
            var allUsers = $(document).find("table .TextLink");
            $.each(allUsers, function (index) {
                var userId = allUsers[index].href.split('users/')[1];
                $.get(`https://play.esea.net/api/users/${userId}/profile`, function (data) {
                    let rank = "?"
                    try {
                        rank = data.data.rank.current;
                    }
                    catch (e) { }
                    allUsers[index].innerHTML +=
                        " (" + rank + ")";                    
                });
            });
        }
    }, 1000); // check every 100ms
}

function findRanks() {
    if (!location.href.match(/https:\/\/play\.esea\.net\/match\/+/)) return;
    let i = 1;
    while (i < 3) {
        doFetch(i);
        i += 1;
    }
}

findRanks();
