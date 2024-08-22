let btn = document.getElementById("btn")

let form = document.querySelector("form")
let refundType = document.getElementById("refundType")
let amount = document.getElementById("amount")
let refundTitle = document.getElementById("refund-title")

let unoderList = document.getElementById("unoder-list")
//Criei variável com o padrão regex para capturar o value do form e remover tudo que não seja número

console.log(refundType)
console.log(amount)
console.log(refundTitle)
amount.addEventListener("input", () => {
  let hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

//capturar evento do form

form.onsubmit = (event) => {
  //remove ação do button
  event.preventDefault()

  console.log(refundType.value)
  console.log(amount.value)
  console.log(refundTitle.value)
  switch (refundType.value) {
    case "food":
      inputData(amount.value, refundType.value, refundTitle.value)
      break;

    case "hostel":
      inputData(amount.value, refundType.value, refundTitle.value)
      break;

    case "transport":
      inputData(amount.value, refundType.value, refundTitle.value)
      break;

    case "service":
      inputData(amount.value, refundType.value, refundTitle.value)
      break;

    case "other":
      inputData(amount.value, refundType.value, refundTitle.value)
      break;

    default:
      break;
  }
}

//função para pegar as informações do form 

function inputData(amount_value, refund_type, refund_title) {
  try {
    let listItemHTML = `<li>
          <div class="refund-title">
            <img src="assets/${refund_type}.svg" alt="" id="description-image">
            <div class="text-refund">
              <h3 id="description-title">${refund_title}</h3>
              <span id="description-type">${refund_type}</span>
            </div>
          </div>
          <div class="amount-div">
            <span> <span class="symbol" id="description-symbol">R$</span id="description-amount">${amount_value}</span>
            <img src="assets/X-Bold.svg" alt="">
          </div>
        </li>`

    unoderList.insertAdjacentElement("beforeend", listItemHTML)

  } catch (error) {

  }

}