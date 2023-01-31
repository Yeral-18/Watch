// Se seleccionan los elementos del DOM
const timeSelect = document.querySelectorAll(".time-select");
const inputHour = document.getElementById("hour");
const inputMinute = document.getElementById("minute");
const inputSecond = document.getElementById("second");
const chronoDiv = document.getElementById("chrono");
const error = document.querySelector('.error')
const countdown = document.getElementById("countdown");
const container = document.querySelector('.container');
const backFace = document.querySelector('.back');


let rotationX = 0;
let rotationY = 0;

window.onload = function() { //Esto hace que cuando se cargue toda la pagina haga se haga lo que esta dentro

    document.addEventListener("keydown", function(event) { 
        let keyCode = event.which; //con esto lo que hacemos es optener el codigo asociado a la tecla
        if (keyCode == 39) { //Gira la derecha
            rotationY -= 90; //Esto lo que hace es que almancena -90 grados para que rote en Y a la derecha, seria -90 grados ya que Y gira negativo a la derecha
            //cada vez que gire se va resta el nuevo valor -90 grados para así ver cada cara del cubo 3d
            container.style.transform = "rotateY(" + rotationY + "deg)"; //al contenedor se le agrega un estilo css llamdado "rotateY" lo que permite que gire
        } else if (keyCode == 37) { //Gira la izquierda
            rotationY += 90;
            container.style.transform = "rotateY(" + rotationY + "deg)";
        }
        
    });

}

// WATCH!!!
 //Esta funcion lo que hace es mostrarno la hora con hora, minuto y segundos en un reloj
function currentTime(){
    let date = new Date(); //lo que hace es usar la funcion de Date para taer la local
    let hh = date.getHours(); //con esto definimos los minutos y asi con los demas
    let mm = date.getMinutes(); 
    let ss = date.getSeconds();
    const watch = document.querySelector("#watch");

    hh = (hh < 10) ? "0" + hh : hh; // con esto podenemos una condicion que si es menor a 10 le agrege un 0 y si no lo mueste normal
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm + ":" + ss; //Se crea una variable para almacenar los datos de hora
   
    watch.innerHTML = time; //Aqui agregamos la variable creada con los datos a un elemento del DOM
}

setInterval (currentTime, 1000); // hacemos que la funcion se ejecuete en milisegundos gracuas a setInterval en este caso lo ponemos a 1000 para que sea cada segundo

// TIMER!!!

let interval; //Se define esta variable para usarla de intervalo de tiempo recorrido mas adelante 
let isRunning = false; //Se incicializa esta varible en false, esto representa si el timer esta corriendo

function start(){ 
    if(isRunning === false){
          interval = setInterval(updateTime,15); //hace que la funcion se repita cada 15 milisegundo
          isRunning = true; //ahora la variable es true ya que el timer esta corriendo
    }
    
}

//Se declaran las variables del tiempo
let hh = 0;
let mm = 0;
let ss = 0;
let ml = 0;

function updateTime()  {
    const timer = document.getElementById("timer"); //Se selecciona un elemento del DOM
    ml++; //Se comienza que siempre ira incrementando el ml (milisegundos)
    if (ml === 60) { //Con esta condicion hacemos que cuando mil llegue a 60 
        ss++; //Va a comenzar a aumentar los segundos
        ml = 0; //Y los milimetros se pondran en 0 y comenzaran de nuevo la siguiente vuelta

    }else if (ss === 60) { 
        mm++;
        ss = 0;

    }else if (mm === 60) {
        hh++;
        mm = 0;
    }
    
    //creamos una variable la cual le agregamos las variables de la hora, usamos el toString para tranformarlos en cadena de texto y el padStart par que el segundo caracyer sea 0
    let time = hh.toString().padStart(2, "0") + " : " + mm.toString().padStart(2, "0") + " : " + ss.toString().padStart(2, "0") + " : " + ml.toString().padStart(2, "0");

    timer.innerHTML = time; //Agreamos la variable a al Timer del DOM
};


function pause(){

    if(isRunning === true){ //Si el timer esta corriendo use usa la funcion clearInterval para pausar la funcion
        clearInterval(interval);
        isRunning = false; //Lo devuele false ya que dejo de correr 
      }
}

function stop() { //Esta funcion lo que hace es llamar la funcion pause para que el timer se pause y devuelve todos los valores a 0 para que incie de nuevo
    pause();
    hh = 0;
    mm = 0;
    ss = 0;
    ml = 0;

}



// CHRONOMETER!!!!!
//Se crean variables para guardar el valor que pondran en los inputs del tiempo
let selectedHour;
let selectedMinute;
let selectedSecond;
let intervalChrono; //Este es para guardar el intervalo del chronometer


function chrono(){
        // Esta funcion funciona muy parecido a la de Timer

        selectedSecond--;
        if (selectedSecond < 0) { //cuando los segundos sean menos a 0
            selectedMinute--; //Se van a disminuir los minutos
            selectedSecond = 59; //y los segundos se resetean en 59 y asi con los demas
        } else if (selectedMinute < 0) { 
            selectedHour--;
            selectedMinute = 59;
        } else if (selectedSecond === 0 && selectedMinute === 0 && selectedHour === 0) { //Si todos los datos estan en 0 se termina la funcion
                    clearInterval(intervalChrono); //Usando el clearInterval
                    chronoDiv.innerHTML = "¡Finished!"; //Muestra en el DOM que se ha finalizado
                    let audio = new Audio("audio/tono-timer.mp3"); //Suena una corta alarma notificando que ta termino
                    audio.play();
                    return;
        }

        chronoDiv.innerHTML = " "
        chronoDiv.innerHTML = "El tiempo restante es <br><br>" + selectedHour.toString().padStart(2, "0") + ":" + selectedMinute.toString().padStart(2, "0") + ":" + selectedSecond.toString().padStart(2, "0");
        
        //Se crea un boton de stop y se agrgea al DOM
        let stopButton = document.createElement("button");
        stopButton.setAttribute("class", "stop-chrono")
        stopButton.innerHTML = "Stop";
        chronoDiv.appendChild(stopButton);

        stopButton.addEventListener("click", buttonStop);
    // }
}

function startChrono() {
    //Se valua lo que esta dentro de los input
    selectedHour = parseInt(inputHour.value);
    selectedMinute = parseInt(inputMinute.value);
    selectedSecond = parseInt(inputSecond.value);
    chronoDiv.innerHTML = " " //Se limpia el chronoDiv ya que hay elementos HTML ya puestos 

    if (isNaN(selectedHour) || isNaN(selectedMinute) || isNaN(selectedSecond)) { //Si los input son NaN aparece un error
        error.innerHTML = "¡Requiere que pongas todos los campos!"; //Se agrega el error al DOM
    } else {
        container.style.transform = "rotateY(-180deg)"; //Si la primera condicion no se cumple, es decir que los inputs tengan numeros
        intervalChrono = setInterval(chrono, 1000) //Va a rotar -180 gradose en Y lo que lo movera la cara de al ""lado"
        error.innerHTML = " " //Se limpia el error en acaso que haya aparecido

    }
}

function buttonStop() {
    clearInterval(intervalChrono);
}








