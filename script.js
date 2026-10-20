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
