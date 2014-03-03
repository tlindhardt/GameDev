var MazeGame = {
    gameBoard : [],
    x   : 0,
    y   : 0,
    mul : 0,
    currentPos : {
        x : 0,
        y : 0
    },
    lines : [],
    win : false,
    where : false,
    hint : false,
    trail : false,
    inputArray : [],
    prevTime : 0,
    totalTime : 0,
    totalPoints: 0,
    scores : [],
    shortPath : [],
    isCreating : false,
    playing : false,
    showDraw : false,
    genTime : 1,
    animate : false
};

MazeGame.init = function(){
    if(MazeGame.isCreating === true)
        return;
    MazeGame.genTime = 1;
    MazeGame.showDraw = true;
    MazeGame.playing = false;
    MazeGame.isCreating = true;
    MazeGame.gameBoard = [];
    MazeGame.x = 0;
    MazeGame.y = 0;
    MazeGame.mul = 0;
    MazeGame.currentPos = {
        x : 0,
        y : 0
    };
    MazeGame.lines = [];
    MazeGame.win = false;
    MazeGame.where = false;
    MazeGame.hint = false;
    MazeGame.trail = false;
    MazeGame.inputArray = [];
    MazeGame.scores = [];
    MazeGame.shortPath = [];
    MazeGame.totalTime = 0;
    MazeGame.totalPoints = 0;
    MazeGame.getLines();
    $('#score-div').attr('hidden','true');
};

MazeGame.gameLoop = function(){
    var time = Date.now();
    var currentTime = time - MazeGame.prevTime;
    //console.log(currentTime);
    MazeGame.update(currentTime);
    MazeGame.draw();
    MazeGame.prevTime = time;
    if(MazeGame.win === false && MazeGame.playing === true)
        requestAnimationFrame(MazeGame.gameLoop);
    else
        MazeGame.finish();
};

MazeGame.finish = function(){
    var temp = MazeGame.msToTime(MazeGame.totalTime);
    MazeGame.scores.push({
        time  : temp,
        score : MazeGame.totalPoints,
        size  : MazeGame.x
    });
    MazeGame.scores.sort();
    for(var i = 0; i < MazeGame.scores.length; ++i){
        $('#modalscore-div').append("Size: " + MazeGame.scores[i].size + " Score: " + MazeGame.scores[i].score + " Time: " + MazeGame.scores[i].time + "<br>");
    }
};

