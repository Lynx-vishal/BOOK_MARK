export default class mainView {
    constructor(root, { onBookmarkSelect, onBookmarkAdd, onBookmarkEdit, onBookmarkDelete } = {}) {
        this.root = root;
        this.onBookmarkSelect = onBookmarkSelect;
        this.onBookmarkAdd = onBookmarkAdd;
        this.onBookmarkEdit = onBookmarkEdit;
        this.onBookmarkDelete = onBookmarkDelete;

        // Set initial HTML structure
        this.root.innerHTML = `
            <div class="bookmarks__sidebar">
                <button class="bookmarks__add" type="button">Add Bookmark</button>
                <div class="bookmarks__list"></div>
            </div>
            <div class="bookmarks__preview">
                <input class="bookmarks__title" type="text" placeholder="New Bookmark...">
                <textarea class="bookmarks__body" placeholder="Take bookmark..."></textarea>
            </div>    
        `;

        // Query elements
        const btnAddBookmark = this.root.querySelector(".bookmarks__add");
        const inpTitle = this.root.querySelector(".bookmarks__title");
        const inpBody = this.root.querySelector(".bookmarks__body");

        // Button click event
        btnAddBookmark.addEventListener("click", () => {
            this.onBookmarkAdd();
        });

        // Blur event for title and body
        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                // Trigger edit callback with updated values
                this.onBookmarkEdit(updatedTitle, updatedBody);
            });
        });

        // Initially hide the bookmark preview
        this.updateBookmarkPreviewVisibility(false);
    }

    // Create HTML for bookmarks
    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="bookmarks__list-item" data-bookmark-id="${id}">
                <div class="bookmarks__small-title">${title}</div>
                <div class="bookmarks__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="bookmarks__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short"})}
                </div>
            </div>
        `;
    }

    // Update bookmark list
    updateBookmarkList(bookmarks) {
        const bookmarksListContainer = this.root.querySelector(".bookmarks__list");

        // Clear previous list
        bookmarksListContainer.innerHTML = "";

        for (const bookmark of bookmarks) {
            const html = this._createListItemHTML(bookmark.id, bookmark.title, bookmark.body, new Date(bookmark.updated));
            bookmarksListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add click and double-click events
        bookmarksListContainer.querySelectorAll(".bookmarks__list-item").forEach(bookmarkListItem => {
            bookmarkListItem.addEventListener("click", () => {
                this.onBookmarkSelect(bookmarkListItem.dataset.bookmarkId);
            });

            bookmarkListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this bookmark?");
                if (doDelete) {
                    this.onBookmarkDelete(bookmarkListItem.dataset.bookmarkId);
                }
            });
        });
    }

    // Update active bookmark
    updateActiveBookmark(bookmark) {
        this.root.querySelector(".bookmarks__title").value = bookmark.title;
        this.root.querySelector(".bookmarks__body").value = bookmark.body;

        this.root.querySelectorAll(".bookmarks__list-item").forEach(bookmarkListItem => {
            bookmarkListItem.classList.remove("bookmarks__list-item--selected");
        });

        this.root.querySelector(`.bookmarks__list-item[data-bookmark-id="${bookmark.id}"]`).classList.add("bookmarks__list-item--selected");
    }

    // Control visibility of the bookmark preview
    updateBookmarkPreviewVisibility(visible) {
        this.root.querySelector(".bookmarks__preview").style.visibility = visible ? "visible" : "hidden";
    }
}
