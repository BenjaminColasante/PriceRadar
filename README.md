# PriceRadar
## Project Overview
PriceRadar is a web application that helps users find the best deals for products and categories available on Walmart and Amazon. It provides up-to-date information on pricing, availability, rating, and shipping, with options to filter, compare, and save products for a fully customizable experience. PriceRadar was developed with

You can try PriceRadar right now using the following link: [https://www.mypriceradar.com](https://www.mypriceradar.com)

## Features
* Real-time scraping from Walmart and Amazon (Flask backend)
* Frontend built with React
* Compare products or categories side by side
* Filter by price, rating, stock, shipping, and delivery options
* Bookmark favorite items for future reference

## Prerequisites
Before running the project locally, ensure you have the following installed:<br>

**Backend (Flask / Python)** <br>
* Python 3.9+  
* pip (Python package manager)  

**Frontend (React / Node.js)** <br>
* Node.js
* npm (Packaged with Node.js)


## Local Development Setup 
Backend Setup:<br>
**1. Clone the repository:**<br>
```
git clone https://github.com/BenjaminColasante/PriceRadar.git
cd PriceRadar
```
**2. Navigate to the price-backend directory and install the Python dependencies:**<br>
```
cd price-backend
pip install -r requirements.txt
```
**3. Set up environment variables:**<br>
```
# Copy the example file
cp .env.example .env

# Edit .env by adding your API key
API_KEY = your_serpAPI_key
```
**4. Run the backend:**<br>
```
python app.py
```

Frontend Setup:<br>
**1. Navigate to the price-frontend directory and install dependencies:**<br>
```
cd price-frontend
npm install
```
**2. Set up environment variables (Optional for local development):**<br>
```
#Create .env.local file
echo "REACT_APP_API_BASE=http://localhost:5000" > .env.local
```
**3. Start the React development server:**<br>
```
npm start
```

Once the program is running, you can access the application in your browser at [http://localhost:3000](http://localhost:3000).

<img width="1920" height="967" alt="PriceRadarHome" src="https://github.com/user-attachments/assets/4aedb60d-c966-48af-aaf8-3679dfb50f1f" />
<img width="1905" height="952" alt="PriceRadarSearch" src="https://github.com/user-attachments/assets/1d42b51d-7461-4e5f-9dc9-90703d0aeb21" />
<img width="1905" height="952" alt="PriceRadarResults" src="https://github.com/user-attachments/assets/35a0506f-cabe-4d68-b78d-e371be4e4b55" />
<img width="1920" height="967" alt="PriceRadarSaved" src="https://github.com/user-attachments/assets/f08ca6d7-ab97-404c-b396-8ce2e3047fae" />

