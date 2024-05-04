
//Main
$(document).on('keypress', function(event){
    if(event.key === 'a'){
        alert('the game has started');
        $(document).off('keypress');
    }
})


