let itemsContainer = document.getElementById("items-container");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
   return (itemsContainer.innerHTML = itemsData.map((x) => {
       let {name, price, category,image} = x;
       let search = basket.find((x) => x.id === id) || [];
       return `


       <div class="item">
       <div class="image-wrapper">
           <img class="item-image" src="${image}" alt="">
           <div class="badge-secondary"><img src="assets/badge-icon.svg" alt=""><span class="badge-category">${category}</span></div>
       </div>
       <div class="itemDetails">
         <h4> ${name} </h4>
       <div class="price"> $${price} </div>
       <label class="import-wrapper"> Apply import duty
           <input type="checkbox" >
           <div class="checkmark"><svg class="check" width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M2.63484 4.76755L0.98486 3.24002L0.276367 3.89594L2.63484 6.07938L7.49859 1.57657L6.7901 0.920654L2.63484 4.76755Z" fill="white"/>
             </svg>
             </div>
       </label>
       <button><span>add to cart</span></button>
       </div>
     </div>

     `;
     })
     .join(""));
 };
  /*     <div id=product-id-${category} class="item">
         <img width="220" src=${image} alt="">
         <div class="details">
           <h3>${name}</h3>
           <p>${category}</p>
           <div class="price-quantity">
             <h2>$ ${price} </h2>
             <div class="buttons">
               <i onclick="decrement(${name})" class="bi bi-dash-lg"></i>
               <div id=${name} class="quantity">
               ${search.item === undefined ? 0 : search.item}
               </div>
               <i onclick="increment(${name})" class="fa-solid fa-plus-lg"></i>
             </div>
           </div>
         </div>
       </div>
 */
 generateShop();