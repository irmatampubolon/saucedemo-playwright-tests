# Playwright QA Portfolio

## 🧪 Project Overview

This is an automation testing project using **Playwright**. The tests are focused on validating the core functionalities of the [SauceDemo website](https://www.saucedemo.com/), which is a demo site for automating test scenarios.

The project includes tests for:
- User login
- Cart actions
- Checkout flow

### 🔧 Tech Stack
- **Playwright** for end-to-end testing
- **TypeScript** for writing test scripts
- **Node.js** and **NPM** for managing dependencies

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js** version 16 or higher
- **NPM** (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/playwright-qa-portfolio.git
   cd playwright-qa-portfolio

## 📋 Test Scenarios

### 🔐 Login

| ID    | Test Case Description               | Expected Result                |
|-------|-------------------------------------|--------------------------------|
| TC001 | Login with valid credentials        | Redirect to inventory page     |
| TC002 | Login with invalid credentials      | Display error message          |
| TC003 | Login with empty username field    | Display "required" error       |
| TC004 | Login with empty password field    | Display "required" error       |
| TC005 | Login with empty fields            | Display "required" error       |

### 🛒 Cart

| ID    | Test Case Description               | Expected Result                |
|-------|-------------------------------------|--------------------------------|
| TC006 | Add product to cart                | Item added to cart, cart shows 1 |
| TC007 | Remove product from cart           | Item removed from cart, cart empty |
| TC008 | Add multiple products to cart      | Cart displays correct number of items |
| TC009 | View cart                          | Cart page shows products added |
| TC010 | Proceed to checkout from cart      | Redirect to checkout page     |

### 💳 Checkout

| ID    | Test Case Description               | Expected Result                |
|-------|-------------------------------------|--------------------------------|
| TC011 | Complete checkout with all fields filled | Order confirmation page is displayed |
| TC012 | Leave required checkout fields blank | Show validation errors for empty fields |
| TC013 | Complete checkout with invalid payment details | Show payment error message |
| TC014 | Complete checkout with valid payment details | Successful checkout, order confirmation |
| TC015 | Complete checkout with incorrect shipping address | Show address error message |

### 🛠️ Error Handling

| ID    | Test Case Description               | Expected Result                |
|-------|-------------------------------------|--------------------------------|
| TC016 | Invalid username format            | Show "Invalid username" error |
| TC017 | Invalid password format            | Show "Invalid password" error |
| TC018 | Incorrect password attempt         | Show "Incorrect password" error |
| TC019 | Unexpected server error            | Show "Server error, try again later" message |

### 🧑‍💻 Usability

| ID    | Test Case Description               | Expected Result                |
|-------|-------------------------------------|--------------------------------|
| TC020 | Verify "Forgot password" link       | Redirect to reset password page |
| TC021 | Verify "Create new account" link    | Redirect to account creation page |
| TC022 | Ensure UI elements are responsive   | UI elements adapt to different screen sizes |
| TC023 | Verify loading times for page       | Page loads within acceptable time (e.g., < 3 seconds) |
