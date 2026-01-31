// Authentication credentials
const AUTH = {
    dob: "23/june/2010",
    authCode: "6049382175294853",
    twoFA: "326790"
};

// Authentication functions
function checkDOB() {
    const input = document.getElementById('dob').value.toLowerCase();
    if (input === AUTH.dob.toLowerCase()) {
        showStep('step2');
    } else {
        document.getElementById('error1').textContent = 'Incorrect date of birth';
    }
}

function checkAuthCode() {
    const input = document.getElementById('authCode').value;
    if (input === AUTH.authCode) {
        showStep('step3');
    } else {
        document.getElementById('error2').textContent = 'Incorrect authorization code';
    }
}

function check2FA() {
    const input = document.getElementById('twoFA').value;
    if (input === AUTH.twoFA) {
        showStep('mainApp');
        initializeApp();
    } else {
        document.getElementById('error3').textContent = 'Incorrect 2FA code';
    }
}

function showStep(stepId) {
    document.querySelectorAll('.auth-screen, .main-app').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');
}

// Main app functionality
let storage = JSON.parse(localStorage.getItem('immutableStorage') || '[]');

function initializeApp() {
    document.getElementById('fileInput').addEventListener('change', handleFiles);
    renderStorage();
}

function handleFiles(e) {
    Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            addItem({
                type: 'file',
                name: file.name,
                content: reader.result,
                timestamp: new Date().toISOString()
            });
        };
        reader.readAsDataURL(file);
    });
}

function addText() {
    const text = document.getElementById('textInput').value.trim();
    if (text) {
        addItem({
            type: 'text',
            content: text,
            timestamp: new Date().toISOString()
        });
        document.getElementById('textInput').value = '';
    }
}

function addItem(item) {
    storage.push(item);
    localStorage.setItem('immutableStorage', JSON.stringify(storage));
    renderStorage();
}

function renderStorage() {
    const container = document.getElementById('storage');
    container.innerHTML = storage.map((item, index) => `
        <div class="item">
            <strong>${item.type === 'file' ? item.name : 'Text Entry'}</strong>
            <small> - ${new Date(item.timestamp).toLocaleString()}</small>
            ${item.type === 'text' ? 
                `<p>${item.content}</p>` : 
                `<p><a href="${item.content}" download="${item.name}">Download</a></p>`
            }
        </div>
    `).join('');
}
