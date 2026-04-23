import * as readline from "node:readline";
import { Bank } from "./classes/Bank.js";

const bank = new Bank();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log("\n=== BANK SYSTEM ===");
  console.log("1. Open Account");
  console.log("2. Deposit");
  console.log("3. Withdraw");
  console.log("4. Transfer");
  console.log("5. List Accounts");
  console.log("6. Exit");

  rl.question("Choose option: ", handleMenu);
}

function handleMenu(choice: string) {
  switch (choice) {
    case "1":
      openAccount();
      break;
    case "2":
      deposit();
      break;
    case "3":
      withdraw();
      break;
    case "4":
      transfer();
      break;
    case "5":
      listAccounts();
      break;
    case "6":
      rl.close();
      return;
    default:
      console.log("Invalid option");
      menu();
  }
}

function openAccount() {
  rl.question("Owner: ", (owner) => {
    rl.question("Daily withdrawal limit: ", (limit) => {

      console.log("\nChoose account type:");
      console.log("1. Checking Account");
      console.log("2. Savings Account");

      rl.question("Option: ", (typeChoice) => {

        let type: "CheckingAccount" | "SavingsAccount";

        if (typeChoice === "1") {
          type = "CheckingAccount";

          rl.question("Overdraft limit: ", (overdraft) => {
            const account = bank.openAccount(
              owner,
              Number(limit),
              type,
              Number(overdraft)
            );

            console.log("Account created:", account);
            menu();
          });

        } else if (typeChoice === "2") {
          type = "SavingsAccount";

          rl.question("Interest rate: ", (rate) => {
            rl.question("Maximum balance: ", (max) => {

              const account = bank.openAccount(
                owner,
                Number(limit),
                type,
                Number(rate),
                Number(max)
              );

              console.log("Account created:", account);
              menu();
            });
          });

        } else {
          console.log("Invalid option");
          menu();
        }

      });

    });
  });
}

function deposit() {
  rl.question("Account ID: ", (id) => {
    rl.question("Amount: ", (amount) => {

      const acc = bank.findAccount(Number(id));
      acc.deposit(Number(amount));

      console.log("Deposited. Balance:", acc.getBalance());
      menu();
    });
  });
}

function withdraw() {
  rl.question("Account ID: ", (id) => {
    rl.question("Amount: ", (amount) => {

      const acc = bank.findAccount(Number(id));
      acc.withdraw(Number(amount));

      console.log("Withdraw successful. Balance:", acc.getBalance());
      menu();
    });
  });
}

function transfer() {
  rl.question("From ID: ", (from) => {
    rl.question("To ID: ", (to) => {
      rl.question("Amount: ", (amount) => {

        const fromAcc = bank.findAccount(Number(from));
        const toAcc = bank.findAccount(Number(to));

        fromAcc.transferTo(toAcc, Number(amount));

        console.log("Transfer complete");
        menu();
      });
    });
  });
}

function listAccounts() {
  bank.listAccounts();
  menu();
}

menu();