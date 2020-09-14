var total = 0;

onmessage = function (e) {
    if (e.data != undefined) {
        total += parseInt(e.data);
        postMessage(total);
    }
}