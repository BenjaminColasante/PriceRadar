import requests, json

API_KEY = "2666589d75c53f1be17121ed11d5e58a4860b988aaf76b936facc1a6e8bc0d42"

def fetch_amazon_items(product_name):
    params = {
        "engine": "amazon",
        "k": product_name,
        "amazon_domain": "amazon.ca",
        "api_key": API_KEY
    }
    reqs = requests.get("https://serpapi.com/search", params=params)
    data = reqs.json()
    print(json.dumps(data, indent=2))

    items = []
    for i in data.get("organic_results", []):
        price = i.get("extracted_price")
        availability = i.get("availability")
        if not availability:
            availability = i.get("delivery")
        stock = None
        if price is not None:
            stock = True
        if isinstance(availability, str) and "unavailable" in availability.lower():
            stock = False
        if isinstance(availability, list):
            for x in availability:
                if "unavailable" in str(x).lower():
                    stock = False
                    break

        item = {
            "source": "amazon",
            "title": i.get("title"),
            "link": i.get("link_clean") or i.get("link"),
            "price": float(price) if isinstance(price, (int, float)) else None,
            "rating": i.get("rating"),
            "reviews": i.get("reviews"),
            "stock": stock,
            "availability": availability,
            "thumbnail": i.get("thumbnail"),
            "prime": bool(i.get("prime")),
            "free_shipping": bool(i.get("free_shipping")) or ("free shipping" in str(i.get("shipping") or "").lower())
        }
        items.append(item)
    return items
