MazeGame.update = function(time){
    MazeGame.totalTime = MazeGame.totalTime + time;
    if(MazeGame.win === false && MazeGame.inputArray.length > 0){
        while(MazeGame.inputArray.length > 0){
            var prevPos = {
                x : MazeGame.currentPos.x,
                y : MazeGame.currentPos.y
            };
            MazeGame.clearApple();
            var e = MazeGame.inputArray[0];
            MazeGame.inputArray.splice(0,1);

            if(e.keyCode == '37' || e.keyCode == '65' || e.keyCode == '74'){
                e.preventDefault();
                MazeGame.currentPos.x--;
                if(MazeGame.checkBounds(prevPos,MazeGame.currentPos)){
                    MazeGame.gameBoard[prevPos.x][prevPos.y] = 2;
                    if(MazeGame.newMove())
                        MazeGame.totalPoints += 5;
                    else if(MazeGame.adjacentMove())
                        MazeGame.totalPoints -= 1;
                    else if(MazeGame.otherMove())
                        MazeGame.totalPoints -= 2;
                    MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] = 1;
                }
                else{
                    MazeGame.currentPos = prevPos;
                }
            }
            else if (e.keyCode == '38' || e.keyCode == '73' || e.keyCode == '87'){
                e.preventDefault();
                MazeGame.currentPos.y--;
                if(MazeGame.checkBounds(prevPos,MazeGame.currentPos)){
                    MazeGame.gameBoard[prevPos.x][prevPos.y] = 2;
                    if(MazeGame.newMove())
                        MazeGame.totalPoints += 5;
                    else if(MazeGame.adjacentMove())
                        MazeGame.totalPoints -= 1;
                    else if(MazeGame.otherMove())
                        MazeGame.totalPoints -= 2;
                    MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] = 1;
                }
                else{
                    MazeGame.currentPos = prevPos;
                }
            }
            else if(e.keyCode == '39' || e.keyCode == '76' || e.keyCode == '68'){
                e.preventDefault();
                MazeGame.currentPos.x++;
                if(MazeGame.checkBounds(prevPos,MazeGame.currentPos)){
                    MazeGame.gameBoard[prevPos.x][prevPos.y] = 2;
                    if(MazeGame.newMove())
                        MazeGame.totalPoints += 5;
                    else if(MazeGame.adjacentMove())
                        MazeGame.totalPoints -= 1;
                    else if(MazeGame.otherMove())
                        MazeGame.totalPoints -= 2;
                    MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] = 1;
                }
                else{
                    MazeGame.currentPos = prevPos;
                }
            }
            else if (e.keyCode == '40' || e.keyCode == '83' || e.keyCode == '75'){
                e.preventDefault();
                MazeGame.currentPos.y++;
                if(MazeGame.checkBounds(prevPos,MazeGame.currentPos)){
                    MazeGame.gameBoard[prevPos.x][prevPos.y] = 2;
                    if(MazeGame.newMove())
                        MazeGame.totalPoints += 5;
                    else if(MazeGame.adjacentMove())
                        MazeGame.totalPoints -= 1;
                    else if(MazeGame.otherMove())
                        MazeGame.totalPoints -= 2;
                    MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] = 1;
                }
                else{
                    MazeGame.currentPos = prevPos;
                }
            }
            else if(e.keyCode == '66'){
                if(MazeGame.where === false){
                    MazeGame.where = true;
                }
                else{
                    MazeGame.where = false;
                }
            }
            else if(e.keyCode == '72'){
                if(MazeGame.hint === false){
                    MazeGame.hint = true;
                }
                else{
                    MazeGame.hint = false;
                    MazeGame.clearApple();
                }
            }
            else if(e.keyCode == '80'){
                if(MazeGame.trail === false){
                    MazeGame.trail = true;
                }
                else{
                    MazeGame.trail = false;
                    MazeGame.clearTrail();
                }
            }
            else if(e.keyCode == '89'){
                if ($('#score-div').attr('hidden'))
                    $('#score-div').removeAttr('hidden');
                else
                    $('#score-div').attr('hidden','true');
            }
            if(MazeGame.trail || MazeGame.hint)
                MazeGame.shortestpath({x:MazeGame.currentPos.x,y:MazeGame.currentPos.y}, [{x:MazeGame.currentPos.x,y:MazeGame.currentPos.y}]);
        }
    }
};

MazeGame.shortestpath = function(currentPos, list){
    if(currentPos.x === MazeGame.x - 1 && currentPos.y === MazeGame.y - 1){
        MazeGame.addTrail(list);
        MazeGame.temp = [];
        for(var i = 0; i < list.length; ++i){
            var tempObj = {
                x: list[i].x,
                y: list[i].y
            };
            MazeGame.temp.push(tempObj);
        }
    }
    var prevPos = {
        x : currentPos.x,
        y : currentPos.y
    };
    //try right
    currentPos.x++;
    if(MazeGame.checkBounds(prevPos,currentPos) && MazeGame.inList(currentPos, list)){
        list.push({x:currentPos.x, y:currentPos.y});
        MazeGame.shortestpath(currentPos, list);
    }
    currentPos.x = prevPos.x;
    currentPos.y = prevPos.y;

    //try down
    currentPos.y++;
    if(MazeGame.checkBounds(prevPos,currentPos) && MazeGame.inList(currentPos, list)){
        list.push({x:currentPos.x, y:currentPos.y});
        MazeGame.shortestpath(currentPos, list);
    }
    currentPos.x = prevPos.x;
    currentPos.y = prevPos.y;

    //try up
    currentPos.y--;
    if(MazeGame.checkBounds(prevPos,currentPos) && MazeGame.inList(currentPos, list)){
        list.push({x:currentPos.x, y:currentPos.y});
        MazeGame.shortestpath(currentPos, list);
    }
    currentPos.x = prevPos.x;
    currentPos.y = prevPos.y;

    //try left
    currentPos.x--;
    if(MazeGame.checkBounds(prevPos,currentPos) && MazeGame.inList(currentPos, list)){
        list.push({x:currentPos.x, y:currentPos.y});
        MazeGame.shortestpath(currentPos, list);
    }
    currentPos.x = prevPos.x;
    currentPos.y = prevPos.y;
    list.pop();
};

