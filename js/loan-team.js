// TEAM B: Implement the borrowing and returns functions here.
// All methods receive shared state and return { ok: boolean, message: string }.
// Date strings use YYYY-MM-DD. Loans are retained when returned.
window.LoanTeam = {
  borrowBook(state, bookId, borrower) {
    // TODO B1: Validate the borrower and find the selected book.
    // TODO B2: Refuse to lend a book that has an active loan.
    // TODO B3: Add a loan with a unique ID, today's borrowedOn date,
    //          dueOn 14 days later and returnedOn set to null.
    return { ok: false, message: 'Team B: Borrow book has not been implemented yet.' };
  },

  returnBook(state, loanId) {
    // TODO B4: Find the loan and ensure it has not already been returned.
    // TODO B5: Set returnedOn to today's date. Do not delete loan history.
    return { ok: false, message: 'Team B: Return book has not been implemented yet.' };
  }
};
