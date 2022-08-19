let userlog = localStorage.getItem('user');

var userimg = document.createElement('img');
userimg.src = 'img/img_perfil.png';
userimg.id ='imgperfil'

var username = document.createElement('p');
username.className = 'username'
var textUserLog = document.createTextNode(userlog);
username.appendChild(textUserLog);

var closesession = document.createElement('button');
closesession.id="closesession"
closesession.className="btn btn-danger"
var textCloseButton = document.createTextNode('Cerrar Sesion');
closesession.appendChild(textCloseButton);



document.getElementById('sessiondiv').appendChild(userimg);
document.getElementById('sessiondiv').appendChild(username);

document.getElementById('sessiondiv').appendChild(closesession);


function closeS() {
    localStorage.removeItem('user');
    alert('salio de la sesion');
    location.href = 'login.html';
}

document.addEventListener("DOMContentLoaded", function () {
    function chkS() {
        if ((localStorage.getItem('user')) = null)
                {closeS()}
            else{}};

    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    document.getElementById('closesession').addEventListener('click', () => { closeS(); })

});