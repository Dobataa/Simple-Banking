const output = document.getElementById("output");

function log(msg) {
  const div = document.createElement("div");

  div.textContent = msg;

  div.style.margin = "6px 0";

  output.appendChild(div);
}

function createAccount() {
  const owner = document.getElementById("owner").value;
  const limit = Number(document.getElementById("dailyLimit").value);
  const type = document.getElementById("type").value;

  const extra1 = Number(document.getElementById("extra1").value);
  const extra2 = Number(document.getElementById("extra2").value);

  try {
    const account = window.bank.openAccount(
      owner,
      limit,
      type,
      extra1,
      extra2
    );

    log("Account created successfully");
    log("Owner: " + owner);
  } catch (e) {
    log("Error: " + e.message);
  }
}

function deposit() {
  const id = Number(document.getElementById("accId").value);
  const amount = Number(document.getElementById("amount").value);

  try {
    const acc = window.bank.findAccount(id);
    acc.deposit(amount);

    log("Deposit successful");
    log("New balance: " + acc.getBalance());
  } catch (e) {
    log("Error: " + e.message);
  }
}

function withdraw() {
  const id = Number(document.getElementById("accId").value);
  const amount = Number(document.getElementById("amount").value);

  try {
    const acc = window.bank.findAccount(id);
    acc.withdraw(amount);

    log("Withdraw successful");
    log("New balance: " + acc.getBalance());
  } catch (e) {
    log("Error: " + e.message);
  }
}

function transfer() {
  const fromId = Number(document.getElementById("fromId").value);
  const toId = Number(document.getElementById("toId").value);
  const amount = Number(document.getElementById("transferAmount").value);

  try {
    const fromAcc = window.bank.findAccount(fromId);
    const toAcc = window.bank.findAccount(toId);

    fromAcc.transferTo(toAcc, amount);

    log("Transfer successful");
    log("From account new balance: " + fromAcc.getBalance());
  } catch (e) {
    log("Error: " + e.message);
  }
}

function applyInterest() {
  const id = Number(document.getElementById("interestId").value);
  const mode = document.getElementById("mode").value;

  try {
    const acc = window.bank.findAccount(id);

    acc.applyInterest(mode);

    log("Interest applied successfully");
    log("New balance: " + acc.getBalance());
  } catch (e) {
    log("Error: " + e.message);
  }
}

function findAccount() {
  const id = Number(document.getElementById("manageId").value);

  try {
    const acc = window.bank.findAccount(id);

    log("Account found:");
    log("Owner: " + acc.owner);
    log("Balance: " + acc.getBalance());
  } catch (e) {
    log("Error: " + e.message);
  }
}

function closeAccount() {
  const id = Number(document.getElementById("manageId").value);

  try {
    window.bank.closeAccount(id);
    log("Account closed: " + id);
  } catch (e) {
    log("Error: " + e.message);
  }
}

function listAccounts() {
  try {
    const accounts = window.bank.accounts;

    log("All Accounts:");

    for (const id in accounts) {
      const acc = accounts[id];

      log(
        "ID: " + id +
        " | Owner: " + acc.owner +
        " | Balance: " + acc.getBalance()
      );
    }
  } catch (e) {
    log("Error: " + e.message);
  }
}