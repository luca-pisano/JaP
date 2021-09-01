//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function validar(){
    let usuario = document.forms[0].user.value
    let contra = document.forms[0].contrasenia.value
    if ((usuario != "") && (contra != "")){
        localStorage.setItem("user", usuario)
        window.location.href = './inicio.html'
    } else {
        alert("escriba su usuario y contraseña")
    }
}