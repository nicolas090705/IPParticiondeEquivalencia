//Cliente
var socket = io();

let nombre = document.getElementById("nombre");
let despacho = document.getElementById("despacho");
let puesto = document.getElementById("puesto");
let sueldo = document.getElementById("sueldo");
let edad = document.getElementById("edad");
let nom = document.getElementById("nom");
let des = document.getElementById("des");
let pue= document.getElementById("pue");
let sue = document.getElementById("sue");
let ed = document.getElementById("ed");


socket.on("socket_conectado",()=>{
    
});

nombre.addEventListener("keydown",()=>{
    let nombreEvent = "prueab del evento";
    socket.emit("eventNombre",nombreEvent);
});
