
//DICHIARAIONI---------------
let avvia=document.querySelector("#avvio")
let quiz=document.querySelector("form")
let question=document.querySelector("#question")
let tot=0;
let i=0

let questions = [  //array di oggetti (dizionari - coppie chiave/valore)
    {
        "n_domanda": 1,
        "testo_domanda": "Qual è il fiume più lungo al mondo?",
        "risposta_utente": "",
        "risposta_corretta": "nilo",
        "punteggio": 1
    },
    {
        "n_domanda": 2,
        "testo_domanda": "In quale anno è avvenuto il primo sbarco sulla Luna?",
        "risposta_utente": "",
        "risposta_corretta": "1969",
        "punteggio": 2
    },
    {
        "n_domanda": 3,
        "testo_domanda": "Qual è il capoluogo del Molise?",
        "risposta_utente": "",
        "risposta_corretta": "campobasso",
        "punteggio": 3
    },
    {
        "n_domanda": 4,
        "testo_domanda": "Quanti ianeti ci sono nel sistema solare?",
        "risposta_utente": "",
        "risposta_corretta": "8",
        "punteggio": 4
    },
    {
        "n_domanda": 5,
        "testo_domanda": "Di che colore era il cavallo bianco di Napoleone?",
        "risposta_utente": "",
        "risposta_corretta": "blu",
        "punteggio": 10
    },
]

quiz.style.visibility="hidden"



//FUNZIONI--------------
function spawnQuestion(i){
    quiz.style.visibility="visible"
        question.innerHTML=questions[i].testo_domanda
        quiz.addEventListener("submit",function(event){
            event.preventDefault()
            questions[i].risposta_utente=document.querySelector("[name=rispostaUtente]").value
            console.log(questions[i].risposta_utente)
            questions[i].risposta_utente=sanitize(questions[i].risposta_utente)
            console.log(questions[i].risposta_utente)
            if(questions[i].risposta_utente==questions[i].risposta_corretta){
                console.log("evvai")
                tot=tot+questions[i].punteggio      
            }
            if(i<4){
                i++
                spawnQuestion(i)  
            } 
            console.log(tot)        
})
}

function sanitize(risposta){
    return risposta.trim().toLowerCase()
}



//MAIN--------------
avvia.addEventListener("click",function(){
    console.log("Avvio eseguito")
    spawnQuestion(i)
})