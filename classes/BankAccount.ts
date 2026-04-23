import { Transaction } from "./Transaction.js";

export class BankAccount{
    owner: string;
    private balance: number
    transactionHistory: Transaction[]

    constructor(owner: string){
        this.owner = owner;
        this.balance = 0;
        this.transactionHistory = [];
    }

    getBalance(){
        return this.balance;
    }

    setBalance(balance: number){
        this.balance = balance;
    }

    deposit(amount: number){
        if(amount < 0){
            throw new Error("Cannot deposit negative amount");
        }

        this.balance += amount;

        let transaction = new Transaction("deposit", amount, this.balance)
        this.transactionHistory.push(transaction);
    }

    withdraw(amount: number){
        if(amount > this.balance){
            throw new Error("Not enough money");
        }

        this.balance -= amount;

        let transaction = new Transaction("withdraw", amount, this.balance)
        this.transactionHistory.push(transaction); 
    }

    transferTo(otherAccount: BankAccount, amount: number){
        if(amount <= 0){
            throw new Error("Money should be possitive value");
        }

        if(amount > this.balance){
            throw new Error("Not enough money to transfer");
        }

        otherAccount.deposit(amount);
        this.balance -= amount;
        
        let transaction = new Transaction("transfer", amount, this.balance, this.owner, otherAccount.owner);
        this.transactionHistory.push(transaction); 
    }
}
