import requests, json
import os
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv('API_KEY')

def fetch_walmart_items(product_name):
    params = {
        "engine": "walmart",
        "query": product_name,
        "api_key": API_KEY
        }
    
    reqs = requests.get("https://serpapi.com/search", params=params)
    data = reqs.json()
    print(json.dumps(data, indent=2))

    items = []
    for i in data.get("organic_results", []):
        offer = i.get("primary_offer")
        if not offer:
            offer = {}
        price = offer.get("offer_price")
        stock = offer.get("in_stock")
        if stock is None:
            availability = offer.get("availability")
            if not availability:
                availability = i.get("availability")
            if isinstance(availability, str):
                stock = ("out of stock" not in availability.lower())

        item = {
            "source": "walmart",
            "title": i.get("title"),
            "link": i.get("product_page_url") or i.get("link"),
            "price": float(price) if isinstance(price, (int, float)) else None,
            "rating": i.get("rating"),
            "reviews": i.get("rating_count") or i.get("reviews"),
            "stock": bool(stock) if stock is not None else None,
            "availability": offer.get("availability"),
            "thumbnail": i.get("thumbnail"),
            "prime": False,
            "free_shipping": bool(i.get("free_shipping")) or ("free shipping" in str(i.get("shipping") or "").lower())
        }
        items.append(item)
    return items
