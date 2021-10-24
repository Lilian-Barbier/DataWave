var curvePoints = '70.2,177.2,130.02,60.0,300.5,276.2,300.7,176.2';
// var curveText = "Las des fleurs, épuisé de ses longues amours,Un papillon dans sa vieillesse(Il avait du printemps goûté les plus beaux jours)Voyait d\'un oeil chagrin la tendre hardiesseDes amants nouveau-nés, dont le rapide essorEffleurait les boutons qu\'humectait la rosée.Soulevant un matin le débile ressortDe son aile à demi-brisée :\" Tout a changé, dit-il, tout se fane. AutrefoisL\'univers n\'avait point cet aspect qui m\'afflige.Oui, la nature se néglige ;Aussi pour la chanter l\'oiseau n\'a plus de voix.Les papillons passés avaient bien plus de charmes !Toutes les fleurs tombaient sous nos brûlantes armes !Touchés par le soleil, nos légers vêtementsSemblaient brodés de diamants !Je ne vois plus rien sur la terreQui ressemble à mon beau matin !J\'ai froid. Tout, jusqu\'aux fleurs, prend une teinte austère,Et je n\'ai plus de goût aux restes du festin !Ce gazon si charmant, ce duvet des prairies,Où mon vol fatigué descendait vers le soir,Où Chloé, qui n\'est plus, vint chanter et s\'asseoir,N\'offre plus qu\'un vert pâle et des couleurs flétries !L\'air me soutient à peine à travers les brouillardsQui voilent le soleil de mes longues journées ;Mes heures, sans amour, se changent en années :Hélas ! Que je plains les vieillards !\" Je voudrais, cependant, que mon expérienceServît à tous ces fils de l\'air.Sous des bosquets flétris j\'ai puisé ma science,J\'ai défini la vie, enfants : c\'est un éclair !Frêles triomphateurs, vos ailes intrépidesS\'arrêteront un jour avec étonnement :Plus de larcins alors, plus de baisers avides ;Les roses subiront un affreux changement.\" Je croyais comme vous qu\'une flamme immortelleCoulait dans les parfums créés pour me nourrir,Qu\'une fleur était toujours belle,Et que rien ne devait mourir.Mais le temps m\'a parlé ; sa sévère éloquenceA détendu mon vol et glacé mes penchants :Le coteau me fatigue et je me traîne aux champs ;Enfin, je vois la mort où votre inconséquencePoursuit la volupté. Je n\'ai plus de désir,Car on dit que l\'amour est un bonheur coupable :Hélas ! D\'y succomber je ne suis plus capable,Et je suis tout honteux d\'avoir eu du plaisir. \"Près du sybarite invalide,Un papillon naissait dans toute sa beauté :Cette plainte l\'étonne ; il rêve, il est tentéDe rentrer dans sa chrysalide.\" Quoi ! Dit-il, ce ciel pur, ce soleil généreux,Qui me transforme et qui me fait éclore,Mon berceau transparent qu\'il chauffe et qu\'il colore,Tous ces biens me rendront coupable et malheureux !Mais un instinct si doux m\'attire dans la vie !Un souffle si puissant m\'appelle autour des fleurs !Là-bas, ces coteaux verts, ces brillantes couleursFont naître tant d\'espoir, tant d\'amour, tant d\'envie !Oh ! Tais-toi, pauvre sage, ou pauvre ingrat, tais-toi !Tu nous défends les fleurs encor penché sur elles.Dors, si tu n\'aimes plus ; mais les cieux sont à moi :J\'éclos pour m\'envoler, et je risque mes ailes !";
var curveText = '01000011 01100101 01110100 00100000 01101111 01110101 01110100 01101001 01101100 00100000 01110110  01100100 01100101 00100000 01100010 01101001 01101110 01100001 01101001 01110010 01100101 00100000 01100101 01110100 00100000 01110110 ';
var points = curvePoints.split(',');

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


function FillRibbon(text) {

    Ribbon = {
        maxChar: 300, startX: points[0], startY: points[1],
        control1X: points[2], control1Y: points[3],
        control2X: points[4], control2Y: points[5],
        endX: points[6], endY: points[7]
    };

    ctx.moveTo(Ribbon.startX, Ribbon.startY);
    ctx.bezierCurveTo(Ribbon.control1X, Ribbon.control1Y,
        Ribbon.control2X, Ribbon.control2Y,
        Ribbon.endX, Ribbon.endY);


    ctx.beginPath();

    var textCurve = [];
    var ribbon = text.substring(0, Ribbon.maxChar);
    var curveSample = 1000;


    xDist = 0;
    var i = 0;
    for (i = 0; i < curveSample; i++) {
        a = new bezier2(i / curveSample, Ribbon.startX, Ribbon.startY, Ribbon.control1X, Ribbon.control1Y, Ribbon.control2X, Ribbon.control2Y, Ribbon.endX, Ribbon.endY);
        b = new bezier2((i + 1) / curveSample, Ribbon.startX, Ribbon.startY, Ribbon.control1X, Ribbon.control1Y, Ribbon.control2X, Ribbon.control2Y, Ribbon.endX, Ribbon.endY);
        c = new bezier(a, b);
        textCurve.push({ bezier: a, curve: c.curve });
    }

    letterPpushing = ctx.measureText(" ").width / 4;
    w = ribbon.length;
    ww = Math.round(ctx.measureText(ribbon).width);

    totalPpushing = (w - 1) * letterPpushing;
    totalLength = ww + totalPpushing;
    p = 0;

    cDist = textCurve[curveSample - 1].curve.cDist;

    z = (cDist / 2) - (totalLength / 2);

    for (i = 0; i < curveSample; i++) {
        if (textCurve[i].curve.cDist >= z) {
            p = i;
            break;
        }
    }

    // console.log(cDist);
    
    for (i = 0; i < w; i++) {

        
        x1 = ctx.measureText(ribbon[i]).width + letterPpushing;
        x2 = 0;
        for (j = p; j < curveSample; j++) {
            x2 = x2 + textCurve[j].curve.dist;
            if (x2 >= x1) {
                p = j;
                break;
            }
        }

    }
    
    // console.log(i);
} //end FillRibon

