import React, {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useBookmarks} from "./BookmarkContext";

const useQuery = () => new URLSearchParams(useLocation().search);

const badgeStyle = {
  display: "inline-block",
  padding: "2px 6px",
  marginLeft: 8,
  fontSize: 11,
  borderRadius: 4,
  backgroundColor: "#1e88e5",
  color: "#fff",
  border: "1px solid #1669b2",
};

const cardStyle = {
  backgroundColor: "#f8f8f8",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};

const controlsCardStyle = {
  backgroundColor: "#f8f8f8",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};

const itemCard = { 
  borderRadius: "8px", 
  padding: "12px", 
  marginBottom: "12px", 
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  position: "relative"
};

const line = {
  fontSize: 15,
  color: "#222",
  marginTop: 6
};
const lineLabel = {
  fontWeight: 700,
  color: "#111"
};

const inputStyle = {
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  boxSizing: "border-box"
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#2b2b2b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "10px"
};

const compareCardStyle = {
  backgroundColor: "#f8f8f8",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  marginBottom: "20px",
};

function normalizeDelivery(available) {
  if (!available){
    return null;}
  if (Array.isArray(available)){
    return available.join(" • ");}
  return String(available);
}

const RetailerList = ({title, items, showPrice, showRating, showStock, showShipping, showDelivery}) => {
  const {addBookmark, removeBookmark, isBookmarked, getBookmarkId} = useBookmarks();

  const handleBookmarkClick = (item) => {
    if (isBookmarked(item, title)) {
      const bookmarkId = getBookmarkId(item, title);
      removeBookmark(bookmarkId);
    } else {
      addBookmark(item, title);
    }
  };

  return (
    <div style={{ marginBottom: "25px" }}>
      <h4 style={{
        color: "#2b2b2b",
        marginBottom: "12px",
        fontSize: "18px"
        }}
        >{title}:</h4>

      {items && items.length ? (
        <div>
          {items.map((it, i) => (
            <div key={`${title}-${i}`} style={itemCard}>
              {}
              <button
                onClick={() => handleBookmarkClick(it)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: isBookmarked(it, title) ? "#ffd700" : "#ccc",
                  padding: "2px"
                }}
                title={isBookmarked(it, title) ? "Remove from saved" : "Save product"}
                onMouseEnter={(e) => {
                  e.target.style.color = isBookmarked(it, title) ? "#ffed4e" : "#ffd700";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = isBookmarked(it, title) ? "#ffd700" : "#ccc";
                }}
              >
                {isBookmarked(it, title) ? "★" : "☆"}
              </button>

              <div>
                {it.link ? (
                  <a href={it.link} target="_blank" rel="noreferrer" style={{ 
                    fontSize: 16,
                    textDecoration: "none", 
                    color: "#2b2b2b",
                    cursor: "pointer",
                    paddingRight: "30px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#1a73e8";
                    e.target.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#2b2b2b";
                    e.target.style.textDecoration = "none";
                  }} 
                  >
                    {it.title || "(no title)"}
                  </a>
                ) : (
                  <span style={{
                    fontSize: 16,
                    paddingRight: "30px"
                  }}>{it.title || "(no title)"}</span>
                )}
                {it.prime && <span style={badgeStyle}>Prime</span>}
              </div>

              {showPrice && typeof it.price === "number" && (
                <div style={line}><span
                style={lineLabel}>Price:</span> ${it.price.toFixed(2)}</div>
              )}

              {showRating && (it.rating != null || it.reviews != null) && (
                <div style={line}>
                  <span style={lineLabel}>Rating:</span> 
                  {it.rating != null ? it.rating : "—"}
                  {it.reviews != null ? `(${it.reviews} reviews)` : ""}
                </div>
              )}

              {showStock && (
                <div style={line}>
                  <span style={lineLabel}>Stock:</span>{" "}
                  {typeof it.stock === "boolean" ? (it.stock ? "In stock" : "Out of stock") : "—"}
                </div>
              )}

              {title === "Walmart" && showShipping && (
                <div style={line}><span style={lineLabel}>Free Shipping:</span> {it.free_shipping ? "Yes" : "No"}</div>
              )}

              {title === "Amazon" && showDelivery && (
                <div style={line}><span style={lineLabel}>Delivery:</span> {normalizeDelivery(it.availability) || "—"}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#666", fontStyle: "italic" }}>No items found.</p>
      )}
    </div>
  );
};

const ResultPage = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const mode = (query.get("mode") || "product").toLowerCase();
  const product1 = query.get("product1");
  const product2 = query.get("product2");
  const category1 = query.get("category1");
  const category2 = query.get("category2");

  const [minRating, setMinRating] = useState(query.get("min_rating") || "");
  const [minPrice, setMinPrice] = useState(query.get("min_price") || "");
  const [maxPrice, setMaxPrice] = useState(query.get("max_price") || "");
  const [inStockOnly, setInStockOnly] = useState((query.get("in_stock_only") || "false") === "true");

  const [showPrice, setShowPrice] = useState((query.get("show_price") ?? "true") === "true");
  const [showRating, setShowRating] = useState((query.get("show_rating") ?? "true") === "true");
  const [showStock, setShowStock] = useState((query.get("show_stock") ?? "true") === "true");
  const [showShipping, setShowShipping] = useState((query.get("show_shipping") ?? "true") === "true");
  const [showDelivery, setShowDelivery] = useState((query.get("show_delivery") ?? "true") === "true");
  const [limit, setLimit] = useState(Number(query.get("limit") || 5));

  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);
  const [loadingFirst, setLoadingFirst] = useState(false);
  const [loadingSecond, setLoadingSecond] = useState(false);
  const [error, setError] = useState("");

  const [compareInput, setCompareInput] = useState("");

  const commonParams = useMemo(() => {
    const p = new URLSearchParams();
    if (minRating !== ""){
      p.set("min_rating", minRating);
    }
    if (minPrice !== ""){
      p.set("min_price", minPrice);
    }
    if (maxPrice !== ""){
      p.set("max_price", maxPrice);
    }
    if (inStockOnly){
      p.set("in_stock_only", "true");
    }
    p.set("limit", String(limit));
    p.set("show_price", String(showPrice));
    p.set("show_rating", String(showRating));
    p.set("show_stock", String(showStock));
    p.set("show_shipping", String(showShipping));
    p.set("show_delivery", String(showDelivery));
    return p.toString();
  }, [minRating, minPrice, maxPrice, inStockOnly, limit, showPrice, showRating, showStock, showShipping, showDelivery]);

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      setResult1(null);
      setResult2(null);
      try {
        const leftKey = mode === "category" ? category1 : product1;
        if (leftKey) {
          setLoadingFirst(true);
          const endpoint = mode === "category" ? "best_deals/category" : "best_deals/product";
          const res1 = await fetch(`http://127.0.0.1:5000/${endpoint}/${encodeURIComponent(leftKey)}?${commonParams}`);
          const data1 = await res1.json();
          if (!res1.ok){
             throw new Error(data1.error || "Error fetching left column");
          }
          setResult1(data1);
        }
        const rightKey = mode === "category" ? category2 : product2;
        if (rightKey) {
          setLoadingSecond(true);
          const endpoint = mode === "category" ? "best_deals/category" : "best_deals/product";
          const res2 = await fetch(`http://127.0.0.1:5000/${endpoint}/${encodeURIComponent(rightKey)}?${commonParams}`);
          const data2 = await res2.json();
          if (!res2.ok){
             throw new Error(data2.error || "Error fetching right column");
          }
          setResult2(data2);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingFirst(false);
        setLoadingSecond(false);
      }
    };
    fetchData();
  }, [mode, product1, product2, category1, category2, commonParams]);

  useEffect(() => {
    const p = new URLSearchParams();
    p.set("mode", mode);
    if (mode === "category") {
      if (category1){
        p.set("category1", category1);
      }
      if (category2){
        p.set("category2", category2);
      }
    }
    else {
      if (product1){
        p.set("product1", product1);
      }
      if (product2){
        p.set("product2", product2);
      }
    }
    commonParams.split("&").forEach(kv => {
      const [k, v] = kv.split("=");
      if (k){
        p.set(k, decodeURIComponent(v || ""));}
    });
    navigate(`/result?${p.toString()}`, { replace: true });
  }, [mode, product1, product2, category1, category2, commonParams, navigate]);

  const handleCompareSubmit = (e) => {
    e.preventDefault();
    if (!compareInput.trim()){
      return;}

    const p = new URLSearchParams(window.location.search);
    p.set("mode", mode);
    if (mode === "category") {
      p.set("category1", category1 || compareInput.trim());
      p.set("category2", compareInput.trim());
    } 
    else {
      p.set("product1", product1 || compareInput.trim());
      p.set("product2", compareInput.trim());
    }
    commonParams.split("&").forEach(kv => {
      const [k, v] = kv.split("=");
      if (k){
        p.set(k, decodeURIComponent(v || ""));
      }
    });

    navigate(`/result?${p.toString()}`);
    setCompareInput("");
  };

  const headerFor = (res, fallback) => res?.product_name || res?.category_name || fallback || "";

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "50px",
      fontFamily: "Arial",
      padding: "0 20px"
    }}>
      <div style={{
        maxWidth: "1200px",
        width: "100%"
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#2b2b2b",
          marginBottom: "30px",
          marginTop: "35px"
          }}>
          {mode === "category" ? "Best Deals — Category" : "Best Deals — Product"}
        </h2>
        
        {error && (
          <div style={{
            ...cardStyle,
            backgroundColor: "#ffe6e6",
            color: "#cc0000",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {}
        <div style={controlsCardStyle}>
          <h3 style={{
            marginTop: "0",
            color: "#2b2b2b",
            marginBottom: "6px"
            }}>Filters</h3>

          <div style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap"
            }}>
            <div>
              <label style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "5px",
                color: "#333"
                }}>Min Rating</label>

              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                style={{ ...inputStyle, width: "110px" }}
              >
                <option value="">Any</option>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}+</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "5px",
                color: "#333"
                }}>Min Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ ...inputStyle, width: "120px" }}
              />
            </div>
            <div>
              <label style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "5px",
                color: "#333"
                }}>Max Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ ...inputStyle, width: "120px" }}
              />
            </div>
            <div>
              <label style={{
                display: "block",
                fontSize: "14px",
                marginBottom: "5px",
                color: "#333"
                }}>Limit</label>
              <select 
                value={limit} 
                onChange={(e) => setLimit(Number(e.target.value))}
                style={{ ...inputStyle, width: "110px" }}
              >
                {[3, 5, 10, 15].map((n) => (
                  <option key={n} value={n}>{n} results</option>
                ))}
              </select>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginTop: "21px" }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "5px" }}>
                <input 
                  type="checkbox" 
                  checked={inStockOnly} 
                  onChange={(e) => setInStockOnly(e.target.checked)} 
                />
                In Stock Only
              </label>
            </div>
          </div>

          <h3 style={{
            color: "#2b2b2b",
            marginBottom: "8px",
            }}>Display Options</h3>
          <div style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap"
            }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "5px"
              }}>
              <input type="checkbox" checked={showPrice} onChange={(e) => setShowPrice(e.target.checked)} /> 
              Show Price
            </label>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "5px"
              }}>
              <input type="checkbox" checked={showRating} onChange={(e) => setShowRating(e.target.checked)} /> 
              Show Rating
            </label>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "5px"
              }}>
              <input type="checkbox" checked={showStock} onChange={(e) => setShowStock(e.target.checked)} /> 
              Show Stock
            </label>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "5px"}}>
              <input type="checkbox" checked={showShipping} onChange={(e) => setShowShipping(e.target.checked)} /> 
              Free Shipping (Walmart)
            </label>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "5px" }}>
              <input type="checkbox" checked={showDelivery} onChange={(e) => setShowDelivery(e.target.checked)} /> 
              Delivery (Amazon)
            </label>
          </div>
        </div>

          {}
           <div style={compareCardStyle}>
          <h3 style={{
            marginTop: "0",
            color: "#2b2b2b"}}>
            {mode === "category" ? "Compare Another Category" : "Compare with Another Product"}
          </h3>
          <form onSubmit={handleCompareSubmit}>
            <input
              type="text"
              placeholder={mode === "category" ? "Enter second category" : "Enter second product name"}
              value={compareInput}
              onChange={(e) => setCompareInput(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxSizing: "border-box"
              }}
            />
            <button 
            type="submit"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#262626";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#2b2b2b";
            }}
            onMouseDown={(e) => {
              e.target.style.backgroundColor = "#242424";
            }}
            onMouseUp={(e) => {
              e.target.style.backgroundColor = "#262626";
            }}
            style={buttonStyle}>
              Compare
            </button>
          </form>
        </div>

        {}
        <div style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap"}}>

          <div style={{flex: 1, minWidth: "300px"}}>
            {loadingFirst ? (
              <div style={cardStyle}>
                <p style={{
                  textAlign: "center",
                  color: "#666"
                  }}>Loading…</p>
              </div>
            ) : result1 ? (
              <div style={cardStyle}>
                <h3 style={{
                  marginTop: "0",
                  color: "#2b2b2b",
                  fontSize: "20px",
                  marginBottom: "20px"}}>
                  {headerFor(result1, mode === "category" ? category1 : product1)}
                </h3>
                
                <RetailerList
                  title="Walmart"
                  items={result1.walmart_items}
                  showPrice={showPrice}
                  showRating={showRating}
                  showStock={showStock}
                  showShipping={showShipping}
                  showDelivery={showDelivery}
                />
                <RetailerList
                  title="Amazon"
                  items={result1.amazon_items}
                  showPrice={showPrice}
                  showRating={showRating}
                  showStock={showStock}
                  showShipping={showShipping}
                  showDelivery={showDelivery}
                />
              </div>
            ) : null}
          </div>

          <div style={{flex: 1, minWidth: "300px"}}>
            {loadingSecond ? (
              <div style={cardStyle}>
                <p style={{textAlign: "center", color: "#666"}}>Loading…</p>
              </div>
            ) : result2 ? (
              <div style={cardStyle}>
                <h3 style={{
                  marginTop: "0",
                  color: "#2b2b2b",
                  fontSize: "20px",
                  marginBottom: "20px"}}>
                  {headerFor(result2, mode === "category" ? category2 : product2)}
                </h3>
                
                <RetailerList
                  title="Walmart"
                  items={result2.walmart_items}
                  showPrice={showPrice}
                  showRating={showRating}
                  showStock={showStock}
                  showShipping={showShipping}
                  showDelivery={showDelivery}
                />
                <RetailerList
                  title="Amazon"
                  items={result2.amazon_items}
                  showPrice={showPrice}
                  showRating={showRating}
                  showStock={showStock}
                  showShipping={showShipping}
                  showDelivery={showDelivery}
                />
              </div>
            ) : (mode === "category" ? category2 : product2) ? (
              <div style={cardStyle}>
                <p style={{
                  color: "#666",
                  textAlign: "center",
                  fontStyle: "italic"
                  }}>No results found.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;