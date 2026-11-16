// TEAM A: Implement book management here.
// All methods receive shared state and return { ok: boolean, message: string }.
// Do not change the object structure documented in README.md.
window.BookTeam = {
  addBook(state, details) {
    // TODO A1: Validate required fields, ISBN format and duplicate ISBN.
    // TODO A2: Create a unique ID and push a book into state.books.
    return { ok: false, message: 'Team A: Add book has not been implemented yet.' };
  },

  updateBook(state, bookId, details) {
    // TODO A3: Find the book by ID and update its details.
    // TODO A4: Validate fields and ensure ISBN is unique among OTHER books.
    return { ok: false, message: 'Team A: Edit book has not been implemented yet.' };
  },

  deleteBook(state, bookId) {
    // TODO A5: Prevent deletion when this book has an active loan.
    // An active loan has the same bookId and returnedOn === null.
    // TODO A6: Remove the book from state.books otherwise.
    return { ok: false, message: 'Team A: Delete book has not been implemented yet.' };
  }
};
