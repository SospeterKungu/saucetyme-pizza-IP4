
var pizzaOrderedList = [];
var totalPrice=0.0;

//user interface logic
$(document).ready(function(){
    $("#dotext1").hide();
    $("#dotext2").hide();
    $("#dotext3").hide();
    $("#dotext4").hide();
     $(".imagetoggle0 , .imagetoggle1").click(function(){
     $("#dotext1").toggle();
     $(".imagetoggle0").toggle();
     });
     $(".imagetoggle2 , .imagetoggle3").click(function(){
     $("#dotext2").toggle();
     $(".imagetoggle2").toggle();
     });
     $(".imagetoggle4 , .imagetoggle5").click(function(){
     $("#dotext3").toggle();
     $(".imagetoggle4").toggle();e
     });
     $(".imagetoggle6 , .imagetoggle7").click(function(){
     $("#dotext4").toggle();
     $(".imagetoggle6").toggle();
     });

     var selectedSize = "small";
     var selectedTopping = "vegetarian";
     var selectedCrust = "crispy";
     var selectedDelivery = "NO";
     var pizzaOrdered = {};
    pizzaOrdered = new Pizza(selectedSize, selectedTopping, selectedCrust);
    addPizza(pizzaOrdered);
    calculatePrice (pizzaOrdered);


     $('#orderForm input').on('change', function() {
       selectedSize = $('input[name=size]:checked', '#orderForm').val();
       selectedTopping =  $('input[name=topping]:checked', '#orderForm').val();
       selectedCrust = $('input[name=crust]:checked', '#orderForm').val();
       selectedDelivery = $('input[name=deliveryConfirmation]:checked', '#orderForm').val();


       console.log("Before change >>"+ pizzaOrderedList.length);
       totalPrice=totalPrice-pizzaOrderedList[pizzaOrderedList.length - 1].price();
       pizzaOrderedList.pop()
       console.log("After change >>"+ pizzaOrderedList.length);
       pizzaOrdered = new Pizza(selectedSize, selectedTopping, selectedCrust);
       addPizza(pizzaOrdered);
       calculatePrice (pizzaOrdered,selectedDelivery);
      });

      $("#addPizza").click(function(){
          //Clear form
          addPizza(pizzaOrdered);
          calculatePrice(pizzaOrdered);
        });
   });

//business logic
function addPizza(pizzaOrdered){
  pizzaOrderedList.push(pizzaOrdered);
}
function calculatePrice(pizzaOrdered,selectedDelivery){
  console.log("Total Price >>" +totalPrice);
    totalPrice= totalPrice + pizzaOrdered.price();
    if(selectedDelivery=="yes"){
      totalPrice=totalPrice+200;

    } else if(selectedDelivery=="no"){
      totalPrice=totalPrice-200;
    }
    $("#orderPrice").text(totalPrice);
    $("#pizzaQty").text(pizzaOrderedList.length);
};

function Pizza(size, topping, crust){
  this.size=size;
  this.topping=topping;
  this.crust=crust;
}

Pizza.prototype.price = function (){
  var pizzaSize = ["small", "medium", "large"];
  var pizzaTopping = ["vegetarian", "hungarian", "chicken", "hawaiian"];
  var pizzaCrust = ["crispy", "stuffed", "gluten"];

  var sizeIndex = pizzaSize.indexOf(this.size);
  var toppingIndex = pizzaTopping.indexOf(this.topping);
  var crustIndex = pizzaCrust.indexOf(this.crust);

  var sizePrices = [200, 300, 400];
  var toppingPrices = [150, 250, 350, 450];
  var crustPrices = [120, 220, 320];

  var price = sizePrices[sizeIndex] + toppingPrices[toppingIndex] + crustPrices[crustIndex];
  return price;
}

$(document).ready(function() {
    $("#add").submit(function() {
      alert("Order submitted as follows " + pizzaOrderedList + "Pizza(s)," + "amount payable is " + totalPrice + "to be delivered at " + deliveryArea);
    });
});
