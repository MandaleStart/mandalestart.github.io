function login() {
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    let errorText = document.getElementById('errormsg').value;
    let errorTextLog = document.createTextNode('Usuario y clave son requeridos');
    
    if (user != "" && pass != "") {
        localStorage.setItem('user', user);
        location.href = 'index.html';}

    else {  
    
    errorText.appendChild(errorTextLog);
    document.getElementById(errormsg).appendChild(errorText);
}
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnlogin').addEventListener('click', () => { login(); })
})