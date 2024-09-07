const max = prompt("Enter the max nmber");
 
const random = Math.floor( Math.random()*max)+1;
 
let guess = prompt("guess the number");
while(true){
    if(guess == "quit"){
        console.log("you quit");
        break;
    }
    if(guess == random){
        console.log("you are right! congrats!! random number was",random);
        break;

    }
    else if (guess < random){
        prompt("hint:your guess was too small. please try again");
        break;
    }
    else
    {
        guess=prompt("hint: your guess was too large. please try again");
        break;
    }

    
}