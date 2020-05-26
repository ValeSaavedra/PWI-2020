

let ptosPart=0;
let ptosCompu=0;
let arrPartCol1=[];
let arrPartCol2=[];
let arrPartCol3 =[];
let arrPartCol4 =[];
let arrPartCol5 =[];
let arrCompuCol1=[];
let arrCompuCol2=[];
let arrCompuCol3=[];
let arrCompuCol4=[];
let arrCompuCol5=[];
let arrBolillas=[];
let flgdg=false;
let flgln=false;
let flgcl=false;
let cntDg1Part=0;
let cntDg2Part=0;
let cntDg1Compu=0;
let cntDg2Compu=0;
let arrLnPart=[];
let arrLnCompu=[];
let arrClPart=[];
let arrClCompu=[];
let cntBngPart=0;
let cntBngCompu=0;



const btnSelecCarton=document.getElementById("btnSelecCarton");
const btnOKCarton=document.getElementById("btnOKCarton");
const cartonCompu=document.getElementById("cartonCompu"); /**TODO EL CARTON COMPU */
const btnsParti=document.getElementById("btnsParti");     /** BOTONES BTNSELECCARTON BTNOKCARTON */  
const comienzaJue=document.getElementById("comienzaJue"); /** BTNSACARBOLILLA SPAN ULTBOLI SPAN PTOSPARTI */
const btnSacarBolilla=document.getElementById("btnSacarBolilla");
const cajaMensajes=document.getElementById("cajaMensajes"); /** SPAN MENSAJE Y SPAN CARTONCOMPU */
let msjCartonParti=document.getElementById("msjCartonParti");
let msjPtosCompu=document.getElementById("msjCartonCompu");

window.addEventListener('load',comienzo);



function comienzo ()  {
    // cartonCompu.hidden=true;
    escondoElem(true,3); /* cartonCompu es el grupo 3 */
    // comienzaJue.hidden=true;
    escondoElem(true,2); /* comienzaJuego es el grupo 2 */
    escondoElem(true,4);
    btnSelecCarton.addEventListener("click",armoCartones);
    console.log(`Entro a comienzo`);  
    inicioArrLnCol();
}

habilitarBoton = (status,boton) => {
    switch(boton){
    case 1:
        btnSelecCarton.disabled = status;
        break;
    case 2:   
        btnOKCarton.disabled = status;
        break;
    case 3:
        btnSacarBolilla.disabled=status;
        break;
    }
}

const generarAleatorio = () => {
    // Math.ceil(Math.random()*6 + 1);
    // let random = parseInt(Math.random()*75 +1);
    let aleato = parseInt(Math.random()*75 );
    return aleato;
}

const armoCartones = () => {

    habilitarBoton(true,1);
    console.log(`Entro a armoCartones`);  
    

    llenarArr(1);
    mostrarCarton(1);
    llenarArr(2);


    console.log(`Aca esta por salir de armoCartones`);  
    habilitarBoton(false,1);

    console.log(`Tendria que habilitar al boton`);  
    btnOKCarton.addEventListener("click",okCartonPart);

}




const okCartonPart = () => {

    mostrarCarton(2);
    // habilitarBoton(true,1);
    // habilitarBoton(true,2);
    escondoElem(false,3); 
    // cartonCompu.hidden=false;  
    escondoElem(true,1);
    // btnsParti.hidden=true;
    escondoElem(false,2);
    // comienzaJue.hidden=false;
    escondoElem(false,4);
    btnSacarBolilla.addEventListener("click",sacoBolilla);

}

const sacoBolilla=()=>{
// console.log(`Entramos a sacoBolilla`);
let num;
avisoResultados("");
do {
     num=generarAleatorio();
    //  console.log(`while y numero es ${num}`);
  }
  while ((num==0) || (noEsta(num,arrBolillas)==false));
console.log(`Bolilla ${num}`);
arrBolillas.push(num);
document.getElementById("ultBolilla").innerHTML  =num;
controloDiagonal(num);
console.log(`Estoy por entrar a controloFilas con  ${num}`);
controloFilas(num);
controloColumnas(num);
controloBingo(num);  

// document.getElementById("ptosPart").innerHTML=`Tus puntos:  ${ptosPart}`;
// spnPtosPart.innerHTML=`Tus puntos:  ${ptosPart}`;
// spnPtosCompu.innerHTML=`Puntos Compu: ${ptosCompu}`;
// spnPtosPart.value=ptosPart
// muestroPtos(ptosPart);
}

