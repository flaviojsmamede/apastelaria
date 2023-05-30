console.log("Hello, for no errors/issues please open the page in incognito mode or disable all your Chrome extensions, if you are using Chrome. Thank you!");

// ----------------------- LIGHT/DARK MODE -----------------------

const mainPage = document.getElementById('mainPage');
const itemsNumberOnCartButton = document.getElementById('itemsNumberOnCartButton');
const orderNowBtn = document.querySelectorAll('.orderNowBtn');
const toggleModeIcon = document.getElementById('toggleModeIcon');
const allModals = document.querySelectorAll('article');
const cartButton = document.getElementById("cartButton");

const darkMode = () => {  
    //  Changing the icon 
    toggleModeIcon.classList.toggle('fa-sun');
    toggleModeIcon.classList.toggle('fa-moon');
    
    //  Changing the styles   
    mainPage.classList.toggle('light-mode');
    mainPage.classList.toggle('dark-mode');
    closeButton.classList.toggle('dark-mode-button');
    backButton.classList.toggle('dark-mode-button');
    modalHeader.classList.toggle('modal-header-light');
    modalHeader.classList.toggle('modal-header-dark');

    allModals.forEach(function(modal){
        modal.classList.toggle('light-modal');
        modal.classList.toggle('dark-modal');
    });
};


toggleModeIcon.addEventListener('click', function(){
    darkMode();
});


// ----------------------- MODALS -----------------------

const modal = document.getElementById("mainModal");
const modalHeader = document.getElementById("modalHeader");
const backButton = document.getElementById('backButton');
const closeButton = document.getElementById("closeButton");
const cartModal = document.getElementById("cartModal");
const paymentModal = document.getElementById("paymentModal");
const paymentButton = document.getElementById("paymentButton");
const thankYouModal = document.getElementById("thankYouModal");
const finishButton = document.getElementById("finishButton");

// Function for hidding the modal to give it a delay after and see the animation
const closeModalAnimations = () => {
    modal.classList.toggle('overlay');
    modal.classList.add('animate__fadeOut');
    modal.classList.remove('animate__fadeIn');
    modalHeader.classList.remove('animate__slideInRight');
    modalHeader.classList.add('animate__slideOutRight');
    cartModal.classList.remove('animate__slideInRight');
    cartModal.classList.add('animate__slideOutRight');
    paymentModal.classList.add('animate__slideOutRight');
    thankYouModal.classList.add('animate__slideOutRight');
};

const openModalAnimations = () => {
    modal.classList.toggle('overlay');
    modal.classList.add('animate__fadeIn');
    modal.classList.remove('animate__fadeOut');
    modalHeader.classList.add('animate__slideInRight');
    modalHeader.classList.remove('animate__slideOutRight');
    cartModal.classList.add('animate__slideInRight');
    cartModal.classList.remove('animate__slideOutRight');
    paymentModal.classList.remove('animate__slideOutRight');
    thankYouModal.classList.remove('animate__slideOutRight');
};

// Close the modal function
const modalDisplayNone = () => {
    modal.style.display = "none";
    cartModal.style.display = "none";
    paymentModal.style.display = "none";
    thankYouModal.style.display = "none";
};

// Open the modal on "Order Now" Button
orderNowBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        openModalAnimations();
        modal.style.display = "block";
        cartModal.style.display = "block";
        hideShowBackButton();
        enableDisablePaymentButton();
    });
});

//Open the modal on "Cart" Button
cartButton.addEventListener('click', function () {
    openModalAnimations();
    modal.style.display = "block";
    cartModal.style.display = "block";
    hideShowBackButton();
    enableDisablePaymentButton();
});

// Close any modal with X
closeButton.addEventListener('click', function() {
    const thankYouModalVisible = (thankYouModal.style.display === "block");

    if (thankYouModalVisible) {
        closeModalAnimations();
        setTimeout(modalDisplayNone, 400);
        clearInputs();
        clearAllItemsNumberAndPrice();
        setTimeout(randomYear, 400);
        orderNowBtn.forEach(function(btn) {
            btn.innerText = "Order more";
        });
    } else {
        closeModalAnimations();
        setTimeout(modalDisplayNone, 400);
    };
});

// Close any modal anywhere
document.addEventListener('click', function(event) {
    if (event.target == modal & thankYouModal.style.display === "block") {
        closeModalAnimations();
        setTimeout(modalDisplayNone, 400);
        clearInputs();
        clearAllItemsNumberAndPrice();
        randomYear();
    } else if (event.target == modal) {
        closeModalAnimations();
        setTimeout(modalDisplayNone, 400);
    };
});

