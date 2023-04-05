var prices=document.querySelectorAll('.price')
prices.forEach(element => {
    let test=element.textContent;
    let x=test.trim().lastIndexOf(" ");
    //console.log(x)
    if(x==-1){
        price_sale=formatNumber(test.trim())
        price_root=""
    }else {
    price_sale=formatNumber(test.trim().substring(0,x))  
    price_root=formatNumber(test.trim().substring(x+1))
    }
    element.innerHTML=`${price_sale} <span>${price_root}</span>`
    
    /* console.log(price_sale)

     console.log(price_root)*/
})

/*****************************************Hàm Format data******************************************* */ 
function formatNumber(num) {
    // Các ?= n bộ định lượng khớp với bất kỳ chuỗi nào theo sau bởi một chuỗi cụ thể n .
    //Các ?! n bộ định lượng khớp với bất kỳ chuỗi nào không được theo sau bởi một chuỗi cụ thể n .
    //\d{3}+ tìm ít nhất 1 chuỗi có 3 chữ số 
    //?!\d không theo sau bởi 1 số
    // Chọn số mà theo sau số đó phải là 1 chuỗi gồm 3 chữ số và không theo sau bởi 1 số
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "₫";
}