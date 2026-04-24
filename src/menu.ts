import * as readline from "node:readline";
import { Bank, type AccountType } from "./classes/Bank.js";
import { SavingsAccount, type CompoundingMode } from "./classes/SavingsAccount.js";

const bank = new Bank();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log("\n=== BANK SYSTEM ===");
  console.log("1. Open Account");
  console.log("2. Close Account");
  console.log("3. Find Account");
  console.log("4. List Accounts");
  console.log("5. Deposit");
  console.log("6. Withdraw");
  console.log("7. Transfer");
  console.log("8. Apply Interest(Savings Account only)");
  console.log("9. Exit");

  rl.question("Choose option: ", handleMenu);
}

function handleMenu(choice: string) {
  switch (choice) {
    case "1":
      openAccount();
      break;
    case "2":
      closeAccount();
      break;
    case "3":
      findAccount();
      break;
    case "4":
      listAccounts();
      break;
    case "5":
      deposit();
      break;
    case "6":
      withdraw();
      break;
    case "7":
      transfer();
      break;
    case "8":
      applyInterest();
      break;
    case "9":
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
        let type: AccountType;

        if (typeChoice === "1") {
          type = "CheckingAccount";

          rl.question("Overdraft limit: ", (overdraft) => {
            try {
              const account = bank.openAccount(
                owner,
                Number(limit),
                type,
                Number(overdraft),
              );

              console.log("Account created:", account);
            } catch (error: any) {
              console.log("Error:", error.message);
            }

            menu();
          });
        } else if (typeChoice === "2") {
          type = "SavingsAccount";

          rl.question("Interest rate: ", (rate) => {
            rl.question("Maximum balance: ", (max) => {
              try {
                const account = bank.openAccount(
                  owner,
                  Number(limit),
                  type,
                  Number(rate),
                  Number(max),
                );

                console.log("\nAccount created:", account);
              } catch (error: any) {
                console.log("Error:", error.message);
              }

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

function closeAccount() {
  rl.question("Account Id: ", (accountId) => {
    try {
      bank.closeAccount(Number(accountId));

      console.log(`Account with Id - ${accountId} was removed`);
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  });
}

function findAccount() {
  rl.question("Account Id: ", (accountId) => {
    try {
      let account = bank.findAccount(Number(accountId));

      console.log(account);
    } catch (error: any) {
      console.log("Error:", error.message);
    }

    menu();
  });
}

function deposit() {
  rl.question("Account ID: ", (id) => {
    rl.question("Amount: ", (amount) => {
      try {
        const acc = bank.findAccount(Number(id));
        acc.deposit(Number(amount));

        console.log("Deposited. Balance:", acc.getBalance());
      } catch (error: any) {
        console.log("Error:", error.message);
      }

      menu();
    });
  });
}

function withdraw() {
  rl.question("Account ID: ", (id) => {
    rl.question("Amount: ", (amount) => {
      try {
        const acc = bank.findAccount(Number(id));
        acc.withdraw(Number(amount));

        console.log("Withdraw successful. Balance:", acc.getBalance());
      } catch (error: any) {
        console.log("Error:", error.message);
      }

      menu();
    });
  });
}

function transfer() {
  rl.question("From ID: ", (from) => {
    rl.question("To ID: ", (to) => {
      rl.question("Amount: ", (amount) => {
        try {
          const fromAcc = bank.findAccount(Number(from));
          const toAcc = bank.findAccount(Number(to));

          fromAcc.transferTo(toAcc, Number(amount));

          console.log("Transfer complete");
        } catch (error: any) {
          console.log("Error:", error.message);
        }

        menu();
      });
    });
  });
}

function applyInterest() {
  rl.question("Account Id: ", (accountId) => {
    console.log("\nChoose compounding Mode:");
    console.log("1. Monthly");
    console.log("2. Yearly");

    rl.question("Compounding mode: ", (mode) => {
      try {
        const account = bank.findAccount(Number(accountId));

        if (!(account instanceof SavingsAccount)) {
          console.log("This account does not support interest");
          return menu();
        }

        let type: CompoundingMode;

        if (mode === "1") {
          type = "monthly";
          account.applyInterest(type);
          console.log("Monthly interest applied");

        } else if (mode === "2") {
          type = "yearly";
          account.applyInterest(type);
          console.log("Yearly interest applied");
          
        } else {
          console.log("Invalid option");
        }
      } catch (error: any) {
        console.log("Error:", error.message);
      }

      menu();
    });
  });
}

function listAccounts() {
  bank.listAccounts();
  menu();
}

menu();
