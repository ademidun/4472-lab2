var assert = require('assert');
const getAgeFactor = require('./purchaseOrderF19').getAgeFactor;
const getBalanceFactor = require('./purchaseOrderF19').getBalanceFactor;
const AccountStatus = require('./purchaseOrderF19').accountStatus;
const creditStatus = require('./purchaseOrderF19').creditStatus;
const productStatus = require('./purchaseOrderF19').productStatus;
const orderHandling = require('./purchaseOrderF19').orderHandling;

describe('PurchaseOrder', () => {

    class ClientAccount {
        constructor(age, balance, creditScore) {
            this.age = age;
            this.balance = balance;
            this.creditScore = creditScore;
        }


    }

    describe('Equivalence Tests', () => {

        const ca1 = new ClientAccount(5, -100,-100);
        const ca2 = new ClientAccount(120, 12000,120);
        const ca3 = new ClientAccount(17, 17,17);
        const ca4 = new ClientAccount(20, 200,200);
        const ca5 = new ClientAccount(35, 350,55);
        const ca6 = new ClientAccount(77, 1550,80);
        const ca7 = new ClientAccount(55, 3500,80);

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

            it('should equal poor', function() {
                assert.equal(AccountStatus(ca3), 'poor');
            });

            it('should equal fair', function() {
                assert.equal(AccountStatus(ca4), 'fair');
            });

            it('should equal good', function() {
                assert.equal(AccountStatus(ca5), 'good');
            });

            it('should equal very good', function() {
                assert.equal(AccountStatus(ca7), 'very good');
            })
        });

        describe('creditStatus() tests', function() {
            it('should equal bad in restricted mode', function() {
                assert.equal(creditStatus(ca1, 'restricted'), 'bad');
            });

            it('should equal bad in default mode', function() {
                assert.equal(creditStatus(ca2, 'default'), 'bad');
            });

            it('should equal good in restricted mode', function() {
                assert.equal(creditStatus(ca3, 'restricted'), 'good');
            });

            it('should equal good in default mode', function() {
                assert.equal(creditStatus(ca4, 'default'), 'good');
            });

            it('should equal invalid', function() {
                assert.equal(creditStatus(ca5, 'restricted'), 'invalid');
            });

            it('should equal invalid, case 2', function() {
                assert.equal(creditStatus(ca6, 'restricted'), 'invalid');
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

});