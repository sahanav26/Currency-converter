const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropdownOptions = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(" .from select");
const toCurr= document.querySelector(".to select");
const msg = document.querySelector(".msg");

 //populating the dropdown with all the countries
for(let select of dropdownOptions){
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value = currCode;
        if ( select.name === "from" && currCode=== "USD"){
            newOption.selected = "selected";
        }
        else if ( select.name === "to" && currCode=== "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

//updating  the country flag wrt the country selected

select.addEventListener("change",(e) =>{
    updateFlag(e.target);
});
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  //getting exhange rate
  const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;

msg.classList.remove("zoom-text");
void msg.offsetWidth;
msg.classList.add("zoom-text");
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    };

const updateFlag = (element) => {
     let currCode = element.value;
    let countryCode = countryList[currCode]; // IN US
    let newSrcLink = `https://flagsapi.com/${countryCode}/flat/64.png` ;
    let newimg = element.parentElement.querySelector("img");
    newimg.src = newSrcLink;


};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

document.querySelectorAll(".emoji-background span").forEach((emoji) => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const rotate = Math.random() * 360;

  emoji.style.top = `${top}vh`;
  emoji.style.left = `${left}vw`;
  emoji.style.transform = `rotate(${rotate}deg)`;
});



//emojis in the background
const emojiList = ['💵', '💰', '💲', '🪙', '💷', '💴', '💳', '💸', '🪙'];
const container = document.getElementById("emojiBackground");

for (let i = 0; i < 40; i++) {
  const emoji = document.createElement("span");
  emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];

  const top = Math.random() * 100;
  const left = Math.random() * 100;

  // Avoiding the center area (35%–65%) vertically and horizontally
  if (top > 35 && top < 65 && left > 35 && left < 65) {
    i--; // Retry this iteration
    continue;
  }

  const rotation = Math.floor(Math.random() * 360);

  emoji.style.top = `${top}%`;
  emoji.style.left = `${left}%`;
  emoji.style.setProperty('--angle', `${rotation}deg`);
  
  container.appendChild(emoji);
}