//Changing to payment modal (Enable/Disable Button)
const enableDisablePaymentButton = () => {
    const isItemsOnCartButtonZero = (Number(itemsNumberOnCartButton.innerText) <= 0);

    if (isItemsOnCartButtonZero) {
        paymentButton.classList.add('disabled');
        paymentButton.classList.remove('primary-button');

        paymentButton.removeEventListener('click', openPaymentModal, true);

    } else {
        paymentButton.classList.remove('disabled');
        paymentButton.classList.add('primary-button');

        paymentButton.addEventListener('click', openPaymentModal, true);
    };
};

const openPaymentModal = () => {
    paymentModal.style.display = "block";
    cartModal.style.display = "none";
    thankYouModal.style.display = "none";
    yesDiscount.checked = false;
    noDiscount.checked = false; 
    radioInputsFilled = false;
    totalPriceOnPayment.innerText = totalPriceOnCart.innerText;
    checkInputsFilled();
    checkIfBtnDisabled();
    hideShowBackButton();
};

//Changing to last modal
finishButton.addEventListener('click', function () {
    //Hiding and Showing modals
    paymentModal.style.display = "none";
    cartModal.style.display = "none";
    finishButton.disabled = true;
    thankYouModal.style.display = "block";

    hideItemsAndPriceOnPayment();
    hideShowBackButton();

    //Saving the inputs
    const firstName = capitalizeWord(fName.value);
    const lastName = capitalizeWord(lName.value);
    usersName.innerText = `${firstName} ${lastName}`;
    const addressValue = address.value;
    usersAddress.innerText = capitalizeWord(addressValue);

    textInputsFilled = false;
    radioInputsFilled = false;
});

//Retuning to the cart modal
backButton.addEventListener('click', function () {
    paymentModal.style.display = "none";
    cartModal.style.display = "block";
    thankYouModal.style.display = "none";
    cartModal.classList.remove('animate__slideInRight');
    yesDiscount.checked = false;
    noDiscount.checked = false; 
    checkInputsFilled();
    hideShowBackButton();
});

const hideShowBackButton = () => {
    const PaymentModalVisible = (paymentModal.style.display === "block");

    if (PaymentModalVisible) {
        backButton.style.visibility = "visible";
    } else {
        backButton.style.visibility = "hidden";
    };
};

//Closing the thank you modal on the last button
closeButton2.addEventListener('click', function () {
    closeModalAnimations();
    setTimeout(modalDisplayNone, 400);

    //Changing the text of the initial button
    orderNowBtn.forEach(function(btn) {
        btn.innerText = "Order more";
    });

    clearInputs();
    clearAllItemsNumberAndPrice();
    setTimeout(randomYear, 600);
});


// -------- ITEMS AND PRICE LOGIC -------
const totalPriceOnCart = document.getElementById('totalPriceOnCart');
const minusButton = document.querySelectorAll(".minusButton");
const itemNumberOnCounter = document.querySelectorAll(".itemNumberOnCounter");
const plusButton = document.querySelectorAll(".plusButton");

const itemsAndPrice = document.querySelectorAll('.items-and-price');
const itemNumberOnPayment = document.querySelectorAll(".itemNumberOnPayment");
const itemPriceOnPayment = document.querySelectorAll('.itemPriceOnPayment');
const totalPriceOnPayment = document.getElementById('totalPriceOnPayment');

let price = 0;

itemNumberOnCounter.innerText = 0;

for (let i = 0; i < minusButton.length; i++) {
    minusButton[i].addEventListener('click', function () {

        //Assigning the price for each i
        if (i === 0) {
            price = 89;
        } else  if (i === 1) {
            price = 73;
        } else if (i === 2) {
            price = 99;
        };

        const CounterNumber1 = (Number(itemNumberOnCounter[i].value) >= 1);

        if (CounterNumber1){
            //Changing the number inside the box
            itemNumberOnCounter[i].stepDown();
            itemNumberOnCounter[i].setAttribute("value", Number(itemNumberOnCounter[i].value));

            //Changing the number on the cart button
            itemsNumberOnCartButton.innerText = Number(itemsNumberOnCartButton.innerText) - 1;

            //Changing the price on the current modal
            totalPriceOnCart.innerText = Number(totalPriceOnCart.innerText) - price;
            totalPriceOnPayment.innerText = totalPriceOnCart.innerText;

            //Changing the number and price on the next modal
            itemNumberOnPayment[i].innerText = Number(itemNumberOnCounter[i].value);
            itemPriceOnPayment[i].innerText = Number(itemPriceOnPayment[i].innerText) - price;

            //Showing/Hidding the items on the next modal
            if (Number(itemNumberOnCounter[i].value) === 0) {
                itemsAndPrice[i].style.display = "none";
            } else {
                itemsAndPrice[i].style.display = "";
            };

        enableDisablePaymentButton();

    };
  });
};


