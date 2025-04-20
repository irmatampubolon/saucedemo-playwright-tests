export const testData = {
  users: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    locked: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    },
    problem: {
      username: 'problem_user',
      password: 'secret_sauce'
    },
    performance: {
      username: 'performance_glitch_user',
      password: 'secret_sauce'
    }
  },
  products: {
    all: [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)'
    ],
    recommended: [
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie'
    ]
  },
  sortOptions: {
    nameAZ: 'Name (A to Z)',
    nameZA: 'Name (Z to A)',
    priceLowHigh: 'Price (low to high)',
    priceHighLow: 'Price (high to low)'
  },
  checkout: {
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    }
  },
  urls: {
    base: 'https://www.saucedemo.com',
    inventory: 'https://www.saucedemo.com/inventory.html',
    cart: 'https://www.saucedemo.com/cart.html',
    checkout: 'https://www.saucedemo.com/checkout-step-one.html',
    checkoutStepTwo: 'https://www.saucedemo.com/checkout-step-two.html',
    checkoutComplete: 'https://www.saucedemo.com/checkout-complete.html'
  }
};