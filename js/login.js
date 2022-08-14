function login() {
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    let errorstatus = document.getElementById('errortextlog');
    let numerror = 1

    if (user != "" && pass != "") {
        localStorage.setItem('user', user);
        location.href = 'index.html';
    }

    else if (errorstatus < numerror) {
        var sp2 = document.getElementById('btnlogin');
        let errorText = document.createElement('p')
        let errorTextLog = document.createTextNode('Usuario y clave son requeridos');
        errorText.id = 'errortextlog'
        errorText.appendChild(errorTextLog);

        var parentDiv = sp2.parentNode;
        parentDiv.insertBefore(errorText, sp2);
    }
    else { null }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnlogin').addEventListener('click', () => { login(); })
})