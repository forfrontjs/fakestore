let cards = document.querySelector('.cards'),
    li = document.querySelectorAll('header li'),
    boxCart = document.querySelector('.boxCart'),
    btnCart = document.querySelector('.cart'),
    countCart = document.querySelector('.countCart')

let category = ''

let arrCart = []


let renderCart = () => {
    boxCart.innerHTML = '<h1 class="cart__close">X</h1> <h4 class="priceCart">0</h4>'
    arrCart.forEach((el) => {
        boxCart.innerHTML += `
        <div class="oneCart">
            <img src="${el.image}">
            <h4>${el.title}</h4>
            <h5>Price: ${el.price}</h5>
            <div class="cartItemController">
                <button class="decrease" data-id=${el.id}>-</button>
                <h6>${el.counter}</h6>
                <button class="increase" data-id=${el.id}>+</button>
            </div>
        </div>
        `
    })

    let priceCart = document.querySelector('.priceCart')
        priceCart.textContent = "Total: " + arrCart.reduce((acc, rec) => {
            if(rec.counter === 'max'){
                return acc + rec.price * 15
            }
            else{
                return acc + rec.price * rec.counter
            }
        },0)


    let increaseItemCart = document.querySelectorAll('.increase')
        increaseItemCart.forEach((el) => {
            el.addEventListener('click', () => {
                arrCart.forEach((item) => {
                    if (item.id === +el.dataset.id) {
                        if(item.counter >= 14 || item.counter === 'max'){
                           return  item.counter = 'max'
                        }
                        else{   
                            item.counter += 1
                        }
                    }
  
                    
                })
                renderCart()
            })
        })
    
    
    let decreaseItemCart = document.querySelectorAll('.decrease')
    decreaseItemCart.forEach((el) => {
        el.addEventListener('click', () => {
            arrCart.forEach((item, index) => {
                if (item.id === +el.dataset.id) {
                    if (item.counter < 1) {
                        arrCart.splice(index, 1)
                    }
                    else if(item.counter === 'max'){
                        return item.counter = 14
                    }
                    item.counter -= 1
                }
                
                countCart.textContent = arrCart.length
            })    
            renderCart()
        })
    })

    let closeCart = document.querySelector('.cart__close')
    closeCart.addEventListener('click', () => {
        boxCart.classList.contains('active')
        boxCart.classList.remove('active')
    })
}


let showProduct = () => {
    cards.innerHTML = ''
    fetch(`https://fakestoreapi.com/products/${category === 'jewelery'?'category/jewelery'
        :category === "men's clothing"?"category/men's clothing"
        :category === 'electronics'?'category/electronics'
        :category === "women's clothing"?"category/women's clothing":''}`)

    .then((res) => res.json())
    .then((data) => {
        data.forEach((el) => {
            cards.innerHTML += `
            <div class="card">
                <div class="card__info">
                    <a href="oneProduct/oneProduct.html#${el.id}">
                    <img src="${el.image}" alt="">
                    </a>
                    <h4 >${el.title}</h4>
                    <h3 >Price: ${el.price}</h3>
                    <p class="des" data-id="${el.id}">${el.isactive?el.description:el.description.slice(0, 30)}</p>
                    <button class="btnMore" data-id="${el.id}">(...)</button>
                    
                </div>
                <button class="btn__cart" data-id="${el.id}">В корзину</button>
            </div>
            `
        })
       
        let btnsMore = document.querySelectorAll('.btnMore')
            btnsMore.forEach((el) => {
                el.addEventListener('click', () => {
                   let card = el.closest('.card')
                   let cardDes = card.querySelector('.des')

                   if(el.textContent === '(...)'){
                    el.textContent = 'Скрыть'
                    el.style.background = 'white'
                    el.style.zIndex = '100'

                    data.forEach((item)=>{
                        if(item.id = el.dataset.id){
                            cardDes.textContent = item.description
                            cardDes.style.zIndex = 100
                            cardDes.style.color = 'blue'
                        }
                       })
                   }
                   else{
                        el.textContent = '(...)'
                        el.style.background = 'rgb(208, 255, 0)'
                        cardDes.style.color = 'black'

                        data.forEach((item)=>{
                            if(item.id = el.dataset.id){
                                cardDes.textContent = item.description.slice(0,30)
                            }
                        })
                    }

                   

                })   
            })

            
        let btnsCart = document.querySelectorAll('.btn__cart')
        btnsCart.forEach((el) => {
            el.addEventListener('click', () => { 
                el.classList.toggle('active')                   
                let find = data.find((item) => item.id === +el.dataset.id),
                    sameId = arrCart.find((item) => item.id === find.id)
                    if(el.classList.contains('active')){
                        el.textContent = 'Убрать из корзины'
                    }
                    else{
                        el.textContent = 'В корзину'
                    }
                    if (sameId) {
                        sameId.counter = sameId.counter + 1
                        
                    } else {
                        find.counter = 1
                        arrCart.push(find)
                    }
                    if (arrCart.length > 9) {
                        countCart.textContent = '9+'
                    }else {
                        countCart.textContent = arrCart.length
                    }
                    arrCart.forEach((item, idx)=>{
                        if(el.textContent === 'В корзину' && item.id === +el.dataset.id){
                            arrCart.splice(idx ,1)
                            countCart.textContent = arrCart.length
                        }
                    })
                    
                    renderCart()
                    
            })
        })
                  
    })
}
renderCart()

li.forEach((el) => {
    el.addEventListener('click', (event) => {
    category = el.textContent
    li.forEach(el => el.classList.remove('actived'))
    event.target.classList.add('actived')
        showProduct()
    })
})

btnCart.addEventListener('click', () => {
    boxCart.classList.toggle('active')  
})

showProduct()



// let func = (arr, a)=>{
//     for(let i = 0; i < arr.length; i++){
//         if(arr[i].title.includes(a)){
//             console.log('ok');
//         }
//     }
// }
// console.log(func([
//     {id:1,title:'qwert1',counter:2,price:55},
//     {id:2,title:'qwert2',counter:1,price:70},
//     {id:3,title:'qwert3',counter:5,price:10},
//     {id:4,title:'qwert4',counter:3,price:100},
//     {id:5,title:'qwert5',counter:7,price:22},
// ], 'qwert1'));