for (let i = 0; i < plusButton.length; i++) {
    plusButton[i].addEventListener('click', function () {

        //Assigning the price for each i
        if (i === 0) {
            price = 89;
        } else  if (i === 1) {
            price = 73;
        } else if (i === 2) {
            price = 99;
        }

        const CounterNumber1 = (Number(itemNumberOnCounter[i].value) >= 0);
        
        if (CounterNumber1) {
            //Changing the number inside the box
            itemNumberOnCounter[i].stepUp();
            itemNumberOnCounter[i].setAttribute("value", Number(itemNumberOnCounter[i].value));

            //Changing the number on the cart button
            itemsNumberOnCartButton.innerText = Number(itemsNumberOnCartButton.innerText) + 1;

            //Changing the price on the current modal
            totalPriceOnCart.innerText = Number(totalPriceOnCart.innerText) + price;
            totalPriceOnPayment.innerText = totalPriceOnCart.innerText;

            //Changing the number and price on the next modal
            itemNumberOnPayment[i].innerText = Number(itemNumberOnCounter[i].value);
            itemPriceOnPayment[i].innerText = Number(itemPriceOnPayment[i].innerText) + price;

            //Showing/Hidding the items on the payment modal
            if (Number(itemNumberOnCounter[i].value) === 0) {
                itemsAndPrice[i].style.display = "none";
            } else {
                itemsAndPrice[i].style.display = "";
            };
        };

        enableDisablePaymentButton();

    });
};

const hideItemsAndPriceOnPayment = () => {
    itemsAndPrice[0].style.display = "none";
    itemsAndPrice[1].style.display = "none";
    itemsAndPrice[2].style.display = "none";
};

const clearAllItemsNumberAndPrice = () => {
    totalPriceOnCart.innerText = 0;
    totalPriceOnPayment.innerText = 0;
    itemsNumberOnCartButton.innerText = 0;

    itemNumberOnCounter.forEach(function(item) {
        item.value = 0;
    });
    itemNumberOnPayment.forEach(function(item) {
        item.innerText = 0;
    });
    itemPriceOnPayment.forEach(function(item) {
        item.innerText = 0;
    });
};

//Calling the funstion - to make sure it's all 0 when reloading the page
clearAllItemsNumberAndPrice();

//-------- FORM LOGIC ---------

const form = document.getElementById("form");
const fName = document.getElementById("fname");
const lName = document.getElementById("lname");
const usersName = document.getElementById("usersName");
const address = document.getElementById("address");
const usersAddress = document.getElementById("usersAddress");
const yesDiscount = document.getElementById('yesDiscount');
const noDiscount = document.getElementById('noDiscount');
const yesLabel = document.getElementById('yesLabel');
const noLabel = document.getElementById('noLabel');

//Preventing page refresh when submitting the form
const preventRefreshWhenSubmit = (event) => {
    event.preventDefault();
};

// Making the submit button disabled
const checkIfBtnDisabled = () => {
    if (finishButton.hasAttribute('disabled')) {
        finishButton.classList.add('disabled');
        finishButton.classList.remove('primary-button');
    } else {
        finishButton.classList.remove('disabled');
        finishButton.classList.add('primary-button');
    };
};

let textInputsFilled = false;
let radioInputsFilled = false;

const checkInputsFilled = () => {
    if (textInputsFilled === true & radioInputsFilled === true) {
        finishButton.disabled = false;
        checkIfBtnDisabled();
    } else {
        finishButton.disabled = true;
        checkIfBtnDisabled();
    };
};

form.addEventListener("keyup", function () {
        if (fName.value.length > 0 & lName.value.length > 0 & address.value.length > 0){
            textInputsFilled = true;
            checkInputsFilled();
            // console.log("textInputsFilled = true");
        } 
        else if (fName.value.length <= 0 || lName.value.length <= 0 || address.value.length <= 0){
            textInputsFilled = false;
            checkInputsFilled();
            // console.log("textInputsFilled = false");
        };
});

form.querySelectorAll('input[type="radio"]').forEach( function (field){
    field.addEventListener ("click", function () {
        checkInputsFilled();
        if (field.checked){
            radioInputsFilled = true;
            yesDiscount.value = yesLabel.innerHTML;
            noDiscount.value = noLabel.innerHTML;
            // console.log("radioInputFilled = true");
            checkInputsFilled();
        }
    })
});

