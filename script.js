// Navin sadasya nondani (Registration) - Pramathik Avastha: Prabilambit (Pending)
document.getElementById('membershipForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const lokSabhaVal = document.getElementById('lokSabhaSelect').value.split('-')[0] || '33';
    const vidhanSabhaVal = document.getElementById('vidhanSabhaSelect').value.split('-')[0] || '205';
    
    let allMembers = JSON.parse(localStorage.getItem('sssp_all_members') || '[]');
    let seq = String(allMembers.length + 1).padStart(6, '0');

    // Samvidhan niyamnusar temporary reference ID
    const refId = `SSSP-REF-${Math.floor(100000 + Math.random() * 900000)}`;

    const newMember = {
        refNumber: refId,
        memberId: "pratisksha (Pending)",
        fullName: document.getElementById('fullName').value,
        mobile: document.getElementById('regMobile').value,
        email: document.getElementById('regEmail').value,
        category: document.getElementById('membershipCategory').value,
        district: document.getElementById('districtSelect').value,
        taluka: document.getElementById('talukaSelect').value,
        village: document.getElementById('villageName').value,
        lokSabha: document.getElementById('lokSabhaSelect').value,
        vidhanSabha: document.getElementById('vidhanSabhaSelect').value,
        status: "Approval Sathi Prabilambit",
        date: new Date().toLocaleDateString('mr-IN')
    };

    allMembers.push(newMember);
    localStorage.setItem('sssp_all_members', JSON.stringify(allMembers));

    const resBox = document.getElementById('regResultBox');
    resBox.style.display = 'block';
    resBox.className = 'result-box success';
    resBox.innerHTML = `
        <strong>Arj yashasviritya sadar zala!</strong><br>
        Tumcha Sandarbha Kramank (Ref No): <strong>${refId}</strong><br>
        <small>Supreme Leadership/Padadhikari approval dilyanantar tumhala digital card download link SMS v Email vr mileyal.</small>
    `;

    this.reset();
});

// Admin Dashboard vrun Approval dilyanantar Digital Card Generate hone
function approveMemberAndSendCard(index) {
    let allMembers = JSON.parse(localStorage.getItem('sssp_all_members') || '[]');
    let currentYear = new Date().getFullYear();
    let seq = String(index + 1).padStart(6, '0');
    
    // Aadhar sarkha permanent ID format: SSSP-YYYY-LL-VVV-NNNNNN
    let permNo = `SSSP-${currentYear}-34-205-${seq}`;

    allMembers[index].status = "Manjur (Approved)";
    allMembers[index].memberId = permNo;

    localStorage.setItem('sssp_all_members', JSON.stringify(allMembers));

    // Simulation: Email & SMS notification with card download link
    const member = allMembers[index];
    alert(`[AUTOMATIC SMS & EMAIL SENT] \nPrati: ${member.mobile} & ${member.email}\nTumcha arj manjur zala ahe!\nSabhasad Kramank: ${permNo}\nDigital Card Download Link: https://vinayakpatole416.github.io/card/${permNo}`);

    loadAdminDashboardTable();
}

