import React from "react";
import {useBookmarks} from "./BookmarkContext";

const badgeStyle = {
  display: "inline-block",
  padding: "2px 6px",
  marginLeft: 8,
  fontSize: 11,
  borderRadius: 4,
  backgroundColor: "#1e88e5",
  color: "#fff",
};

const cardStyle = {
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
  color: "#111"};

function normalizeDelivery(available) {
  if (!available){
    return null;}
  if (Array.isArray(available)){
    return available.join(" • ");
  }
  return String(available);
}

const SavedProducts = () => {
  const {bookmarkedItems, removeBookmark} = useBookmarks();

  const groupedItems = bookmarkedItems.reduce((acc, item) => {
    if (!acc[item.retailer]) {
      acc[item.retailer] = [];
    }
    acc[item.retailer].push(item);
    return acc;
  }, {});

  const handleRemoveBookmark = (bookmarkId) => {
    removeBookmark(bookmarkId);
  };

  if (bookmarkedItems.length === 0) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
        fontFamily: "Arial",
        padding: "0 20px"
      }}>
        <div style={{
          maxWidth: "600px",
          width: "100%"
        }}>
          <h2 style={{
            textAlign: "center",
            color: "#2b2b2b",
            marginBottom: "30px"}}>
            Saved Products
          </h2>
          <div style={cardStyle}>
            <p style={{textAlign: "center",
              color: "#666",
              fontSize: "18px"}}>
              No saved products yet. Start browsing and click the star icon to save products!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "100px",
      fontFamily: "Arial",
      padding: "0 20px"
    }}>
      <div style={{
        maxWidth: "1000px",
        width: "100%"
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#2b2b2b",
          marginBottom: "30px" }}>
          Saved Products ({bookmarkedItems.length})
        </h2>
        
        {Object.entries(groupedItems).map(([retailer, items]) => (
          <div key={retailer} style={cardStyle}>
            <h3 style={{
              marginTop: "0",
              color: "#2b2b2b",
              fontSize: "20px",
              marginBottom: "20px" }}>
              {retailer} ({items.length} items)
            </h3>
            
            {items.map((item) => (
              <div key={item.bookmarkId} style={itemCard}>
                {}
                <button
                  onClick={() => handleRemoveBookmark(item.bookmarkId)}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "#ffd700",
                    padding: "2px"
                  }}
                  title="Remove from saved"
                  onMouseEnter={(e) => {
                    e.target.style.color = "#ffed4e";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#ffd700";
                  }}
                >
                  ★
                </button>

                <div>
                  {item.link ? (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ 
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
                      {item.title || "(no title)"}
                    </a>
                  ) : (
                    <span style={{
                      fontSize: 16,
                      paddingRight: "30px"
                    }}>{item.title || "(no title)"}</span>
                  )}
                  {item.prime && <span style={badgeStyle}>Prime</span>}
                </div>

                {typeof item.price === "number" && (
                  <div style={line}><span style={lineLabel}>Price:</span> ${item.price.toFixed(2)}</div>
                )}

                {(item.rating != null || item.reviews != null) && (
                  <div style={line}>
                    <span style={lineLabel}>Rating:</span> {item.rating != null ? item.rating : "—"} {item.reviews != null ? `(${item.reviews} reviews)` : ""}
                  </div>
                )}

                {item.stock != null && (
                  <div style={line}>
                    <span style={lineLabel}>Stock:</span>{" "}
                    {typeof item.stock === "boolean" ? (item.stock ? "In stock" : "Out of stock") : "—"}
                  </div>
                )}

                {retailer === "Walmart" && item.free_shipping != null && (
                  <div style={line}><span style={lineLabel}>Free Shipping:</span> {item.free_shipping ? "Yes" : "No"}</div>
                )}

                {retailer === "Amazon" && item.availability && (
                  <div style={line}><span style={lineLabel}>Delivery:</span> {normalizeDelivery(item.availability) || "—"}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedProducts;