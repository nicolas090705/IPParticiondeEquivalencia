//SERVIDOR
var express = require('express');
var app = require('express')();
var path = require('path');

var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('view engine', 'ejs');
//path.join() concatena los directorios
app.set('views', path.join(__dirname, 'views'));

//para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), () => console.log('http://localhost:3000'));

// app.use(express.static('public'));

//__dirname path completa
app.use(express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
    res.render("formulario");
});

app.post('/validacion',(req,res)=>{
    let nom = false;
    let des = false;
    let pue = false;
    let sue = false;
    let eda = false;

    var {nombre,despacho,puesto,sueldo,edad} = req.body

    expRegNombre = /^([A-Za-z]\s?)*$/
    expRegDespacho = /^[A-B]{1}\d{3}$/
    expRegPuesto = /^(JEFE_AREA||DIRECTOR_COMERCIAL||JEFE_PROYECTO||ANALISTA||PROGRAMADOR)$/
    expRegEdad = /^ {18-67} $/

    let nomInc = "Nombre correcto"
    let desInc = "Despacho correcto"
    let pueInc = "Puesto correcto"
    let sueInc = "Sueldo correcto"
    let edaInc = "Edad correcto" 
    //validacion de los campos
    //3 < nombre.length && nombre.length<256 && 
    3 < nombre.length && nombre.length<256 && expRegNombre.test(nombre) ? nom=true : nomInc = 'nombre incorrecto'

    expRegDespacho.test(despacho) ? des=true : desInc ='Despacho Incorrecto'
    
    // if(puesto==='JEFE_AREA' || puesto==='DIRECTOR_COMERCIAL' || puesto==='JEFE_PROYECTO' || puesto==='ANALISTA' || puesto==='PROGRAMADOR'){
    expRegPuesto.test(puesto) && puesto != "" ? pue=true : pueInc = 'Puesto incorrecto'

    // if(expRegEdad.test(edad)){
    edad > 17 && edad<68 ? eda=true : edaInc = 'Edad Incorrecto'

    sueldo > 999 && sueldo < 6001 ? sue=true : sueInc = 'Sueldo Icorrecto'

    var Retencion
    if(999<sueldo && sueldo<2001){Retencion=0.08}
    else if(2000<sueldo && sueldo<3001){Retencion=0.095}
    else if(3000<sueldo && sueldo<4001){Retencion=0.11}
    else if(4000<sueldo && sueldo<5001){Retencion=0.125}
    else if(5000<sueldo && sueldo<6001){Retencion=0.14}

    let RetencionFinal

    if(puesto==='JEFE_AREA'){RetencionFinal='('+Retencion+'+3.5)*'+sueldo}
    else if(puesto==='DIRECTOR_COMERCIAL'){RetencionFinal='('+Retencion+'+3)*'+sueldo}
    else if(puesto==='JEFE_PROYECTO'){RetencionFinal='('+Retencion+'+2)*'+sueldo}
    else{RetencionFinal=Retencion+'*'+sueldo}

    // if(nom==true && des==true && pue==true && sue==true && eda==true){
    if(nom && des && pue && sue && eda){
        // document.getElementById(RetencionFinal).innerHTML=RetencionFinal
    res.render("formulario3",{RetencionFinal:RetencionFinal});
    }else{
        res.render("formulario2",{nombre:nombre,despacho:despacho,puesto:puesto,sueldo:sueldo,edad:edad,nomInc:nomInc,desInc:desInc,pueInc:pueInc,sueInc:sueInc,edaInc:edaInc});
    }

    // console.log('Retencion: ', Retencion)
    
    // 
});

io.on("connection",(socket)=>{
    io.sockets.emit('socket_conectado',socket.id);
});