// Aadhaar sarkha Digital Card View & Download karnyachi function
function generateAadhaarStyleCard(memberId) {
    let allMembers = JSON.parse(localStorage.getItem('sssp_all_members') || '[]');
    let member = allMembers.find(m => m.memberId === memberId);

    if (!member) {
        alert('Sadasya sapadla nahi!');
        return;
    }

    // Yenaare digital card Aadhaar sarkha disel (Bhagva & Navy blue theme)
    const cardWindow = window.open('', '_blank');
    cardWindow.document.write(`
        <html lang="mr">
        <head>
            <title>SSSP Digital Member Card - ${member.memberId}</title>
            <style>
                body { font-family: Arial, sans-serif; background: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .aadhaar-card { width: 450px; background: #fff; border: 3px solid #12345A; border-radius: 12px; padding: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); position: relative; }
                .card-header { background: #12345A; color: #FFC107; padding: 10px; text-align: center; border-radius: 8px 8px 0 0; }
                .card-header h3 { margin: 0; font-size: 1rem; }
                .card-header p { margin: 2px 0 0; font-size: 0.7rem; color: #FF6F00; font-weight: bold; }
                .card-body { display: flex; margin-top: 15px; gap: 15px; align-items: center; }
                .photo-box { width: 100px; height: 120px; border: 2px solid #FF6F00; background: #ddd; display: flex; justify-content: center; align-items: center; font-size: 0.8rem; text-align: center; }
                .info-box { font-size: 0.85rem; color: #333; line-height: 1.5; }
                .info-box strong { color: #12345A; }
                .card-footer { margin-top: 15px; border-top: 2px dashed #FF6F00; padding-top: 8px; text-align: center; font-size: 0.75rem; color: #555; }
                .print-btn { display: block; width: 100%; margin-top: 15px; background: #FF6F00; color: white; border: none; padding: 10px; font-weight: bold; cursor: pointer; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="aadhaar-card">
                <div class="card-header">
                    <h3>श्री शिवमल्हार स्वराज्य प्रतिष्ठान</h3>
                    <p>राष्ट्रतत्व, हिंदुत्व, मराठीतत्व, निष्ठा, प्रतिष्ठा</p>
                </div>
                <div class="card-body">
                    <div class="photo-box">Photo</div>
                    <div class="info-box">
                        <strong>नाव:</strong> ${member.fullName}<br>
                        <strong>सभासद क्रमांक:</strong> ${member.memberId}<br>
                        <strong>श्रेणी:</strong> ${member.category}<br>
                        <strong>जिल्हा/तालुका:</strong> ${member.district}, ${member.taluka}<br>
                        <strong>मोबाईल:</strong> ${member.mobile}
                    </div>
                </div>
                <div class="card-footer">
                    <span>अधिकृत डिजिटल ओळखपत्र (विश्वस्त संस्था)</span>
                </div>
                <button class="print-btn" onclick="window.print()">Card Download / Print</button>
            </div>
        </body>
        </html>
    `);
}
// Firebase Configuration (तुमच्या Firebase अकाउंटची माहिती इथे टाकावी लागेल)
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "sssp-adhikrut.firebaseapp.com",
    projectId: "sssp-adhikrut",
    storageBucket: "sssp-adhikrut.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// RecaptchaVerifier for Phone Auth
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible'
});

let confirmationResultGlobal = null;
let regMobVerified = false;
let regEmailVerified = false;

// १. मोबाईलवर खरा SMS OTP पाठवणे (Firebase Phone Auth)
function sendRegMobileOtp() {
    const mobileNum = document.getElementById('regMobile').value;
    if (mobileNum.length !== 10) {
        alert('कृपया योग्य १० अंकी मोबाईल नंबर टाका.');
        return;
    }

    const phoneNumber = "+91" + mobileNum;
    const appVerifier = window.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            confirmationResultGlobal = confirmationResult;
            alert('तुमच्या मोबाईलवर खरा SMS OTP पाठवण्यात आला आहे!');
            document.getElementById('regMobOtpBox').style.display = 'block';
        }).catch((error) => {
            console.error("SMS पाठवताना त्रुटी: ", error);
            alert('SMS पाठवण्यात अपयश आले. कृपया पुन्हा प्रयत्न करा.');
        });
}

// मोबाईल OTP पडताळणी
function verifyRegMobOtp() {
    const code = document.getElementById('regMobOtpInput').value;
    confirmationResultGlobal.confirm(code).then((result) => {
        regMobVerified = true;
        alert('मोबाईल नंबर यशस्वीरीत्या सत्यापित (Verified) झाला!');
    }).catch((error) => {
        alert('चुकीचा OTP! कृपया पुन्हा तपासा.');
    });
}

