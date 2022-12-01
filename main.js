fetch('https://instilla-sales-tax-problem.s3.eu-central-1.amazonaws.com/sales-tax-problem-test.json')
.then((response) => response.json())
.then((data) => {
    // console.log(data["products"]);
    for (i = 0; i < data["products"].length; i++) {
        // console.log(data["products"][i]["id"]);
        temp = document.createElement('div');
        temp.className = 'results';
        temp.innerHTML = '<div class="card">'+

        '<div class="imgBox">'+
         ' <img src="'+data["products"][i]["images"][0]+'" alt="mouse corsair" class="mouse">'+
       ' </div>'+
      
       ' <div class="contentBox">'+
         ' <h3>'+data["products"][i]["title"]+'</h3>'+
         ' <h2 class="price">'+data["products"][i]["price"]+'.<small>0'+data["products"][i]["id"]+'</small> Afg</h2>'+
         ' <a href="#" class="buy">Buy Now</a>'+
      
     ' </div>';
        document.getElementsByClassName('container')[0].appendChild(temp);
      }
  });
