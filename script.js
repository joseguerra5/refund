let btn = document.getElementById("btn")

let form = document.querySelector("form")
let refundType = document.getElementById("refund-type")
let amount = document.getElementById("amount")
let refundTitle = document.getElementById("refundTitle")
let despesas = document.getElementById("despesas")
let totalAmount = document.getElementById("total-amount")

let unoderList = document.getElementById("unoder-list")

//captura o evento de input para formatar o valor
amount.addEventListener("input", () => {
  let value = amount.value.replace(/\D+/g, "")
  //precisa transformar o valor em centavos para a formula funcionar
  value = Number(value) / 100
  //atualiza o valor do input
  amount.value = formatCurrencyEUR(value)
})

function formatCurrencyEUR (value) {
  //formata o valor em padrão Europeu
  value = value.toLocaleString("pt", {
    style: "currency",
    currency: "EUR",
  })
  return value
}

//capturar evento do form

form.onsubmit = (event) => {
  //remove ação do button
  event.preventDefault()


  //criar um objeto com as informações necessárias
  let newTitle = {
    //criando id único
    id: new Date().getTime(),
    title: refundTitle.value,
    type_id: refundType.value,
    type_name: refundType.options[refundType.selectedIndex].text,
    amount: amount.value,
    //pegando o horário que fez a adição
    created_at: new Date(),
  }




  switch (newTitle.type_id) {
    case "food":
      inputData(newTitle.amount, newTitle.type_id, newTitle.type_name)
      break;

    case "hostel":
      inputData(newTitle.amount, newTitle.type_id, newTitle.type_name)
      break;

    case "transport":
      inputData(newTitle.amount, newTitle.type_id, newTitle.type_name)
      break;

    case "service":
      inputData(newTitle.amount, newTitle.type_id, newTitle.type_name)
      break;

    case "other":
      inputData(newTitle.amount, newTitle.type_id, newTitle.type_name)
      break;

    default:
      break;
  }
}

//função para pegar as informações do form e adicionar o item na lista

function inputData(amount_value, refund_type, refund_title) {
  try {
    let listItemHTML = `<li class="li-add">
          <div class="refund-title">
            <img src="assets/${refund_type}.svg" alt="" id="description-image">
            <div class="text-refund">
              <h3 id="description-title">${refund_title}</h3>
              <span id="description-type">${refund_type}</span>
            </div>
          </div>
          <div class="amount-div">
            <span id="description-amount">${amount_value}</span>
            <img class="remove-icon" src="assets/X-Bold.svg" alt="">
          </div>
        </li>`

    unoderList.insertAdjacentHTML("beforeend", listItemHTML)

    updateTotals()
    formClear()
  } catch (error) {
    console.log(error)
  }

}

//função para atualizar os totais

function updateTotals() {
  try {
    //recuperar os itens(li) da lista
    let items = unoderList.children
    //atualiza a quantidade de itens da lista
    despesas.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
    //variável para incrementar o total
    let total = 0

    //percorre cada item da li da lista ul
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector("#description-amount")
      //pega tudo que é caracter de texto, excepto ponto e viígula
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

      //converte o valor para flot
      value = parseFloat(value)
      //verifica se é um número válido
      if(isNaN(value)){
        return alert("Não foi possível calcular o total. o valor não parece ser um número")
      }
      //incrementar o valor total
      total += Number(value)
    }
    totalAmount.textContent = formatCurrencyEUR(total)
  } catch (error) {
    console.log(error)
  }

  //evento que captura o clique nos itens da lista
  unoderList.addEventListener("click", function (event){
    //verifica se o elemento clicado é a imagem de remover
    if (event.target.classList.contains("remove-icon")) {
      //obtem a li pai do elemento clicado
      const item = event.target.closest(".li-add")
      item.remove()

    }
    updateTotals()
  })

}

function formClear() {
  amount.value = ""
  refundTitle.value = ""
  refundType.value = ""

  refundTitle.focus()
}
