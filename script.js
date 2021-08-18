var first_turn = false;
var places = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9']    
]
var mode = 'cpu';
var game_started = false;

function setMode(){
    mode = document.querySelector('input[name="mode"]:checked').value;
    game_started = true;
    document.getElementById('modebox').style.display = 'none';
    for(let i = 0; i < 3; i++){     //Resetting everything
        for(let j = 0; j < 3; j++){
            document.getElementById(places[j][i]).className = 'empty';
        }
    }
    document.getElementById('result').innerHTML = '';
}

function change(){
    if (game_started == true){
        if(mode == '2p'){
            twoPlayerMode();
        }
        else{
            cpuMode();
        }
    }
}

function cpuMode(){
    if(document.activeElement.className ==  'empty'){
        // player turn
        document.activeElement.className = 'circle';    
        checkWin('circle');
        // cpu turn algo
        if(game_started == true){   // To stop CPU turn when player won the game
            cpu_turn = false;
            //CheckDraw used avoid cpu from entering infinite loop because when there is no place to mark then 
            // cpu might go to infinite loop without checkdraw()
            while(cpu_turn == false && checkDraw() == false){ 
                randomPlace = Math.trunc((Math.random() * 9) + 1) 
                place = document.getElementById(randomPlace)
                if(place.className == 'empty'){
                    place.className = 'cross';
                    cpu_turn = true;
                }
            }
            checkWin('cross');
        }
    }
}

function twoPlayerMode(){
    if (first_turn == false && document.activeElement.className ==  'empty'){
        document.activeElement.className = 'circle';
        first_turn = true;
    }
    else if(document.activeElement.className ==  'empty'){
        document.activeElement.className = 'cross';
        first_turn = false;
    }
    checkWin('cross');
    checkWin('circle');
}
function checkWin(player){
    for(let i = 0; i < 3; i++){
        rowComplete = true;
        colComplete = true;
        for(let j = 0; j < 3; j++){
            if(document.getElementById(places[i][j]).className != player){  //row checking
                rowComplete = false;
            }
            if(document.getElementById(places[j][i]).className != player){  //column checking
                colComplete = false;
            }
        }
        if(rowComplete == true || colComplete == true){
            document.getElementById('result').innerHTML = player +' won';
            game_started = false;
            document.getElementById('modebox').style.display = 'block';
            break;
        }
    }
    diagonalComplete = true;
    oppositeDiagonalComplete = true;
    for(let j = 0; j < 3; j++){
        if(document.getElementById(places[j][j]).className != player){
            diagonalComplete = false;
        }
        if(document.getElementById(places[j][2-j]).className != player){
            oppositeDiagonalComplete = false;
        }
    }
    if(diagonalComplete == true || oppositeDiagonalComplete == true){
        document.getElementById('result').innerHTML = player +' won';
        game_started = false;
        document.getElementById('modebox').style.display = 'block';
    }
}
function checkDraw(){   // to check that all the places are filled
    noPlace = true;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(document.getElementById(places[j][i]).className == 'empty'){
                noPlace = false;
                return noPlace;
            }
        }
    }
    document.getElementById('result').innerHTML = "Game Draw";
    game_started = false;
    document.getElementById('modebox').style.display = 'block';
    return noPlace;
}
