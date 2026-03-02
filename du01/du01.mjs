function guess(){
    console.log("Guess what number I'm thinking")
    const guessing_number = Math.floor(Math.random() * 100);;
    let guessed = false;
    while(!guessed){
        const a = Number(prompt("Your number"))
        if(a > guessing_number){
            console.log("Lower");
        }
        else if(a < guessing_number){
            console.log("Higher");
        }
        else if(a === guessing_number){
            guessed = true;
            console.log("Congratulations. U guessed it right")
        }
        else{
            console.error("Error bráško")
        }
    }
}

guess()
