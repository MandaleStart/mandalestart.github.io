
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

//carga de productos
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
        for (let image of datos.images) {
            productlist.innerHTML += `
        <div id="prodimgdiv" class="list-group col-3">
        <img class="prodimgdiv" src="`+ image + `">

        </div>`};
    });

//comentarios
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
                    let estrella = document.createElement('span');
                    estrella.classList.add("fa");
                    estrella.classList.add("fa-star");
                    estrella.classList.add("checked");
                    div.appendChild(estrella);
                }
                if (comentarios.score < 5) {
                    let repetir = 5 - comentarios.score;
                    for (i = 0; i < repetir; i++) {
                        let estrella1 = document.createElement('span');
                        estrella1.classList.add("fa");
                        estrella1.classList.add("fa-star");
                        div.appendChild(estrella1);
                    }
                }
                div.innerHTML += `<br>${comentarios.description}<br></br>`
            };
        };

        comentar();
        // Completo el formulario para enviar un comentario
        divcomments.innerHTML = `
        <h4>Comentar</h4>
        Tu opinion:<br>
        <textarea name="Comentario" id="Comentario" cols="50" rows="2"></textarea><br>
        Tu puntuacion:
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
        // Creo la funcion para sumar el comentario pusheando datosComent
        let btnComments = document.getElementById("commentbtn");
        function newcomment() {
            let fecha = new Date()
            let year = fecha.getFullYear()
            let month = fecha.getMonth()
            let day = fecha.getDate()
            let hours = fecha.getHours()
            let min = fecha.getMinutes()
            let sec = fecha.getSeconds()
            let array = {
                product: parseInt(catid),
                score: parseInt(stars.value),
                description: Comentario.value,
                user: userlog,
                dateTime: day + "/" + month + "/" + year  + " " + hours + ":" + min + ":" + sec
            }
            comments.push(array);
            Commentsp.removeChild(div);
            if (userlog != userdef) {
            comentar();}
            else {
                alert('Necesita estar logeado para comentar');
                location.reload()
            };
        };
        btnComments.addEventListener("click",  newcomment);

    });
