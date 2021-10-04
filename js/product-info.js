function showinfo(){
    document.getElementById("nombre").innerHTML = informacion.name
    document.getElementById("carousel-inner").innerHTML += `
    <div class="carousel-item active">
        <img src="`+ informacion.images[0] +`" class="d-block w-100">
    </div>
    `
    for (let i = 1; i < informacion.images.length; i++ ){
        document.getElementById("carousel-inner").innerHTML += `
    <div class="carousel-item">
        <img src="`+ informacion.images[i] +`" class="d-block w-100">
    </div>
    `
    document.getElementById("precio").innerHTML = informacion.currency + " " + informacion.cost
    document.getElementById("vendidos").innerHTML = informacion.soldCount
    document.getElementById("categoria").innerHTML = informacion.category
    document.getElementById("descripcion").innerHTML = informacion.description
    }
}


function showcomments(){
    for (let i = 0; i < comentario.length; i++){
        document.getElementById("com-list").innerHTML += `
        <div class="comment mt-4 text-justify float-left">
                      <h4>`+ comentario[i].user +`</h4> <span>`+ comentario[i].dateTime +`</span> <br>
                      <div id="estrellas`+i+`"></div>
                      <p>`+ comentario[i].description +`</p>
                  </div>
        `
        let id = "estrellas" + i

        for (let index = 0; index < comentario[i].score; index++) {
            document.getElementById(id).innerHTML +=
            `<span class="fa fa-star checked"></span>`
        }
        for (let index = comentario[i].score; index < 5; index++) {
            document.getElementById(id).innerHTML +=
            `<span class="fa fa-star"></span>` 
        }
    }
}

function showrelated(){
    for(i of informacion.relatedProducts) {
        document.getElementById("relacionados").innerHTML += `
        <div class="card">
        <img src="`+ productos[i].imgSrc +`" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">`+ productos[i].name +`</h5>
          <h6 class="card-text">`+ productos[i].currency + ` ` + productos[i].cost +`</h6>
          <p class="card-text">`+ productos[i].description +`</p>
          <a href="#" class="btn btn-primary">Ir</a>
        </div>
      </div>
        `
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            informacion = resultObj.data;
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if(resultObj.status === "ok"){
                    productos = resultObj.data;
                    showinfo()
                    showrelated()
                }
        })
    }})
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            comentario = resultObj.data;
            showcomments()
        }
    })
});