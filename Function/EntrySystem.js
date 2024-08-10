// Bhadriko Theo Pramudya
// 10123375
// IF9

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('loginButton');

    loginButton.classList.add('loading');

    setTimeout(() => {
        if (username === "admin" && password === "123") { 
            showToast('Success', 'SELAMAT DATANG di Database Masyarakat!', 'green');
            setTimeout(() => {
                window.location.href = "pages/Dashboard.html"; 
            }, 3000); 
        } else if(username === "" || password === "") {
            showToast('Warning', 'Username atau password Harus Diisi!', 'blue');
            loginButton.classList.remove('loading'); 
        } else {
            showToast('Error', 'Username atau password salah!', 'red');
            loginButton.classList.remove('loading'); 
        }
    }, 2000); 
}

function showToast(type, message, color) {
    const toastContainer = document.querySelector('.toast__container');
    let iconSVG;

    if (type === 'Success') {
        iconSVG = `
            <svg version="1.1" class="toast__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g><g><path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z"></path></g></g>
            </svg>
        `;
    } else if (type === 'Warning') {
        iconSVG = `
            <svg version="1.1" class="toast__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g><g><path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,472
                    c-119.103,0-216-96.897-216-216S136.897,40,256,40s216,96.897,216,216S375.103,472,256,472z M256,336c-13.255,0-24,10.745-24,24
                    s10.745,24,24,24s24-10.745,24-24S269.255,336,256,336z M280,280c0,13.255-10.745,24-24,24s-24-10.745-24-24V136
                    c0-13.255,10.745-24,24-24s24,10.745,24,24V280z"></path></g></g>
            </svg>
        `;
    } else if (type === 'Error') {
        iconSVG = `
            <svg version="1.1" class="toast__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path fill="#FF0000" d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z M12,22C6.486,22,2,17.514,2,12
                    S6.486,2,12,2s10,4.486,10,10S17.514,22,12,22z"/>
                <path fill="#FF0000" d="M13,7h-2v8h2V7z"/>
                <path fill="#FF0000" d="M13,17h-2v2h2V17z"/>
            </svg>
        `;
    }

    const toastHTML = `
        <div class="toast toast--${color}">
            <div class="toast__icon">
                ${iconSVG}
            </div>
            <div class="toast__content">
                <p class="toast__type">${type}</p>
                <p class="toast__message">${message}</p>
            </div>
            <div class="toast__close">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.642 15.642" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 15.642 15.642">
                    <path fill-rule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061 c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061 l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541 l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"></path>
                </svg>
            </div>
        </div>
    `;
    toastContainer.innerHTML += toastHTML;
    setTimeout(() => {
        const toast = toastContainer.querySelector('.toast');
        if (toast) {
            toast.remove();
        }
    }, 3000);
}