window.addEventListener('load', function() {
    crearCheckbox()
    filtradorComb()
    llamadaEvents()
    checkbox = document.querySelectorAll('input[type=checkbox]')
    checkbox.forEach(check => check.addEventListener("click", (event)=> {
        var checked = event.target.checked
        if (checked) {
            checkboxSelecter.push(event.target.value)
            filtradorComb()
        } else {
            checkboxSelecter = checkboxSelecter.filter(uncheck => uncheck !== event.target.value)
            filtradorComb()
        }
    }))
});
var checkboxSelecter = [];
var textSearch = "";
var datos = [];
var checkbox;

var id = 1
data.eventos.map(event => event.id = id++)

function crearCheckbox() {
    var checkboxes = document.getElementById("checkboxes");
    var allCategorys = data.eventos.map(event => event.category)
    const dataArray = new Set(allCategorys)
    var categorys = [...dataArray]

    var inputCheckbox = ""
    categorys.forEach(category => {
        inputCheckbox += 
        `<div class="form-check form-switch">
            <input class="form-check-input" value="${category}" type="checkbox" role="switch" id="${category}">
            <label class="form-check-label" for="${category}">${category}</label>
        </div>`
    })
    checkboxes.innerHTML = inputCheckbox
}

var buscador = document.getElementById("search")
buscador.addEventListener("keyup", (event) => {
    textSearch = event.target.value
    filtradorComb()
})

function filtradorComb() {
    // Le hacemos un slice a el array "datos" (Para que se borre todo lo que contiene el array)
    datos.splice(0, datos.length);
    if (checkboxSelecter.length > 0 &&  textSearch != "") {
        checkboxSelecter.map(selected => {
            datos.push(...data.eventos.filter(evento => evento.name.toLowerCase().includes(textSearch.trim().toLowerCase()) && evento.category == selected))
        })
    }
    else if(checkboxSelecter.length > 0 && textSearch == ""){
        checkboxSelecter.map(selected =>{
            datos.push(...data.eventos.filter(evento => evento.category == selected))
        })
    }
    else if (checkboxSelecter.length == 0 && textSearch !== "") {
        datos.push(...data.eventos.filter(evento => evento.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
    }
    else{
        datos.push(...data.eventos)
    }
    // Llamamos a la funcion llamadaEvents() que va a tomar los datos dentro del array
    // "datos" y los va a imprimir dentro de el div "#contenedorCards", "#contenedorCardsPast"
    // o "#contenedorCardsUp" respectivamente
    llamadaEvents()
}




function addCards(date) {
    return `    
    <div class="target d-flex align-items-center justify-content-between flex-column p-3">
        <img src="${date.image}" alt="" width="100%">
        <div class="d-flex flex-column align-items-center">
            <h3>${date.name}</h3>
            <p>${date.description}</p>
        </div>
        <div class="container-fluid d-flex align-items-center justify-content-between mt-3">
            <p>price: $${date.price}</p>
            <a href="../html/infocard.html?id=${date.id}">Ver mas</a>
        </div>
    </div>
    `
}

function llamadaEvents(){
    let currentDate = data.fechaActual;
    if(document.title == "Home"){
        let templateHtml = document.querySelector("#contenedorCards")
        templateHtml.textContent = "";
        if(datos.length > 0){
            
        datos.forEach(date => templateHtml.innerHTML += addCards(date))
        }else{
            templateHtml.innerHTML = `<h3>Ups no encontramos: ${textSearch}</h3>`
        }
    }
    else if(document.title == "Past Events"){
        let templateHtml = document.querySelector("#contenedorCardsPast")
        templateHtml.textContent = "";
        if(datos.length > 0){
            datos.filter(pastEvents => pastEvents.date < currentDate).forEach(date => templateHtml.innerHTML += addCards(date))
        }else{
            templateHtml.innerHTML = `<h3>Ups no encontramos: ${textSearch}</h3>`
        }
    }
    else if(document.title == "Upcoming Events"){
        let templateHtml = document.querySelector("#contenedorCardsUp")
        templateHtml.textContent = "";
        if(datos.length > 0){
            datos.filter(pastEvents => pastEvents.date > currentDate).forEach(date => templateHtml.innerHTML += addCards(date))
        }else{
            templateHtml.innerHTML = `<h3>Ups no encontramos: ${textSearch}</h3>`
        }
    }
}