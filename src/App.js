import React, { useState, useEffect } from 'react';
import { Container, Header, Menu } from 'semantic-ui-react';
import { getBooks, getOffers } from './api/BookAPI';
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  const [books, setBooks] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('home');
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getBooks().then(result => {
      setBooks(result);
      setOriginalBooks(result);
    });

    if(page === 'cart') {
      const isbns = cart.map(book => book.isbn);
      if(isbns.length > 0) {
        getOffers(isbns.toString()).then(result => setOffers(result));
      }
    }
  }, [page, cart]);

  const searchBook = e => {
    const currentTitle = e.target.value;
    if(currentTitle === '') {
      setBooks(originalBooks);
    } else {
      const searchBooks = books.filter(book => book.title.toLowerCase().includes(currentTitle.toLowerCase()));
      setBooks(searchBooks);
    }
  }

  const addToCart = (isbn) => {
    const addBook = books.filter(book => book.isbn === isbn);
    setCart([...cart, ...addBook]);
  }

  return ( 
    <Container style={{padding: "50px 0px"}}>

    <Header as='h1'>La bibliothèque de Henri Potier</Header>
      <Menu secondary>
        <Menu.Item
          name='home'
          active={page === 'home'}
          onClick={() => setPage('home')}
        />
        <Menu.Item
          name='cart'
          active={page === 'cart'}
          onClick={() => setPage('cart')}
        />
      </Menu>
      {
        page === 'home' ? <Home books={books} searchBook={searchBook} addToCart={addToCart}/> : <Cart cart={cart} offers={offers}/>
      }
    </Container>
  );
}

export default App;