// २. जिमेलवर (Gmail) खरा OTP पाठवणे (EmailJS द्वारे)
function sendRegEmailOtp() {
    const email = document.getElementById('regEmail').value;
    if (!email) {
        alert('कृपया वैध ईमेल पत्ता टाका.');
        return;
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('temp_email_otp', randomOtp);

    // EmailJS द्वारे थेट जिमेलवर मेल पाठवणे
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        to_email: email,
        otp_code: randomOtp
    }, "YOUR_PUBLIC_KEY")
    .then((response) => {
        alert('तुमच्या जिमेल (Gmail) पत्त्यावर OTP पाठवण्यात आला आहे!');
        document.getElementById('regEmailOtpBox').style.display = 'block';
    }, (error) => {
        // जर EmailJS सेट नसेल तर इमर्जन्सीसाठी लोकल अलर्ट
        alert(`[जिमेल OTP]: ${randomOtp} (EmailJS कॉन्फिगर करा)`);
        document.getElementById('regEmailOtpBox').style.display = 'block';
    });
}

// ईमेल OTP पडताळणी
function verifyRegEmailOtp() {
    const userOtp = document.getElementById('regEmailOtpInput').value;
    const savedOtp = localStorage.getItem('temp_email_otp');

    if (userOtp === savedOtp) {
        regEmailVerified = true;
        alert('ईमेल यशस्वीरीत्या सत्यापित (Verified) झाला!');
    } else {
        alert('चुकीचा ईमेल OTP!');
    }
}

// ३. नवीन सदस्य नोंदणी आणि कायमस्वरूपी क्रमांक निर्मिती
document.getElementById('membershipForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!regMobVerified || !regEmailVerified) {
        alert('कृपया फॉर्म भरण्यापूर्वी मोबाईल आणि ईमेलची OTP पडताळणी पूर्ण करा!');
        return;
    }

    const currentYear = new Date().getFullYear();
    const lokSabhaVal = document.getElementById('lokSabhaSelect').value.split('-')[0] || '33';
    const vidhanSabhaVal = document.getElementById('vidhanSabhaSelect').value.split('-')[0] || '205';
    
    let allMembers = JSON.parse(localStorage.getItem('sssp_all_members') || '[]');
    let seq = String(allMembers.length + 1).padStart(6, '0');

    // संविधान नियमांनुसार कायमस्वरूपी सभासद क्रमांक
    const permanentId = `SSSP-${currentYear}-${lokSabhaVal}-${vidhanSabhaVal}-${seq}`;

    const newMember = {
        memberId: permanentId,
        fullName: document.getElementById('fullName').value,
        mobile: document.getElementById('regMobile').value,
        email: document.getElementById('regEmail').value,
        category: document.getElementById('membershipCategory').value,
        district: document.getElementById('districtSelect').value,
        taluka: document.getElementById('talukaSelect').value,
        village: document.getElementById('villageName').value,
        date: new Date().toLocaleDateString('mr-IN')
    };

    allMembers.push(newMember);
    localStorage.setItem('sssp_all_members', JSON.stringify(allMembers));

    const resBox = document.getElementById('regResultBox');
    resBox.style.display = 'block';
    resBox.className = 'result-box success';
    resBox.innerHTML = `
        <strong>अभिनंदन! सदस्यता यशस्वीरीत्या पूर्ण झाली.</strong><br>
        आपला कायमस्वरूपी सभासद क्रमांक: <strong>${permanentId}</strong><br>
        <small>हा क्रमांक जतन करून ठेवा.</small>
    `;

    this.reset();
    regMobVerified = false;
    regEmailVerified = false;
});
// तात्पुरता साठा (Local Storage & OTP Simulation)
let generatedMobOtp = "";
let generatedEmailOtp = "";

let regMobVerified = false;
let regEmailVerified = false;

// सर्वोच्च नेतृत्व OTP पाठवणे
function sendSupremeOtp() {
    const mob = document.getElementById('supMobile').value;
    const email = document.getElementById('supEmail').value;
    const pass = document.getElementById('supPass').value;

    if (!mob || !email || !pass) {
        alert('कृपया मोबाईल, ईमेल आणि पासवर्ड भरा.');
        return;
    }

    generatedMobOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`[अधिकृत सुरक्षा OTP] आपल्या मोबाईल आणि जिमेल वर OTP पाठवला आहे: ${generatedMobOtp}`);
    document.getElementById('supOtpArea').style.display = 'block';
}

