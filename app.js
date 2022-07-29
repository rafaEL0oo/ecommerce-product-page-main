const CARTBUTTON = document.querySelector('.cart-button')
const CARTPOPUP = document.querySelector('.cart-popup')
const BODY = document.body
const PLUSBUTTON = document.querySelector('.plus')
const MINUSBUTTON = document.querySelector('.minus')
const ADDTOCARTBUTTON = document.querySelector('.add-to-cart')
const CARTCOUNTER = document.querySelector('.cart-counter')
const FILLEDBASKET = document.querySelector('.basket-content-filled')
const EMPTYBASKET = document.querySelector('.basket-content-empty')
const THUMBNAILCONTAINER = document.querySelector('.thumbnails-container')
const BIGPICTURE = document.querySelector('.big-picture__img')

let basketContent = {}

const HidePopups = (e) => {
    //Closing CARTPOPUP after clicking outside popup window
    if(!CARTPOPUP.classList.contains('hidden') && !e.target.classList.contains('cart')){
        CARTPOPUP.classList.add('hidden')
    }
}

const UpdateCartCounter = () => {
    let productsList = Object.keys(basketContent)
    let overallCounter = 0
    if(productsList.length > 0){
        productsList.forEach((product)=>{
        overallCounter = overallCounter + parseInt(basketContent[product].count);
        })
        CARTCOUNTER.textContent = overallCounter
        CARTCOUNTER.classList.remove('hidden')
    }else{
        CARTCOUNTER.classList.add('hidden')
    }
}

const RemoveProductFromCart = ()=>{
    basketContent = {}
    FILLEDBASKET.innerHTML = ""
    GenerateBasket()
    UpdateCartCounter()
}

const AppendCheckoutButton = ()=>{
    let checkoutButton = document.createElement('button')
    checkoutButton.classList.add('checkout')
    checkoutButton.textContent = "Checkout"
    FILLEDBASKET.appendChild(checkoutButton)
}

const GenerateBasket = () => {
    if(Object.keys(basketContent).length > 0){
        Object.keys(basketContent).forEach((product) => {
            let productElement = `
            <div class="basket-details cart">
                <img class="cart cart-thumbnail" src="./images/image-product-1-thumbnail.jpg" alt="">
                <div class="basket-product-details cart">
                  <span class="cart product-name">${product}</span><br>
                  <span class="cart amount">$${basketContent[product].price} x ${basketContent[product].count} <b class="total-price">$${basketContent[product].price * basketContent[product].count}</b></span>
                </div>
                <img src="./images/icon-delete.svg" alt="" class="bin cart">
            </div>`
            FILLEDBASKET.innerHTML = productElement
            FILLEDBASKET.addEventListener('click',(e)=>{
                if(e.target.classList.contains('bin')){
                    RemoveProductFromCart()
                }
            });
            AppendCheckoutButton()
            EMPTYBASKET.classList.add('hidden')
            FILLEDBASKET.classList.remove('hidden')
        })
    }else{
        FILLEDBASKET.classList.add('hidden')
        EMPTYBASKET.classList.remove('hidden')
    }
}


CARTBUTTON.addEventListener('click', ()=>{
    CARTPOPUP.classList.toggle('hidden')
    GenerateBasket()
})


BODY.addEventListener('click', HidePopups)


PLUSBUTTON.addEventListener('click', ()=>{
    let productCount = document.querySelector('.count b').textContent
    productCount++
    document.querySelector('.count b').textContent = productCount
})

MINUSBUTTON.addEventListener('click', ()=>{
    let productCount = document.querySelector('.count b').textContent
    if(productCount > 0) productCount--
    document.querySelector('.count b').textContent = productCount
})

ADDTOCARTBUTTON.addEventListener('click', ()=>{
    let productName = document.querySelector('.product-title').textContent
    let count = document.querySelector('.count b').textContent
    let product_price = document.querySelector('.price-value').dataset.price
    if(count > 0){
        basketContent[productName] = {"price": product_price,
        "count": count}
    }else{
        alert('Cannot add 0 product to cart!')
    }
    UpdateCartCounter()
})


THUMBNAILCONTAINER.addEventListener('click', (e)=>{
    let pictureList = [...document.querySelectorAll('.thumbnail')]
    BIGPICTURE.src = `./images/image-product-${pictureList.indexOf(e.target) + 1}.jpg`
    document.querySelectorAll('.thumbnail').forEach((image)=>{
        image.classList.remove('active-picture')
    })
    e.target.classList.add('active-picture')
})