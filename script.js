$(document).ready(function () {
    var burger_price = 0;
    var bun_price = 15;
    var paties_price = 0;
    var saled_price = 0;
    var cheese_price = 0;
    var carts = new Array();
    var total_cart_price = 0;
    var quantity_count = 1;

    //Burger - Increase the quantity
    $('#quantity_plus').click(function () {
        quantity_count++;
        $("#quantity").text(quantity_count);
        price_display();
    })

    //Burger - Decrease the quantity
    $('#quantity_minus').click(function () {
        if (quantity_count > 1) {
            quantity_count--;
            $("#quantity").text(quantity_count);
            price_display();
        }
        else {
            alert("Quantity must be greater or equal to 1");
        }
    })

    //Display updated cart to the user
    function update_cart() {
        $('#cart').empty();
        carts.forEach(element => {
            $("#cart").append(
                `<tr>    
                    <td >
                        ${element.title}
                    </td>                
                    <td >Quantity: ${element.quantity}</td>
                    <td>Rs: ${element.item_price}</td>
                     <td>
                        <button class="btn-delete"  id= "${carts.indexOf(element)}" type="submit"><i
                              class="fa-solid fa-trash "></i></button>
                    </td>
                </tr>`
            );

        });

        $('#total_cart_price').text("Pay Rs " + total_cart_price);
    }

    //Burger - Remove from cart
    $(document).on('click', '.btn-delete', function () {
        total_cart_price = total_cart_price - carts[this.id].item_price;
        carts.splice(this.id, 1);
        update_cart();
    });

    //Burger - Add to cart
    $('#addtocart_burger').click(function () {
        if (bun_price == 0) {
            alert("Please add bun to place order");
        }
        else {
            price_display();
            //add item to  the cart
            carts.push({
                title: `Burger`, quantity: `${quantity_count}`, item_price: `${burger_price}`
            })

            total_cart_price = total_cart_price + burger_price;
            update_cart();

            //Reset table after burger added to cart
            deletePaties();
            deleteCheese();
            deleteSaled();

            quantity_count = 1;
            $("#quantity").text(quantity_count);
            price_display();
        }
    })

    // Update and display the total price of burger
    function price_display() {
        burger_price = bun_price + paties_price + saled_price + cheese_price;
        burger_price = quantity_count * burger_price;
        $("#burger_price").text(burger_price);
    }

    //Add paties
    $('input[name=paties_quantity]').on("change", function () {
        $("#paties").empty();
        if (this.value == 1) {
            paties_price = 29;
            $('#paties_price').text(paties_price);
            $("#paties").append("<img class='burger_element' src='assests/images/paties.png'>");
            price_display();
        }
        else {
            paties_price = 58;
            $('#paties_price').text(paties_price);
            $("#paties").append("<img class='burger_element' src='assests/images/paties.png'><br><img class='burger_element' src='assests/images/paties.png'>");
            price_display();
        }
    });

    //Add saled
    $('input[id=saled1]').on("change", function () {
        $("#saled_tomato").empty();
        if (this.value == 1) {
            saled_price = saled_price + 29;
            $('#saled_price').text(saled_price);
            $("#saled_tomato").append("<img class='burger_element' width='160' src='assests/images/tomato.png'>");
            price_display();
        }
    })

    $('input[id=saled2]').on("change", function () {
        $("#saled_vegies").empty();
        if (this.value == 2) {
            saled_price = saled_price + 29;
            $('#saled_price').text(saled_price);
            $("#saled_vegies").append("<img class='burger_element' width='160' src='assests/images/saled.png'>");
            price_display();
        }
    })

    //Add cheese
    $('input[name=cheese_quantity]').on("change", function () {
        $("#cheese").empty();
        if (this.value == 1) {
            cheese_price = 29;
            $('#cheese_price').text(cheese_price);
            $("#cheese").append("<img class='burger_element' src='assests/images/cheese.jpg'>");
            price_display();
        }
        else {
            cheese_price = 58;
            $('#cheese_price').text(cheese_price);
            $("#cheese").append("<img class='burger_element' src='assests/images/cheese.jpg'><br><img class='burger_element' src='assests/images/cheese.jpg'>");
            price_display();
        }
    });

    //Delete Ingrediants
    function deletePaties() {
        $("#paties").empty();
        paties_price = 0;
        $('#paties_price').text(paties_price);
        price_display();
    }

    function deleteSaled() {
        $("#saled_tomato").empty();
        $("#saled_vegies").empty();
        saled_price = 0;
        $('#saled_price').text(saled_price);
        price_display();
    }

    function deleteCheese() {
        $("#cheese").replaceWith(`<div id="cheese"></div>`);
        cheese_price = 0;
        $('#cheese_price').text(cheese_price);
        price_display();
    }

    $('#delete_paties').click(deletePaties)

    $('#delete_saled').click(deleteSaled)

    $('#delete_cheese').click(deleteCheese)
});