const controloBingo=(numero)=>{    
    if(numero>=1 && numero<=15){
        for(i=0;i<=4;i++){
            if(arrPartCol1[i]==numero){
                cntBngPart++;  
                coloreoCelda(1,i+1,1);
                i=5;
            }
        }
        for(i=0;i<=4;i++){
            if(arrCompuCol1[i]==numero){
                cntBngCompu++;  
                coloreoCelda(2,i+1,1);
                i=5;
            }
        }
    } 

    if(numero>=16 && numero<=30){
        for(i=0;i<=4;i++){
            if(arrPartCol2[i]==numero){
                cntBngPart++;  
                coloreoCelda(1,i+1,2);
                i=5;
            }
        }
        for(i=0;i<=4;i++){
            if(arrCompuCol2[i]==numero){
                cntBngCompu++;  
                coloreoCelda(2,i+1,2);
                i=5;
            }
        }
    }

    if(numero>=31 && numero<=45){
        for(i=0;i<=4;i++){
            if(arrPartCol3[i]==numero){
                cntBngPart++;  
                coloreoCelda(1,i+1,3);
                i=5;
            }
        }
        for(i=0;i<=4;i++){
            if(arrCompuCol3[i]==numero){
                cntBngCompu++;  
                coloreoCelda(2,i+1,3);
                i=5;
            }
        }
    }

    if(numero>=46 && numero<=60){
        for(i=0;i<=4;i++){
            if(arrPartCol4[i]==numero){
                cntBngPart++;  
                coloreoCelda(1,i+1,4);
                i=5;
            }
        }
        for(i=0;i<=4;i++){
            if(arrCompuCol4[i]==numero){
                cntBngCompu++;  
                coloreoCelda(2,i+1,4);
                i=5;
            }
        }
    }

    if(numero>=61 && numero<=75){
        for(i=0;i<=4;i++){
            if(arrPartCol5[i]==numero){
                cntBngPart++;  
                coloreoCelda(1,i+1,5);
                i=5;
            }
        }
        for(i=0;i<=4;i++){
            if(arrCompuCol5[i]==numero){
                cntBngCompu++;  
                coloreoCelda(2,i+1,5);
                i=5;
            }
        }
    }
// BINGO DEL PARTICIPANTE //
    if (cntBngPart==25){
        asignoPuntos(1,10);
        avisoResultados("Han Cantado Bingo!");    
    }
// BINGO DE COMPU //    
    if (cntBngCompu==25){
        asignoPuntos(2,10);
        avisoResultados("Han Cantado Bingo!");
    }
    if(cntBngPart==25 || cntBngCompu==25){
        habilitarBoton(true,3);
        document.getElementById("btnSacarBolilla").style.backgroundColor="red";
        document.getElementById("btnSacarBolilla").innerHTML="Bingo";
        // btnSacarBolilla="Bingo";
        // btnSacarBolilla.style.color="red";
        // escondoElem(true,2);
        // alert(`Tus puntos: ${ptosPart}  Compu: ${ptosCompu}`);
        avisoResultados(`Tus puntos: ${ptosPart}  Compu: ${ptosCompu}`);
    }
}



