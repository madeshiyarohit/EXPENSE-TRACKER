let transactionAray = JSON.parse(localStorage.getItem("transactionList")) || [];
// document.querySelector("#availBalance").innerText =
//   localStorage.getItem("available-balnce") || 0;
let incomeValue = document.querySelector("#incomeValue");
let expenseValue = document.querySelector("#expenseValue");
let incomeCalculator = 0;
let expenseCalculator = 0;

function incomeValueHandler() {
  let incomeCalculator = 0;
  let expenseCalculator = 0;
  transactionAray.forEach((item) => {
    if (item.type == "credit") {
      incomeCalculator += item.amount;
    } else {
      expenseCalculator += item.amount;
    }
  });
  incomeValue.innerText = incomeCalculator;
  expenseValue.innerHTML = expenseCalculator;
  localStorage.setItem(
    "available-balnce",
    incomeCalculator - expenseCalculator
  );
  document.querySelector("#availBalance").innerText =
    "₹" + localStorage.getItem("available-balnce") || "₹" + 0;
}

function moneyHandler() {
  let title = document.querySelector("#title");
  let credit = document.querySelector("#credit");
  let debit = document.querySelector("#debit");
  let money = parseInt(document.querySelector("#money").value);
  if (!isNaN(money)) {
    if (credit.checked) {
      transactionAray.push({
        amount: money,
        type: "credit",
        title: title.value,
      });
    } else {
      transactionAray.push({
        amount: money,
        type: "debit",
        title: title.value,
      });
    }
  } else {
    alert("ENTER VALID VALUES !!!");
  }
  title.value = "";
  credit.checked = false;
  debit.checked = false;
  document.querySelector("#money").value = "";
  renderTransaction();
}
let box = document.getElementById("transactioBox");

function renderTransaction() {
  box.innerHTML = "";
  transactionAray.forEach((item, index) => {
    let div = document.createElement("div");
    div.setAttribute("id", index);
    item.type == "credit"
      ? (div.className = "moneyCredit")
      : (div.className = "moneyDeduct");
    div.innerHTML = `
                  <p>${item.title}</p>
                  <span>${
                    item.type == "credit"
                      ? "+" + item.amount
                      : "-" + item.amount
                  } </span>
                `;
    box.append(div);
  });
  incomeValueHandler();
  localStorage.setItem("transactionList", JSON.stringify(transactionAray));
}

renderTransaction();
