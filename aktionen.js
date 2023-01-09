
let ergebnis = document.getElementById("ergebnis");
let current = document.getElementById("current");
var ergebnisV;
var currentV;
var esittirD = false; /* esittir isaretine basildi mi? */
var commandD = false; /* commanda basildi mi? */

function zahldruck(zahl){  

    /* esittire basildi ise*/
    if (esittirD == true){
        
        ergebnisV = ergebnis.textContent    
        current.innerHTML = ergebnisV;
        ergebnis.innerHTML = "+";
        esittirD = false;
        
    }
        /* eger yazilan parametre sayi degilse virgüle ceviriyor */
        if(zahl != parseInt(zahl)) zahl = ","

        ergebnisV = ergebnis.textContent;    

        /* eger bir tane virgül varsa ikinci virgülün atilmasini engelliyor */
        if(ergebnisV.includes(",") && zahl == ",") return;

        /* 16 dan fazla rakam ekrana sigmadigi icin fazla rakam olursa eklenmesini ekliyor */
        if(ergebnisV.length == 9){
            alert("In this version you can not write more than 9 numbers, sorry!");
            return;
        }
        
        /* ilk islem olarak virgüle basilirsa basinda 0 olmasini sagliyor */
        if((ergebnisV == 0 || ergebnisV == "") && zahl == ",") {
            ergebnis.innerHTML = "0"+zahl ;
            return;
        }

        /* ekranda 0 yazili mi onu kontrol ediyor eger yazili degilse yeni sayiyi ekliyor */
        if(ergebnisV == 0) ergebnis.innerHTML = zahl;
        else ergebnis.innerHTML += zahl;
    
    esittirD = false ;
    commandD = false;
   
}
 function command(command){
    ergebnisV = ergebnis.textContent;
    currentV = current.textContent;
    /* burada yazilari sembole ceviriyorum cünkü sembolu parametre olarak atayamadim  */
    switch (command){
        case carp:
            command = "x" ;
            break;
        case topla:
            command = "+";
            break;
        case cikar:
            command = "-";
            break;
        case bol:
            command = "÷";
            break;
    }

    /* baska bir command varsa tekrar yazmayacak */
    if(commandD == true){
       
        return;
    }


    /* eger esittire daha önce basildiysa currenta sonucu yazmak icin */
    if(esittirD == true){
        /* currentV = current.textContent; */
        currentV = currentV.replace("=",command);
        current.innerHTML = ergebnisV ;
        ergebnis.innerHTML = command;
        esittirD=false;
        commandD = true;
        return;
    }

    /* eksiye basinca basta eksi cikmasi icin*/
    if(command == "-"){
        if(ergebnisV == 0){
            ergebnis.innerHTML = command; 
            esittirD= false;
            commandD = true;
            return;
        }else{
            ergebnis.innerHTML += command; 
            esittirD= false;
            commandD = true;
            return;
        }
    }


    /* islemler üst tarafa aktarilip yazi alani bosaltiliyor */
    current.innerHTML += ergebnisV + command; 
    ergebnis.innerHTML = "";
    esittirD = false;
    commandD = true;
    
}

function esittir(){
  
    ergebnisV = ergebnis.textContent;
    currentV = current.textContent;
    /* sayi girmeden esittire basilirsa */
    if(!/[0-9]/.test(ergebnisV)) return;


    /* esittire basildiysa mevcut sayiyi tekrar toplar */
          if(esittirD == true ){
        ergebnisV = parseFloat(ergebnisV);
        ergebnisV = parseFloat(currentV) + parseFloat(ergebnisV);
        current.innerHTML = String(ergebnisV);
        esittirD == true;
     }     
     else{ /* esittir ilk defa basildiysa veya baska bir isleme basildiysa */
    current.innerHTML += ergebnisV + "="; 
    currentV = current.textContent;

    /* bilgisayarin matematiksel islem yapabilmesi icin olmasi gereken degisiklikler */
    currentV = currentV.replaceAll(",",".");
    currentV = currentV.replaceAll( "=","");
    currentV = currentV.replaceAll( "x","*");
    currentV = currentV.replaceAll( "÷","/");
    
    currentV = eval(currentV);

    /* 0,1 + 0,2 gibi islemlerde sacmalamasin diye float sayilarindan fedakarlik :) */   
    currentV = currentV.toFixed(2); 
    if(currentV == parseInt(currentV) ) currentV = parseInt(currentV);
    
    /* tekrar ekrana virgülle yansitmasi icin gerekli */
    currentV = String(currentV).replace(".",","); 
    ergebnis.innerHTML = currentV;
    currentV = current.textContent;
    esittirD = true;
    }

    
}

function clearit(){
    
    ergebnis.innerHTML = "0";
    current.innerHTML = "";
    esittirD = false ;
    
}

function backspace(){
   
    ergebnisV = ergebnis.textContent;
    if(ergebnisV.length == 0){
        alert("Nothing to delete!");
        return;
    }
    ergebnisV = ergebnisV.substring(0, ergebnisV.length - 1);
    ergebnis.innerHTML = ergebnisV;
    commandD = false;
    
}