// सर्वोच्च नेतृत्व लॉगिन पडताळणी
function verifySupremeLogin() {
    const userOtp = document.getElementById('supOtpInput').value;
    if (userOtp === generatedMobOtp) {
        alert('लॉगिन यशस्वी! सर्वोच्च नेतृत्वाचा संपूर्ण कंट्रोल आपल्या हातात आला आहे.');
        document.getElementById('supremeLoginBox').style.display = 'none';
        document.getElementById('supremeDashboard').style.display = 'block';
    } else {
        alert('चुकीचा OTP! कृपया पुन्हा प्रयत्न करा.');
    }
}

function logoutSupreme() {
    document.getElementById('supremeLoginBox').style.display = 'block';
    document.getElementById('supremeDashboard').style.display = 'none';
    document.getElementById('supOtpArea').style.display = 'none';
}

// पदाधिकारी OTP पाठवणे
function sendPadOtp() {
    const mob = document.getElementById('padMobile').value;
    const email = document.getElementById('padEmail').value;
    const pass = document.getElementById('padPass').value;

    if (!mob || !email || !pass) {
        alert('कृपया सर्व माहिती भरा.');
        return;
    }

    generatedMobOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`[पदाधिकारी OTP] पाठवला आहे: ${generatedMobOtp}`);
    document.getElementById('padOtpArea').style.display = 'block';
}

function verifyPadLogin() {
    const userOtp = document.getElementById('padOtpInput').value;
    if (userOtp === generatedMobOtp) {
        alert('पदाधिकारी लॉगिन यशस्वी!');
        document.getElementById('padadhikariLoginBox').style.display = 'none';
        document.getElementById('padadhikariDashboard').style.display = 'block';
    } else {
        alert('चुकीचा OTP!');
    }
}

function logoutPad() {
    document.getElementById('padadhikariLoginBox').style.display = 'block';
    document.getElementById('padadhikariDashboard').style.display = 'none';
    document.getElementById('padOtpArea').style.display = 'none';
}

// नवीन सदस्यासाठी मोबाईल OTP
function sendRegMobileOtp() {
    const mob = document.getElementById('regMobile').value;
    if (mob.length !== 10) {
        alert('कृपया योग्य १० अंकी मोबाईल नंबर टाका.');
        return;
    }
    generatedMobOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`[मोबाईल OTP] ${generatedMobOtp}`);
    document.getElementById('regMobOtpBox').style.display = 'block';
}

function verifyRegMobOtp() {
    const val = document.getElementById('regMobOtpInput').value;
    if (val === generatedMobOtp) {
        regMobVerified = true;
        alert('मोबाईल नंबर यशस्वीरीत्या सत्यापित झाला!');
    } else {
        alert('चुकीचा OTP!');
    }
}

// नवीन सदस्यासाठी ईमेल OTP
function sendRegEmailOtp() {
    const email = document.getElementById('regEmail').value;
    if (!email) {
        alert('कृपया ईमेल पत्ता टाका.');
        return;
    }
    generatedEmailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`[इमेल OTP] ${generatedEmailOtp}`);
    document.getElementById('regEmailOtpBox').style.display = 'block';
}

function verifyRegEmailOtp() {
    const val = document.getElementById('regEmailOtpInput').value;
    if (val === generatedEmailOtp) {
        regEmailVerified = true;
        alert('ईमेल यशस्वीरीत्या सत्यापित झाला!');
    } else {
        alert('चुकीचा OTP!');
    }
}

