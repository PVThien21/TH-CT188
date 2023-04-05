var mainCartBox = document.querySelector('.box-container');
// Có mainCart Box mới thực hiện các lệnh 
if (mainCartBox) {
    let updateCart = JSON.parse(localStorage.getItem('CartItem'));
    let html = '';
        updateCart.forEach(element => {
        let test=element.price;
        let x=test.trim().indexOf(" ");
        let price_sale=Number(test.trim().substring(0,x-1).replace(/[^0-9]/g, ""));
        let price_root=Number(test.trim().substring(x+1).replace(/[^0-9]/g, ""));
        if(x==-1){
            price_sale=price_root; 
            let SumMoney = price_sale * Number(element.quantity);
            SumMoney = formatNumber(SumMoney);
            price_sale=formatNumber(price_sale)
            html+= `
        <div class="item">
            <i class="fas fa-times icon_deleted"></i>
            <img src="${element.image}" alt="">
            <div class="content">
                <p class="id" hidden>${element.id}</p>
                <h3>${element.name}</h3>
                <form action="">
                    <span>quantity : </span>
                    <input type="number" name="" min="1" max="100" value="${element.quantity}" id="" id="" class="input-quantity">
                </form>
                <div class="price">${price_sale}</div>
                <div class="total_money" hidden>${SumMoney}</div>
            </div>
        </div>
        
        `
        }else {
        let SumMoney =  price_sale* Number(element.quantity);
        SumMoney = formatNumber(SumMoney);
        price_sale=formatNumber(price_sale)
        price_root=formatNumber(price_root)
        
        html+= `
        <div class="item">
            <i class="fas fa-times icon_deleted"></i>
            <img src="${element.image}" alt="">
            <div class="content">
                <p class="id" hidden>${element.id}</p>
                <h3>${element.name}</h3>
                <form action="">
                    <span>quantity : </span>
                    <input type="number" name="" min="1" max="100" value="${element.quantity}" id="" class="input-quantity">
                </form>
                <div class="price">${price_sale} <span>${price_root}</span></div>
                <div class="total_money" hidden>${SumMoney}</div>
            </div>
        </div>
        
        `}
    });
    mainCartBox.innerHTML = html;
}
/********************************Tính tổng tiền**************************************************** */
var MoneyBox = document.querySelector('.cart-total');
if(MoneyBox){
   var prices =  document.querySelectorAll('.total_money');
   var payment = 0;
    prices.forEach(function (price2){
        // Lập qua và lấy từng sumMoney của các sản phẩm
        var price = price2.textContent;
        // Vì price là chuỗi và có các kí tự đặt biệt nên ta chuyển sang số
        var money = Number(price.replace(/[^0-9]/g, ""));
        // Cộng dồn vào 1 biến
        payment = payment + money;
    });

    MoneyBox.children[0].textContent =formatNumber(payment);
}
/*******************************************DELETE ITEM KHI CLICK ***************************************************** */
var Del_btn = document.querySelectorAll('.icon_deleted');
if(Del_btn){ // sẽ không ảnh hưởng đến những trang k có Del_btn mà liên kết tới file này
    Del_btn.forEach(function (btn){ 
        btn.onclick = function (){   // ta sẽ lấy đc thông tin của item mà ng dùng bấm vào
            var deleted_item=btn.parentElement.children[2].children[0].textContent;
            // lấy id không dùng child vì khi đổi chổ id sẽ không còn chính xác
            DeleteItem(deleted_item);
        }
    });
}
function  DeleteItem(idItem){
    let custommerCart = JSON.parse(localStorage.getItem('CartItem'));
    let updateCart = [];

    custommerCart.forEach(function (item){
        // nếu không phải id cần xóa thì cho vào mảng riêng
        if(item.id != idItem){
            updateCart.push(item);
        }
    });
    // set lại CartItem mà k có phần tử muốn xóa
    localStorage.setItem('CartItem', JSON.stringify(updateCart));
    window.location.reload();
}
function formatNumber(num) {
    // Các ?= n bộ định lượng khớp với bất kỳ chuỗi nào theo sau bởi một chuỗi cụ thể n .
    //Các ?! n bộ định lượng khớp với bất kỳ chuỗi nào không được theo sau bởi một chuỗi cụ thể n .
    //\d{3}+ tìm ít nhất 1 chuỗi có 3 chữ số 
    //?!\d không theo sau bởi 1 số
    // Chọn số mà theo sau số đó phải là 1 chuỗi gồm 3 chữ số và không theo sau bởi 1 số
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "₫";
}
/****************Tăng thêm số lượng trong giỏ hàng***************** */
var quantityElememts = document.querySelectorAll('.input-quantity');
if(quantityElememts){
    quantityElememts.forEach(function (elm){
        elm.onchange = function (){
            let idItem=this.parentElement.parentElement.children[0].textContent;
                //  Lấy các item của Cart
            if(this.value<0){
                DeleteItem(idItem)
            }else{
                updateCart = JSON.parse(localStorage.getItem('CartItem'));
                //result là item mà ta cần tìm để chỉnh sửa số lượng khi ng dùng thay đổi
                var result = updateCart.find(function (itemCart) {
                return itemCart.id === idItem;
                });
                // Gán giá trị của item trên Cart bằng giá trị mà ng dùng thay đổi
                // this.value hiện tại đang là chuỗi
                // nên ta phải đổi sang số để khi cộng quantily không có bug
                result.quantity = Number(this.value);
                console.log(this.value)
                // cẬP NHẬT lại Cart
                localStorage.setItem('CartItem', JSON.stringify(updateCart));
                window.location.reload();
            }
        }
    });
}
