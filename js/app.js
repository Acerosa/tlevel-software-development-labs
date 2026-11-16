// SHARED STARTER CODE: Both teams should leave this file unchanged initially.
// The interface and rendering already work. Team functions change state.
(() => {
  'use strict';
  const state = {
    books: [
      { id: 1, title: 'Introduction to Python', author: 'A. Morgan', genre: 'Programming', isbn: '9780134444321' },
      { id: 2, title: 'The Night Garden', author: 'E. Carter', genre: 'Fiction', isbn: '9780007350803' },
      { id: 3, title: 'Computer Networks', author: 'J. Patel', genre: 'Technology', isbn: '9780132126953' },
      { id: 4, title: 'A Short History of Space', author: 'N. Lewis', genre: 'Science', isbn: '9780553380163' },
      { id: 5, title: 'Modern Britain', author: 'R. Hill', genre: 'History', isbn: '9780141036144' }
    ],
    loans: []
  };

  const byId = id => document.getElementById(id);
  const hasActiveLoan = bookId => state.loans.some(loan => loan.bookId === bookId && loan.returnedOn === null);
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const bookById = id => state.books.find(book => book.id === Number(id));

  function feedback(result) {
    const el = byId('feedback');
    el.textContent = result.message;
    el.classList.toggle('success', result.ok);
  }
  function run(action) {
    const result = action();
    if (!result || typeof result.ok !== 'boolean' || typeof result.message !== 'string') {
      feedback({ ok: false, message: 'A team function must return { ok, message }.' });
      return false;
    }
    feedback(result);
    if (result.ok) render();
    return result.ok;
  }

  function renderBooks() {
    byId('book-count').textContent = `(${state.books.length})`;
    byId('book-list').innerHTML = state.books.map(book => {
      const borrowed = hasActiveLoan(book.id);
      return `<article class="book">
        <strong>${escapeHtml(book.title)}</strong>
        <p class="meta">${escapeHtml(book.author)} · ${escapeHtml(book.genre)}</p>
        <p class="meta">ISBN: ${escapeHtml(book.isbn)}</p>
        <span class="status ${borrowed ? 'borrowed' : ''}">${borrowed ? 'Borrowed' : 'Available'}</span>
        <div class="inline-actions">
          <button type="button" class="secondary" data-action="edit-book" data-id="${book.id}">Edit</button>
          <button type="button" data-action="delete-book" data-id="${book.id}">Delete</button>
        </div>
      </article>`;
    }).join('') || '<p>No books are currently in the catalogue.</p>';
  }
  function renderLoans() {
    const current = state.loans.filter(loan => loan.returnedOn === null);
    byId('loan-count').textContent = `(${current.length})`;
    byId('loan-list').innerHTML = current.map(loan => {
      const book = bookById(loan.bookId);
      return `<article class="loan">
        <strong>${book ? escapeHtml(book.title) : 'Unknown book'}</strong>
        <p class="meta">Borrower: ${escapeHtml(loan.borrower)}</p>
        <p class="meta">Borrowed: ${escapeHtml(loan.borrowedOn)} · Due: ${escapeHtml(loan.dueOn)}</p>
        <button type="button" data-action="return-book" data-id="${loan.id}">Return book</button>
      </article>`;
    }).join('') || '<p>No books are currently on loan.</p>';

    const available = state.books.filter(book => !hasActiveLoan(book.id));
    byId('loan-book').innerHTML = '<option value="">Choose a book</option>' + available.map(book =>
      `<option value="${book.id}">${escapeHtml(book.title)}</option>`).join('');
  }
  function render() { renderBooks(); renderLoans(); }
  function clearBookForm() {
    byId('book-form').reset(); byId('book-id').value = '';
    byId('book-form-heading').textContent = 'Add or edit a book';
  }
  function editBook(bookId) {
    const book = bookById(bookId);
    if (!book) return;
    byId('book-id').value = book.id;
    byId('book-title').value = book.title;
    byId('book-author').value = book.author;
    byId('book-genre').value = book.genre;
    byId('book-isbn').value = book.isbn;
    byId('book-form-heading').textContent = `Editing: ${book.title}`;
    byId('book-title').focus();
  }

  document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.tab;
    document.querySelectorAll('.section').forEach(section => { section.hidden = section.id !== selected; });
    document.querySelectorAll('[data-tab]').forEach(tab => {
      tab.classList.toggle('selected', tab.dataset.tab === selected);
      if (tab.dataset.tab === selected) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
    feedback({ ok: true, message: '' });
  }));
  byId('cancel-edit').addEventListener('click', clearBookForm);
  byId('book-form').addEventListener('submit', event => {
    event.preventDefault();
    const details = {
      title: byId('book-title').value, author: byId('book-author').value,
      genre: byId('book-genre').value, isbn: byId('book-isbn').value
    };
    const editingId = Number(byId('book-id').value);
    const successful = run(() => editingId
      ? BookTeam.updateBook(state, editingId, details)
      : BookTeam.addBook(state, details));
    if (successful) clearBookForm();
  });
  byId('book-list').addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const id = Number(button.dataset.id);
    if (button.dataset.action === 'edit-book') editBook(id);
    if (button.dataset.action === 'delete-book') run(() => BookTeam.deleteBook(state, id));
  });
  byId('loan-form').addEventListener('submit', event => {
    event.preventDefault();
    const successful = run(() => LoanTeam.borrowBook(state, Number(byId('loan-book').value), byId('borrower').value));
    if (successful) byId('loan-form').reset();
  });
  byId('loan-list').addEventListener('click', event => {
    const button = event.target.closest('button[data-action="return-book"]');
    if (button) run(() => LoanTeam.returnBook(state, Number(button.dataset.id)));
  });

  render();
  // Read-only access for inspection in the browser console. Do not mutate directly.
  window.LibraryDemo = { getBooks: () => structuredClone(state.books), getLoans: () => structuredClone(state.loans) };
})();
