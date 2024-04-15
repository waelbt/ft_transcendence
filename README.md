# React Native Application Setup

Welcome to the React Native Application repository. This README will guide you through setting up the application and starting the JSON server with `ngrok` for data fetching.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js
- npm or Yarn
- React Native CLI
- Expo CLI (if using Expo)
- `ngrok` for exposing local servers to the internet

## Installation

Follow these steps to get your development environment set up:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/waelbt/assignment-react-native.git
   cd assignment-react-native
   ```

2. **Install Dependencies:**
   Navigate to the project directory and run:
   ```bash
   npm install
   ```

3. **Start the React Native Application:**
   To start the application, run:
   ```bash
   npm start
   ```

## Setting Up the JSON Server

To fetch data from a local JSON server, you need to set up `ngrok` to expose your server to the internet:

1. **Start JSON Server:**
   First, make sure you have `json-server` installed globally. If not, install it using:
   ```bash
   npm install -g json-server
   ```
   Then start your JSON server on a specific port (e.g., 3000):
   ```bash
   json-server --watch db.json --port 3000
   ```

2. **Expose Local Server Using `ngrok`:**
   In a new terminal window, expose your local server to the internet with `ngrok`:
   ```bash
   ngrok http 3000
   ```
   This will provide you with a URL that forwards to your local server. Note down the URL as it will be used in your React Native application to fetch data.
  
 3 - **Update the URL in `app/hooks/useProduct.js`:**
   Open the `useProduct.js` file located in your `app/hooks` directory. Find the `fetch` call within the `useEffect` function and replace the existing URL with the URL provided by `ngrok`. For example:

   ```javascript
   const useProduct = () => {
       const [products, setProducts] = useState([]);
       const [error, setError] = useState(false);

       useEffect(() => {
           const fetchData = async () => {
               try {
                   setError(false);
                   // Replace the URL below with your ngrok URL
                   const response = await fetch("https://your-ngrok-url.ngrok.io/products");
                   const data = await response.json();
                   setProducts(data);
               } catch (error) {
                   console.log(error.message);
                   setError(true);
               }
           };

           fetchData();
       }, []);

       return { products, error };
   };

   export default useProduct;
   ```

   Make sure to replace `"https://your-ngrok-url.ngrok.io/products"` with the actual `ngrok` URL you noted earlier.


## Configuring the Application

Update your application's data fetching logic to use the `ngrok` URL provided. For example, replace the base URL in your API calls with the `ngrok` URL.

## Running the Application

Now that everything is set up, you can run your React Native application as mentioned in the Installation section. It should now be able to fetch data from your local JSON server through `ngrok`.
Here’s how you can update the README to include specific instructions for updating the URL in `app/hooks/useProduct.js` when setting up the JSON server and using `ngrok`:

---
