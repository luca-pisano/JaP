var productos = "";

function showProducts(prod){
    let HtmlAPegar = "";
    for(let i = 0; i < prod.length; i++){
        let producto = prod[i]
        HtmlAPegar +=  `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ producto.name +`</h4>
                        <h6>`+ producto.currency + ` ` + producto.cost + `</h6>
                    </div>
                    <p class="mb-1">` + producto.description + `</p>
                    <small class="text-muted"> ya se vendieron ` + producto.soldCount + ` unidades de este producto </small>
                </div>
            </div>
        </a>
        `

    }
    document.getElementById("cat-list-container").innerHTML = HtmlAPegar;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner()
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            productos = resultObj.data

            showProducts(productos);
            hideSpinner()
        }
    })
})