function bezier(b1, b2) {
    //Final stage which takes p, p+1 and calculates the rotation, distance on the path and accumulates the total distance
    this.rad = Math.atan(b1.point.mY / b1.point.mX);
    this.b2 = b2;
    this.b1 = b1;
    dx = (b2.x - b1.x);
    dx2 = (b2.x - b1.x) * (b2.x - b1.x);
    this.dist = Math.sqrt(((b2.x - b1.x) * (b2.x - b1.x)) + ((b2.y - b1.y) * (b2.y - b1.y)));
    xDist = xDist + this.dist;
    this.curve = { rad: this.rad, dist: this.dist, cDist: xDist };
}

function bezierT(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
    //calculates the tangent line to a point in the curve; later used to calculate the degrees of rotation at this point.
    this.mx = (3 * (1 - t) * (1 - t) * (control1X - startX)) + ((6 * (1 - t) * t) * (control2X - control1X)) + (3 * t * t * (endX - control2X));
    this.my = (3 * (1 - t) * (1 - t) * (control1Y - startY)) + ((6 * (1 - t) * t) * (control2Y - control1Y)) + (3 * t * t * (endY - control2Y));
}

function bezier2(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
    //Quadratic bezier curve plotter
    this.Bezier1 = new bezier1(t, startX, startY, control1X, control1Y, control2X, control2Y);
    this.Bezier2 = new bezier1(t, control1X, control1Y, control2X, control2Y, endX, endY);
    this.x = ((1 - t) * this.Bezier1.x) + (t * this.Bezier2.x);
    this.y = ((1 - t) * this.Bezier1.y) + (t * this.Bezier2.y);
    this.slope = new bezierT(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY);

    this.point = { t: t, x: this.x, y: this.y, mX: this.slope.mx, mY: this.slope.my };
}

function bezier1(t, startX, startY, control1X, control1Y, control2X, control2Y) {
    //linear bezier curve plotter; used recursivly in the quadratic bezier curve calculation
    this.x = ((1 - t) * (1 - t) * startX) + (2 * (1 - t) * t * control1X) + (t * t * control2X);
    this.y = ((1 - t) * (1 - t) * startY) + (2 * (1 - t) * t * control1Y) + (t * t * control2Y);

}


function updateSlider()
{
    ctx.fillStyle = 'black';
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    
    ctx.fillStyle = 'white';

    var sliceStart = 0;
    var sliceEnd = 5;
    cpt = 0;

    var secondPointMovement = 0;
    var triggerAlternateMovement = true;

    setInterval(()=>{

        ctx.fillStyle = 'black';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        
        ctx.fillStyle = 'white';

        for(var i = 0; i<canvas.width; i=i+50){
            points = [];
    
            x = i;
            y = i;
    
            points.push(0);
            points.push(i);
            // pointStart = [0, i];
            // pointEnd = [i, 0];
            
            // points.push(document.getElementById("CurvePoint1").value);
            // points.push(document.getElementById("CurvePoint2").value);
            // points.push(document.getElementById("CurvePoint3").value);
            // points.push(document.getElementById("CurvePoint4").value);
            // points.push(document.getElementById("CurvePoint5").value);
            // points.push(document.getElementById("CurvePoint6").value);
            // points.push(document.getElementById("CurvePoint7").value);
            // points.push(document.getElementById("CurvePoint8").value);
    
            //Calcul d'un point à 1/3 
            
            if(secondPointMovement < 150 && triggerAlternateMovement ){
                secondPointMovement += Math.floor(Math.random() * (3 - 1)) + 1;
            }
            else 
            {
                triggerAlternateMovement = false;
            }

            if(secondPointMovement > -150 && !triggerAlternateMovement ){
                secondPointMovement -= Math.floor(Math.random() * (3 - 1)) + 1;
            }
            else 
            {
                triggerAlternateMovement = true;
            }


            points.push(x*1/3 + secondPointMovement);
            points.push(y*1/3 + secondPointMovement);
    
    
            //calcul d'un point à 2/3
            points.push(x*2/3 - secondPointMovement);
            points.push(y*2/3 - secondPointMovement);
            
            points.push(i);
            points.push(0);
    
            // console.log(sliceStart + " - " + sliceEnd);
            // curveText = curveText.slice(1, curveText.length) + curveText.slice(0,1)

            FillRibbon(curveText);
    
            // .slice(sliceStart, sliceEnd)
            // var tmp =  sliceEnd - sliceStart; 
    
            // sliceStart = sliceEnd;
            // sliceEnd += tmp * 2;
    
    
        };
        
        cpt++;

    }, 300);

   

}

updateSlider();