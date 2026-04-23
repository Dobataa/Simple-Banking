import { BankAccount } from "./BankAccount.js";
import { Transaction } from "./Transaction.js";

export class SavingsAccount extends BankAccount{
    interestRate: number;
    
    constructor(owner: string, interestRate: number){
        super(owner);
        this.interestRate = interestRate;
    }

    applyInterest(){
        let balance = this.getBalance();
        balance += (this.interestRate / 100) * balance;

        this.setBalance(balance);

        let transaction = new Transaction("interest", balance, this.getBalance());
        this.transactionHistory.push(transaction); 
    }
}