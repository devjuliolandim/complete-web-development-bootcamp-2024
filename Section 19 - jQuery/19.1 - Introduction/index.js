$("button").css("cursor","pointer");
console.log($("div").attr("class"));

$("h1").click(function(){
    $("h1").addClass("large")
})

$('h1').on('mouseover', function(){
    $('h1').css('color', 'purple')
})

$('h1').on('mouseleave', function(){
    $('h1').css('color', 'yellow')
})

$('button').on('click', function(){
    $('h1').slideToggle();
})