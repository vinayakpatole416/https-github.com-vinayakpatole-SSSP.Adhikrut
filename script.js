// Firebase Configuration Setup
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "sssp-adhikrut.firebaseapp.com",
    projectId: "sssp-adhikrut",
    storageBucket: "sssp-adhikrut.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Form Submission with Cloud Sync
document.getElementById('membershipForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = "कृपया वाट पाहा...";

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
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
        category: document.getElementById('membershipCategory').value,
        status: "प्रलंबित (तपासणी व मतदारसंघ पडताळणी सुरू आहे)",
        membershipNo: "प्रलंबित",
        createdAt: new Date().toISOString()
    };

    try {
        // Local Backup
        let localApps = JSON.parse(localStorage.getItem('sssp_apps') || '[]');
        localApps.push(formData);
        localStorage.setItem('sssp_apps', JSON.stringify(localApps));

        // Cloud DB Save (If configured)
        try {
            await db.collection('applications').doc(refNumber).set(formData);
        } catch (dbErr) {
            console.log("Cloud DB fallback to local storage");
        }

        const resultBox = document.getElementById('applicationResult');
        resultBox.className = 'result-box success';
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
            <strong>अर्ज यशस्वीरीत्या सादर झाला!</strong><br>
            तुमचा संदर्भ क्रमांक: <strong>${refNumber}</strong><br>
            <small>कृपया हा क्रमांक जतन करून ठेवा. पडताळणीनंतर अधिकृत सभासदत्व मंजूर केले जाईल.</small>
        `;

        this.reset();
        document.getElementById('state').value = 'महाराष्ट्र';
    } catch (err) {
        alert("त्रुटी आली! कृपया पुन्हा प्रयत्न करा.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "अर्ज सादर करा";
    }
});

// Check Status Function
function checkStatus() {
    const refInput = document.getElementById('refNumber').value.trim();
    const statusBox = document.getElementById('statusResult');
    
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
            <strong>संदर्भ क्रमांक:</strong> ${found.refNumber}<br>
            <strong>नाव:</strong> ${found.fullName}<br>
            <strong>श्रेणी:</strong> ${found.category}<br>
            <strong>सध्याची स्थिती:</strong> ${found.status}<br>
            ${found.membershipNo !== 'प्रलंबित' ? `<strong>सभासद क्रमांक:</strong> ${found.membershipNo}` : ''}
        `;
    } else {
        statusBox.className = 'result-box error';
        statusBox.style.display = 'block';
        statusBox.innerHTML = `संदर्भ क्रमांक <strong>${refInput}</strong> सापडला नाही.`;
    }
}

// Admin Login & Management
function adminLogin() {
    const pass = document.getElementById('adminPass').value;
    if (pass === 'sssp2026') {
        document.getElementById('adminLoginArea').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadAdminApplications();
    } else {
        alert('चुकीचा पासवर्ड!');
    }
}

function loadAdminApplications() {
    const container = document.getElementById('adminTableContainer');
    let localApps = JSON.parse(localStorage.getItem('sssp_apps') || '[]');

    if (localApps.length === 0) {
        container.innerHTML = "<p>अजून एकही अर्ज आलेला नाही.</p>";
        return;
    }

    let html = `<table>
        <tr>
            <th>संदर्भ क्र.</th>
            <th>नाव</th>
            <th>मोबाईल</th>
            <th>गाव/तालुका</th>
            <th>श्रेणी</th>
            <th>स्थिती</th>
            <th>कार्रवाई</th>
        </tr>`;

    localApps.forEach((app, index) => {
        html += `<tr>
            <td>${app.refNumber}</td>
            <td>${app.fullName}</td>
            <td>${app.mobile}</td>
            <td>${app.village}, ${app.taluka}</td>
            <td>${app.category}</td>
            <td>${app.status}</td>
            <td>
                <button onclick="approveApp(${index})" style="background:green; color:white; border:none; padding:4px 8px; border-radius:3px; cursor:pointer;">मंजूर करा</button>
            </td>
        </tr>`;
    });

    html += `</table>`;
    container.innerHTML = html;
}

function approveApp(index) {
    let localApps = JSON.parse(localStorage.getItem('sssp_apps') || '[]');
    let currentYear = new Date().getFullYear();
    let seq = String(index + 1).padStart(6, '0');
    
    // Constitution SSSP Permanent Membership Format
    let permNo = `SSSP-${currentYear}-33-205-${seq}`;

    localApps[index].status = "मंजूर (Approved)";
    localApps[index].membershipNo = permNo;

    localStorage.setItem('sssp_apps', JSON.stringify(localApps));
    alert(`अर्ज मंजूर झाला! कायमस्वरूपी सभासद क्रमांक: ${permNo}`);
    loadAdminApplications();
}
