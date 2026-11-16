# Library Management System Starter

T Level Digital Software Development: team integration challenge.

## Run the starter

1. Extract the ZIP file.
2. Open `index.html` in a web browser. No server, installation or login is required.
3. Check the Book catalogue and Borrowing and returns tabs.

The navigation, book list, available-book dropdown and shared data already work. The Add, Edit, Delete, Borrow and Return buttons are deliberately unfinished. They show a message until students implement the relevant functions.

The five sample books reset when the page is refreshed. Data persistence is not required.

## Team responsibilities

**Team A: Book management**

Edit only `js/book-team.js` initially.

- `addBook(state, details)` adds a valid book with a unique numeric ID.
- `updateBook(state, bookId, details)` edits an existing book.
- `deleteBook(state, bookId)` removes an existing book only when it has no active loan.
- Reject blank title, author or genre; ISBN must contain exactly 13 digits.
- Reject an ISBN used by another book. When editing, the book may keep its existing ISBN.

**Team B: Borrowing and returns**

Edit only `js/loan-team.js` initially.

- `borrowBook(state, bookId, borrower)` lends an existing available book, provided the borrower name is not blank.
- Record today's date and a due date 14 calendar days later.
- `returnBook(state, loanId)` marks an active loan as returned. Keep the loan record.
- Prevent multiple active loans for the same book.

**Everyone:** Check that changes made by one team appear correctly in the other team's screen. Do not edit `js/app.js` or the shared object format until both teams agree.

## Shared data contract

Both teams use the same `state` object supplied to their functions:

```javascript
state = {
  books: [
    { id: 1, title: 'Introduction to Python', author: 'A. Morgan',
      genre: 'Programming', isbn: '9780134444321' }
  ],
  loans: [
    { id: 1, bookId: 1, borrower: 'Alex Smith',
      borrowedOn: '2026-11-16', dueOn: '2026-11-30', returnedOn: null }
  ]
};
```

`returnedOn: null` means the loan is active. A returned loan has a date string such as `2026-12-01`. Book availability is calculated from the active loans. Do not add a separate `available` field to books.

Each function must return an object in this exact format:

```javascript
return { ok: true, message: 'Book saved.' };
// or
return { ok: false, message: 'That ISBN is already in use.' };
```

The shared interface displays the message and redraws the lists when `ok` is true. You do not need to write your own rendering code.

## Using generative AI appropriately

Before requesting code, identify the exact function you are responsible for and what it must accept, change and return. Include the object structures and the requirement in your prompt. Ask AI to explain its approach, then inspect the result before adding it to your team's file. Keep a record of your original prompt and one improved prompt.

Avoid asking AI to rewrite the whole application. If it proposes changes to `app.js`, review them together before accepting them.

## Integration tests

| Action | Expected result |
| --- | --- |
| Add a valid book | Appears in the catalogue and borrowing dropdown |
| Add an ISBN already present | Rejected; catalogue unchanged |
| Edit a book | Updated details appear in both sections |
| Borrow an available book | Appears in current loans; shown as Borrowed in catalogue |
| Try borrowing that book again | Second loan is refused |
| Try deleting a borrowed book | Deletion is refused |
| Return a borrowed book | Removed from current loans; shown as Available |
| Delete the returned book | Removed from the catalogue and dropdown |

Also check blank names, invalid ISBNs and attempts to act on an ID that does not exist.

## What to submit

1. The completed project folder or ZIP file.
2. Your individual prompt and one refinement of that prompt.
3. A brief explanation of the function(s) you implemented.
4. At least six recorded tests, including integration tests with the other team.
5. A short reflection on one integration problem you encountered and how you resolved it.

### Suggested integration method

Start from the same extracted starter. Team A changes `book-team.js`; Team B changes `loan-team.js`. Once each side is tested separately, copy both completed files into one shared copy of the project. Check that `app.js` and the object structures remain unchanged. Test the full system together.
