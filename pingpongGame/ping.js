let gamebox = document.getElementById("gamebox");
let userpaddle = document.getElementById("userpaddle");
let aipaddle  = document.getElementById("aipaddle");
let ball = document.getElementById("ball");

// if z pressed then paddle go to upwards
let zpressed = false;

// if x pressed then paddle go to downwords
let xpressed = false;

let userscore = document.getElementById("userscore");
let aiscore = document.getElementById("aiscore");

document.addEventListener('keydown' , keyDownHandler);
document.addEventListener('keyup' , keyUpHandler);

function keyDownHandler(e) {
    if(e.key == 'z'){
        zpressed = true;
    
    }
    else if(e.key == 'x'){
        xpressed = true;
        
    }
}

function keyUpHandler(e){
    if(e.key == 'z'){
        zpressed = false;
        
    }
    else if(e.key == 'x'){
        xpressed = false;
        
    }
}



//the formula is v = vx*2 + vy*2(pythagoras therom);
let vx = -5;
let vy = -5;
let v = Math.sqrt(Math.pow(vx ,2) + Math.pow(vy , 2));

function reset(){
    ball.style.left  = "50%";
    ball.style.right = "50%";
     vx = -5;
     vy = -5;
     v = Math.sqrt(Math.pow(vx , 2) + Math.pow(vy , 2));
}



function checkcollision(activepaddle){
    let balltop = ball.offsetTop;
    let ballbottom = ball.offsetTop + ball.offsetHeight;
    let ballleft = ball.offsetLeft;
    let ballright = ball.offsetLeft + ball.offsetWidth;

    let paddletop = activepaddle.offsetTop;
    let paddlebotttom = activepaddle.offsetTop + activepaddle.offsetHeight;
    let paddleleft = activepaddle.offsetLeft;
    let paddleright = activepaddle.offsetLeft  + activepaddle.offsetWidth;

    // console.log(ballbottom , ballright , balltop , ballleft);
    if(
        ballbottom > paddletop &&
        balltop < paddlebotttom && 
        ballright > paddleleft && 
        ballleft < paddleright
    ){
        console.log("collison detected");
        return true;
    }
    else{
        return false;
    }
}


function gameloop(){
    if(ball.offsetLeft < 0){
        aiscore.innerHTML = parseInt(aiscore.innerHTML)+1;
        // vx = -vx;
        reset();
    }

    if(ball.offsetLeft > gamebox.offsetWidth - ball.offsetWidth){
        // vx = -vx;
        userscore.innerHTML = parseInt(userscore.innerHTML)+1;
        reset();   
    }

    if(ball.offsetTop<0){
        vy = -vy;
    }

    if(ball.offsetTop > gamebox.offsetHeight - ball.offsetHeight){
        vy = -vy;
    }

    let paddle = ball.offsetLeft < gamebox.offsetWidth / 2 ? userpaddle : aipaddle;
    // console.log(paddle);
    let ballcenterY = ball.offsetTop + ball.offsetHeight/2;
    let paddlecenterY = paddle.offsetTop + ball.offsetHeight/2;
    
    let angle=0;
    if(checkcollision(paddle)){
        if(paddle == userpaddle){
            if(ballcenterY < paddlecenterY ){
                angle = -Math.PI/ 4 ;
           }
           else if(ballcenterY > paddlecenterY){
            angle = Math.PI/4;
           }
           else{
            angle = 0;
           }
        }
        else if(paddle == aipaddle){
            if(ballcenterY < paddlecenterY){
                angle = -3*Math.PI / 4;
            }
            else if (ballcenterY > paddlecenterY){
                angle = 3*Math.PI/4;
            }
            else{
                angle = 0;
            }
        }
        v = v+0.2;
        vx = v*Math.cos(angle);
        vy = v*Math.sin(angle);
    }

    let aidelay = 0.3;
    aipaddle.style.top = 
    aipaddle.offsetTop + (ball.offsetTop - aipaddle.offsetTop
        -aipaddle.offsetHeight/2) * aidelay + "px";



    ball.style.left = ball.offsetLeft + vx + "px";
    ball.style.top = ball.offsetTop + vy + "px";
    

    if(zpressed && userpaddle.offsetTop>55){
        userpaddle.style.top = userpaddle.offsetTop - 10 + "px";
    }
    if(xpressed && userpaddle.offsetTop<gamebox.offsetHeight - userpaddle.offsetHeight+45){
        userpaddle.style.top = userpaddle.offsetTop + 10 + "px";
    }
    requestAnimationFrame(gameloop);
}

gameloop();
