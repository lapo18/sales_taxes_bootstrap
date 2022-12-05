let itemData=[];
let basket=[];
fetch('https://earnest-taffy-9e7259.netlify.app/sales-tax-problem-test.json')
.then((response) => response.json())
.then((data) => {
   
  for (i = 0; i < data.length; i++) {
      data[i]["id"]=i+1;
      let itemsContainer = document.getElementById("items-container");
      temp = document.createElement('div');
      temp.className = 'item';
      temp.innerHTML =  `
      <div class="image-wrapper">
          <img class="item-image" src="${data[i]["image"]}" alt="">
          <div class="badge-secondary"><img src="assets/badge-icon.svg" alt=""> 
          <span class="badge-category">${ data[i]["category"] }</span></div>
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

 
};





function scrollToCart(){
    document.querySelector('.cart').scrollIntoView({ behavior: 'smooth' });
}




function removeCartItem(id){
  let deleteItem=document.querySelectorAll('.delete-button')
  console.log(deleteItem);
  basket.splice(id,1);
  TotalAmount();
  Totaltaxes();
  generateCartItems();

}




 let ShoppingCart = document.getElementById("shopping-cart");

 let generateCartItems = () => {
  if (basket.length !== 0) {
    let i=-1;
    TotalAmount();
    Totaltaxes();

    return (ShoppingCart.innerHTML = basket
      .map((x) => {
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
  } 
  else {
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
  } else return total.innerText="$0.00";
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
  } else return totaltaxes.innerText ="$0.00";
};
Totaltaxes();


const printButton = document.getElementById('receiptbutton');
printButton.addEventListener('click', function(){
  printButton.style.display="none";

  print();
  clearbasket();
  printButton.style.display="block";
})

function clearbasket(){
  basket=[];
  TotalAmount();
  Totaltaxes();
  generateCartItems();
}







/* 
TAXES ROUND UP TO 0.05

let x= Math.round(0.49 *20.0)/20.0;
document.getElementById("demo").innerHTML = parseFloat(x).toFixed(2); */