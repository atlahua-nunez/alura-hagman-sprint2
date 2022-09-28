const figureParts = document.querySelectorAll(".figure-part");
const word_list = ["banana", "automovil","gato", "perro", "html", "alfa"];
const caracteresEspeciales = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?´@]/);
const acentos = new RegExp(/[ÁÉÍÓÚáéíóúÄËÏÖÜäëïöü]/);
const numeros = new RegExp(/[0-9]/);
let wrong_letters = [];
let hidden_word = "";
let wordAdi = "";
let letra = "";
let vidas = 6;

function juego(){
    word_select();
    document.addEventListener("keyup", compararLetra);
    document.getElementById("agregar").style.display = "none";
    document.getElementById("btn-desistir").style.display = "block";
}

// Seleccionar palabra al azar y mostrar el número de caracteres que tiene
function word_select(){
    //document.getElementById("letras-ocultas").innerHTML="",
    hidden_word = word_list[Math.floor(Math.random(word_list.length) * word_list.length)].toUpperCase();    
    for(let i=0; i < hidden_word.length; i++) { 
        wordAdi += "_";
    }
    alert(hidden_word);
    //alert(wordAdi);
    document.getElementById("letras-ocultas").style.display = "flex";
    document.getElementById("letras-ocultas").innerHTML= wordAdi.split("").join(" ");
    document.getElementById("inicio").disabled = true;
    document.getElementById("inicio").style.display = "none";
    document.getElementById("btn-menu-agregar").style.display = "none";
}




function compararLetra(e){
        let nuevo = ""; 
        if(e.keyCode >=65 && e.keyCode <= 90){
            letra = e.key.toUpperCase();
    
        } else {
            solo_letras();
            return
        }
        
        for (let i = 0; i < hidden_word.length; i++){
            if (hidden_word[i].toUpperCase() == letra){
                nuevo += letra;
            } else  {
                nuevo += wordAdi[i];   
            }    
            if(wordAdi.includes(letra) || wrong_letters.includes(letra)){
                notificacion();
                return;
            }
        }
        if(nuevo == wordAdi){   
            vidas--;
            document.getElementById("vidas").innerHTML = "Vidas disponilbes: " + vidas;
            wrong_letters.push(letra);
            document.getElementById("letras-erroneas").innerHTML = wrong_letters;  
            figureParts.forEach((part,index)=>{
                const errores = wrong_letters.length;
                if(index < errores){
                    part.style.display = "block"
                } else {
                    part.style.display = "none"
                }
            })
        }
        
        wordAdi = nuevo;        
        document.getElementById("letras-ocultas").innerHTML = wordAdi.split("").join(" "); 
        if(vidas == 0){
            //alert("Perdiste");
            document.getElementById("mensaje-perder").style.display = "flex";
            document.getElementById("letras-ocultas").style.display = "none";
            document.getElementById("letras-erroneas").style.display = "none";
            document.getElementById("vidas").style.display = "none";
            document.getElementById("notificacion-letras-erroneas").style.display = "none";
            document.getElementById("btn-desistir").style.display = "none"; 
            document.removeEventListener("keyup", compararLetra);
            return 
            
        }
        if(wordAdi.toUpperCase() == hidden_word){
            //alert("Ganaste");
            document.getElementById("mensaje").style.display = "flex";
            document.getElementById("letras-ocultas").style.display = "none";
            document.getElementById("letras-erroneas").style.display = "none";
            document.getElementById("vidas").style.display = "none";
            document.getElementById("notificacion-letras-erroneas").style.display = "none";
            document.getElementById("btn-desistir").style.display = "none"; 
            document.removeEventListener("keyup", compararLetra);
            return 
        }
}



