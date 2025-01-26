
//DICHIARAIONI---------------
let avvia=document.querySelector("#avvio")
let quiz=document.querySelector("form")
let question=document.querySelector("#question")
let nDomanda=document.querySelector("#nDomanda")
let boxNDomanda=document.querySelector(".n_domanda")
let punti=document.querySelector("#punteggio")
let boxPunti=document.querySelector(".boxPunteggio")
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
        "punteggio": 1
    },
    {
        "n_domanda": 3,
        "testo_domanda": "Qual è il capoluogo del Molise?",
        "risposta_utente": "",
        "risposta_corretta": "campobasso",
        "punteggio": 1
    },
    {
        "n_domanda": 4,
        "testo_domanda": "Quanti pianeti ci sono nel sistema solare?",
        "risposta_utente": "",
        "risposta_corretta": "8",
        "punteggio": 1
    },
    {
        "n_domanda": 5,
        "testo_domanda": "Di che colore era il cavallo bianco di Napoleone?",
        "risposta_utente": "",
        "risposta_corretta": "blu",
        "punteggio": 2
    },
]

quiz.style.visibility="hidden"
boxNDomanda.style.visibility="hidden"
boxPunti.style.visibility="hidden"



//FUNZIONI--------------
function spawnQuestion(i){
    question.style.visibility="visible"
    quiz.style.visibility="visible"
    question.innerHTML=questions[i].testo_domanda
    quiz.addEventListener("submit",mantieniDomanda)  //la funzione fa si che non si duplichi l'event listener e che dunque non si callcolino più punti
}
function mantieniDomanda(){
    event.preventDefault()
    questions[i].risposta_utente=document.querySelector("[name=rispostaUtente]").value
    questions[i].risposta_utente=sanitize(questions[i].risposta_utente)
    if(questions[i].risposta_utente==questions[i].risposta_corretta){
        console.log("evvai")
        tot=tot+questions[i].punteggio      
    }
    punti.innerHTML=tot
    nDomanda.innerHTML=i+1
    console.log(tot)  
    if(i<4){
            i++
            spawnQuestion(i)  
    } 
    else{
        setTimeout(function(){
            quiz.style.visibility="hidden"
            boxNDomanda.style.visibility="hidden"
            boxPunti.style.visibility="hidden"
            question.style.visibility="hidden"
            punti.innerHTML=0
            nDomanda.innerHTML=0
            tot=0
            i=0
            avvia.style.opacity=1
            avvia.style.zIndex=2
        },1500)
    }

    
    
      
}


function sanitize(risposta){
    return risposta.trim().toLowerCase()
}



//MAIN--------------
avvia.addEventListener("click",function(){
    avvia.style.opacity=0
    boxNDomanda.style.visibility="visible"
    boxPunti.style.visibility="visible"
    avvia.style.zIndex=1
    spawnQuestion(i)
})