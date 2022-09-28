let userlog = localStorage.getItem('user');
let catid = localStorage.getItem("productID");
let userdef = localStorage.setItem('userdef', null);
let ItemID = localStorage.getItem('itemID');


//                   muestra usuario logeado em nav-bar
// se crea boton de iniciar sesion
function nologed() {
    document.getElementById('sessionli').innerHTML = `<button class="btn btn-success" id = "logsession">Iniciar Sesion</button>`
};
//                 Control de login en index (adaptado a 4.2)
function usermenu() {

    document.getElementById('sessionli').innerHTML =
        `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  ${userlog}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="my-profile.html">Perfil</a></li>
    <li><a class="dropdown-item" href="cart.html">Carrito</a></li>
    <li><a class="dropdown-item" onclick="closeS();">Cerrar Sesion</a></li>
  </ul>
</div>`
};
//cierra la sesion y redirecciona a login
function closeS() {
    alert('salio de la sesion');
    localStorage.removeItem('user');
    location.href = 'login.html';
};
function loginS() {
    location.href = 'login.html';
};
// cheqeo de login
function chkS() {
    if (userlog != userdef) {
        console.log(`hkS:connected user ${userlog}`)
        usermenu();
    }
    else {
        console.log('hkS:unlogged user')
        nologed();
    }
};
chkS();
document.getElementById('closesession')?.addEventListener('click', () => { closeS(); }); // cierre de sesion manual
document.getElementById('logsession')?.addEventListener('click', () => { loginS(); }); //redireccion manual al login 

//3.2 carga de productos
let productlist = document.getElementById("containerprod");
let Commentsp = document.getElementById("commentsbox");
let divcomments = document.getElementById("commentsmaker");
let div = document.createElement('div');
const URL_PROD = `https://japceibal.github.io/emercado-api/products/${ItemID}.json`;

fetch(URL_PROD)
    .then(res => res.json())
    .then(datos => {

        productlist.innerHTML += ` 
        <div class="container">
            <div class="row">
                <div class="col order-1">
                    <h2 class="prodname">${datos.name}</h2>
                    <p id="cat">Categoria: ${datos.category}</p>
                </div>
                <div class="col order-2 " id="price">
                    <p class="price">Precio
                    <spam class="price1">${datos.currency} ${datos.cost}</spam>
                    </p>
                    <p>Total ventas: ${datos.soldCount}</p><br> 
                </div>
            </div>
        <hr>
        <p>Descripcion: ${datos.description}</p>
        </div>`
        //carga imagenes
        for (let image of datos.images) {
            productlist.innerHTML += `
        <div id="prodimgdiv" class="list-group col-3">
        <img class="prodimg" src=" ${image}">`
        };
        //4.1 productos relacionado
        let rProducts = document.getElementById('relatedProducts');
        for (relatedProduct of datos.relatedProducts) {
            rProducts.innerHTML += `
                <div class="list-group col-3 card list-group-item-action cursor-active" onclick="localStorage.setItem('itemID',${relatedProduct.id}); window.location='product-info.html';">
                <div class="card-body">
                <p>${relatedProduct.name}</p>
                <div  class="card-img-top">
                <img src="${relatedProduct.image}">
                <div/>
                </div>
                `
        };
    });
//3.3 comentarios 
const URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${ItemID}.json`;
fetch(URL_COMMENTS)
    .then(res => res.json())
    .then(comments => {

        function comentar() {

            div.innerHTML = "";

            for (let comentarios of comments) {

                div.innerHTML += `<b>${comentarios.user}</b> - ${comentarios.dateTime} - `
                Commentsp.appendChild(div);
                // estrellas
                for (let i = 0; i < comentarios.score; i++) {
                    let starsON = document.createElement('span');
                    starsON.classList.add("fa");
                    starsON.classList.add("fa-star");
                    starsON.classList.add("checked");
                    div.appendChild(starsON);
                }
                if (comentarios.score < 5) {
                    let repetir = 5 - comentarios.score;
                    for (i = 0; i < repetir; i++) {
                        let starsOFF = document.createElement('span');
                        starsOFF.classList.add("fa");
                        starsOFF.classList.add("fa-star");
                        div.appendChild(starsOFF);
                    }
                }
                div.innerHTML += `<br>${comentarios.description}<br></br>`
            };
        };
        comentar();
        divcomments.innerHTML = `
        <h4>Comentar</h4>
        <p>Tu opinion:</p><br>
        <textarea name="Comentario" id="Comentario" cols="50" rows="2"></textarea><br>
        <p>Tu puntuacion:</p>
        <select name="stars" id="stars">
        <option>1 Estrella</option>
        <option>2 Estrellas</option>
        <option>3 Estrellas</option>
        <option>4 Estrellas</option>
        <option>5 Estrellas</option>
        </select>
        <input type="button" class="btn btn-primary" id="commentbtn" value="Enviar">
        `
        let Comentario = document.getElementById("Comentario");
        let stars = document.getElementById("stars");
        let btnComments = document.getElementById("commentbtn");

        //3.4 funcion para nuevo comentario
        function newcomment() {
            let dateTime = new Date()
            let year = dateTime.getFullYear()
            let month = dateTime.getMonth()
            let day = dateTime.getDate()
            let hours = dateTime.getHours()
            let min = dateTime.getMinutes()
            let sec = dateTime.getSeconds()
            let array = {
                product: parseInt(catid),
                score: parseInt(stars.value),
                description: Comentario.value,
                user: userlog,
                dateTime: day + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
            }
            comments.push(array);
            Commentsp.removeChild(div);
            if (userlog != userdef) {
                comentar();
            }
            else {
                alert('Necesita estar logeado para comentar');
                location.reload()
            };
        };
        btnComments.addEventListener("click", newcomment);
    });



