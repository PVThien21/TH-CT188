const form1 = document.getElementById('form_dangky'); 
const fname = document.getElementById('fname--dky'); 
const lname = document.getElementById('lname--dky'); 
const email = document.getElementById('email--dky');
const passw = document.getElementById('password--dky');
const passwConfirm = document.getElementById('passwordConfirm--dky');
const container = document.querySelector('.register'); 
// Kiểm tra nhập lại password đúng không 
function checkpasswConfirm(){
    if (passwConfirm.value === ''){
        errorMessage(passwConfirm, "This  field  is  required.");
    } else {
        const passw = document.getElementById('password--dky');
        if(passwConfirm.value !== passw.value){
        errorMessage(passwConfirm, "Matt khau chua dung"); 
        }else{
        successMessage(passwConfirm)
        }
    }
}
// Kiểm tra password đúng không hay đã nhập chưa
function checkpassw(){
    if (passw.value === '') {
        errorMessage(passw, "This  field  is  required.");
    } else {
        successMessage(passw);
    }
}
// Kiểm tra họ đúng không hay đã nhập chưa
function checkFirsname() {
    if (fname.value === '') {
        errorMessage(fname, "This  field  is  required.");
    } else {
        successMessage(fname);
    }
}
// Kiểm tra tên đúng không hay đã nhập chưa
function checkLastname() {
    if (lname.value === '') {
        errorMessage(lname, "This  field  is  required.");
    } else {
        successMessage(lname);
    }

}
//Định dạng email hay đã nhập chưa
function validateEmail(email) {
    /*https://www.w3resource.com/*/
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    return mailformat.test(String(email).toLowerCase());
}
//Kiểm tra email đúng định dạng hay đã nhập chưa
function checkEmail() {
    if (email.value === '') {
        errorMessage(email, "This  field  is  required.");
    } else if (!validateEmail(email.value)) {
        errorMessage(email, "The  email  is  invalid.");
    } else {
        successMessage(email);
    }
}
fname.addEventListener('blur', checkFirsname, true);
lname.addEventListener('blur', checkLastname, true);
email.addEventListener('blur', checkEmail, true);
passw.addEventListener('blur', checkpassw, true);
passwConfirm.addEventListener('blur', checkpasswConfirm, true);

form1.addEventListener('submit', (evt) => {
    //prevent default loading when form is submitted 
    evt.preventDefault();
    const formRows = document.querySelectorAll('.form1');
    let arrformRows = Array.from(formRows); 
     //Kiểm tra xem các value trên thẻ input hợp lệ hết chưa
    let isValid = true; 
    arrformRows.forEach(item => {
        if (item.children[1].textContent) 
        isValid = false;
    });
    
    if (isValid) {
        alert("You have submitted successfully. Thank you.");
    } else {
        alert("Vui long nhap lai")
    }

});

function errorMessage(pElement, message) {
    const formRow = pElement.parentElement;
    formRow.children[1].textContent=message;
}


function successMessage(pElement) {
    const formRow = pElement.parentElement;
    formRow.children[1].textContent=""
}