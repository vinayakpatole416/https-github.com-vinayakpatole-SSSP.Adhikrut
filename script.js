document.getElementById('membershipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // युनिक संदर्भ क्रमांक (Application Reference Number) तयार करणे
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const refNumber = `SSSP-REF-${randomNum}`;
    
    const resultBox = document.getElementById('applicationResult');
    resultBox.className = 'result-box success';
    resultBox.style.display = 'block';
    resultBox.innerHTML = `
        <strong>अर्ज यशस्वीरीत्या सादर झाला!</strong><br>
        तुमचा संदर्भ क्रमांक: <strong>${refNumber}</strong><br>
        <small>कृपया हा क्रमांक जतन करून ठेवा. पडताळणीनंतर अधिकृत सभासदत्व मंजूर केले जाईल.</small>
    `;
    
    // फॉर्म रिसेट करणे
    this.reset();
    document.getElementById('state').value = 'महाराष्ट्र';
});

function checkStatus() {
    const refInput = document.getElementById('refNumber').value.trim();
    const statusBox = document.getElementById('statusResult');
    
    if (!refInput) {
        alert('कृपया संदर्भ क्रमांक टाका.');
        return;
    }
    
    statusBox.className = 'result-box success';
    statusBox.style.display = 'block';
    statusBox.innerHTML = `
        <strong>संदर्भ क्रमांक:</strong> ${refInput}<br>
        <strong>सध्याची स्थिती:</strong> प्रलंबित (तपासणी व मतदारसंघ पडताळणी सुरू आहे).
    `;
}