//Programar botones de Si y No
//Si es para volver a jugar
function nuevo_juego(){    
    wordAdi = "";
    vidas = 6;
    nuevo="";
    wrong_letters = [];
    hidden_word = "";
    letra = "";
    document.getElementById("letras-ocultas").style.display = "flex";
    document.getElementById("letras-ocultas").innerHTML = "";
    document.getElementById("vidas").style.display = "flex";
    document.getElementById("vidas").innerHTML = "Vidas disponibles " + vidas;
    document.getElementById("notificacion-letras-erroneas").style.display = "flex";
    document.getElementById("letras-erroneas").style.display = "flex";
    document.getElementById("letras-erroneas").innerHTML = wrong_letters;
    document.getElementById("mensaje-perder").style.display = "none";
    document.getElementById("mensaje").style.display = "none";
    document.getElementById("figure-part").style.display ="none";
    document.getElementById("figure-part1").style.display ="none";
    document.getElementById("figure-part2").style.display ="none";
    document.getElementById("figure-part3").style.display ="none";
    document.getElementById("figure-part4").style.display ="none";
    document.getElementById("figure-part5").style.display ="none";
    juego();  
}

function desistir(){
    hidden_word = "";
    wordAdi = "";
    nuevo = "";
    vidas = 6;
    wrong_letters = [];   
    document.getElementById("letras-ocultas").style.display = "flex";
    document.getElementById("vidas").style.display = "flex";
    document.getElementById("notificacion-letras-erroneas").style.display = "flex";
    document.getElementById("letras-ocultas").innerHTML = wordAdi;
    document.getElementById("vidas").innerHTML = "Vidas disponibles: " + vidas;
    document.getElementById("letras-erroneas").style.display = "flex";
    document.getElementById("letras-erroneas").innerHTML = wrong_letters;
    document.getElementById("mensaje-perder").style.display = "none";
    document.getElementById("mensaje").style.display = "none";
    document.getElementById("figure-part").style.display ="none";
    document.getElementById("figure-part1").style.display ="none";
    document.getElementById("figure-part2").style.display ="none";
    document.getElementById("figure-part3").style.display ="none";
    document.getElementById("figure-part4").style.display ="none";
    document.getElementById("figure-part5").style.display ="none";
    document.getElementById("inicio").disabled = false;  
    document.getElementById("btn-desistir").style.display = "none";  
    document.getElementById("inicio").style.display = "block";
    document.getElementById("btn-menu-agregar").style.display = "block";
    
}


//No.- es para cerrar el pop up y volver a la pantalla de inicio.
function notificacion(){
    document.getElementById("notificacion").style.display = "flex";
    document.getElementById("notificacion").classList.add("show");
    setTimeout(()=>{
    document.getElementById("notificacion").classList.remove("show")}, 2000);
}

function solo_letras(){
    document.getElementById("solo-letras").style.display = "flex";
    document.getElementById("solo-letras").classList.add("show");
    setTimeout(()=>{
        document.getElementById("solo-letras").classList.remove("show")}, 2000);
}



function menuAgregar(){
    document.getElementById("addWord").style.display = "block";
    document.getElementById("letras-erroneas").style.display = "none";
    document.getElementById("vidas").style.display = "none";
    document.getElementById("notificacion-letras-erroneas").style.display = "none";
    document.getElementById("inicio").style.display = "none";
    document.getElementById("btn-menu-agregar").style.display = "none";
    document.getElementById("agregar").style.display = "block";
    document.getElementById("btn-menu-principal").style.display = "block";
}

// Agregar palabra
function addNewWord(input){
    var input = document.getElementById("addWord").value;
    //word_list.push(input)
    try {
        if(numeros.test(input)) throw "números.";
        if(caracteresEspeciales.test(input)) throw "carácteres especiales.";
        if(acentos.test(input)) throw "acentos.";
        if(input == "") throw "campos vacio.";

    } catch (error) {
        alert( "No se permiten " + error);
        return
    }  
    word_list[word_list.length] = input;
    alert(word_list);
}

function menuPrincipal(){
    document.getElementById("addWord").style.display = "block";
    document.getElementById("letras-erroneas").style.display = "block";
    document.getElementById("vidas").style.display = "block";
    document.getElementById("notificacion-letras-erroneas").style.display = "block";
    document.getElementById("inicio").style.display = "block";
    document.getElementById("agregar").style.display = "none";
    document.getElementById("btn-menu-agregar").style.display = "block";
    document.getElementById("btn-menu-principal").style.display = "none";
    document.getElementById("addWord").style.display = "none";
}