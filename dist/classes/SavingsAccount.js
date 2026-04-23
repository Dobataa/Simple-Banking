import { BankAccount } from "./BankAccount.js";
import { Transaction } from "./Transaction.js";
export class SavingsAccount extends BankAccount {
    constructor(owner, dailyWithdrawalLimit, interestRate, maximumBalance) {
        super(owner, dailyWithdrawalLimit);
        this.interestRate = interestRate;
        this.maximumBalance = maximumBalance;
    }
    applyInterest(mode) {
        let balance = this.getBalance();
        let periods = mode === "monthly" ? 12 : 1;
        let rate = (this.interestRate / 100) / periods;
        balance += rate * balance;
        if (balance > this.maximumBalance) {
            throw new Error("This operation will exceed the maximum balance");
        }
        this.setBalance(balance);
        let transaction = new Transaction("interest", balance, this.getBalance());
        this.transactionHistory.push(transaction);
    }
    deposit(amount) {
        if (amount < 0) {
            throw new Error("Cannot deposit negative amount");
        }
        let balance = this.getBalance();
        balance += amount;
        if (balance > this.maximumBalance) {
            throw new Error("This operation will exceed the maximum balance");
        }
        this.setBalance(balance);
        let transaction = new Transaction("deposit", amount, balance);
        this.transactionHistory.push(transaction);
    }
}
//# sourceMappingURL=SavingsAccount.js.map