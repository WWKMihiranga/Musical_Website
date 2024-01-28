let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

var final_total=0;
var store_total=0;
let popup=document.getElementById("popup");

const a=document.getElementById("reference").innerHTML;
const b=document.getElementById("description").innerHTML;
const c=document.getElementById("amount").innerHTML;
    

cartIcon.onclick = () =>{
    cart.classList.add("active");
};

closeCart.onclick =()=>{
    cart.classList.remove("active");
};

if (document.readyState=="loading") {
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}

function ready(){

    var removeCartButtons=document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(var i=0;i<removeCartButtons.length;i++){
        var button=removeCartButtons[i]
        button.addEventListener('click',removeCartItems);
    }


    var quantityInputs=document.getElementsByClassName("cart-quantity");
    for(var i=0;i<quantityInputs.length;i++){
        var input=quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }

    var addCart=document.getElementsByClassName("add-cart");
    for(var i=0;i<addCart.length;i++){
        var button=addCart[i];
        button.addEventListener("click",addCartClicked);
    }

    
    document
    .getElementsByClassName("buy-button")[0]
    .addEventListener("click",buyButtonClicked);

    document.getElementsByClassName("confirmOrder")[0]
    .addEventListener("click",placeOrder)

    document.getElementsByClassName("reset")[0]
    .addEventListener("click",cancelOrder)

}

function placeOrder(){

    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    shipping_address = document.getElementById("address").value;
    credit_card_number = document.getElementById("cardno").value;
    cvv = document.getElementById("cvv").value;
    month = document.getElementById("month").value;
    year = document.getElementById("year").value;


    if(credit_card_number.trim() == "" || credit_card_number.length != 12){
        alert("Credit card number is invalid");
    }else if(name.trim() == ""){
        alert("Name is invalid");
    }else if(month.trim() == "" || month.length !=2 && month.length !=1){
        alert("Month is invalid");
    }else if(year.trim() == "" || year.length !=4){
        alert("Year is invalid");
    } else if(cvv.trim() == "" || cvv.length != 3){
        alert("CVV is invalid");    
    }else if(shipping_address.trim() == ""){
        alert("Shipping address is invalid");
    } else if (checkEmail(email.trim())) {
        alert("Email is invalid");
    } else{alert("Your order is now completed")
    document.documentElement.scrollTop = 0;
    openPopup();
    }
    
}

function checkEmail(email) {
    let pattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !pattern.test(email);
}

function cancelOrder(){
    document.getElementById("reference").innerHTML=a;
    document.getElementById("description").innerHTML=b;
    document.getElementById("amount").innerHTML=c;
    alert("Your order is canceled")
}

function buyButtonClicked(){
    if(final_total!=0){
    alert("Your order is placed")
    window.scrollTo(0,document.body.scrollHeight);

    document.getElementById("reference").innerHTML=a;
    document.getElementById("description").innerHTML=b;
    document.getElementById("amount").innerHTML=c;
    
    document.getElementById("reference").innerHTML=document.getElementById("reference").innerHTML+'<span style="float: right;">001</span>';
    document.getElementById("description").innerHTML=document.getElementById("description").innerHTML+'<span style="float: right;">makePayment</span>';
    document.getElementById("amount").innerHTML=document.getElementById("amount").innerHTML+'<span style="float: right;">$'+(final_total+store_total)+'</span>';
    store_total=store_total+final_total;
    var cartContent=document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal();}
    else{
        alert("First you enter your order")
    }
}

function removeCartItems(event){
    var buttonclicked=event.target;
    buttonclicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input=event.target;
    if(isNaN(input.value)||input.value<=0){
        input.value=1;
    }
    updatetotal();
}

function addCartClicked(event){
    var button=event.target;
    var shopProducts=button.parentElement;
    var title=shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price=shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg=shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
}

function addProductToCart(title,price,productImg){
    var cartShopBox=document.createElement('div');
    cartShopBox.classList.add("cart-box")
    var cartItems=document.getElementsByClassName("cart-content")[0];
    var cartItemNames=cartItems.getElementsByClassName("cart-product-title");
    for(var i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText==title){
            alert("You have already add this item to cart");
            return;
        }
    }


var cartBoxContent=
    `<img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
    </div>
    <!--remove cart-->
    <i class='bx bxs-trash-alt cart-remove' ></i>`;

cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
.getElementsByClassName("cart-remove")[0]
.addEventListener("click",removeCartItems);
cartShopBox
.getElementsByClassName("cart-quantity")[0]
.addEventListener("change",quantityChanged);

}

function updatetotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0];
    var cartBoxes=cartContent.getElementsByClassName("cart-box");
    var total=0;
    for(var i=0;i<cartBoxes.length;i++){
        var cartBox=cartBoxes[i];
        var priceElement=cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
        var price=parseFloat(priceElement.innerText.replace("$",""));
        var quantity=quantityElement.value;
        total=total+(price*quantity);
    }
        //if the price contain cents
        total=Math.round(total*100)/100;

        document.getElementsByClassName("total-price")[0].innerText="$"+total;
        final_total=total;
    
}

function openPopup(){
    popup.classList.add("open-popup");
}

function closePopup(){
    popup.classList.remove("open-popup");
    location.reload();
}