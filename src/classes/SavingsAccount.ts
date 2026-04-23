import { BankAccount } from "./BankAccount.js";
import { Transaction } from "./Transaction.js";

type CompoundingMode = "yearly" | "monthly";

export class SavingsAccount extends BankAccount{
    interestRate: number;
    maximumBalance: number;
    
    constructor(
        owner: string, 
        dailyWithdrawalLimit : number, 
        interestRate: number, 
        maximumBalance: number
    ){
        super(owner, dailyWithdrawalLimit);
        this.interestRate = interestRate;
        this.maximumBalance = maximumBalance;
    }

    applyInterest(mode: CompoundingMode){
        let balance = this.getBalance();

        let periods = mode === "monthly" ? 12 : 1;
        let rate = (this.interestRate / 100) / periods;

        balance += rate * balance;

        if(balance > this.maximumBalance){
            throw new Error("This operation will exceed the maximum balance");
        }

        this.setBalance(balance);

        let transaction = new Transaction("interest", balance, this.getBalance());
        this.transactionHistory.push(transaction); 
    }

    deposit(amount: number){
        if(amount < 0){
            throw new Error("Cannot deposit negative amount");
        }

        let balance = this.getBalance();
        balance += amount;

        if(balance > this.maximumBalance){
            throw new Error("This operation will exceed the maximum balance");
        }

        this.setBalance(balance);

        let transaction = new Transaction("deposit", amount, balance)
        this.transactionHistory.push(transaction);
    }
}