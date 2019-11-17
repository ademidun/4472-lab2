const assert = require('assert');
const getAgeFactor = require('./purchaseOrderF19').getAgeFactor;
const getBalanceFactor = require('./purchaseOrderF19').getBalanceFactor;
const AccountStatus = require('./purchaseOrderF19').accountStatus;
const {creditStatus } = require('./purchaseOrderF19');
const {productStatus} = require('./purchaseOrderF19');
const {orderHandling} = require('./purchaseOrderF19');

describe('PurchaseOrder', () => {

    class ClientAccount {
        constructor(age, balance, creditScore) {
            this.age = age;
            this.balance = balance;
            this.creditScore = creditScore;
        }


    }

    class Inventory {
        constructor(name, q) {
            this.name = name;
            this.q = q;
        }
    }

    const inv1 = new Inventory('apple', 0);
    const inv2 = new Inventory('banana', 100);
    const inv3 = new Inventory('grape', 100);
    const invArray = [inv1, inv2, inv3];

    describe('Equivalence Tests', () => {

        const ca1 = new ClientAccount(5, -100,-100);
        const ca2 = new ClientAccount(120, 12000,120);
        const ca3 = new ClientAccount(17, 17,17);
        const ca4 = new ClientAccount(20, 200,200);
        const ca5 = new ClientAccount(35, 550,55);
        const ca6 = new ClientAccount(77, 1550,80);
        const ca7 = new ClientAccount(55, 3500,80);
        const ca8 = new ClientAccount(17, 17, 120);
        const ca9 = new ClientAccount(0, 350, -100);

        describe('getAgeFactor() tests', function() {
            it('should equal 0', function() {
                assert.equal(getAgeFactor(ca1), 0);
            });

            it('should equal 0, case 2', function() {
                assert.equal(getAgeFactor(ca2), 0);
            });

            it('should equal 5', function() {
                assert.equal(getAgeFactor(ca3), 5);
            });

            it('should equal 10', function() {
                assert.equal(getAgeFactor(ca4), 10);
            });

            it('should equal 20', function() {
                assert.equal(getAgeFactor(ca5), 20);
            });

            it('should equal 20, case 2', function() {
                assert.equal(getAgeFactor(ca6), 20);
            });

            it('should equal 50', function() {
                assert.equal(getAgeFactor(ca7), 50);
            })
        });

        describe('getBalanceFactor() tests', function() {
            it('should equal 0', function() {
                assert.equal(getBalanceFactor(ca1), 0);
            });

            it('should equal 0, case 2', function() {
                assert.equal(getBalanceFactor(ca2), 0);
            });

            it('should equal 6', function() {
                assert.equal(getBalanceFactor(ca3), 6);
            });

            it('should equal 16', function() {
                assert.equal(getBalanceFactor(ca4), 16);
            });

            it('should equal 30', function() {
                assert.equal(getBalanceFactor(ca5), 30);
            });

            it('should equal 70', function() {
                assert.equal(getBalanceFactor(ca6), 70);
            });

            it('should equal 200', function() {
                assert.equal(getBalanceFactor(ca7), 200);
            })
        });

        describe('AccountStatus() tests', function() {
            it('should equal invalid', function() {
                assert.equal(AccountStatus(ca1), 'invalid');
            });

            it('should equal adverse', function() {
                assert.equal(AccountStatus(ca3), 'adverse');
            });

            it('should equal acceptable', function() {
                assert.equal(AccountStatus(ca4), 'acceptable');
            });

            it('should equal good', function() {
                assert.equal(AccountStatus(ca5), 'good');
            });

            it('should equal excellent', function() {
                assert.equal(AccountStatus(ca7), 'excellent');
            })
        });

        describe('creditStatus() tests', function() {
            it('should equal adverse in restricted mode', function() {
                assert.equal(creditStatus(ca3, 'restricted'), 'adverse');
            });

            it('should equal adverse in default mode', function() {
                assert.equal(creditStatus(ca3, 'default'), 'adverse');
            });

            it('should equal good in restricted mode', function() {
                assert.equal(creditStatus(ca5, 'restricted'), 'good');
            });

            it('should equal good in default mode', function() {
                assert.equal(creditStatus(ca6, 'default'), 'good');
            });

            it('should equal invalid', function() {
                assert.equal(creditStatus(ca1, 'restricted'), 'invalid');
            });

            it('should equal invalid, case 2', function() {
                assert.equal(creditStatus(ca9, 'restricted'), 'invalid');
            })
        });

        describe('productStatus() tests', function() {
            it('should equal invalid', function() {
                assert.equal(productStatus('orange', invArray, 500), 'invalid');
            });

            it('should equal soldout', function() {
                assert.equal(productStatus('apple', invArray, 500), 'soldout');
            });

            it('should equal limited', function() {
                assert.equal(productStatus('banana', invArray, 110), 'limited');
            });

            it('should equal available', function() {
                assert.equal(productStatus('grape', invArray, 90), 'available');
            })
        });

        describe('orderHandling() tests', function() {
            it('should equal accepted', function() {
                assert.equal(orderHandling(ca7, 'apple', invArray, 500, 'default'), 'accepted');
            });

            it('should equal pending', function() {
                assert.equal(orderHandling(ca4, 'apple', invArray, 500, 'default'), 'pending');
            });

            it('should equal underReview', function() {
                assert.equal(orderHandling(ca8, 'grape', invArray, 50, 'default'), 'underReview');
            });

            it('should equal rejected', function() {
                assert.equal(orderHandling(ca9, 'orange', invArray, 500, 'default'), 'rejected');
            })
        })
    });

    describe('Boundary Value Tests', function() {
        // Setup test accounts 
        const bca1 = new ClientAccount(14, 0, 0);
        const bca2 = new ClientAccount(110, 5000, 0);
        const bca3 = new ClientAccount(15, 1, 0);
        const bca4 = new ClientAccount(19, 99, 0);
        const bca5 = new ClientAccount(20, 100, 0);
        const bca6 = new ClientAccount(29, 499, 0);
        const bca7 = new ClientAccount(30, 500, 0);
        const bca8 = new ClientAccount(39, 999, 0);
        const bca9 = new ClientAccount(40, 1000, 0);
        const bca10 = new ClientAccount(64, 2999, 0);
        const bca11 = new ClientAccount(30, 3000, 0);
        const bca12 = new ClientAccount(39, 4999, 0);

        // Test accounts for AccountStatus
        const aS1 = new ClientAccount(0, 50, 0);
        const aS2 = new ClientAccount(7, 4000, 0);

        // Test accounts for creditStatus
        const cs1 = new ClientAccount(0, 0, 0);
        const cs2 = new ClientAccount(0, 0, 49);
        const cs3 = new ClientAccount(0, 0, 0);
        const cs4 = new ClientAccount(0, 0, 74);
        const cs5 = new ClientAccount(0, 0, 50);
        const cs6 = new ClientAccount(0, 0, 100);
        const cs7 = new ClientAccount(0, 0, 75);
        const cs8 = new ClientAccount(0, 0, 100);
        const cs9 = new ClientAccount(0, 0, -1);
        const cs10 = new ClientAccount(0, 0, 101);

        // Setup inventory for these tests
        const inv1 = new Inventory('apple', 0);
        const inv2 = new Inventory('banana', 100);
        const inv3 = new Inventory('grape', 100);
        const invArray = [inv1, inv2, inv3];

        describe('getAgeFactor() tests', function() {
            it('should equal 0', function() {
                assert.equal(getAgeFactor(bca1), 0);
            });

            it('should equal 0, case 2', function() {
                assert.equal(getAgeFactor(bca2), 0);
            });

            it('should equal 5', function() {
                assert.equal(getAgeFactor(bca3), 5);
            });

            it('should equal 5, case2', function() {
                assert.equal(getAgeFactor(bca4), 5);
            });

            it('should equal 10', function() {
                assert.equal(getAgeFactor(bca5), 10);
            });

            it('should equal 10, case 2', function() {
                assert.equal(getAgeFactor(bca6), 10);
            });

            it('should equal 20', function() {
                assert.equal(getAgeFactor(bca7), 20);
            });

            it('should equal 20, case 2', function() {
                assert.equal(getAgeFactor(bca8), 20);
            });

            it('should equal 20, case 3', function() {
                assert.equal(getAgeFactor(bca9), 20);
            });

            it('should equal 20, case 4', function() {
                assert.equal(getAgeFactor(bca10), 20);
            });

            it('should equal 50', function() {
                assert.equal(getAgeFactor(bca11), 50);
            });

            it('should equal 50, case 2', function() {
                assert.equal(getAgeFactor(bca12), 50);
            })
        });

        describe('getBalanceFactor() tests', function() {
            it('should equal 0', function() {
                assert.equal(getBalanceFactor(bca1), 0);
            });

            it('should equal 0, case 2', function() {
                assert.equal(getBalanceFactor(bca2), 0);
            });

            it('should equal 6', function() {
                assert.equal(getBalanceFactor(bca3), 6);
            });

            it('should equal 6, case2', function() {
                assert.equal(getBalanceFactor(bca4), 6);
            });

            it('should equal 16', function() {
                assert.equal(getBalanceFactor(bca5), 16);
            });

            it('should equal 16, case 2', function() {
                assert.equal(getBalanceFactor(bca6), 16);
            });

            it('should equal 30', function() {
                assert.equal(getBalanceFactor(bca7), 30);
            });

            it('should equal 30, case 2', function() {
                assert.equal(getBalanceFactor(bca8), 30);
            });

            it('should equal 70', function() {
                assert.equal(getBalanceFactor(bca9), 70);
            });

            it('should equal 70, case 2', function() {
                assert.equal(getBalanceFactor(bca10), 70);
            });

            it('should equal 200', function() {
                assert.equal(getBalanceFactor(bca11), 200);
            });

            it('should equal 200, case 2', function() {
                assert.equal(getBalanceFactor(bca12), 200);
            })
        });

        describe('AccountStatus() tests', function() {
            it('should equal invalid', function() {
                assert.equal(AccountStatus(aS1), 'invalid');
            });

            it('should equal excellent', function() {
                assert.equal(AccountStatus(aS2), 'excellent');
            })
        });

        describe('creditStatus() tests', function() {
            it('should equal bad in restricted mode', function() {
                assert.equal(creditStatus(cs1, 'restricted'), 'bad');
            });

            it('should equal bad in restricted mode, case 2', function() {
                assert.equal(creditStatus(cs2, 'restricted'), 'bad');
            });

            it('should equal bad in default mode', function() {
                assert.equal(creditStatus(cs3, 'default'), 'bad');
            });

            it('should equal bad in default mode, case 2', function() {
                assert.equal(creditStatus(cs4, 'default'), 'bad');
            });

            it('should equal good in restricted mode', function() {
                assert.equal(creditStatus(cs5, 'restricted'), 'good');
            });

            it('should equal good in restricted mode, case 2', function() {
                assert.equal(creditStatus(cs6, 'restricted'), 'good');
            });

            it('should equal good in default mode', function() {
                assert.equal(creditStatus(cs7, 'default'), 'good');
            });

            it('should equal good in default mode, case 2', function() {
                assert.equal(creditStatus(cs8, 'default'), 'good');
            });

            it('should equal invalid', function() {
                assert.equal(creditStatus(cs9, 'restricted'), 'invalid');
            });

            it('should equal invalid, case 2', function() {
                assert.equal(creditStatus(cs10, 'restricted'), 'invalid');
            })
        });

        describe('productStatus() tests', function() {
            it('should equal soldout', function() {
                assert.equal(productStatus('apple', invArray, 0), 'soldout');
            });

            it('should equal limited', function() {
                assert.equal(productStatus('banana', invArray, 101), 'limited');
            });

            it('should equal available', function() {
                assert.equal(productStatus('banana', invArray, 100), 'available');
            })
        })
    });

    describe('Decision Table Testing', function() {
        // Setup accounts for decision testing
        const d1 = new ClientAccount(35, 12000, 75); // excellent, good
        const d2 = new ClientAccount(20, 3500,  75); // good, good
        const d3 = new ClientAccount(5, 300, 85); // fair, good
        const d4 = new ClientAccount(17, 50, 75); // poor, good
        const d5 = new ClientAccount(0, -100, 95); // invalid, good
        const d6 = new ClientAccount(55, 5000, 40); // good, bad
        const d7 = new ClientAccount(15, 500, 40); // fair, bad
        const d8 = new ClientAccount(0, -100, -15); // invalid, invalid
        const d9 = new ClientAccount(7, 50, 30); // poor, bad

        // Setup inventory for decision testing 
        const inv1 = new Inventory('apple', 0);
        const inv2 = new Inventory('banana', 100);
        const inv3 = new Inventory('grape', 100);
        const invArray = [inv1, inv2, inv3];

        describe('orderHandling tests', function() {
            it('should equal accepted', function() {
                assert.equal(orderHandling(d1, 'apple', invArray, 500, 'default'), 'accepted');
            });

            it('should equal accepted, case 2', function() {
                assert.equal(orderHandling(d2, 'apple', invArray, 500, 'default'), 'accepted');
            });

            it('should equal accepted, case 3', function() {
                assert.equal(orderHandling(d4, 'banana', invArray, 50, 'default'), 'accepted');
            });

            it('should equal accepted, case 4', function() {
                assert.equal(orderHandling(d3, 'banana', invArray, 50, 'default'), 'accepted');
            });

            it('should equal pending', function() {
                assert.equal(orderHandling(d3, 'banana', invArray, 500, 'default'), 'pending');
            });

            it('should equal pending, case 2', function() {
                assert.equal(orderHandling(d3, 'apple', invArray, 110, 'default'), 'pending');
            });

            it('should equal pending, case 3', function() {
                assert.equal(orderHandling(d4, 'banana', invArray, 500, 'default'), 'pending');
            });

            it('should equal underReview', function() {
                assert.equal(orderHandling(d6, 'apple', invArray, 500, 'default'), 'underReview');
            });

            it('should equal underReview, case 2', function() {
                assert.equal(orderHandling(d7, 'banana', invArray, 50, 'default'), 'underReview');
            });

            it('should equal rejected', function() {
                assert.equal(orderHandling(d8, 'orange', invArray, 500, 'default'), 'rejected');
            });

            it('should equal rejected, case 2', function() {
                assert.equal(orderHandling(d7, 'banana', invArray, 500, 'default'), 'rejected');
            });

            it('should equal rejected, case 3', function() {
                assert.equal(orderHandling(d7, 'apple', invArray, 500, 'default'), 'rejected');
            });

            it('should equal rejected, case 4', function() {
                assert.equal(orderHandling(d4, 'apple', invArray, 500, 'default'), 'rejected');
            });

            it('should equal rejected, case 5', function() {
                assert.equal(orderHandling(d4, 'apple', invArray, 500, 'default'), 'rejected');
            })
        })
    })
});