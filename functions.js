function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    var d = dist(a.x, a.y, b.x, b.y);
    return d;
}

updateTargetLabel = function(){
    document.getElementById("endCoords").value += "\n" + end.x + "," + end.y;
};