const controloColumnas=(numero)=>{
    if(flgcl==false){
        if(numero>=1 && numero<=15){
            if(noEsta(numero,arrPartCol1)==false){
                arrClPart[0]++;
                if(arrClPart[0]==5){
                    flgcl=true;
                    asignoPuntos(1,5);
                    avisoResultados("Columna: 5 puntos!");
                }
            }
            if(noEsta(numero,arrCompuCol1)==false){
                arrClCompu[0]++;
                if(arrClCompu[0]==5){
                    flgcl=true;
                    asignoPuntos(2,5);
                    avisoResultados("Columna: 5 puntos!");
                }    
            }
        } 

        if(numero>=16 && numero<=30){
            if(noEsta(numero,arrPartCol2)==false){
                arrClPart[1]++;
                if(arrClPart[1]==5){
                    flgcl=true;
                    asignoPuntos(1,5);
                    avisoResultados("Columna: 5 puntos!!");
                }
            }
            if(noEsta(numero,arrCompuCol2)==false){
                arrClCompu[1]++;
                if(arrClCompu[1]==5){
                    flgcl=true;
                    asignoPuntos(2,5);
                    avisoResultados("Columna: 5 puntos!");
                }    
            }
        }

        if(numero>=31 && numero<=45){
            if(noEsta(numero,arrPartCol3)==false){
                arrClPart[2]++;
                if(arrClPart[2]==5){
                    flgcl=true;
                    asignoPuntos(1,5);
                    avisoResultados("Columna: 5 puntos!");
                }
            }
            if(noEsta(numero,arrCompuCol3)==false){
                arrClCompu[2]++;
                if(arrClCompu[2]==5){
                    flgcl=true;
                    asignoPuntos(2,5);
                    avisoResultados("Columna: 5 puntos!"); 
                }   
            }
        }

        if(numero>=46 && numero<=60){
            if(noEsta(numero,arrPartCol4)==false){
                arrClPart[3]++;
                if(arrClPart[3]==5){
                    flgcl=true;
                    asignoPuntos(1,5);
                    avisoResultados("Columna: 5 puntos!");
                }
            }
            if(noEsta(numero,arrCompuCol4)==false){
                arrClCompu[3]++;
                if(arrClCompu[3]==5){
                    flgcl=true;
                    asignoPuntos(2,5);
                }    
            }
        }

        if(numero>=61 && numero<=75){
            if(noEsta(numero,arrPartCol5)==false){
                arrClPart[4]++;
                if(arrClPart[4]==5){
                    flgcl=true;
                    asignoPuntos(1,5);
                    avisoResultados("Columna: 5 puntos!!");
                }
            }
            if(noEsta(numero,arrCompuCol5)==false){
                arrClCompu[4]++;
                if(arrClCompu[4]==5){
                    flgcl=true;
                    asignoPuntos(2,5);
                    avisoResultados("Columna: 5 puntos!");
                }    
            }
        }
        
    } /** cierro if flg */
} /** cierro funcion */


function controloFilas(numero){
    console.log(`Entre a controloFilas con ${numero}`);
    if (flgln==false){
        console.log(`Entre a flgln en false con ${numero}`);
        for(i=0;i<=4;i++){
            console.log(`Entre al for de controloFilas con ${numero}`);
            if(arrPartCol1[i]==numero || arrPartCol2[i]==numero || arrPartCol3[i]==numero || arrPartCol4[i]==numero || arrPartCol5[i]==numero){
                arrLnPart[i]++;
                if(arrLnPart[i]==5){
                    flgln=true;
                    asignoPuntos(1,5);
                    avisoResultados("Línea: 5 puntos!");
                    i=5;
                }
            }
        
            if(arrCompuCol1[i]==numero || arrCompuCol2[i]==numero || arrCompuCol3[i]==numero || arrCompuCol4[i]==numero || arrCompuCol5[i]==numero){
                arrLnCompu[i]++;
                if(arrLnCompu[i]==5){
                    flgln=true;
                    asignoPuntos(2,5);
                    avisoResultados("Línea: 5 puntos!");
                    i=5;
                }
            }

        }

    }
}


