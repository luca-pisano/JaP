const ORDER_ASC_BY_PRICE = "priceup";
const ORDER_DESC_BY_PRICE = "pricedown";
const ORDER_BY_RELEVANCE = "rel";
var productos = "";
var minPrice = undefined;
var maxPrice = undefined;
var currentProductsArray = [];

function showProducts(){
    let HtmlAPegar = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let producto = currentProductsArray[i]
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(producto.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(producto.cost) <= maxPrice))){
                HtmlAPegar +=  `
                <div class="col-md-4">
                    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                        <img src="`+ producto.imgSrc +`" class="card-img-top">
                        <div class="card-body">
                        <h5 class="card-title">`+ producto.name +`</h5>
                        <h6 class="card-subtitle mb-2">`+ producto.currency +` `+ producto.cost +`</h6>
                        <p class="card-text">`+ producto.description +`</p>
                        <p class="card-text text-muted">`+ producto.soldCount +` unidades vendidas</p>
                        </div>
                    </a>
                </div>
                `
            }
    }
    document.getElementById("append").innerHTML = HtmlAPegar;
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost); 
            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost); 
            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_RELEVANCE){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProducts();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner()
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            currentProductsArray = resultObj.data

            showProducts();
            hideSpinner()
        }
    })

    document.getElementById("PriceAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("PriceDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_RELEVANCE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProducts();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProducts();
    });
})

