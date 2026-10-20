// फॉर्म सबमिट व नवीन नोंदणी
document.getElementById('membershipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const refNumber = `SSSP-REF-${randomNum}`;
    
    const formData = {
        refNumber: refNumber,
        fullName: document.getElementById('fullName').value,
        parentName: document.getElementById('parentName').value,
        dob: document.getElementById('dob').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        village: document.getElementById('village').value,
        taluka: document.getElementById('taluka').value,
        district: document.getElementById('district').value,
        pincode: document.getElementById('pincode').value,
        category: document.getElementById('membershipCategory').value,
        status: "प्रलंबित (तपासणी सुरू आहे)",
        membershipNo: "प्रलंबित",
        date: new Date().toLocaleDateString('mr-IN')
    };

    let localApps = JSON.parse(localStorage.getItem('sssp_apps') || '[]');
    localApps.push(formData);
    localStorage.setItem('sssp_apps', JSON.stringify(localApps));

    const resultBox = document.getElementById('applicationResult');
    resultBox.className = 'result-box success';
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <strong>अर्ज यशस्वीरीत्या सादर झाला!</strong><br>
        तुमचा संदर्भ क्रमांक: <strong>${refNumber}</strong><br>
        <small>कृपया हा क्रमांक जतन करून ठेवा.</small>
    `;

    this.reset();
    document.getElementById('state').value = 'महाराष्ट्र';
    loadPublicMembersList();
});

// सार्वजनिक सदस्य यादी लोड करणे व शोधणे (Search)
function loadPublicMembersList() {
    const container = document.getElementById('membersTableContainer');
    let localApps = JSON.parse(localStorage.getItem('sssp_apps') || '[]');

    if (localApps.length === 0) {
        container.innerHTML = "<p>अजून कोणतीही नोंदणी उपलब्ध नाही.</p>";
        return;
    }

    let html = `<table>
        <tr>
            <th>सभासद/संदर्भ क्र.</th>
            <th>नाव</th>
            <th>गाव / तालुका</th>
            <th>श्रेणी</th>
            <th>स्थिती</th>
        </tr>`;

    localApps.forEach(app => {
        html += `<tr>
            <td>${app.membershipNo !== 'प्रलंबित' ? app.membershipNo : app.refNumber}</td>
            <td>${app.fullName}</td>
            <td>${app.village}, ${app.taluka}</td>
            <td>${app.category}</td>
            <td>${app.status}</td>
        </tr>`;
    });

    html += `</table>`;
    container.innerHTML = html;
}

function filterMembers() {
    let input = document.getElementById('searchMember').value.toLowerCase();
    let rows = document.querySelectorAll('#membersTableContainer tr');
    
    for (let i = 1; i < rows.length; i++) {
        let rowText = rows[i].innerText.toLowerCase();
        rows[i].style.display = rowText.includes(input) ? '' : 'none';
    }
}

// अर्जाची स्थिती तपासणे
function checkApplicationStatus() {
    const refInput = document.getElementById('refNumberInput').value.trim();
    const statusBox = document.getElementById('statusResultBox');
    
    if (!refInput) {
        alert('कृपया संदर्भ क्रमांक टाका.');
        return;
    }

    let localApps = JSON.parse(localStorage.getItem('sssp_apps') || '[]');
    let found = localApps.find(app => app.refNumber === refInput);

    if (found) {
        statusBox.className = 'result-box success';
        statusBox.style.display = 'block';
        statusBox.innerHTML = `
            <strong>संदर्भ क्र:</strong> ${found.refNumber}<br>
            <strong>नाव:</strong> ${found.fullName}<br>
            <strong>श्रेणी:</strong> ${found.category}<br>
            <strong>स्थिती:</strong> ${found.status}<br>
            ${found.membershipNo !== 'प्रलंबित' ? `<strong>स्थायी सभासद क्र:</strong> ${found.membershipNo}` : ''}
        `;
    } else {
        statusBox.className = 'result-box error';
        statusBox.style.display = 'block';
        statusBox.innerHTML = `संदर्भ क्रमांक <strong>${refInput}</strong> सापडला नाही.`;
    }
}

// संस्थापक (Supreme Leadership) OTP लॉगिन सिस्टीम
function sendFounderOTP() {
    const inputVal = document.getElementById('founderIdInput').value.trim();
    if (inputVal === 'vinayakpatole416@gmail.com' || inputVal === '9370710416' || inputVal === 'shivmalharswarajya@gmail.com') {
        alert('तुमच्या मोबाईल नंबरवर व जीमेलवर सुरक्षित OTP (123456) पाठवण्यात आला आहे.');
        document.getElementById('founderOtpBox').style.display = 'block';
    } else {
        alert('अधिकृत संस्थापक-प्रमुख किंवा उपप्रमुख मोबाईल नंबर/जीमेल प्रविष्ट करा.');
    }
}

function verifyFounderOTP() {
    const otp = document.getElementById('founderOtpInput').value.trim();
    if (otp === '123456') {
        alert('लॉगिन यशस्वी!');
        document.getElementById('founderLoginArea').style.display = 'none';
        document.getElementById('founderDashboard').style.display = 'block';
        loadFounderPendingApps();
    } else {
        alert('चुकीचा OTP! (टेस्टिंगसाठी 123456 वापरू शकता)');
    }
}

function loadFounderPendingApps() {
    const container = document.getElementById('founderTableContainer');
    let localApps = JSON.parse(localStorage.getItem('sssp_apps') || '[]');

    if (localApps.length === 0) {
        container.innerHTML = "<p>कोणताही अर्ज प्रलंबित नाही.</p>";
        return;
    }

    let html = `<table>
        <tr>
            <th>संदर्भ क्र.</th>
            <th>नाव</th>
            <th>मोबाईल</th>
            <th>श्रेणी</th>
            <th>कार्रवाई</th>
        </tr>`;

    localApps.forEach((app, index) => {
        html += `<tr>
            <td>${app.refNumber}</td>
            <td>${app.fullName}</td>
            <td>${app.mobile}</td>
            <td>${app.category}</td>
            <td>
                ${app.membershipNo === 'प्रलंबित' ? 
                `<button onclick="approveMember(${index})" style="background:green; color:white; border:none; padding:4px 8px; border-radius:3px; cursor:pointer;">मंजूर करा</button>` : 
                `<span>मंजूर (${app.membershipNo})</span>`}
            </td>
        </tr>`;
    });

    html += `</table>`;
    container.innerHTML = html;
}

function approveMember(index) {
    let localApps = JSON.parse(localStorage.getItem('sssp_apps') || '[]');
    let currentYear = new Date().getFullYear();
    let seq = String(index + 1).padStart(6, '0');
    let permNo = `SSSP-${currentYear}-33-205-${seq}`;

    localApps[index].status = "मंजूर (Approved)";
    localApps[index].membershipNo = permNo;

    localStorage.setItem('sssp_apps', JSON.stringify(localApps));
    alert(`अर्ज यशस्वीरीत्या मंजूर! कायमस्वरूपी सभासद क्रमांक: ${permNo}`);
    loadFounderPendingApps();
    loadPublicMembersList();
}

// पदाधिकारी (Office Bearers) OTP लॉगिन
function sendBearerOTP() {
    const mob = document.getElementById('bearerMobileInput').value.trim();
    if (mob.length === 10) {
        alert('पदाधिकारी मोबाईल नंबरवर OTP (654321) पाठवला आहे.');
        document.getElementById('bearerOtpBox').style.display = 'block';
    } else {
        alert('कृपया १० अंकी वैध मोबाईल नंबर टाका.');
    }
}

function verifyBearerOTP() {
    const otp = document.getElementById('bearerOtpInput').value.trim();
    if (otp === '654321') {
        alert('पदाधिकारी लॉगिन यशस्वी!');
        document.getElementById('bearerLoginArea').style.display = 'none';
        document.getElementById('bearerDashboard').style.display = 'block';
        document.getElementById('bearerContent').innerHTML = `<p><strong>स्वागत आहे!</strong> तुम्ही तुमच्या कार्यक्षेत्रातील सदस्यांचे अर्ज तपासू शकता.</p>`;
    } else {
        alert('चुकीचा OTP! (टेस्टिंगसाठी 654321 वापरू शकता)');
    }
}

// पेज लोड झाल्यावर सार्वजनिक यादी लोड करणे
window.onload = function() {
    loadPublicMembersList();
};
