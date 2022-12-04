


let itemData=[];
let basket=[];
fetch('https://earnest-taffy-9e7259.netlify.app/sales-tax-problem-test.json')
.then((response) => response.json())
.then((data) => {
   
  for (i = 0; i < data.length; i++) {
      // console.log(data["products"][i]["id"]);
      data[i]["id"]=i+1;
      let itemsContainer = document.getElementById("items-container");
      temp = document.createElement('div');
      temp.className = 'item';
      temp.innerHTML =  `
      <div class="image-wrapper">
          <img class="item-image" src="${data[i]["image"]}" alt="">
          <div class="badge-secondary"><img src="assets/badge-icon.svg" alt=""> <span class="badge-category">${ data[i]["category"] }</span></div>
      </div>
      <div class="itemDetails">
        <h4>${data[i]["name"]}</h4>
      <span class="price">$${data[i]["price"]}</span>
      <label class="import-wrapper"> Apply import duty
          <input id="cb${i+1}" type="checkbox" " >
          <div class="checkmark"><svg class="check" width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.63484 4.76755L0.98486 3.24002L0.276367 3.89594L2.63484 6.07938L7.49859 1.57657L6.7901 0.920654L2.63484 4.76755Z" fill="white"/>
            </svg>
            </div>
      </label>
      <button onclick="increment(${i+1})"><span>add to cart</span></button>
      </div>
     `;
  
      itemsContainer.appendChild(temp);
    }
    itemData=data;
} );




/*

ALTERNATIVE GENERATE ITEMS 


let itemsContainer = document.getElementById("items-container");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
  let i=0;
   return (itemsContainer.innerHTML = itemsData.map((x) => {
       let {name, price, category, image} = x;
       let search = basket.find((x) => x.id === id) || [];
       i++;
       
       return `


       <div id="${i}" class="item">
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
       <button onclick=""increment(${price})"><span>add to cart</span></button>
       </div>
     </div>

     `;
     })
     .join(""));
 };
 generateShop(); */



 
 let increment = (id) => {
  scrollToCart();
  let cb=document.querySelector(`#cb${id}`);
  let isImported=false;
  if(cb.checked){
    isImported=true;
  }
  let selectedItem = id;

  basket.push({
      id: selectedItem,
      imported: isImported,
    });

  console.log(basket);
  generateCartItems(); 

 /*  update(selectedItem.id); */
};

/* var addItemButton=document.getElementById('item1');
addItemButton.addEventListener('click',function(event){
 console.log(addItemButton);
}) */


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





























function scrollToCart(){
    document.querySelector('.cart').scrollIntoView({ behavior: 'smooth' });
}




function removeCartItem(id){
  let deleteItem=document.querySelectorAll('.delete-button')
  console.log(deleteItem);
  basket.splice(id,1);
  generateCartItems();
}




 let ShoppingCart = document.getElementById("shopping-cart");

 let generateCartItems = () => {
  if (basket.length !== 0) {
    let i=-1;
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        TotalAmount();
        Totaltaxes();
        
        let { id, imported, taxes } = x;
        let search = itemData.find((x) => x.id === id) || [];
        let { price, name } = search;
        let isImported="No"
        if(imported==true){
          isImported="Yes";
        }
        i++;
        return `
     

      <tr>
                <td></td>
                <td>${name}</td>
                <td>${isImported}</td>
                <td>$${price}</td>
                <td>$${taxes}</td>
                <td onclick="removeCartItem(${i})"class="delete-button"><i class="fa-solid fa-trash-can"></i></td>
                <td></td>
                
              
                
              </tr>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = `

    <tr>
      <td class="fullwidth">Cart is Empty</td>
      </tr>

    `;
  }


};
generateCartItems();



let total=document.getElementById('total');
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = 
    basket.map((x) => {
        let { id, imported, taxes } = x;
        let search = itemData.find((x) => x.id === id) || [];
        let { price, category } = search;
        let importduty=0.00;
        if(imported){
          importduty=5.00;
        }
        let tax=0;
        if(category=="other"){
          tax=10.00;
        }
        
        let totaltax=parseFloat(price)*(importduty+tax)/100;
        let taxrounded = Math.round(totaltax*20)/20;
        x.taxes=taxrounded;
        /* let filterData = itemData.find((x) => x.id === id); */
        return parseFloat(price)+taxrounded;
      })
      .reduce((x, y) => x + y, 0);
    
    return (total.innerText ="$"+amount.toFixed(2));
  } else return;
};

TotalAmount();


let totaltaxes=document.getElementById('taxes');
let Totaltaxes = () => {
  if (basket.length !== 0) {
    let amount = 
    basket.map((x) => {
        let { id, imported, taxes } = x;
        let search = itemData.find((x) => x.id === id) || [];
        let { price, category } = search;
        let importduty=0.00;
        if(imported){
          importduty=5.00;
        }
        let tax=0;
        if(category=="other"){
          tax=10.00;
        }
        
        let totaltax=parseFloat(price)*(importduty+tax)/100;
        let taxrounded = Math.round(totaltax*20)/20;
        
        /* let filterData = itemData.find((x) => x.id === id); */
        return parseFloat(taxes);
      })
      .reduce((x, y) => x + y, 0);
    
    return (totaltaxes.innerText ="$"+amount.toFixed(2));
  } else return;
};
Totaltaxes();







/* 
TAXES ROUND UP TO 0.05

let x= Math.round(0.49 *20.0)/20.0;
document.getElementById("demo").innerHTML = parseFloat(x).toFixed(2); */