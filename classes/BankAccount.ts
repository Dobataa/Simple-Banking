export class BankAccount{
    owner: string;
    private balance: number
    transactionHistory: string[]

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
        this.transactionHistory.push(`Deposited ${amount}`);
    }

    withdraw(amount: number){
        if(amount > this.balance){
            throw new Error("Not enough money");
        }

        this.balance -= amount;
        this.transactionHistory.push(`Withdrawed ${amount}`);  
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
        this.transactionHistory.push(`Transfer ${amount} to ${otherAccount.owner}`);  
    }
}
