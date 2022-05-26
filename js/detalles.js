function getData(){
    var idCard = 1;
    data.eventos.map(card => card.id = idCard++)
    var id = location.search.split("?id=").filter(Number)
    console.log(location)
    console.log(location.search)
    console.log(id)
    var selectedId = Number(id[0])
    console.log(selectedId)
    var card = data.eventos.find((card) =>{
        return card.id == selectedId
        
    })
    console.log(card);
    var templateHtml = `
    <div class="target d-flex align-items-center justify-content-between flex-column p-3">
        <img src="${card.image}" alt="" width="100%">
        <div class="d-flex flex-column align-items-center">
            <h3>${card.name}</h3>
            <p>${card.description}</p>
        </div>
        <div class="container-fluid d-flex align-items-center justify-content-between mt-3">
          <p>Category: ${card.category}</p>
          <p>Place: ${card.place}</p>
      </div>
        <div class="container-fluid d-flex align-items-center justify-content-between mt-2">
            <p>price: ${card.price}</p>
            <p>Date: ${card.date}</p>
        </div>
    </div>
    `
    document.querySelector('#detalles').innerHTML = templateHtml
}

getData()