const controloDiagonal=(numero)=>{
    if (flgdg==false){
        if (arrPartCol1[0]==numero || arrPartCol2[1]==numero || arrPartCol3[2]==numero ||arrPartCol4[3]==numero || arrPartCol5[4]==numero){
            cntDg1Part++;
            if (cntDg1Part==5){
                flgdg=true;
                asignoPuntos(1,5);
                avisoResultados("Diagonal: 5 puntos!");
                console.log(`llego a diagonal1 el part`);
            }
        }
        if (arrCompuCol1[0]==numero || arrCompuCol2[1]==numero || arrCompuCol3[2]==numero ||arrCompuCol4[3]==numero || arrCompuCol5[4]==numero){
            cntDg1Compu++;
            if (cntDg1Compu==5){
                flgdg=true;
                asignoPuntos(2,5);
                avisoResultados("Diagonal: 5 puntos!");
                console.log(`llego a diagonal1 el compu`);
            }
        }    
    
        if (arrPartCol1[4]==numero || arrPartCol2[3]==numero || arrPartCol3[2]==numero ||arrPartCol4[1]==numero || arrPartCol5[0]==numero){
            cntDg2Part++;
            if (cntDg2Part==5){
                flgdg=true;
                asignoPuntos(1,5);
                avisoResultados("Diagonal: 5 puntos!");
                console.log(`llego a diagonal2 el part`);
            }
        }
        if (arrCompuCol1[4]==numero || arrCompuCol2[3]==numero || arrCompuCol3[2]==numero ||arrCompuCol4[1]==numero || arrCompuCol5[0]==numero){
            cntDg2Compu++;
            if (cntDg2Compu==5){
                flgdg=true;
                asignoPuntos(2,5);
                avisoResultados("Diagonal: 5 puntos!");
                console.log(`llego a diagonal2 el compu`);
            }
        }    
    
    }

}

// QUIEN 1=PARTICIPANTE 2=COMPU //
const asignoPuntos=(quien,cuantos)=>{    
    (quien==1)?(ptosPart=ptosPart+cuantos):(ptosCompu=ptosCompu+cuantos);
}

mostrarCarton = (carton)=>{
    if (carton==1 ){
        
        document.getElementById("car111").innerHTML=arrPartCol1[0];
        document.getElementById("car112").innerHTML=arrPartCol2[0];
        document.getElementById("car113").innerHTML=arrPartCol3[0];
        document.getElementById("car114").innerHTML=arrPartCol4[0];
        document.getElementById("car115").innerHTML=arrPartCol5[0];
        document.getElementById("car121").innerHTML=arrPartCol1[1];
        document.getElementById("car122").innerHTML=arrPartCol2[1];
        document.getElementById("car123").innerHTML=arrPartCol3[1];
        document.getElementById("car124").innerHTML=arrPartCol4[1];
        document.getElementById("car125").innerHTML=arrPartCol5[1];
        document.getElementById("car131").innerHTML=arrPartCol1[2];
        document.getElementById("car132").innerHTML=arrPartCol2[2];
        document.getElementById("car133").innerHTML=arrPartCol3[2];
        document.getElementById("car134").innerHTML=arrPartCol4[2];
        document.getElementById("car135").innerHTML=arrPartCol5[2];
        document.getElementById("car141").innerHTML=arrPartCol1[3];
        document.getElementById("car142").innerHTML=arrPartCol2[3];
        document.getElementById("car143").innerHTML=arrPartCol3[3];
        document.getElementById("car144").innerHTML=arrPartCol4[3];
        document.getElementById("car145").innerHTML=arrPartCol5[3];
        document.getElementById("car151").innerHTML=arrPartCol1[4];
        document.getElementById("car152").innerHTML=arrPartCol2[4];
        document.getElementById("car153").innerHTML=arrPartCol3[4];
        document.getElementById("car154").innerHTML=arrPartCol4[4];
        document.getElementById("car155").innerHTML=arrPartCol5[4];
        
   

    }
    else{
        document.getElementById("car211").innerHTML=arrCompuCol1[0];
        document.getElementById("car212").innerHTML=arrCompuCol2[0];
        document.getElementById("car213").innerHTML=arrCompuCol3[0];
        document.getElementById("car214").innerHTML=arrCompuCol4[0];
        document.getElementById("car215").innerHTML=arrCompuCol5[0];
        document.getElementById("car221").innerHTML=arrCompuCol1[1];
        document.getElementById("car222").innerHTML=arrCompuCol2[1];
        document.getElementById("car223").innerHTML=arrCompuCol3[1];
        document.getElementById("car224").innerHTML=arrCompuCol4[1];
        document.getElementById("car225").innerHTML=arrCompuCol5[1];
        document.getElementById("car231").innerHTML=arrCompuCol1[2];
        document.getElementById("car232").innerHTML=arrCompuCol2[2];
        document.getElementById("car233").innerHTML=arrCompuCol3[2];
        document.getElementById("car234").innerHTML=arrCompuCol4[2];
        document.getElementById("car235").innerHTML=arrCompuCol5[2];
        document.getElementById("car241").innerHTML=arrCompuCol1[3];
        document.getElementById("car242").innerHTML=arrCompuCol2[3];
        document.getElementById("car243").innerHTML=arrCompuCol3[3];
        document.getElementById("car244").innerHTML=arrCompuCol4[3];
        document.getElementById("car245").innerHTML=arrCompuCol5[3];
        document.getElementById("car251").innerHTML=arrCompuCol1[4];
        document.getElementById("car252").innerHTML=arrCompuCol2[4];
        document.getElementById("car253").innerHTML=arrCompuCol3[4];
        document.getElementById("car254").innerHTML=arrCompuCol4[4];
        document.getElementById("car255").innerHTML=arrCompuCol5[4];

    }

}

