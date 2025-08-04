var colors = ["green", "red", "yellow", "blue"];
var gabarito = [];
var clicado = [];

// Inicia o jogo ao apertar "A"
$(document).keydown(function(event){
    if(event.key === "a" || event.key === "A"){
        startGame();
    }
});

// Reinicia o jogo e começa nova sequência
function startGame(){
    gabarito = [];
    clicado = [];
    $("body").removeClass("game-over");
    novaSequencia();
}

// Retorna o último item do gabarito
function getUltimo(){
    return gabarito[gabarito.length -1];
}

// Lida com o clique dos botões do jogo
$(".btn").click(function(){
    var id = $(this).attr("id");
    clicado.push(id);

    var audio = new Audio("sounds/"+id+".mp3");
    audio.play();

    // Verifica se os cliques estão corretos
    for (var i = 0; i < clicado.length; i++) {
        if (clicado[i] !== gabarito[i]) {
            gabarito = [];
            clicado = [];
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press A to play again");
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            return;
        }
    }

    // Avança para nova sequência se tudo estiver certo
    if (clicado.length === gabarito.length) {
        clicado = [];
        novaSequencia();
    }
});

// Adiciona nova cor à sequência e anima o botão
function novaSequencia(){
    var numero =  Math.floor(Math.random() * 4);
    gabarito.push(colors[numero]);
    $("h1").text("Level "+ gabarito.length);
    $("#"+ getUltimo()).fadeToggle().fadeToggle();
    var audio = new Audio("sounds/"+getUltimo() +".mp3");
    audio.play();
}
