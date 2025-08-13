from flask import Flask, jsonify, request
from flask_cors import CORS
from walmart_scraper import fetch_walmart_items
from amazon_scraper import fetch_amazon_items

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000",
    "https://price-radar-khaki.vercel.app",
    "https://price-radar-git-main-benjamins-projects-0d22a47c.vercel.app"  # Also remove trailing slash here
])

def parse_bool(v,default=False):
    if v is None:
        return default
    return str(v).lower() in ("1","true","yes","y","on")

def parse_filters(req):
    def helper(key):
        try:
            value = req.args.get(key)
            if value:
                return float(value)
            else:
                return None
        except ValueError:
            return None
        
    try:
        limit = int(req.args.get("limit", 5))
    except ValueError:
        limit = 5
    return {
        "min_rating": helper("min_rating"),
        "min_price": helper("min_price"),
        "max_price": helper("max_price"),
        "in_stock_only": parse_bool(req.args.get("in_stock_only"),False),
        "limit": max(1, min(limit, 20)),
    }

def passes_filters(item,f):
    p = item.get("price")
    r = item.get("rating")
    s = item.get("stock")
    if f["min_rating"] is not None and (r is None or r<f["min_rating"]):
        return False
    if f["min_price"] is not None and (p is None or p<f["min_price"]):
        return False
    if f["max_price"] is not None and (p is None or p>f["max_price"]):
        return False
    if f["in_stock_only"] and s is False:
        return False
    return True

def clean_tokens(str1):
    if str1 is None:
        str1 = ""
    str1 = str1.lower()

    cleaned = ""
    for i in str1:
        if i.isalnum():    
            cleaned += i
        else:               
            cleaned += " "
    return cleaned.split()

def title_similarity(query, title):
    tempQT = set(clean_tokens(query))
    tempTT = set(clean_tokens(title))
    if not tempQT or not tempTT:
        return 0.0
    intersection = len(tempQT & tempTT)
    union = len(tempQT | tempTT)
    return intersection/union

def filter_same_product(items, query, threshold=0.35):
    cleaned_tokens = clean_tokens(query)
    long_cleaned_tokens = []
    for token in cleaned_tokens:
        if len(token) >= 5:
            long_cleaned_tokens.append(token)
    out = []
    for item in items:
        title = item.get("title", "")
        score = title_similarity(query,title)
        hit = score >= threshold
        if not hit and long_cleaned_tokens:
            lower_title = title.lower()
            for tok in long_cleaned_tokens:
                if tok in lower_title:
                    hit = True
                    break
        if hit:
            out.append(item)
    return out

def query_response(inputString, mode, req):
    filter = parse_filters(req)

    walmart_items = fetch_walmart_items(inputString)
    amazon_items  = fetch_amazon_items(inputString)

    if mode == "product":
        walmart_items = filter_same_product(walmart_items,inputString)
        amazon_items  = filter_same_product(amazon_items,inputString)

    filtered_walmart = []
    for i in walmart_items:
        if passes_filters(i, filter):
            filtered_walmart.append(i)
    walmart_items = filtered_walmart

    filtered_amazon = []
    for j in amazon_items:
        if passes_filters(j, filter):
            filtered_amazon.append(j)
    amazon_items = filtered_amazon

    def get_price(item):
        price = item.get("price")
        if price is None:
            return float('inf')
        else:
            return price

    walmart_items.sort(key=get_price)
    amazon_items.sort(key=get_price)

    walmart_items = walmart_items[:filter["limit"]]
    amazon_items  = amazon_items[:filter["limit"]]

    all_prices = []
    for item in walmart_items+amazon_items:
        price = item.get("price")
        if isinstance(price, (int, float)):
            all_prices.append(price)
    if not all_prices:
        return None, ("No competitor prices found after filters", 404)

    currentLoad = {
        "filters": {
            "min_rating": filter["min_rating"],
            "min_price": filter["min_price"],
            "max_price": filter["max_price"],
            "in_stock_only": filter["in_stock_only"],
            "limit": filter["limit"],
        },
        "walmart_items": walmart_items,
        "amazon_items": amazon_items,
    }
    if mode == "product":
        currentLoad["product_name"] = inputString
    else:
        currentLoad["category_name"] = inputString
        currentLoad["product_name"] = inputString

    return currentLoad, None


@app.route("/best_deals/product/<product_name>", methods=["GET"])
def best_deals_product(product_name):
    print(f">>> Best deals (product): {product_name}")
    data, err = query_response(product_name, mode="product", req=request)
    if err:
        msg, code = err
        return jsonify({"error": msg}), code
    return jsonify(data)

@app.route("/best_deals/category/<category>", methods=["GET"])
def best_deals_category(category):
    print(f">>> Best deals (category): {category}")
    data, err = query_response(category, mode="category", req=request)
    if err:
        msg, code = err
        return jsonify({"error": msg}), code
    return jsonify(data)

@app.route("/")
def home():
    return "Hello! Try /best_deals/product/<product> or /best_deals/category/<category>"

if __name__ == "__main__":
    app.run(debug=True)
