export default class mainAPI  {
    static getAllBookmarks(){
        const bookmarks = JSON.parse(localStorage.getItem("bookmarksapp-bookmarks") || "[]");

        return bookmarks.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }
    static saveBookmark(bookmarkToSave) {
        const bookmarks = mainAPI.getAllBookmarks();
        const existing = bookmarks.find(bookmark => bookmark.id == bookmarkToSave.id);
    
        // Edit existing bookmark
        if (existing) {
            existing.title = bookmarkToSave.title;
            existing.body = bookmarkToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            bookmarkToSave.id = Math.floor(Math.random() * 1000000);
            bookmarkToSave.updated = new Date().toISOString();
            bookmarks.push(bookmarkToSave);
        }
    
        localStorage.setItem("bookmarksapp-bookmarks", JSON.stringify(bookmarks)); 
    }
    
    static deleteBookmark(id) {
        const bookmarks = mainAPI.getAllBookmarks();
        const newBookmarks = bookmarks.filter(bookmark => bookmark.id != id);
    
        localStorage.setItem("bookmarksapp-bookmarks", JSON.stringify(newBookmarks)); 
    }
    
}