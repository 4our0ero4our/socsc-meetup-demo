# SOCSC FUT Meetup Registration dApp

This project is a decentralized application (dApp) built on the Sui blockchain to facilitate student registration for the SOCSC FUT Meetup. Users can connect their Sui wallets, register for the event, and view a list of current registrants.

## Features
- **Wallet Connection:** Uses `@mysten/dapp-kit` to connect with Sui wallets.
- **Student Registration:** Users can register for the event by providing their first name, last name, and gender.
- **On-Chain Storage:** Student data is stored on the Sui blockchain using a Move smart contract.
- **Live Updates:** Registrations are fetched every 5 seconds to keep the displayed data up to date.

## Technologies Used
- **Frontend:** React.js
- **Blockchain:** Sui Move
- **API Requests:** Axios
- **State Management:** React Hooks

## Project Structure
```
/ - Root Directory
  ├── src/
  │   ├── assets/ - Contains images
  │   ├── components/ - UI components (if applicable)
  │   ├── utils/ - Utility functions (e.g., getObject.js for Sui RPC calls)
  │   ├── App.js - Main React component
  │   ├── index.js - Entry point for React app
  │   ├── App.css - Styling
  ├── move_contracts/
  │   ├── smart_contract.move - Move module handling student registration
  ├── package.json - Project dependencies and scripts
  ├── README.md - Documentation
```

## Installation

### Prerequisites
- Node.js and npm/yarn
- Sui Wallet (for testing on Devnet)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/socsc-fut-meetup.git
   cd socsc-fut-meetup
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open the application in your browser at `http://localhost:3000`

## Sui Move Smart Contract
The Move module (`smart_contract.move`) defines:
- `Student` struct: Stores student details (name, gender, wallet address).
- `Students` struct: Maintains a list of registered students.
- `init(ctx)`: Initializes the contract with an empty list.
- `add_student(...)`: Allows users to register if they haven't already.

## Usage
1. **Connect Wallet**: Click the "Connect Wallet" button to authenticate.
2. **Fill Registration Form**: Enter your first name, last name, and select gender.
3. **Submit Registration**: Click the "Submit" button (enabled only when a wallet is connected).
4. **View Registrations**: The list updates every 5 seconds with new registrants.

## Deployment
To deploy the smart contract on Sui:
1. Ensure you have the Sui CLI installed.
2. Compile and publish the Move package:
   ```sh
   sui move build
   sui client publish --gas-budget 500000000
   ```
3. Update the `PACKAGE_ID` and `STUDENTS_OBJECT_ID` in `App.js` with the deployed values.

## License
This project is open-source under the MIT License.

## Contact
For questions or contributions, feel free to reach out or create an issue in the repository.

---
Developed for the SOCSC FUT Meetup on Sui Blockchain 🚀

