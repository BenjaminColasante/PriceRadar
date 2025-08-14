import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([""]);
  const [mode, setMode] = useState("product");

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 2) {
      setInputs([...inputs, ""]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nonEmpty = inputs.filter((p) => p.trim() !== "");
    if (nonEmpty.length === 0) return;

    const params = new URLSearchParams();
    params.set("mode", mode);
    
    if (mode === "product") {
      params.set("product1", nonEmpty[0]);
      if (nonEmpty.length > 1) {
        params.set("product2", nonEmpty[1]);}
    } else {
      params.set("category1", nonEmpty[0]);
      if (nonEmpty.length > 1){
        params.set("category2", nonEmpty[1]);}
    }

    params.set("min_price", document.getElementById("minPrice").value);
    params.set("max_price", document.getElementById("maxPrice").value);
    params.set("min_rating", document.getElementById("minRating").value);
    params.set("in_stock_only", document.getElementById("inStock").checked);
    params.set("limit", document.getElementById("limit").value);

    params.set("show_price", document.getElementById("showPrice").checked);
    params.set("show_rating", document.getElementById("showRating").checked);
    params.set("show_stock", document.getElementById("showStock").checked);
    params.set("show_shipping", document.getElementById("showShipping").checked);

    navigate(`/result?${params.toString()}`);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "100px",
      fontFamily: "Arial"
    }}>
      <div style={{
        backgroundColor: "#f8f8f8",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "750px",
        width: "100%",
      }}>
        <h2 style={{ textAlign: "center", fontFamily: "Roboto, sans-serif" }}>PriceRadar Deal Finder</h2>

        <div style={
          {display: "flex",
           justifyContent: "center",
           marginBottom: 20 
           }}>
          <button
            type="button"
            onClick={() => setMode("product")}
            onMouseEnter={(e) => {
              if (mode !== "product") {
                e.target.style.backgroundColor = "#c0c0c0";
              }
            }}
            onMouseLeave={(e) => {
              if (mode !== "product") {
                e.target.style.backgroundColor = "#ddd";
              }
            }}
            onMouseDown={(e) => {
              if (mode !== "product") {
                e.target.style.backgroundColor = "#a0a0a0";
              }
            }}
            onMouseUp={(e) => {
              if (mode !== "product") {
                e.target.style.backgroundColor = "#c0c0c0";
              }
            }}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: mode === "product" ? "#2b2b2b" : "#ddd",
              color: mode === "product" ? "white" : "black",
              border: "none",
              borderRadius: "6px 0 0 6px",
              cursor: "pointer",
              transition: "background-color 0.03s ease"
            }}
          >
            Best Deal Finder (Product)
          </button>
          <button
            type="button"
            onClick={() => setMode("category")}
            onMouseEnter={(e) => {
              if (mode !== "category") {
                e.target.style.backgroundColor = "#c0c0c0";
              }
            }}
            onMouseLeave={(e) => {
              if (mode !== "category") {
                e.target.style.backgroundColor = "#ddd";
              }
            }}
            onMouseDown={(e) => {
              if (mode !== "category") {
                e.target.style.backgroundColor = "#a0a0a0";
              }
            }}
            onMouseUp={(e) => {
              if (mode !== "category") {
                e.target.style.backgroundColor = "#c0c0c0";
              }
            }}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: mode === "category" ? "#2b2b2b" : "#ddd",
              color: mode === "category" ? "white" : "black",
              border: "none",
              borderRadius: "0 6px 6px 0",
              cursor: "pointer",
              transition: "background-color 0.03s ease"
            }}
          >
            Best Deal Finder (Category)
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {inputs.map((val, index) => (
            <input
              key={index}
              type="text"
              placeholder={mode === "product" ? `Enter product ${index + 1}` : `Enter category ${index + 1}`}
              value={val}
              onChange={(e) => handleChange(index, e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                fontSize: 16,
                marginTop: index === 0 ? 0 : 10,
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            />
          ))}
          {inputs.length < 2 && (
            <button
              type="button"
              onClick={addInput}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#d0d0d0";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#eee";
              }}
              onMouseDown={(e) => {
                e.target.style.backgroundColor = "#b0b0b0";
              }}
              onMouseUp={(e) => {
                e.target.style.backgroundColor = "#d0d0d0";
              }}
              style={{
                marginTop: 10,
                padding: "6px 10px",
                fontSize: 14,
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background-color 0.03s ease"
              }}
            >
              + Add Another {mode === "product" ? "Product" : "Category"}
            </button>
          )}

          {}
          <div style={{ marginTop: 20 }}>
            <h3>Filters</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input id="minPrice" type="number" placeholder="Min Price" style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
              <input id="maxPrice" type="number" placeholder="Max Price" style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
              <select id="minRating" style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}>
                {[0,1,2,3,4,5].map(i => (
                  <option key={i} value={i}>{i}+ rating</option>
                ))}
              </select>
              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input id="inStock" type="checkbox" /> In Stock Only
              </label>
            </div>
          </div>

          {}
          <div style={{ marginTop: 20 }}>
            <h3>Display Options</h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <label><input id="showPrice" type="checkbox" defaultChecked/> Show Price</label>
              <label><input id="showRating" type="checkbox" defaultChecked/> Show Rating</label>
              <label><input id="showStock" type="checkbox" defaultChecked/> Show Stock</label>
              <label><input id="showShipping" type="checkbox" defaultChecked/> Show Delivery/Shipping</label>
              <select id="limit" defaultValue="5" style={{ flex: 1, padding: 8, borderRadius: 6,marginTop: "-6px", border: "1px solid #ccc" }}>
                {[3, 5, 10, 15].map(i => (
                  <option key={i} value={i}>{i} results</option>
                ))}
              </select>
            </div>
          </div>

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
            style={{
              marginTop: 20,
              padding: 12,
              fontSize: 16,
              backgroundColor: "#2b2b2b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              transition: "background-color 0.03s ease"
            }}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;