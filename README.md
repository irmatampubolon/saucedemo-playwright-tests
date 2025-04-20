# Playwright QA Portfolio

## 🧪 Project Overview

This is an automation testing project using **Playwright**. The tests are focused on validating the core functionalities of the [SauceDemo website](https://www.saucedemo.com/), which is a demo site for automating test scenarios.

The project includes tests for:
- User login
- Product browsing and filtering
- Cart actions
- Checkout flow

### 🔧 Tech Stack
- **Playwright** for end-to-end testing
- **TypeScript** for writing test scripts
- **Node.js** and **NPM** for managing dependencies
- **GitHub Actions** for CI/CD pipeline

## 🚀 CI/CD Pipeline

This project includes a CI/CD pipeline implemented using GitHub Actions. The pipeline automatically runs the test suite whenever code is pushed to the main branch or when pull requests are created.

### CI/CD Features:

- **Automated Testing**: All tests are automatically executed on every code change
- **Multiple Environments**: Tests run on the latest Ubuntu environment
- **Test Reports**: Test results are stored as artifacts for review
- **Manual Trigger**: Pipeline can be triggered manually through the GitHub UI

### Pipeline Workflow:

1. Code is pushed to the repository
2. GitHub Actions automatically detects the changes
3. A virtual machine with Ubuntu is provisioned
4. Node.js and project dependencies are installed
5. Playwright browsers are installed
6. Tests are executed against the SauceDemo website
7. Test reports are generated and stored as artifacts
8. Pipeline status is reported back to GitHub

To view the CI/CD configuration, check the `.github/workflows/playwright.yml` file.

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js** version 16 or higher
- **NPM** (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/playwright-qa-portfolio.git
   cd playwright-qa-portfolio

## 📋 Automated Test Scenarios

### 🔐 Login Tests (login.spec.ts)

| ID    | Test Case Description               | Expected Result                | Status |
|-------|-------------------------------------|--------------------------------|--------|
| TC001 | Login with valid credentials        | Redirect to inventory page     | ✅ Implemented |
| TC002 | Login with invalid credentials      | Display error message          | ✅ Implemented |
| TC003 | Login with empty username field     | Display "Username is required" error | ✅ Implemented |
| TC004 | Login with empty password field     | Display "Password is required" error | ✅ Implemented |
| TC005 | Login with empty fields             | Display "Username is required" error | ✅ Implemented |

### 🛍️ Product Tests (product.spec.ts)

| ID    | Test Case Description               | Expected Result                | Status |
|-------|-------------------------------------|--------------------------------|--------|
| TC006 | Filter products by name (A-Z)       | Products sorted alphabetically A-Z | ✅ Implemented |
| TC007 | Filter products by name (Z-A)       | Products sorted alphabetically Z-A | ✅ Implemented |
| TC008 | Filter products by price (low to high) | Products sorted by price ascending | ✅ Implemented |
| TC009 | Filter products by price (high to low) | Products sorted by price descending | ✅ Implemented |
| TC010 | View product details                | Product detail page displayed with correct info | ✅ Implemented |
| TC011 | Navigate back from product details  | Return to products page       | ✅ Implemented |
| TC012 | Add to cart from product details    | Item added to cart, counter updated | ✅ Implemented |

### 🛒 Cart Tests (cart.spec.ts)

| ID    | Test Case Description               | Expected Result                | Status |
|-------|-------------------------------------|--------------------------------|--------|
| TC013 | Add product to cart                 | Item added to cart, cart shows 1 | ✅ Implemented |
| TC014 | Add multiple products to cart       | Cart displays correct number of items | ✅ Implemented |
| TC015 | Remove item from cart               | Item removed from cart, cart empty | ✅ Implemented |
| TC016 | Add multiple items and remove one   | Cart displays correct remaining item | ✅ Implemented |
| TC017 | Continue shopping from cart page    | Return to products page        | ✅ Implemented |
| TC018 | Proceed to checkout from cart       | Redirect to checkout page      | ✅ Implemented |

### 💳 Checkout Tests (checkout.spec.ts)

| ID    | Test Case Description               | Expected Result                | Status |
|-------|-------------------------------------|--------------------------------|--------|
| TC019 | Complete checkout with valid information | Order confirmation page displayed | ✅ Implemented |
| TC020 | Checkout with empty first name      | Display "First Name is required" error | ✅ Implemented |
| TC021 | Checkout with empty last name       | Display "Last Name is required" error | ✅ Implemented |
| TC022 | Checkout with empty postal code     | Display "Postal Code is required" error | ✅ Implemented |
| TC023 | Checkout with all fields empty      | Display "First Name is required" error | ✅ Implemented |

## 🔍 Future Test Enhancements

The following test scenarios have been identified for future implementation:

### 🛠️ Error Handling

| ID    | Test Case Description               | Expected Result                | Status |
|-------|-------------------------------------|--------------------------------|--------|
| TC024 | Login with locked out user          | Show "user has been locked out" error | ⏳ Planned |
| TC025 | Login with problem user             | Successfully login but with UI glitches | ⏳ Planned |
| TC026 | Login with performance glitch user  | Login with intentional slow response | ⏳ Planned |
| TC027 | Unexpected server error simulation  | Show appropriate error message | ⏳ Planned |

### 🧑‍💻 Usability and Performance

| ID    | Test Case Description               | Expected Result                | Status |
|-------|-------------------------------------|--------------------------------|--------|
| TC028 | Verify all product images load      | All images display correctly   | ⏳ Planned |
| TC029 | Test page load performance          | Page loads within acceptable time | ⏳ Planned |
| TC030 | Verify responsive design            | UI works correctly on different screen sizes | ⏳ Planned |

## 🚀 Running the Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test login.spec.ts

# Run tests with UI mode
npx playwright test --ui

# Generate test report
npx playwright show-report
```