//Submitting the form 
form.addEventListener('submit', preventRefreshWhenSubmit);

//Cleaning the form after ordering
const clearInputs = () => {
    form.reset();
};

//Calling the function to clear the inputs when reloading
clearInputs();

//Capitalizing first letter and putting the rest of the word in lowercase
const capitalizeWord = (word) => {
    const firstLetter = word[0].toUpperCase();
    const restOfTheWord = word.substring(1).toLowerCase();
    return `${firstLetter}${restOfTheWord}`;
};

//Logic for giving a discount
yesDiscount.addEventListener('click', function() {
    totalPriceOnPayment.innerText = 0;
});

noDiscount.addEventListener('click', function () {
    totalPriceOnPayment.innerText = totalPriceOnCart.innerText;
});

//Giving random years for the delivery
const randomYears = document.getElementById('randomYears');
const maxYears = 99;

const randomYear = () => {
    let randomYear = Math.floor(Math.random() * maxYears);

    if (randomYear === 1) {
        randomYears.innerText = '1 year';
    } else if (randomYear > 1) {
        randomYears.innerText = `${randomYear} ${"years"}`;
    } else {
        randomYears.innerText = '45 year';
    };
};

// ------------- CAROUSEL ---------------

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelectorAll(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const slide1 = document.getElementById("slide1");
const slide2 = document.getElementById("slide2");
const slide3 = document.getElementById("slide3");

slide1.style.display = "block";

const showSlide1 = () => {
    slide1.style.display = "block";
    slide2.style.display = "none";
    slide3.style.display = "none";
};

const showSlide2 = () => {
    slide1.style.display = "none";
    slide2.style.display = "block";
    slide3.style.display = "none";
};

const showSlide3 = () => {
    slide1.style.display = "none";
    slide2.style.display = "none";
    slide3.style.display = "block";
};

//Function with the animations to make the slides move
const nextSlide = () => {
    if (slide1.style.display === "block"){
        slide2.classList.add('animate__slideInRight');
        slide2.classList.remove('animate__slideInLeft');
        showSlide2();
    } else if (slide2.style.display === "block"){
        slide3.classList.add('animate__slideInRight');
        slide3.classList.remove('animate__slideInLeft');
        showSlide3();
    } else if (slide3.style.display === "block"){
        slide1.classList.add('animate__slideInRight');
        slide1.classList.remove('animate__slideInLeft');
        showSlide1();
    };
    // else {
    //     console.log("another scenario");
    // }
};

const prevSlide = () => {
    if (slide1.style.display === "block"){
        slide3.classList.remove('animate__slideInRight');
        slide3.classList.add('animate__slideInLeft');
        showSlide3();
    } else if (slide2.style.display === "block"){
        slide1.classList.remove('animate__slideInRight');
        slide1.classList.add('animate__slideInLeft');
        showSlide1();
    } else if (slide3.style.display === "block"){
        slide2.classList.remove('animate__slideInRight');
        slide2.classList.add('animate__slideInLeft');
        showSlide2();
    };
    //  else {
    //     console.log("another scenario");
    // }
};

nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", prevSlide);

//Moving the slides automatically
if (modal.style.display === "none") {
    setInterval(function() {
        nextSlide()
      }, 7500);
};

// ------------- RESPONSIVE ---------------

//Changing cart button into icon
screen.width = document.getElementById("mainPage").innerHTML;

if (screen.width < 470) {
    cartButton.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> (<span id="itemsNumberOnCartButton">0</span>)';
};










// ***************************************************************************************

// QUICK THANK YOU NOTE TO THE TEAM

// I am incredibly grateful for the opportunity to be a part of Step By Tech By Le Wagon Lisbon and stand on this stage. 
// It has been an unforgettable experience that has transformed me both personally and professionally. 
// The growth and improvement I've witnessed in myself are beyond what I imagined.

// I want to express my deepest appreciation to the amazing team. Their support, talent, 
// and camaraderie have made this journey truly exceptional. Being in this program with them has been a privilege, 
// and I am inspired by their dedication and passion.

// As I look ahead, I am filled with excitement and hope for the next stage. Regardless of the outcome, 
// I will forever cherish this experience. I want to thank the program organizers and everyone involved for 
// believing in me and providing this platform for growth for everyone involved. It has been an honor, and I am grateful for the 
// skills, connections, and memories gained along the way.

//I hope you liked my project and that you have money to buy my cakes! (:

//All the best,
//Flávio
