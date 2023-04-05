// function loadShoppingCard(){
    
    const selectedItems = document.querySelectorAll('.icon');
    selectedItems.forEach((item) => {
        //console.log(getimage =item.parentElement.children[0].getAttribute('src'));
        item.onclick= function(){
            getimage =item.parentElement.children[0].getAttribute('src');
            getid    =item.parentElement.nextElementSibling.children[0].textContent;
            getname  = item.parentElement.nextElementSibling.children[1].textContent;
            getprice = item.parentElement.nextElementSibling.children[2].textContent;
            let newItem={
                image : getimage,
                id: getid ,
                name: getname,
                price :getprice,
                quantity:1
            }
            let updateCart = [] ; //Dùng cái này làm trung gian
            if ((JSON.parse(localStorage.getItem('CartItem')) === null)) {
                updateCart.push(newItem);
                localStorage.setItem('CartItem', JSON.stringify(updateCart));
                window.location.reload();// cập nhật để hiện số trên giỏ hàng
            } else {
                updateCart = JSON.parse(localStorage.getItem('CartItem'));
                var result = updateCart.find(function (itemCart) {
                return itemCart.id === newItem.id;
            });
            if (result === undefined) {
                updateCart.push(newItem)
            } else {
                result.quantity += 1;
            }
            }
            localStorage.setItem('CartItem', JSON.stringify(updateCart));
            window.location.reload();// cập nhật để hiện số trên giỏ hàng
        console.log(getimage) ;
        }
    
});

//}
/* Cập nhật số lượng trên icon giỏ hàng */
// Để riêng khỏi hàm onlcick để luôn cập nhật mà không cần click mới hiện
if ((JSON.parse(localStorage.getItem('CartItem')) !== null)){
    var updateCart = JSON.parse(localStorage.getItem('CartItem'));
    var numberCartElement = document.querySelector('.total-items')
    if (numberCartElement) {
        var sum = updateCart.reduce(function (bienTichTru, giaTriCongThem) {
            // Gia trị cộng thêm tức là từng phần tử mà ta lập qua rồi lấy quantily
            // Ta đã chuyển sang số hết nên hàm number() sài hay không cũng được
            // Muốn chắc chắn không bug thì ta sài 
            return bienTichTru + Number(giaTriCongThem.quantity) ;
        }, 0);
        numberCartElement.textContent = sum ;
    }
   
}

