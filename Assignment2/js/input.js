document.onkeydown = function checkKey(e) {
    e = e || window.event;
    MazeGame.inputArray.push(e);
};