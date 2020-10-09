interface GenericModel {
    id: number;
    score: number;
}

interface CustomerClientModel {
    clientId: number;
    customerCsId: number;
}

class CustomerSuccessBalancing {

    private _customer_success: Array<GenericModel>;
    private _customers: Array<GenericModel>;
    private _customers_success_away: Array<number>;
    private _customer_customer_success: Array<CustomerClientModel> = [];

    /**
     *
     * @param customer_success
     * @param customers
     * @param customers_success_away
     */
    constructor(customer_success: Array<GenericModel>,
        customers: Array<GenericModel>,
        customers_success_away: Array<number>) {

        this._customer_success = customer_success;
        this._customers = customers;
        this._customers_success_away = customers_success_away;
    }

    public balanceCustomersBetweenCustomersSuccess(): number {
        this.getOnlyAvailableCustomersSuccess();

        this._customers.forEach((element) => {
            this._customer_customer_success.push({
                clientId: element.id,
                customerCsId: this.getBestCustomerCsForCustomer(element)
            });
        });

        return this.getCustomerSuccessWithMoreCustomers();
    }

    private getOnlyAvailableCustomersSuccess() {
        this._customers_success_away.forEach(el => {
            const index = this._customer_success.findIndex(ccs => ccs.id == el)
            this._customer_success.splice(index, 1);
        });
    }

    public getCustomerSuccessWithMoreCustomers() {
        let aux = 0;
        let idCustomerCs = 0;

        for (let count = 0; count < this._customer_success.length; count++) {
            let totalCustomers = this._customer_customer_success.filter(ccs => {
                return ccs.customerCsId == this._customer_success[count].id;
            });

            if (totalCustomers.length > 0) {
                if (aux < totalCustomers.length) {
                    aux = totalCustomers.length;
                    idCustomerCs = this._customer_success[count].id;
                } else if (aux == totalCustomers.length) {
                    count = this._customer_success.length;
                    idCustomerCs = 0;
                }
            }
        }

        return idCustomerCs;
    }

    public getBestCustomerCsForCustomer(element): number {
        let aux = 0;
        let score = 0;
        let idCustomerCs = 0;
        for (let cont = 0; cont < this._customer_success.length; cont++) {
            if (this._customer_success[cont].score > 10) {
                score = this._customer_success[cont].score > element.score ?
                    this._customer_success[cont].score - element.score :
                    element.score - this._customer_success[cont].score;

                if (aux > 0) {
                    if (score == 0) {
                        idCustomerCs = this._customer_success[cont].id;
                        aux = score;
                        cont = this._customer_success.length;
                    }

                    if (score < aux) {
                        idCustomerCs = this._customer_success[cont].id;
                        aux = score;
                    }
                } else {
                    idCustomerCs = this._customer_success[cont].id;
                    aux = score;

                    if (score == 0) {
                        cont = this._customer_success.length;
                    }
                }
            }

        }

        return idCustomerCs;
    }
}


class CustomerSuccessBalancingTests {

    CustomerSuccessBalancingObject: CustomerSuccessBalancing;

    public testOne() {
        const customer_success = [{ id: 1, score: 60 }, { id: 2, score: 20 }, {
            id: 3,
            score: 95
        }, { id: 4, score: 75 }];
        const customers = [{ id: 1, score: 90 }, { id: 2, score: 20 }, { id: 3, score: 70 }, {
            id: 4,
            score: 40
        }, { id: 5, score: 60 }, { id: 5, score: 10 }];

        this.CustomerSuccessBalancingObject = new CustomerSuccessBalancing(customer_success, customers, [2, 4]);
        console.log("Teste1", this.CustomerSuccessBalancingObject.balanceCustomersBetweenCustomersSuccess());
    }
    public testTwo() {
        const customer_success = [{ id: 1, score: 11 }, { id: 2, score: 21 }, { id: 3, score: 31 }, { id: 4, score: 3 }, {
            id: 5,
            score: 4
        }, { id: 6, score: 5 }];
        const customers = [{ id: 1, score: 10 }, { id: 2, score: 10 }, { id: 3, score: 10 }, { id: 4, score: 20 }, {
            id: 5,
            score: 20
        }, { id: 6, score: 30 }, { id: 7, score: 30 }, { id: 8, score: 20 }, { id: 9, score: 60 }];

        this.CustomerSuccessBalancingObject = new CustomerSuccessBalancing(customer_success, customers, []);
        console.log("Teste2", this.CustomerSuccessBalancingObject.balanceCustomersBetweenCustomersSuccess());
    }