// नवीन सदस्य नोंदणी फॉर्म सबमिट आणि स्वयंचलित क्रमांक निर्मिती
document.getElementById('membershipForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!regMobVerified || !regEmailVerified) {
        alert('कृपया आधी मोबाईल आणि ईमेल OTP पडताळणी पूर्ण करा!');
        return;
    }

    const currentYear = new Date().getFullYear();
    const lokSabhaVal = document.getElementById('lokSabhaSelect').value.split('-')[0] || '33';
    const vidhanSabhaVal = document.getElementById('vidhanSabhaSelect').value.split('-')[0] || '205';
    
    let allMembers = JSON.parse(localStorage.getItem('sssp_all_members') || '[]');
    let seq = String(allMembers.length + 1).padStart(6, '0');

    // संविधान नियमांनुसार कायमस्वरूपी सभासद क्रमांक फॉरमॅट: SSSP-YYYY-LL-VVV-NNNNNN
    const permanentId = `SSSP-${currentYear}-${lokSabhaVal}-${vidhanSabhaVal}-${seq}`;

    const newMember = {
        memberId: permanentId,
        fullName: document.getElementById('fullName').value,
        mobile: document.getElementById('regMobile').value,
        email: document.getElementById('regEmail').value,
        category: document.getElementById('membershipCategory').value,
        district: document.getElementById('districtSelect').value,
        taluka: document.getElementById('talukaSelect').value,
        village: document.getElementById('villageName').value,
        lokSabha: document.getElementById('lokSabhaSelect').value,
        vidhanSabha: document.getElementById('vidhanSabhaSelect').value,
        date: new Date().toLocaleDateString('mr-IN')
    };

    allMembers.push(newMember);
    localStorage.setItem('sssp_all_members', JSON.stringify(allMembers));

    const resBox = document.getElementById('regResultBox');
    resBox.style.display = 'block';
    resBox.className = 'result-box success';
    resBox.innerHTML = `
        <strong>अभिनंदन! सदस्यता यशस्वीरीत्या पूर्ण झाली.</strong><br>
        आपला कायमस्वरूपी सभासद क्रमांक: <strong>${permanentId}</strong><br>
        <small>कृपया हा क्रमांक जतन करून ठेवा.</small>
    `;

    this.reset();
    regMobVerified = false;
    regEmailVerified = false;
    loadAllMembersTable();
});

// सदस्य शोधणे (Search Member)
function searchMember() {
    const query = document.getElementById('searchMemberId').value.trim();
    const resultDiv = document.getElementById('searchResult');

    let allMembers = JSON.parse(localStorage.getItem('sssp_all_members') || '[]');
    let found = allMembers.find(m => m.memberId === query || m.mobile === query);

    resultDiv.style.display = 'block';
    if (found) {
        resultDiv.className = 'result-box success';
        resultDiv.innerHTML = `
            <strong>सदस्य सापडला!</strong><br>
            सभासद क्रमांक: ${found.memberId}<br>
            नाव: ${found.fullName}<br>
            मोबाईल: ${found.mobile}<br>
            श्रेणी: ${found.category}<br>
            जिल्हा/तालुका: ${found.district}, ${found.taluka}
        `;
    } else {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = `कोणतीही नोंद सापडली नाही.`;
    }
}

// सर्व सदस्यांची यादी टेबलमध्ये दाखवणे
function loadAllMembersTable() {
    const container = document.getElementById('allMembersTable');
    let allMembers = JSON.parse(localStorage.getItem('sssp_all_members') || '[]');

    if (allMembers.length === 0) {
        container.innerHTML = "<p>अजून एकही नोंदणी झालेली नाही.</p>";
        return;
    }

    let html = `<table>
        <tr>
            <th>सभासद क्रमांक</th>
            <th>नाव</th>
            <th>मोबाईल</th>
            <th>श्रेणी</th>
            <th>जिल्हा/तालुका</th>
        </tr>`;

    allMembers.forEach(m => {
        html += `<tr>
            <td>${m.memberId}</td>
            <td>${m.fullName}</td>
            <td>${m.mobile}</td>
            <td>${m.category}</td>
            <td>${m.district}, ${m.taluka}</td>
        </tr>`;
    });

    html += `</table>`;
    container.innerHTML = html;
}

// पेज लोड झाल्यावर यादी लोड करणे
window.onload = function() {
    loadAllMembersTable();
};
