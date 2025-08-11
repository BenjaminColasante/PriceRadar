import React, {createContext,useContext,useState,useEffect} from "react";

const BookmarkContext = createContext();

export function BookmarkProvider({children}) {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedItems");
    if (saved) {
      setBookmarkedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarkedItems", JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  const addBookmark = (item, retailer) => {

    const bookmarkId = Date.now() + Math.random();
    setBookmarkedItems((prev) => [...prev, { ...item, retailer, bookmarkId }]);
  };

  const removeBookmark = (bookmarkId) => {
    setBookmarkedItems((prev) =>
      prev.filter((b) => b.bookmarkId !== bookmarkId)
    );
  };

  const isBookmarked = (item, retailer) => {
    return bookmarkedItems.some(
      (b) => b.title === item.title && b.retailer === retailer
    );
  };

  const getBookmarkId = (item, retailer) => {
    const bookmark = bookmarkedItems.find(
      (b) => b.title === item.title && b.retailer === retailer
    );
    return bookmark ? bookmark.bookmarkId : null;
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedItems,
        addBookmark,
        removeBookmark,
        isBookmarked,
        getBookmarkId,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}