let ids = ["nombres","apellidos","edad","mail","telefono"]
let datos = JSON.parse(localStorage.getItem("datos"))
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    if (datos != null){
        for(i in datos){
            document.getElementById(i).innerHTML =` ` + datos[i]
        }
    }
    
});

function editar(){
    if (datos != null){
        for(i in datos){
            document.getElementById(i).innerHTML = `<input type="text" value="`+ datos[i] +`">`
        }
    } else {
        for(i of ids){
            document.getElementById(i).innerHTML = `<input type="text">`
        }
    }

    document.getElementById("elboton").innerHTML = `<button class="btn btn-primary" onclick="guardar()">Guardar Datos</button>`
}

function guardar(){
    if (datos != null){
        for(i in datos){
            datos[i] = document.getElementById(i).getElementsByTagName("input")[0].value
            document.getElementById(i).innerHTML =` ` + datos[i]
        }
    } else {
        datos = {
            nombres: document.getElementById("nombres").getElementsByTagName("input")[0].value,
            apellidos: document.getElementById("apellidos").getElementsByTagName("input")[0].value,
            edad: document.getElementById("edad").getElementsByTagName("input")[0].value,
            mail: document.getElementById("mail").getElementsByTagName("input")[0].value,
            telefono: document.getElementById("telefono").getElementsByTagName("input")[0].value
        }
        for(i in datos){
            document.getElementById(i).innerHTML =` ` + datos[i]
        }
    }
    localStorage.setItem("datos", JSON.stringify(datos))
    document.getElementById("elboton").innerHTML = `<button class="btn btn-primary" onclick="editar()">Editar</button>`
}