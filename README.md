# Carbonitor: Carbon Footprint Estimator for Plastic Waste

## About the Project

Carbonitor is an application designed to estimate the carbon footprint of plastic waste materials. Utilizing an image classification model, this application can identify different types of plastic bottles and calculate their carbon footprint based on predefined parameters. This project aims to raise awareness about the environmental impact of plastic waste and encourage more sustainable practices.

### Features

- **Image Classification**: Identifies plastic bottle types using a sophisticated image classification model.
- **Carbon Footprint Calculation**: Estimates the carbon footprint of identified plastic waste.
- **User-Friendly Interface**: Built with React, offering a responsive and interactive user experience.
- **Local Data Storage**: Utilizes IndexedDB for efficient data storage and retrieval.

## Technologies Used

- **React**: For building the user interface.
- **IndexedDB**: For local data storage and management.
- **[Nyckel](https://www.nyckel.com/)**: For image classification.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/carbonitor.git
   ```

2. Navigate to the project directory:

   ```sh
   cd carbonitor
   ```

3. Install NPM packages:

   ```sh
   npm install
   ```

### Available Scripts

In the project directory, you can run:

- **Development Server**

  ```sh
  npm run dev
  ```

  Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- **Build for Production**

  ```sh
  npm run build
  ```

  Builds the app for production to the `dist` folder.

- **Linting**

  ```sh
  npm run lint
  ```

  Lints and fixes files.

- **Preview Production Build**

  ```sh
  npm run preview
  ```

  Locally preview production build.
