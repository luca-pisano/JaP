
const CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

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
    document.getElementById("subtotal").innerHTML = "Subtotal: UYU " + Total
}

function update(linea){
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
    document.getElementById("subtotal").innerHTML = "Subtotal: UYU " + aux
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            objeto = resultObj.data
            CartContent = objeto.articles
            showCart()
        }
    }
)});