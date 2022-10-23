const UserID = localStorage.setItem('userID', 25801)//en desarrollo
// ============carrito============

const userID = localStorage.getItem('userID')
const URL_USER_CART = `https://japceibal.github.io/emercado-api/user_cart/${userID}.json`
const prod_add_list = localStorage.getItem('productadd')
const item_add_table = document.getElementById('tbcart')
let item_agregado = document.getElementsByClassName('item_tr')
let costo_usd
let costo_uyu

// recoleccion de datos desde api
fetch(URL_USER_CART)
  .then(res => res.json())
  .then(datos => {
    for (let article of datos.articles) { itemaddtable(article) }
  })
// recoleccion de datos desde localstorage
function addtocart() {
  let article_list = JSON.parse(prod_add_list)
  if (item_agregado !== null) {
    for (let article of article_list.articles) {
      itemaddtable(article)
    }
  } else { // si prodaddlist es null muestra que no hay productos en el carrito
    item_add_table.innerHTML += `<tr class="item_tr table-striped">No hay productos en su carrito</tr>`
  }
}
addtocart()
// plantilla para cada item
function itemaddtable(article) {
  item_add_table.innerHTML += `
    <tr class="item_tr table-striped " id="${article.id}">
    <td class="itemdeleter col-1">
    <button class="delettocart btn btn-danger" id="delettocart${article.id}" onclick="delProduct(${article.id})">X</button>
    </td>
    <td class="product-thumbnail col-2">
    <img width="150" height="100" src="${article.image}">
    </td>
    <td class="product-name col-3" data-title="Producto">${article.name}
    </td>
    <td class="product-price col-2" data-title="Precio">${article.currency}${article.unitCost}
    </td>
    <td class="product-quantity col-1" data-title="Cantidad" align-items-center>
    <input type="number" class="inputofcart" id="input_of${article.id}" step="1" min="1" value="${article.count}" onchange="calcsubtotal(${article.id}, ${article.unitCost})">
    </td>
    <td class="sub_total col-3" value="">${article.currency} : <spam id="sub_of_${article.id}">${article.unitCost * article.count}</spam></td>
    </tr>`
}
// calculo del subtotal por cada producto
function calcsubtotal(article, cost) {
  let input = document.getElementById(`input_of${article}`).value
  let subTotal = document.getElementById(`sub_of_${article}`)
  let sub_total = cost * input
  subTotal.innerHTML = `${sub_total}`
}

function delProduct(id_deleted) { 
  DeletProds(id_deleted)
  AlertShow()
}
function DeletProds(id_deleted) {
	let prodls = localStorage.getItem('productadd') //
	let prodls_parse = JSON.parse(prodls)
	// Eliminar productos de la lista)
	for (let i = 0; i < prodls_parse.articles.length; i++) {
		if (prodls_parse.articles[i].id === id_deleted) {
			console.log(prodls_parse.articles[i].id, i)
			let prodls_fix = prodls_parse.articles[i].splice(i, 1)
			localStorage.setItem("productadd", JSON.stringify(prodls_fix))
		}
		location.reload()
	}
}
    // alerta 
function AlertShow(){
    let showAlert = document.getElementById('showalert')
    showAlert.innerHTML = `<p class="btn btn-danger">Se ha eliminado el producto del carrito<p>`
    setTimeout(function() {
      showAlert.innerHTML = ''
    }, 5000)
  }

function calcTotal(){
	if (currency === 'USD'){
		

	} else {
		let Value_USD = 42
		subtotal / 42
	}
}
