

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
const btnSelecCarton=document.getElementById("btnSelecCarton");
const btnOKCarton=document.getElementById("btnOKCarton");
const cartonCompu=document.getElementById("cartonCompu");
const btnsParti=document.getElementById("btnsParti");
const comienzaJue=document.getElementById("comienzaJue");
window.addEventListener('load',comienzo);


function comienzo ()  {
    cartonCompu.hidden=true;
    comienzaJue.hidden=true;
    btnSelecCarton.addEventListener("click",armoCartones);
    console.log(`Entro a comienzo`);  

}

habilitarBoton = (status,boton) => {
    switch(boton){
    case 1:
        btnSelecCarton.disabled = status;
        break;
    case 2:   
        btnOKCarton.disabled = status;
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
    habilitarBoton(true,1);
    habilitarBoton(true,2);
    cartonCompu.hidden=false;
    btnsParti.hidden=true;
    comienzaJue.hidden=false;

}


// const escondoElem

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

