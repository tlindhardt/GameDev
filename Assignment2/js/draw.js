MazeGame.draw = function(){
    if(MazeGame.win === false){
        $('#score-div').html('Score: ' + MazeGame.totalPoints);
        $('#time-div').html(MazeGame.msToTime(MazeGame.totalTime));
        var c=document.getElementById("myCanvas");
        MazeGame.drawMaze(MazeGame.lines,c.width/MazeGame.mul);
        MazeGame.drawArray();
    }
};

//stack overflow~!
MazeGame.msToTime = function(duration) {
    var milliseconds = parseInt((duration%1000)/100);
    var seconds = parseInt((duration/1000)%60);
    var minutes = parseInt((duration/(1000*60))%60);
    var hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return "Time: " + minutes + ":" + seconds + "." + milliseconds;
};

MazeGame.drawMaze = function(edges,mul){
    var mult = mul;
    var lines = [];
    for(var i = 0; i < edges.length; ++i){
        if(edges[i].direction === 'vert'){
            var x = edges[i].vert2Index * mult;
            var y = edges[i].vert2Index2 * mult;
            lines.push({
                x: x,
                y: y,
                X: x,
                Y: y+mult
            });
        }
        else{
            var x = edges[i].vert2Index * mult;
            var y = edges[i].vert2Index2 * mult;
            lines.push({
                x: x,
                y: y,
                X: x+mult,
                Y: y
            });
        }
    }
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    for(var i = 0; i < lines.length; ++i){
        ctx.moveTo(lines[i].x, lines[i].y);
        ctx.lineTo(lines[i].X, lines[i].Y);
    }
    ctx.stroke();
};

MazeGame.drawArray = function(){
    var c=document.getElementById("myCanvas");
    var xMult = c.width/MazeGame.x;
    var yMult = c.height/MazeGame.y;
    var ctx=c.getContext("2d");
    var img=document.getElementById("player");
    var imgw = document.getElementById("where");
    var imgh = document.getElementById("hint");
    var imgt = document.getElementById("trail");
    var imgf = document.getElementById("finish");
    for(var i = 0; i < MazeGame.gameBoard.length; ++i){
        for(var j = 0; j < MazeGame.gameBoard[i].length; ++j){
            if(MazeGame.where === true){
                //breadcrumb
                if(MazeGame.gameBoard[i][j] === 2){
                    ctx.drawImage(imgw,i*xMult,j*yMult,imgw.width/MazeGame.mul,imgw.height/MazeGame.mul);
                }
            }
            if(MazeGame.hint === true){
                //hints
                if(MazeGame.gameBoard[i][j] === 4 || MazeGame.gameBoard[i][j] === 6){
                    ctx.drawImage(imgh,i*xMult,j*yMult,imgh.width/MazeGame.mul,imgh.height/MazeGame.mul);
                }
            }
            if(MazeGame.trail === true){
                //trails
                if(MazeGame.gameBoard[i][j] === 3 || MazeGame.gameBoard[i][j] === 5){
                    ctx.drawImage(imgt,i*xMult,j*yMult,imgt.width/MazeGame.mul,imgt.height/MazeGame.mul);
                }
            }
            //player
            if(MazeGame.gameBoard[i][j] === 1){
                ctx.drawImage(img,i*xMult,j*yMult,img.width/MazeGame.mul,img.height/MazeGame.mul);
            }
            //win
            if(MazeGame.gameBoard[MazeGame.x - 1][MazeGame.y - 1] === 1){
                ctx.drawImage(imgf,(MazeGame.x - 1)*xMult,(MazeGame.y - 1)*yMult,imgf.width/MazeGame.mul,imgf.height/MazeGame.mul);                MazeGame.win = true;
                break;
            }
        }
        if(MazeGame.win === true)
            break;
    }
};