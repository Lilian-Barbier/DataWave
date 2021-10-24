
var amplitude = 20;
var pulsation = 2*Math.PI / 1000;
var phase = 0;

var texte = '01000011 01100101 01110100 00100000 01101111 01110101 01110100 01101001 01101100 00100000 01110110  01100100 01100101 00100000 01100010 01101001 01101110 01100001 01101001 01110010 01100101 00100000 01100101 01110100 00100000 01110110 ';
texte =  "- L'écume des Jours - \n \n " + 
"Il souleva le linge. Il y avait douze canons d’acier bleu et froid, et, au bout de chacun, une jolie rose blanche s’épanouissait, fraîche et ombrée de beige au creux des pétales veloutés. \n \n " +

"« Oh !... murmura Colin. Qu’elles sont belles !... » \n \n " +

"L’homme ne disait rien. Il toussa deux fois. \n \n " +

"« Ça ne sera donc pas la peine de reprendre votre travail demain », dit-il hésitant. \n \n "  +

"Ses doigts s’accrochaient nerveusement au bord du chariot. \n \n " +

"« Est-ce que je peux les prendre ? dit Colin. Pour Chloé ? \n \n " +

"– Elles vont mourir, dit l’homme, si vous les détachez de l’acier. Elles sont en acier, vous savez... \n \n " +

"– Ce n’est pas possible », dit Colin. \n \n " +

"Il prit  délicatement  une  rose et  tenta  de  briser la  tige. Il  fit  un  faux mouvement  et  l’un  des  pétales  lui  déchira  la  main  sur  plusieurs centimètres  de  long.  Sa  main  saignait,  à  lentes  pulsations,  de  grosses gorgées de sang sombre qu’il avalait machinalement. Il regardait le pétale blanc marqué d’un croissant rouge et l’homme lui tapa sur l’épaule et le poussa doucement vers la porte. \n \n ";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


function wave(x){
    return amplitude * Math.sin(pulsation * x + phase);
}

function refresh(){

    // ctx.rotate(40); 
    // ctx.translate(-canvas.width/2, -canvas.height/2);

    ctx.font = "25px Arial";
    setInterval(()=>{
        // amplitude =  document.getElementById("Amplitude").value;
        // pulsation =  document.getElementById("Pulsation").value;
        // phase =  document.getElementById("Phase").value;

        var textTmp = texte;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for(var hauteur = 0 ; hauteur<canvas.height; hauteur+=25){
            

            ctx.fillStyle = 'white';
            
            indPixel = 0;
            // indCaractere = 0;
            while(indPixel < canvas.width){
                // ctx.fillRect(i, wave(i)+canvas.width/2 , 3, 3);


                // ctx.save();
                // ctx.translate(indPixel, wave(indPixel)+canvas.width/2 + hauteur);
                // ctx.rotate(pulsation * indPixel + phase);            
                // ctx.fillText(texte.charAt(indCaractere), 0, 0);
                // ctx.restore();
                
                if(textTmp.charAt(0) == '\n'){
                    indPixel = canvas.width;
                }

                ctx.fillText(textTmp.charAt(0), indPixel, wave(indPixel) + hauteur);
                textTmp = textTmp.substring(1);

                // console.log(indPixel);
                // indPixel += ctx.measureText(texte.charAt(indCaractere)).width;
                indPixel += 20;
                // indCaractere++;
            }

        }

        phase += 0.01;

    }, 20);

}


function refreshRealText(){

    
    console.log(texte.split(" "));

    ctx.font = "25px Arial";
    setInterval(()=>{

        var textTmp = texte.split(" ");

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for(var hauteur = 90; hauteur<canvas.height; hauteur+=25){
            ctx.fillStyle = 'white';

            indPixel = 0;
            while(indPixel < canvas.width){
                
                if(textTmp.length != 0 && textTmp[0].includes('\n')){
                    textTmp.shift();

                    indPixel = canvas.width;
                }
                
                if(textTmp.length == 0 || indPixel + ctx.measureText(textTmp[0]).width > canvas.width){
                    indPixel = canvas.width;
                }
                else{
                    var word = textTmp.shift();

                    for (var l = 0; l < word.length; l++) {
                        ctx.fillText(word.charAt(l), indPixel, wave(indPixel) + hauteur);
                        indPixel += ctx.measureText(word.charAt(l)).width;
                    }

                    ctx.fillText(" ", indPixel, wave(indPixel) + hauteur);
                    indPixel += ctx.measureText(" ").width;
                    // indPixel += ctx.measureText(word).width;
                }
                
            }

        }

        phase += 0.01;

    }, 20);

}


refreshRealText();

//31 59 1