llenarArr=(jugador)=>{
    if (jugador==1){
        limpiarArr(1);
        // let carton={};
        // console.log(`Entro a llenarArrParti`);  
            // console.log(`La longitud del array arrPartCol1 es ${arrPartCol1.length}`);
        // while (arrPartCol1.length<=4)  {
        while (arrPartCol1.length<=4 || arrPartCol2.length<=4 || arrPartCol3.length<=4 || arrPartCol4.length<=4 || arrPartCol5.length<=4) {        
            let num=generarAleatorio();
            if (num>=1  && num<=15 && arrPartCol1.length<=4 && noEsta (num,arrPartCol1)) {arrPartCol1.push(num)};
            if (num>=16 && num<=30 && arrPartCol2.length<=4 && noEsta (num,arrPartCol2)) {arrPartCol2.push(num)};
            if (num>=31 && num<=45 && arrPartCol3.length<=4 && noEsta (num,arrPartCol3)) {arrPartCol3.push(num)};
            if (num>=46 && num<=60 && arrPartCol4.length<=4 && noEsta (num,arrPartCol4)) {arrPartCol4.push(num)};                
            if (num>=61 && num<=75 && arrPartCol5.length<=4 && noEsta (num,arrPartCol5)) {arrPartCol5.push(num)};
        
            // console.log(`La longitud del array arrPartCol1 es ${arrPartCol1.length}`)
        }
    }
    else{
        limpiarArr(2);
        // let carton={};
        // console.log(`Entro a llenarArrParti`);  
            // console.log(`La longitud del array arrPartCol1 es ${arrPartCol1.length}`);
        // while (arrPartCol1.length<=4)  {
        while (arrCompuCol1.length<=4 || arrCompuCol2.length<=4 || arrCompuCol3.length<=4 || arrCompuCol4.length<=4 || arrCompuCol5.length<=4) {        
            let num=generarAleatorio();
            if (num>=1  && num<=15 && arrCompuCol1.length<=4 && noEsta (num,arrCompuCol1)) {arrCompuCol1.push(num)};
            if (num>=16 && num<=30 && arrCompuCol2.length<=4 && noEsta (num,arrCompuCol2)) {arrCompuCol2.push(num)};
            if (num>=31 && num<=45 && arrCompuCol3.length<=4 && noEsta (num,arrCompuCol3)) {arrCompuCol3.push(num)};
            if (num>=46 && num<=60 && arrCompuCol4.length<=4 && noEsta (num,arrCompuCol4)) {arrCompuCol4.push(num)};                
            if (num>=61 && num<=75 && arrCompuCol5.length<=4 && noEsta (num,arrCompuCol5)) {arrCompuCol5.push(num)};
        
            console.log(`La longitud del array arrCompuCol1 es ${arrCompuCol1.length}`)
        }
    }
    
}

