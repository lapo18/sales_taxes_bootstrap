let itemData=[];
let basket=[];
fetch('./sales-tax-problem-test.json')
.then((response) => response.json())
.then((data) => {
  for (i = 0; i < data.length; i++) {
      data[i]["id"]=i+1;
      let itemsContainer = document.getElementById("items-container");
      temp = document.createElement('div');
      temp.className = 'col';
      temp.innerHTML =  `
      <div class="card">
      <div class="card-header bg-white rounded-1 shadow-sm position-relative">
      <img class="card-img-top" src="${data[i]["image"]}" alt="">
      <span class="badge text-bg-dark position-absolute">${data[i]["category"]}</span>
    </div>
    <div class="bg-secondary card-body p-0 mt-3">
      <h5 class="m-0">${data[i]["name"]}</h5>
      <div class="mb-2 price">$${data[i]["price"]}</div>
      <div class="form-check">
      <input id="cb${i+1}" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <label class="form-check-label" for="flexCheckDefault">
        Apply import duty
      </label>
      </div>
      <button type="button" class="btn btn-primary text-white mt-3 rounded-1 border-0 fs-6 w-100" onclick="addToBasket(${i+1})">ADD TO CART</button>
      <!-- <label class="import-wrapper"> Apply import duty
        <input id="cb1" type="checkbox" >
        <div class="checkmark"><svg class="check" width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.63484 4.76755L0.98486 3.24002L0.276367 3.89594L2.63484 6.07938L7.49859 1.57657L6.7901 0.920654L2.63484 4.76755Z" fill="white"></path>
        </svg>
          </div>
      </label> -->
    </div>
    </div>




   
     `;
     
      itemsContainer.appendChild(temp);
    }
    itemData=data;
} );




/* ADD ITEMS ITEMS TO THE BASKET AND UPDATE SELECTED PRODUCTS LIST
 */

let addToBasket = (id) => {
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



/* SCROLL TO THE SELECTED PRODUCTS LIST
 */
function scrollToCart(){
    document.querySelector('.cart').scrollIntoView({ behavior: 'smooth' });
}


/* DELETE ITEM FROM SELECTED PRODUCTS LIST AND UPDATES THE TOTAL PRICES
 */
function removeCartItem(id){
  let deleteItem=document.querySelectorAll('.delete-button')
  console.log(deleteItem);
  basket.splice(id,1);
  calcTotalAmount();
  calcTotalTaxes();
  generateCartItems();
}


/* UPDATES THE SELECTED PRODUCTS LIST WITH ADDED ITEMS TO THE BASKET */

let ShoppingCart = document.getElementById("shopping-cart");
let generateCartItems = () => {
  if (basket.length !== 0) {
    let i=-1;
    calcTotalAmount();
    calcTotalTaxes();

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
        <td class="fw-bold">${name}</td>
        <td>${isImported}</td>
        <td>$${(parseFloat(price)+parseFloat(taxes)).toFixed(2)}</td>
        <td>$${taxes.toFixed(2)}</td>
        <td onclick="removeCartItem(${i})" class="delete-button text-danger"><i class="fa-solid fa-trash-can"></i></td>
      </tr>
        `;
      })
      .join(""));
  } 
  else {
    ShoppingCart.innerHTML = `
    <tr class="col-12 text-end">
      <td class="fullwidth">Cart is Empty</td>
    </tr>
    `;
  }
  
};
generateCartItems();


/* CALCULATE THE TOTAL PRICE AND STORE RESPECTIVE TAX PER ITEM
 */
let total=document.getElementById('total');
let calcTotalAmount = () => {
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



/* CALCULATE THE TOTAL AMOUNT OF TAXES*/

let totaltaxes=document.getElementById('taxes');
let calcTotalTaxes = () => {
  if (basket.length !== 0) {
    let amount = 
    basket.map((x) => {
        let { taxes } = x;
        return parseFloat(taxes);
      })
      .reduce((x, y) => x + y, 0);
    
    return (totaltaxes.innerText ="$"+amount.toFixed(2));
  } else return totaltaxes.innerText ="$0.00";
};


/* PRINT CART */
let printButton = document.getElementById('receiptbutton');
printButton.addEventListener("click", function(){printButton.style.display="none";
print();
});
/*   CALL FUNCTION TO CLEAR BASKET AFTER PRINT WINDOWS IS CLOSED*/  

window.addEventListener('afterprint', (event) => {
  printButton.style.display="block";
  setTimeout(function(){clearbasket();},500);
});
/* DELETE ALL ITEMS ON BASKET*/
function clearbasket(){
  basket=[];
  calcTotalAmount();
  calcTotalTaxes();
  generateCartItems();
}