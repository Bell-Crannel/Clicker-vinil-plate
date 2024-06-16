
const shopPopupBody = document.querySelector('div.popup-shop')
const vinylPlate = document.querySelector('.vinyl-record__img')
const pointsOutVie = document.querySelector('.nav__points')
const productArray = document.querySelectorAll('.popup-shop__item')




window.addEventListener('click',popup('data-shop-controls'));

window.addEventListener('click',buyProduct('popup-shop__buy','popup-shop__price-item'));

vinylPlate.addEventListener('click',()=>{
    return player.culcAndRenderCoins(
        player.skills.clickPowerData?.count
        ? player.skills.clickPowerData.count 
        : player.defaultClickPoweer , '+', pointsOutVie)}
    )



const player = {
    login:null,
    password:null,
    allCoins:0,
    currentCoins:0,
    defaultClickPoweer:1,
    skills:{
       autoClickData:{
        count:0,
        interval:5000,
        skillStatus:false,
        skillF(outCoinEl){
            return ()=>{
                player.culcAndRenderCoins(this.count, "+",outCoinEl)
            }
                
        }
       },
       clickPowerData:{ 
        count:1,
        skillF(){
            this.count +=1
        } 
       }


    },
    culcAndRenderCoins(count = 0, operation,outCoinsEl){
        const operations = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
        }

        if(operation === '+'){
            this.allCoins += count
        }

        if(operations[operation]){
            this.currentCoins = operations[operation](this.currentCoins, count)
            
        }else{
            console.warn("error for culcMoney");
        }
        
        outCoinsEl.textContent = this.currentCoins;
        
    },
    productAvailable(arrProduct,priceProductId, classAvaible){
        arrProduct.forEach(product => {
           parseInt(product.querySelector(`.${priceProductId}`).textContent) <= player.currentCoins ?
            product.classList.add(`${classAvaible}`):
            product.classList.remove(`${classAvaible}`);
            
        });
    
    }
}


function buyProduct(btnPriceClass, priceProductClass){
   return (e) => {
    if(e.target.classList.contains(btnPriceClass)){
        const parentWrapper = e.target.parentNode;
        const productPriceEl = parentWrapper.querySelector(`.${priceProductClass}`);
        const skillBuyId = parentWrapper.dataset.skill;
    
         skillBuyId in  player.skills?
         player.skills[skillBuyId].count +=1:
         null;

       

        player.culcAndRenderCoins(parseFloat(productPriceEl.textContent),'-',pointsOutVie)
        priceIncrease(productPriceEl);
        player.productAvailable(productArray,'popup-shop__price-item','popup-shop__item_available');
        
        runSkills(skillBuyId)

    };
    

   }
}




function popup(controllerID){
    return (e) =>{  
       player.productAvailable(productArray,'popup-shop__price-item','popup-shop__item_available')

        const attr = e.target.getAttribute(`${controllerID}`);
    
       attr === "open" || attr === 'close' ?
        shopPopupBody.classList.toggle('none'):
        null

    }
   
}



function runSkills(skillID){
    
    for(let skill in player.skills){
        if(skill === skillID && player.skills[skill].skillStatus === false){
            const interval = player.skills[skill].interval;
            const skillFunc = player.skills[skill].skillF.bind(player.skills[skill])

            setInterval(skillFunc(pointsOutVie),interval)
            player.skills[skill].skillStatus = true;
        }
    }

}

function priceIncrease(el){
    const priceEl = parseFloat(el.textContent);
    el.textContent = Math.trunc(priceEl * 2.5);
}
























































// const vinylRecord = document.querySelector('.vinyl-record__img');
// const coinsD = document.querySelector('.nav__points');
// const productAll = document.querySelectorAll('.popup-shop__item')

// const shopOpen = document.querySelector('.nav__shop_open-ic');
// const shopClose = document.querySelector('.popup-shop__close');
// const popupShop = document.querySelector('.popup-shop');
// const buyBtn = document.querySelectorAll('.popup-shop__buy');


// const sectionVinil = document.querySelector('.vinyl-record')


// const player = {
//     allCoins:0,
//     currentCoins:0,
//     skills: {
//         autoClick:{
//             count:0,
//             autoClickM: () =>{
                
//                 setInterval(()=>{
//                     for(let i = 0; i < player.skills.autoClick.count; i++){
                       
//                        culcRenderCoin(1,'+')
//                     }
                    
//                 },10000)}
            
//         }
//     },
// }






// buyBtn.forEach((e)=>{
//     e.addEventListener('click',registerSkill)
// })


// document.addEventListener('click', popupHendler)

// vinylRecord.addEventListener('click', () => {
    
//     culcRenderCoin(1, '+')
    
// })






// function culcRenderCoin(count, operation) {
//     productAvailable()
//     if (operation === '+') {
//         player.currentCoins += count
//         player.allCoins += count
//     } else if (operation === '-') {
//         player.currentCoins -= count
//     } else {
//         return console.warn(`not corect: ${operation}`);
//     }

//     coinsD.textContent = player.currentCoins;
//     productAvailable()

// }




// function productAvailable() {
//     productAll.forEach((e) => {
//         const price = parseInt(e.querySelector('.popup-shop__price-item').textContent);
//         if (price <= player.currentCoins) {
//             e.classList.add('popup-shop__item_available')
//         } else{
//             e.classList.remove('popup-shop__item_available')
//         }

//     })
// }


// function registerSkill(e) {
//         const parentNode = e.target.closest('.popup-shop__item')
//         const price = parseInt(parentNode.querySelector('.popup-shop__price-item').textContent)
//         culcRenderCoin(price, '-')
//         productAvailable()


//         for(let key in player.skills){
//             if(key === parentNode.dataset.skill){
//                player.skills[key].count += 1
            
//             }
//          }

//          skilsTurnOn(player.skills);

//          console.log(player.skills);
// }




// function skilsTurnOn(skilsArray) {
//     for (const key in skilsArray) {
//        skills = skilsArray[key];
       
//        if(skills.count > 0){
//         skills.autoClickM()
//        }
//     }
// }




// function popupHendler(e) {
//     e.preventDefault()
//     productAvailable();

 

//     switch (e.target) {
//         case shopOpen
//             : popupShop.classList.remove('none')

//             break
//         case shopClose
//             : popupShop.classList.add('none')
//             break

//     }

// }


