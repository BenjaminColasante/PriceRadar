# Price Radar
PriceRadar is a web application that helps users find the best deals for specific products and categories available on select online retailers. It provides up-to-date information on pricing, availability, rating, and shipping for products sold on Walmart and Amazon, with options to filter items based on desired specifications. PriceRadar enables users to compare products side by side and save items for future reference, ensuring they stay informed about the details of their favorite items.

Website: https://www.mypriceradar.com

Backend Setup:
1. Clone the repository
2. Set up a Python virutal environment (Optional but recommended)
3. Intall the Python dependencies
    pip install -r requirements.txt
4. Set up environment variables
  #Copy the example file
  cp .env.example .env
  #Edit .env and add your API keys
  API_KEY = your_serpAPI_key
5. Run app.py

Frontend Setup:
1. Navigate to price-frontend directory and install dependencies
    npm install
2. Set up environment variables (Optional for local development)
  #Create .env.local file
    echo "REACT_APP_API_BASE=http://localhost:5000" > .env.local
3. Start the React development server
    npm start

API key setup:
This project requires a serpAPI key for its scraping capabilities. You can sign up for free at serpAPI.com and add your key to the .env file.

<img width="1920" height="967" alt="PriceRadarHome" src="https://github.com/user-attachments/assets/4aedb60d-c966-48af-aaf8-3679dfb50f1f" />
<img width="1905" height="952" alt="PriceRadarSearch" src="https://github.com/user-attachments/assets/1d42b51d-7461-4e5f-9dc9-90703d0aeb21" />
<img width="1905" height="952" alt="PriceRadarResults" src="https://github.com/user-attachments/assets/35a0506f-cabe-4d68-b78d-e371be4e4b55" />
<img width="1920" height="967" alt="PriceRadarSaved" src="https://github.com/user-attachments/assets/f08ca6d7-ab97-404c-b396-8ce2e3047fae" />

