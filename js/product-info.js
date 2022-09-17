
let userlog = localStorage.getItem('user');
let catid = localStorage.getItem("productID");
let userdef = localStorage.setItem('userdef', null);
let ItemID = localStorage.getItem('itemID');
//                   muestra usuario logeado em nav-bar
// se crea boton de iniciar sesion
var logsession = document.createElement('button');
logsession.id = "logsession"
logsession.className = "btn btn-success"
var textLoginButton = document.createTextNode('Iniciar Sesion');
logsession.appendChild(textLoginButton);
// crea una imagen en el nav-bar
var userimg = document.createElement('img');
userimg.src = 'img/img_perfil.png';
userimg.id = 'imgperfil'
//se crea nombre de usuario en nav-bar
var username = document.createElement('p');
username.className = 'username'
var textUserLog = document.createTextNode(userlog);
username.appendChild(textUserLog);
// se crea boton de cerrar sesion
var closesession = document.createElement('button');
closesession.id = "closesession"
closesession.className = "btn btn-danger"
var textCloseButton = document.createTextNode('Cerrar Sesion');
closesession.appendChild(textCloseButton);

//                 Control de login en index
function closeS() { //cierra la sesion y redirecciona a login
    localStorage.removeItem('user');
    alert('salio de la sesion');
    location.href = 'login.html';
};
function loginS() {
    location.href = 'login.html';
};
function chkS() {

    if (userlog != userdef) {
        console.log(`hkS:connected user ${userlog}`)
        document.getElementById('sessiondiv').appendChild(userimg);
        document.getElementById('sessiondiv').appendChild(username);
        document.getElementById('sessiondiv').appendChild(closesession);
    }
    else {
        console.log('hkS:unlogged user')
        document.getElementById('sessiondiv').appendChild(logsession);
    }
};
chkS();
document.getElementById('closesession')?.addEventListener('click', () => { closeS(); }); // cierre de sesion manual
document.getElementById('logsession')?.addEventListener('click', () => { loginS(); }); //redireccion manual al login 
//fin control de sesion

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
    <div class="m-5">
        <div class="container">
            <div class="row">
                <div class="col order-1">
                    <h2 class="prodname">${datos.name}</h2>
                    <p>Categoria: ${datos.category}</p>
                </div>
                <div class="col order-2 ">
                    <p class="price">Precio
                    <spam class="price1">${datos.currency} ${datos.cost}</spam>
                    </p>
                    <p>Total ventas: ${datos.soldCount}</p><br> 
                </div>
            </div>
            <hr>
            <div> 
                    <p>Descripcion: ${datos.description}</p>
            </div>
        </div>
        </div>`
        //carga imagenes
        for (let image of datos.images) {
            productlist.innerHTML += `
        <div id="prodimgdiv" class="list-group col-3 mySlides fade">
        <img class="prodimgdiv" src="`+ image + `">
        </div>`};

        productlist.innerHTML +=
            `<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
            `
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
                    let starson = document.createElement('span');
                    starson.classList.add("fa");
                    starson.classList.add("fa-star");
                    starson.classList.add("checked");
                    div.appendChild(starson);
                }
                if (comentarios.score < 5) {
                    let repetir = 5 - comentarios.score;
                    for (i = 0; i < repetir; i++) {
                        let starsoff = document.createElement('span');
                        starsoff.classList.add("fa");
                        starsoff.classList.add("fa-star");
                        div.appendChild(starsoff);
                    }
                }
                div.innerHTML += `<br>${comentarios.description}<br></br>`
            };
        };
        //slider para imagen

        var slideIndex = 0;
        showSlides();

        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 2000);
        }

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



