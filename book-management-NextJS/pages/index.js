import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import EditBookModal from './components/EditBookModal';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [editingBook, setEditingBook] = useState(); 
  const [isLoading, setIsLoading] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3010/books');
      setBooks(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please check the backend server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author) {
      setError('Title and author are required.');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('http://localhost:3010/books', { title, author });
      setTitle('');
      setAuthor('');
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
      setError('Failed to add book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleSaveEdit = async (updatedBook) => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:3010/books/${editingBook._id}`, updatedBook);
      setEditingBook(null); 
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
      setError('Failed to update book. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingBook(null); 
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3010/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      if (error.response && error.response.status === 404) {
        setError('Book not found.');
      } else {
        setError('Failed to delete book. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book List</h1>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Add Book'}
          </button>
        </div>
      </form>

      {isLoading ? (
        <p>Loading books...</p>
      ) : (
        <div className={styles.bookList}>
          {filteredBooks.map((book) => (
            <div key={book._id} className={styles.bookCard}>
              <h2 className={styles.bookTitle}>{book.title}</h2>
              <p className={styles.bookAuthor}>by {book.author}</p>
              <div className={styles.bookActions}>
                <button
                  onClick={() => handleEdit(book)}
                  className={styles.editButton}
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className={styles.deleteButton}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {}
      {editingBook && (
  <EditBookModal
    book={editingBook}
    onSave={handleSaveEdit}
    onClose={handleCancelEdit}
  />
)}
    </div>
  );
}