MazeGame.inList = function(currentPos, list){
    for(var i = 0; i < list.length; ++i){
        if(currentPos.x === list[i].x && currentPos.y === list[i].y)
            return false;
    }
    return true;
};

MazeGame.addTrail = function(list){
    if(MazeGame.trail){
        for(var i = 1; i < list.length; ++i){
            if(MazeGame.gameBoard[list[i].x][list[i].y] === 0 || MazeGame.gameBoard[list[i].x][list[i].y] === 3 || MazeGame.gameBoard[list[i].x][list[i].y] === 4 || MazeGame.gameBoard[list[i].x][list[i].y] === 6)
                MazeGame.gameBoard[list[i].x][list[i].y] = 3;
            else
                MazeGame.gameBoard[list[i].x][list[i].y] = 5;
        }
    }
    if(MazeGame.hint && list.length > 1){
        if(MazeGame.gameBoard[list[1].x][list[1].y] === 5)
            MazeGame.gameBoard[list[1].x][list[1].y] = 6;
        else if(MazeGame.gameBoard[list[1].x][list[1].y] === 2)
            MazeGame.gameBoard[list[1].x][list[1].y] = 6;
        else
            MazeGame.gameBoard[list[1].x][list[1].y] = 4;
    }
};

MazeGame.clearTrail = function(){
    for(var i = 0; i < MazeGame.gameBoard.length; ++i){
        for(var j = 0; j < MazeGame.gameBoard[i].length; ++ j){
            if(MazeGame.gameBoard[i][j] === 5)
                MazeGame.gameBoard[i][j] = 2;
        }
    }
};

MazeGame.clearApple = function(){
    for(var i = 0; i < MazeGame.gameBoard.length; ++i){
        for(var j = 0; j < MazeGame.gameBoard[i].length; ++ j){
            if(MazeGame.gameBoard[i][j] === 4)
                MazeGame.gameBoard[i][j] = 0;
            else if(MazeGame.gameBoard[i][j] === 6)
                MazeGame.gameBoard[i][j] = 2;
        }
    }
};

MazeGame.checkBounds = function(oldBounds, newBounds){
    if(newBounds.x >= MazeGame.x || newBounds.x < 0 || newBounds.y >= MazeGame.y || newBounds.y < 0)
        return false;
    for(var i = 0; i < MazeGame.lines.length; ++i){
        if((oldBounds.y == MazeGame.lines[i].vert1Index2 && oldBounds.x == MazeGame.lines[i].vert1Index && newBounds.y == MazeGame.lines[i].vert2Index2 && newBounds.x == MazeGame.lines[i].vert2Index)||
           (newBounds.y == MazeGame.lines[i].vert1Index2 && newBounds.x == MazeGame.lines[i].vert1Index && oldBounds.y == MazeGame.lines[i].vert2Index2 && oldBounds.x == MazeGame.lines[i].vert2Index))
        {
            return false;
        }
    }
    return true;
};

MazeGame.newMove = function(){
    if(MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] === 3 || 
        MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] === 4 || 
        MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] === 0){
        for(var i = 0; i < MazeGame.shortPath.length; ++i){
            if(MazeGame.currentPos.x === MazeGame.shortPath[i].x && MazeGame.currentPos.y === MazeGame.shortPath[i].y)
                return true;
        }
    }
    return false;
};

MazeGame.adjacentMove = function(){
    if(MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] === 3 || 
        MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] === 4 || 
        MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] === 0){
        for(var i = 0; i < MazeGame.shortPath.length; ++i){
            if( (MazeGame.currentPos.x === MazeGame.shortPath[i].x+1 && MazeGame.currentPos.y === MazeGame.shortPath[i].y   && MazeGame.checkBounds({x:MazeGame.currentPos.x,y:MazeGame.currentPos.y}, {x:MazeGame.shortPath[i].x,y:MazeGame.shortPath[i].y})) ||
                (MazeGame.currentPos.x === MazeGame.shortPath[i].x-1 && MazeGame.currentPos.y === MazeGame.shortPath[i].y   && MazeGame.checkBounds({x:MazeGame.currentPos.x,y:MazeGame.currentPos.y}, {x:MazeGame.shortPath[i].x,y:MazeGame.shortPath[i].y})) ||
                (MazeGame.currentPos.x === MazeGame.shortPath[i].x   && MazeGame.currentPos.y === MazeGame.shortPath[i].y+1 && MazeGame.checkBounds({x:MazeGame.currentPos.x,y:MazeGame.currentPos.y}, {x:MazeGame.shortPath[i].x,y:MazeGame.shortPath[i].y})) ||
                (MazeGame.currentPos.x === MazeGame.shortPath[i].x   && MazeGame.currentPos.y === MazeGame.shortPath[i].y-1 && MazeGame.checkBounds({x:MazeGame.currentPos.x,y:MazeGame.currentPos.y}, {x:MazeGame.shortPath[i].x,y:MazeGame.shortPath[i].y})))
                return true;
        }
    }
    return false;
};

MazeGame.otherMove = function(){
    if(MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] === 3 || 
        MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] === 4 || 
        MazeGame.gameBoard[MazeGame.currentPos.x][MazeGame.currentPos.y] === 0){
        return true;
    }
    return false;
};



