
const CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
let CostoEnvio = 0;
let MalaIdea = 0;
//Variables para validar que todos los campos esten completados/con valor
let Cantidad = true;
let Envio = false;
let MetodoPago = false;


function showCart(){
    let Total = 0
    let htmlToAppend = ""
    for(let i = 0; i < CartContent.length; i++){
        if (CartContent[i].currency === "UYU"){
            Total += CartContent[i].unitCost * CartContent[i].count
        }else{
            Total += CartContent[i].unitCost * CartContent[i].count * 40
        }
        htmlToAppend +=`
        <tr>
          <th><img src="`+ CartContent[i].src +`" height="80px"></th>
          <th>`+ CartContent[i].name +`</th>
          <th>`+ CartContent[i].currency +`</th>
          <th>`+ CartContent[i].unitCost +`</th>
          <th><input type="number" value="`+ CartContent[i].count +`" min="1" id="val`+i+`" onchange=update(`+i+`)></th>
          <th id="sub`+i+`">`+ CartContent[i].unitCost * CartContent[i].count +`</th>
        </tr>
        `
    }
    document.getElementById("CartBody").innerHTML = htmlToAppend;
    document.getElementById("subtotal").innerHTML = Total
}

function update(linea){
    if (document.getElementById("val"+linea).value == ""){
        document.getElementById("val"+linea).value = 0
    }
    let aux = document.getElementById("val"+linea).value
    document.getElementById("sub"+linea).innerHTML = aux * CartContent[linea].unitCost
    aux = 0
    for(let i = 0; i < CartContent.length; i++){
        if (CartContent[i].currency === "UYU"){
            aux += parseInt(document.getElementById("sub"+i).innerHTML)
        } else {
            aux += parseInt(document.getElementById("sub"+i).innerHTML) * 40
        }
    }
    document.getElementById("subtotal").innerHTML = aux
    PrecioEnvio(CostoEnvio)
}

function PrecioEnvio(porcentaje){
    document.getElementById("CostoTotal").innerHTML = Math.round(parseInt(document.getElementById("subtotal").innerHTML) * porcentaje)
    CostoEnvio = porcentaje
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            objeto = resultObj.data
            CartContent = objeto.articles
            showCart()
            PrecioEnvio(1.15)
        }
    }
)});

document.getElementById("tarjeta").addEventListener("change", function(){

    document.getElementById("numero").disabled = false;
    document.getElementById("codigo").disabled = false;
    document.getElementById("fecha").disabled = false;

    document.getElementById("cuenta").disabled = true;

    document.getElementById("TipoPago").innerHTML = "Método Seleccionado: Tarjeta de crédito"
})

document.getElementById("transferencia").addEventListener("change", function(){

    document.getElementById("numero").disabled = true;
    document.getElementById("codigo").disabled = true;
    document.getElementById("fecha").disabled = true;
   
    document.getElementById("cuenta").disabled = false;
   
    document.getElementById("TipoPago").innerHTML = "Método Seleccionado: Transferencia bancaria"
})

document.getElementById("direccion").addEventListener("change", function(){
    Envio = (document.getElementById("direccion").value != "") && (document.getElementById("pais").value != "")
})

document.getElementById("pais").addEventListener("change", function(){
    Envio = (document.getElementById("direccion").value != "") && (document.getElementById("pais").value != "")
})

document.getElementById("CerrarPago").addEventListener("click", function(){
    if ((document.getElementById("tarjeta").checked) && (document.getElementById("numero").value != "") && (document.getElementById("codigo").value != "") && (document.getElementById("fecha").value != "")){
        MetodoPago = true
    } else {
        if ((document.getElementById("transferencia").checked) && (document.getElementById("cuenta").value != "")){
            MetodoPago = true
        } else {
            MetodoPago = false
        }    
    } 
})

document.getElementById("Comprar").addEventListener("click", function(){

    if (Envio && MetodoPago){
        alert("Compra realizada con éxito")
        window.location.href = './inicio.html'
    } else {
        alert("Hay campos sin completar")
    }
})

