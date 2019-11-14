var assert = require('assert')

describe('PurchaseOrder', () => {

// ClientAccount class used in functions

    class ClientAccount {
        constructor(age, balance, creditScore) {
            this.age = age;
            this.balance = balance;
            this.creditScore = creditScore;
        }


    }

    class PurchaseOrder {

        constructor() {}

        getAgeFactor(ca) {
            if (ca.age <15 || ca.age >= 110) {
                return 0
            } else if (ca.age >=15 && ca.age < 20) {
                return 5
            } else if (ca.age >=20 && ca.age < 30) {
                return 10
            } else if (ca.age >=30 && ca.age < 40 ||
                ca.age >=65 && ca.age < 110) {
                return 20
            } else if (ca.age >=40 && ca.age < 65) {
                return 50
            }
        }
    }

    describe('Equivalence Tests', () => {

        const ca1 = new ClientAccount(5, 0,125);
        const po = new PurchaseOrder();

        describe('getAgeFactor() tests', function() {
            it('should equal 0', function() {
                assert.equal(po.getAgeFactor(ca1), 0);
            });

            it('should equal 0, case 2', function() {
                assert.equal(po.getAgeFactor(ca1), 0);
            });

            it('should equal 5', function() {
                assert.equal(po.getAgeFactor(ca1), 5);
            });

            it('should equal 10', function() {
                assert.equal(po.getAgeFactor(ca1), 10);
            });

            it('should equal 20', function() {
                assert.equal(po.getAgeFactor(ca1), 20);
            });

            it('should equal 20, case 2', function() {
                assert.equal(po.getAgeFactor(ca1), 20);
            });

            it('should equal 50', function() {
                assert.equal(po.getAgeFactor(ca1), 50);
            })
        })
    });

});