function start() //inicio da função start
{
    $('#inicio').hide()

    $('#fundoGame').append('<div id="jogador" class="anima1"></div>')
    $('#fundoGame').append('<div id="inimigo1" class="anima2"></div>')
    $('#fundoGame').append('<div id="inimigo2"></div>')
    $('#fundoGame').append('<div id="amigo" class="anima3"></div>')

    var jogo = {}
    var fimDeJogo = false;
    var velocidade = 5
    var posicaoY = parseInt(Math.random() * 334)

    var TECLA = {
        W: 87,
	    S: 83,
	    D: 68
    }

    var podeAtirar = true

    jogo.pressionou = [];

    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true
    })

    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false
    })

    jogo.timer = setInterval(loop,30)

    function loop(){

        moveFundo()
        moveJogador()
        moveInimigo1()
        moveInimigo2()
        moveAmigo()
        colisao()

    }

    function moveFundo(){
        esquerda = parseInt($('#fundoGame').css('background-position'))
        $('#fundoGame').css('background-position',esquerda-1)     

    }

    function moveJogador(){

        if(jogo.pressionou[TECLA.W]){
            var topo = parseInt($('#jogador').css("top"))
            $('#jogador').css("top",topo-10)
            if(topo <= 0){
                $('#jogador').css("top",topo+10)
            }
        }

        if(jogo.pressionou[TECLA.S]){
            var topo = parseInt($('#jogador').css("top"))
            $('#jogador').css("top",topo+10)
            if(topo >= 434){
                $('#jogador').css('top',topo-10)
            }
        }

        if(jogo.pressionou[TECLA.D]){
            disparo()
        }
    }

    function moveInimigo1(){

        posicaoX = parseInt($('#inimigo1').css('left'))
        $('#inimigo1').css('left',posicaoX-velocidade)
        $('#inimigo1').css('top',posicaoY)

        if(posicaoX <= 0){
            posicaoY = parseInt(Math.random() * 334)
            $('#inimigo1').css('left',694)
            $('#inimigo1').css('top',posicaoY)
        }

    
    }

    function moveInimigo2(){
        posicaox = parseInt($('#inimigo2').css('left'))
        $('#inimigo2').css('left',posicaoX-3)

        if(posicaoX <= 0){
            $('#inimigo2').css('left',775)
        }
    }

    function moveAmigo(){
        posicaoX = parseInt($('#amigo').css('left'))
        $('#amigo').css('left',posicaoX+2)

        if(posicaoX > 906){
            $('#amigo').css('left',0)
        }
    }

    function disparo(){

        if(podeAtirar==true){

            podeAtirar = false

            topo = parseInt($('#jogador').css('top'))
            posicaoX = parseInt($('#jogador').css('left'))
            tiroX = posicaoX + 190
            topoTiro = topo + 38
            $('#fundoGame').append('<div id="disparo"></div>')
            $('#disparo').css('top',topoTiro)
            $('#disparo').css('left',tiroX)

            var tempoDisparo = window.setInterval(executaDisparo,30)

        } // fim da podeAtirar

        function executaDisparo(){
            posicaoX = parseInt($('#disparo').css('left'))
            $('#disparo').css('left',posicaoX + 15)
    
            if(posicaoX > 900){
                window.clearInterval(tempoDisparo)
                tempoDisparo = null
                $('#disparo').remove()
                podeAtirar = true
            }

        } // fim da executa disparo

    } // fim da disparo

   function colisao(){ // inicio da colisao

       var colisao1 = ($('#jogador').collision($('#inimigo1')))
       var colisao2 = ($('#jogador').collision($('#inimigo2')))
       var colisao3 = ($('#disparo').collision($('#inimigo1')))
       var colisao4 = ($('#disparo').collision($('#inimigo2')))
       var colisao5 = ($('#jogador').collision($('#amigo')))
       var colisao6 = ($('#inimigo2').collision($('#amigo')))

       // inicio da colisao1 jogador com inimigo1
       if(colisao1.length > 0){

        inimigo1X = parseInt($('#inimigo1').css('left'))
        inimigo1Y = parseInt($('#inimigo1').css('top'))
        explosao1(inimigo1X, inimigo1Y)

            posicaoY = parseInt(Math.random() * 334)
            $('#inimigo1').css('left',694)
            $('#inimigo1').css('top',posicaoY)
       } // fim da colisao1

       // inicio da colisao2 jogador com inimigo2
       if(colisao2.length > 0){

        inimigo2X = parseInt($('#inimigo2').css('left'))
        inimigo2Y = parseInt($('#inimigo2').css('top'))
        explosao2(inimigo2X,inimigo2Y)

        $('#inimigo2').remove()

        reposicionaInimigo2()

       } // fim da colisao2

       // inicio da colisao 3
       if(colisao3.length > 0){

        inimigo1X = parseInt($('#inimigo1').css('left'))
        inimigo1Y = parseInt($('#inimigo1').css('top'))
        explosao1(inimigo1X,inimigo1Y)
        $('#disparo').css('left',950)

        posicaoY = parseInt(Math.random() * 334)
        $('#inimigo1').css('left',694)
        $('#inimigo1').css('top',posicaoY)

       } // fim da colisao 3

       if(colisao4.length > 0){ // inicio da colisao4

           inimigo2X = parseInt($('#inimigo2').css('left'))
           inimigo2Y = parseInt($('#inimigo2').css('top'))
           $('#inimigo2').remove()

           explosao2(inimigo2X,inimigo2Y)
           $('#disparo').css('left',950)

           reposicionaInimigo2()

       } // fim da colisao4

       if(colisao5.length > 0){ // inicio da colisao5

            reposicionaAmigo()
            $('#amigo').remove()

       } // fim da colisao5

       if(colisao6.length > 0){
           
       }
       
   } // fim da função colisão

   function explosao1(inimigo1X,inimigo1Y){ // inicio da função explosao1

        $('#fundoGame').append('<div id="explosao1"></div>')
        $('#explosao1').css('background-image', 'url(imgs/explosao.png)')
        var div = $('#explosao1')
        div.css('left',inimigo1X)
        div.css('top',inimigo1Y)
        div.animate({width:200, opacity:0},'slow')

        var tempoExplosao = window.setInterval(removeExplosao,1000)

            function removeExplosao(){  //inicio da removeExplosao
                
                div.remove()
                window.clearInterval(tempoExplosao)
                tempoExplosao=null

            } // fim da removeExplosao

   } // fim da função explosao1

   function explosao2(inimigo2X,inimigo2Y){ // inicio da função explosao2

    $('#fundoGame').append('<div id="explosao2"></div>')
    $('#explosao2').css('background-image', 'url(imgs/explosao.png)')
    var div2 = $('#explosao2')
    div2.css('left',inimigo2X)
    div2.css('top',inimigo2Y)
    div2.animate({width:200,opacity: 0}, 'slow')

    var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);
	
		function removeExplosao2() {
			
			div2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2=null;
			
		}

   } // fim da função explosão2

   
	function reposicionaInimigo2() {
	
        var tempoColisao4 = window.setInterval(reposiciona4, 5000);
            
            function reposiciona4() {
                window.clearInterval(tempoColisao4);
                tempoColisao4=null;
                
                if (fimDeJogo == false) {
                
                    $("#fundoGame").append("<div id='inimigo2'></div");
                
                }
                
            }	
        }	

       function reposicionaAmigo(){ // inicio da função reposicionaAmigo
            var tempoAmigo = window.setInterval(reposiciona6,6000)

            function reposiciona6(){
                window.clearInterval(tempoAmigo)
                tempoAmigo = null

                if(fimDeJogo == false){
                    $('#fundoGame').append('<div id="amigo" class="anima3"></div>')
                }
            }
        } // fim da função reposicionaAmigo

} // Fim da função start
