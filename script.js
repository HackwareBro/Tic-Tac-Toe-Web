var first_turn = false
function change(){
    if (first_turn == false){
        document.activeElement.className = 'circle';
        first_turn = true;
    }
    else{
        document.activeElement.className = 'cross';
        first_turn = false;
    }
}