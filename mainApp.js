import mainView from "./mainView.js";
import mainAPI from "./mainAPI.js";

export default class mainApp {
    constructor(root) {
        this.bookmarks = [];
        this.activeBookmark = null;
        this.view = new mainView(root, this._handlers());

        this._refreshBookmarks();
    }

    _refreshBookmarks() {
        const bookmarks = mainAPI.getAllBookmarks();

        this._setBookmarks(bookmarks);

        if (bookmarks.length > 0) {
            this._setActiveBookmark(bookmarks[0]);
        }
    }

    _setBookmarks(bookmarks) {
        this.bookmarks = bookmarks;
        this.view.updateBookmarkList(bookmarks);
        this.view.updateBookmarkPreviewVisibility(bookmarks.length > 0);
    }

    _setActiveBookmark(bookmark) {
        this.activeBookmark = bookmark;
        this.view.updateActiveBookmark(bookmark);
    }

    _handlers() {
        return {
            onBookmarkSelect: bookmarkId => {
                const selectedBookmark = this.bookmarks.find(bookmark => bookmark.id == bookmarkId);
                this._setActiveBookmark(selectedBookmark);
            },
            onBookmarkAdd: () => {
                const newBookmark = {
                    title: "New Bookmark",
                    body: "Take bookmark..."
                };

                mainAPI.saveBookmark(newBookmark);
                this._refreshBookmarks();
            },
            onBookmarkEdit: (title, body) => {
                mainAPI.saveBookmark({
                    id: this.activeBookmark.id,
                    title,
                    body
                });

                this._refreshBookmarks();
            },
            onBookmarkDelete: bookmarkId => {
                mainAPI.deleteBookmark(bookmarkId);
                this._refreshBookmarks();
            },
        };
    }
}
