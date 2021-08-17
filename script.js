var first_turn = false
var places = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9']    
]
function change(){
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
            document.getElementById('result').innerHTML = 'won';
            break;
        }
    }
}