import { CheckingAccount } from "./CheckingAccount.js";
import { SavingsAccount } from "./SavingsAccount.js";
export class Bank {
    constructor() {
        this.accounts = {};
        this.nextAccountNumber = 1;
    }
    openAccount(owner, dailyWithdrawalLimit, type, ...rest) {
        let newAccount;
        if (type === "CheckingAccount") {
            let overdraftLimit = rest[0];
            newAccount = new CheckingAccount(owner, dailyWithdrawalLimit, overdraftLimit);
        }
        else if (type === "SavingsAccount") {
            let interestRate = rest[0];
            let maximumBalance = rest[1];
            newAccount = new SavingsAccount(owner, dailyWithdrawalLimit, interestRate, maximumBalance);
        }
        else {
            throw new Error("Wrong accoung type");
        }
        this.accounts[this.nextAccountNumber] = newAccount;
        this.nextAccountNumber++;
        return newAccount;
    }
    closeAccount(accountNumber) {
        if (!this.accounts[accountNumber]) {
            throw new Error("There is not an account with this number");
        }
        delete this.accounts[accountNumber];
    }
    findAccount(accountNumber) {
        if (!this.accounts[accountNumber]) {
            throw new Error("There is not an account with this number");
        }
        return this.accounts[accountNumber];
    }
    listAccounts() {
        for (let key in this.accounts) {
            console.log(`${key} - ${this.accounts[key]}`);
        }
    }
}
//# sourceMappingURL=Bank.js.map