MazeGame.getLines = function(){
    var x = document.getElementById('widthInput').value;
    if(x > 100){
        x = 100;
    }
    if(x < 2){
        x = 2;
    }
    var y = x;
    MazeGame.x = x;
    MazeGame.y = y;
    var verticies = Array();
    var edges = [];
    var numEdges = (y*(x-1)) + ((y-1)*x);
    
    //make the array of verticies
    var count = 0;
    for(var i = 0; i < y; ++i){
        verticies.push(Array());
        for(var j = 0; j < x; ++j){
            verticies[i].push(count++);
        }
    }

    //make the array of edges
    count = 0;
    var rowCount = 0;
    for(var i = 0; i < verticies.length; ++i){
        var colCount = 0;
        while(true){
            if(colCount === verticies[i].length - 1)
                break;
            if((colCount+1) > verticies[i].length - 1)
                break;
            var newNode = {
                vert1Name   : verticies[i][colCount],
                vert1Index  : colCount,
                vert1Index2 : rowCount,
                vert2Name   : verticies[i][colCount+1],
                vert2Index  : colCount + 1,
                vert2Index2 : rowCount,
                direction   : 'vert',
                edge        : count++
            };
            colCount++;
            edges.push(newNode);
        }
        colCount = 0;
        if(rowCount < verticies.length - 1){
            while(true){
                if(colCount === verticies[i].length)
                    break;
                var newNode = {
                    vert1Name   : verticies[i][colCount],
                    vert1Index  : colCount,
                    vert1Index2 : rowCount,
                    vert2Name   : verticies[i+1][colCount],
                    vert2Index  : colCount,
                    vert2Index2 : rowCount + 1,
                    direction   : 'horz',
                    edge  : count++
                };
                colCount++;
                edges.push(newNode);
            }
        }
        rowCount++;
    }
    var timer = function(){
        setTimeout(function(){
            if(MazeGame.isComplete(verticies) || edges.length === 0)
            {
                MazeGame.gameBoard = verticies;
                MazeGame.gameBoard[0][0] = 1;
                MazeGame.mul = x;
                MazeGame.lines = edges;
                MazeGame.shortestpath({x:0,y:0}, [{x:0,y:0}]);
                for(var i = 0; i < MazeGame.temp.length; ++i){
                    var tempObj = {
                        x: MazeGame.temp[i].x,
                        y: MazeGame.temp[i].y
                    };
                    MazeGame.shortPath.push(tempObj);
                }
                MazeGame.prevTime = Date.now();
                MazeGame.isCreating = false;
                MazeGame.playing = true;
                MazeGame.animate = false;
                MazeGame.gameLoop(MazeGame.prevTime);
            }
            else
            {
                var index = Math.floor(Math.random() * edges.length);

                //grab the element
                var element = edges[index];

                //go through and change all the other verticies and change them to the lowest
                if(element.vert1Name !== element.vert2Name){
                    for(var i = 0; i < verticies.length; ++i){
                        for(var j = 0; j < verticies[i].length; ++j){
                            if(element.vert1Name > element.vert2Name){
                                if(verticies[i][j] == element.vert1Name){
                                    verticies[i][j] = element.vert2Name;
                                }
                            }
                            else{
                                if(verticies[i][j] == element.vert2Name){
                                    verticies[i][j] = element.vert1Name;
                                }
                            }
                        }
                    }

                    //update other edges
                    for(var i = 0; i < edges.length; ++i){
                        edges[i].vert1Name = verticies[edges[i].vert1Index2][edges[i].vert1Index];
                        edges[i].vert2Name = verticies[edges[i].vert2Index2][edges[i].vert2Index];
                    }
                    edges.splice(index,1);
                }
                var c=document.getElementById("myCanvas");
                MazeGame.drawMaze(edges, c.width/x);
                timer();
            }
        },MazeGame.genTime);
    };
    if(MazeGame.animate)
        timer();
    else
    {
        while(!MazeGame.isComplete(verticies)){
            if(edges.lines === 0)
                break;
            var index = Math.floor(Math.random() * edges.length);

            //grab the element
            var element = edges[index];

            //go through and change all the other verticies and change them to the lowest
            if(element.vert1Name !== element.vert2Name){
                for(var i = 0; i < verticies.length; ++i){
                    for(var j = 0; j < verticies[i].length; ++j){
                        if(element.vert1Name > element.vert2Name){
                            if(verticies[i][j] == element.vert1Name){
                                verticies[i][j] = element.vert2Name;
                            }
                        }
                        else{
                            if(verticies[i][j] == element.vert2Name){
                                verticies[i][j] = element.vert1Name;
                            }
                        }
                    }
                }

                //update other edges
                for(var i = 0; i < edges.length; ++i){
                    edges[i].vert1Name = verticies[edges[i].vert1Index2][edges[i].vert1Index];
                    edges[i].vert2Name = verticies[edges[i].vert2Index2][edges[i].vert2Index];
                }
                edges.splice(index,1);
            }
        }

        MazeGame.gameBoard = verticies;
        MazeGame.gameBoard[0][0] = 1;
        MazeGame.mul = x;
        MazeGame.lines = edges;
        MazeGame.shortestpath({x:0,y:0}, [{x:0,y:0}]);
        for(var i = 0; i < MazeGame.temp.length; ++i){
            var tempObj = {
                x: MazeGame.temp[i].x,
                y: MazeGame.temp[i].y
            };
            MazeGame.shortPath.push(tempObj);
        }
        MazeGame.prevTime = Date.now();
        MazeGame.isCreating = false;
        MazeGame.playing = true;
        MazeGame.animate = false;
        $('#time-div').removeAttr('hidden');
        MazeGame.gameLoop(MazeGame.prevTime);
    }
};

MazeGame.animateInit = function(){
    MazeGame.animate = true;
    MazeGame.init();
};

MazeGame._5 = function(){
    $('#widthInput').val(5);
    MazeGame.init();
};

MazeGame._10 = function(){
    $('#widthInput').val(10);
    MazeGame.init();
};

MazeGame._15 = function(){
    $('#widthInput').val(15);
    MazeGame.init();
};

MazeGame._20 = function(){
    $('#widthInput').val(20);
    MazeGame.init();
};


MazeGame.isComplete = function(vert){
    var complete = true;
    for(var i = 0; i < vert.length; ++i){
        for(var j = 0; j < vert[i].length; ++j){
            if(vert[i][j] !== 0){
                complete = false;
                break;
            }
        }
    }
    return complete;
};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
