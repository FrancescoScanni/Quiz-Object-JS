
//DICHIARAIONI---------------(QS E VARIABILI)
let sec_layer=document.querySelector(".sec_layer")
let avvia=document.querySelector("#avvio")
let quiz=document.querySelector("form")
let question=document.querySelector("#question")
let nDomanda=document.querySelector("#nDomanda")
let boxNDomanda=document.querySelector(".n_domanda")
let punti=document.querySelector("#punteggio")
let boxPunti=document.querySelector(".boxPunteggio")
let bloccoFinali=document.querySelector("#bloccoFine")
let puntiFine=document.querySelector("#puntiFinali")
let rispDate=document.querySelector("#risposteDate")
let rispGiuste=document.querySelector("#risposteGiuste")
let tot=0;
let i=0
let risposteDate=[]
let risposteGiuste=[]

window.addEventListener("load", function(){
    avvia.addEventListener("click",function(){
        risposteDate=[]
        risposteGiuste=[]
        avvia.style.opacity=0
        boxNDomanda.style.visibility="visible"
        boxPunti.style.visibility="visible"
        avvia.style.zIndex=1
        tot=0
        punti.innerHTML=tot
        spawnQuestion(i)
    })
    risposteGiuste.push(" "+questions[i].risposta_corretta)
    quiz.style.visibility="hidden"
    boxNDomanda.style.visibility="hidden"
    boxPunti.style.visibility="hidden"
    rispDate.style.visibility="hidden"
    rispGiuste.style.visibility="hidden"
})



//ARRAY DI OGGETTI (DIZIONARI - COPPIE CHIAVE-VALORE)
let questions = [  
    {
        "n_domanda": 1,
        "testo_domanda": "Qual è il fiume più lungo al mondo? (1pt)",
        "risposta_utente": "",
        "risposta_corretta": "nilo",
        "punteggio": 1
    },
    {
        "n_domanda": 2,
        "testo_domanda": "In quale anno è avvenuto l'Allunaggio? (1pt)",
        "risposta_utente": "",
        "risposta_corretta": "1969",
        "punteggio": 1
    },
    {
        "n_domanda": 3,
        "testo_domanda": "Qual è il capoluogo del Molise? (1pt)",
        "risposta_utente": "",
        "risposta_corretta": "campobasso",
        "punteggio": 1
    },
    {
        "n_domanda": 4,
        "testo_domanda": "Quanti pianeti ha il sistema solare? (1pt)",
        "risposta_utente": "",
        "risposta_corretta": "8",
        "punteggio": 1
    },
    {
        "n_domanda": 5,
        "testo_domanda": "Il colore del cavallo bianco di Napoleone? (2pt)",
        "risposta_utente": "",
        "risposta_corretta": "blu", //scherzetto
        "punteggio": 2
    },
]


//FUNZIONI--------------

function spawnQuestion(i){
    question.style.visibility="visible"
    quiz.style.visibility="visible"
    question.innerHTML=questions[i].testo_domanda
    quiz.addEventListener("submit",mantieniDomanda)  //la funzione fa si che non si duplichi l'event listener e che dunque non si callcolino più punti
}

function mantieniDomanda(event){
    event.preventDefault()
    questions[i].risposta_utente=document.querySelector("[name=rispostaUtente]").value
    questions[i].risposta_utente=sanitize(questions[i].risposta_utente)
    risposteDate.push(" "+questions[i].risposta_utente)
    console.log("debug")
    //GIUSTO
    if(questions[i].risposta_utente==questions[i].risposta_corretta){
        resettaInput=document.querySelector("[name=rispostaUtente]").value=null
        console.log("evvai") //debug
        tot=tot+questions[i].punteggio  
        sec_layer.classList.add("corretto")  
        setTimeout(function(){
            sec_layer.classList.remove("corretto") 
            nDomanda.innerHTML=i+1
            punti.innerHTML=tot
        },1500)
    }
    else{  //SBAGLIATO
        resettaInput=document.querySelector("[name=rispostaUtente]").value=null
        console.log("Noooooo") //debug
        sec_layer.classList.add("sbagliato") 
        setTimeout(function(){
            sec_layer.classList.remove("sbagliato") 
            nDomanda.innerHTML=i+1 
        },1500)
    }

    setTimeout(function(){
        if(i<4){ //GIOCO CONTINUA
            resettaInput=document.querySelector("[name=rispostaUtente]").value=null
            i++
            risposteGiuste.push(" "+questions[i].risposta_corretta)
            nDomanda.innerHTML=i+1 
            resettaInput=document.querySelector("[name=rispostaUtente]").value=null
            spawnQuestion(i)  
        } 
        else{ //GIOCO FINITO
            bloccoFinali.innerHTML=null
                quiz.style.visibility="hidden"
                boxNDomanda.style.visibility="hidden"
                boxPunti.style.visibility="hidden"
                question.style.visibility="hidden"
                i=0
                nDomanda.innerHTML=i+1 //reset numero ddomanda
                sec_layer.classList.add("end")
                
            setTimeout(function(){
                bloccoFinali.innerHTML="Fine. Hai totalizzato "+tot+" punti."
                rispDate.style.visibility="visible"
                rispGiuste.style.visibility="visible"
                rispDate.innerHTML="Risposte date: "+risposteDate
                rispGiuste.innerHTML="Versione corretta: "+risposteGiuste
            },300)
            
            setTimeout(function(){
                bloccoFinali.innerHTML=""
                sec_layer.classList.remove("end")
                avvia.style.opacity=1
                avvia.style.zIndex=2
                rispDate.style.visibility="hidden"
                rispGiuste.style.visibility="hidden"
            },3000)    
        }  
    },1500) 
}

function sanitize(risposta){
    return risposta.trim().toLowerCase()
}


//MAIN--------------
console.log("Gioco avviato. ")