function noEsta(numero,array){

    let noes=true;
    let j=0;
    while(j<=array.length-1 && noes==true){
        if(array[j]==numero){
            noes=false;
            // console.log(`estaba en result ${elemento} en la posicion ${j}`);
        }
        j++;
    }
    return noes;
}

limpiarArr =(jugador) =>{
    if (jugador==1) {
    arrPartCol1.length=0;
    arrPartCol2.length=0;
    arrPartCol3.length=0;
    arrPartCol4.length=0;
    arrPartCol5.length=0;
    }
    else{
    arrCompuCol1.length=0;
    arrCompuCol2.length=0;
    arrCompuCol3.length=0;
    arrCompuCol4.length=0;
    arrCompuCol5.length=0;
    }

}

const escondoElem=(status,grupElem)=>{
    switch(grupElem){
        case 1:
            btnsParti.hidden = status;
            break;
        case 2:   
            comienzaJue.hidden = status;
            break;
        case 3:
            cartonCompu.hidden=status;
            break;      
        case 4:
            cajaMensajes.hidden=status;        
            break;          
        }

}

const coloreoCelda=(carton,fila,columna)=>{
    if (carton==1) {
        if (fila==1){
            if (columna==1){document.getElementById("caja111").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja112").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja113").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja114").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja115").style.backgroundColor="lightgreen";}
        }
        if (fila==2){
            if (columna==1){document.getElementById("caja121").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja122").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja123").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja124").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja125").style.backgroundColor="lightgreen";}
        }
        if (fila==3){
            if (columna==1){document.getElementById("caja131").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja132").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja133").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja134").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja135").style.backgroundColor="lightgreen";}
        }
        if (fila==4){
            if (columna==1){document.getElementById("caja141").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja142").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja143").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja144").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja145").style.backgroundColor="lightgreen";}
        }
        if (fila==5){
            if (columna==1){document.getElementById("caja151").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja152").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja153").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja154").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja155").style.backgroundColor="lightgreen";}
        }
    }
    else{
        if (fila==1){
            if (columna==1){document.getElementById("caja211").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja212").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja213").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja214").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja215").style.backgroundColor="lightgreen";}
        }
        if (fila==2){
            if (columna==1){document.getElementById("caja221").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja222").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja223").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja224").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja225").style.backgroundColor="lightgreen";}
        }
        if (fila==3){
            if (columna==1){document.getElementById("caja231").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja232").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja233").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja234").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja235").style.backgroundColor="lightgreen";}
        }
        if (fila==4){
            if (columna==1){document.getElementById("caja241").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja242").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja243").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja244").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja245").style.backgroundColor="lightgreen";}
        }
        if (fila==5){
            if (columna==1){document.getElementById("caja251").style.backgroundColor="lightgreen";}
            if (columna==2){document.getElementById("caja252").style.backgroundColor="lightgreen";}
            if (columna==3){document.getElementById("caja253").style.backgroundColor="lightgreen";}
            if (columna==4){document.getElementById("caja254").style.backgroundColor="lightgreen";}
            if (columna==5){document.getElementById("caja255").style.backgroundColor="lightgreen";}
        }



    }


    
console.log(`Coloreo celda`);

}

const inicioArrLnCol=()=>{
    for (i=0;i<=4;i++){
        arrClPart.push(0);
        arrClCompu.push(0);
        arrLnPart.push(0);
        arrLnCompu.push(0);
    }
}
const avisoResultados=(mensaje)=>{document.getElementById("mensaje").innerHTML=mensaje}
// const muestroPtos=(puntosParti)=>{
//     spnPtosParti
// }