    public testThree() {
        const customer_success = this.fillArrayCCS();
        const customers = this.fillArrayCustomer();
        this.CustomerSuccessBalancingObject = new CustomerSuccessBalancing(customer_success, customers, [1000]);
        console.log("Teste3", this.CustomerSuccessBalancingObject.balanceCustomersBetweenCustomersSuccess());
    }

    public testFour() {
        const customer_success = [{ id: 1, score: 1 }, { id: 2, score: 2 }, { id: 3, score: 3 }, { id: 4, score: 4 }, {
            id: 5, score: 5
        }, { id: 6, score: 6 }];

        const customers = [{ id: 1, score: 10 }, { id: 2, score: 10 }, { id: 3, score: 10 },
        { id: 4, score: 20 }, { id: 5, score: 20 }, { id: 6, score: 30 }, { id: 7, score: 30 },
        { id: 8, score: 30 }, { id: 9, score: 20 }, { id: 10, score: 60 }];

        this.CustomerSuccessBalancingObject = new CustomerSuccessBalancing(customer_success, customers, []);
        console.log("Teste4", this.CustomerSuccessBalancingObject.balanceCustomersBetweenCustomersSuccess());
    }

    public testFive() {
        const customer_success = [{ id: 1, score: 100 }, { id: 2, score: 2 }, { id: 3, score: 3 }, { id: 4, score: 3 }, {
            id: 5, score: 4
        }, { id: 6, score: 5 }];

        const customers = [{ id: 1, score: 10 }, { id: 2, score: 10 }, { id: 3, score: 10 },
        { id: 4, score: 20 }, { id: 5, score: 20 }, { id: 6, score: 30 }, { id: 7, score: 30 },
        { id: 8, score: 30 }, { id: 9, score: 20 }, { id: 10, score: 60 }];

        this.CustomerSuccessBalancingObject = new CustomerSuccessBalancing(customer_success, customers, []);
        console.log("Teste5", this.CustomerSuccessBalancingObject.balanceCustomersBetweenCustomersSuccess());
    }

    public testSix() {
        const customer_success = [{ id: 1, score: 100 }, { id: 2, score: 99 }, { id: 3, score: 88 }, { id: 4, score: 3 }, {
            id: 5, score: 4
        }, { id: 6, score: 5 }];

        const customers = [{ id: 1, score: 10 }, { id: 2, score: 10 }, { id: 3, score: 10 },
        { id: 4, score: 20 }, { id: 5, score: 20 }, { id: 6, score: 30 }, { id: 7, score: 30 },
        { id: 8, score: 30 }, { id: 9, score: 20 }, { id: 10, score: 60 }];

        this.CustomerSuccessBalancingObject = new CustomerSuccessBalancing(customer_success, customers,
            [1, 2, 3]);

        console.log("Teste6", this.CustomerSuccessBalancingObject.balanceCustomersBetweenCustomersSuccess());
    }

    public testSeven() {
        const customer_success = [{ id: 1, score: 100 }, { id: 2, score: 99 }, { id: 3, score: 88 }, { id: 4, score: 3 }, {
            id: 5, score: 4
        }, { id: 6, score: 5 }];

        const customers = [{ id: 1, score: 10 }, { id: 2, score: 10 }, { id: 3, score: 10 },
        { id: 4, score: 20 }, { id: 5, score: 20 }, { id: 6, score: 30 }, { id: 7, score: 30 },
        { id: 8, score: 30 }, { id: 9, score: 20 }, { id: 10, score: 60 }];

        this.CustomerSuccessBalancingObject = new CustomerSuccessBalancing(customer_success, customers,
            [4, 5, 6]);

        console.log("Teste7", this.CustomerSuccessBalancingObject.balanceCustomersBetweenCustomersSuccess());
    }

    private fillArrayCCS(): Array<GenericModel> {
        let array = [];
        for (var i = 0; i < 1000; i++) {
            array.push({ id: i + 1, score: 0 });
        }

        array[998] = { id: 999, score: 100 };

        return array;
    }

    private fillArrayCustomer(): Array<GenericModel> {
        let array = [];
        for (var i = 0; i < 1000; i++) {
            array.push({ id: i + 1, score: 10 });
        }

        return array;
    }
}