chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == "refreshRanks") {
        findRanks();
    }
});

function doFetch(i) {
    var allUsers = $(document).find("#body-match-total" + i + " tr");
    $.each(allUsers, function(index, value) {
        var userLink =
            "https://play.esea.net/users/" +
            allUsers[index].children[0].children[1].innerHTML;
        $.get(userLink, function(data) {
            var parsed = $("<div/>").append(data);
            rank = $(parsed)
                .find("#rankGraph h1")
                .text();
            allUsers[index].children[0].children[1].innerHTML +=
                " (" + rank + ")";
        });
    });
}

function findRanks() {
    if(!location.href.match(/https:\/\/play\.esea\.net\/match\/+/)) return;
    let i = 1;
    while (i < 3) {
        doFetch(i);
        i += 1;
    }
}

findRanks();
