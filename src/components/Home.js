import { Item, Button, Icon, Input, Label } from 'semantic-ui-react';

function Home({ books, searchBook, addToCart }) {
  return ( 
    <>
      <Input placeholder='Search...' fluid onChange={searchBook}/>
      <Item.Group divided>
      {
        books.map(book => 
          <Item key={book.isbn}>
            <Item.Image src={book.cover} />
            <Item.Content>
              <Item.Header as='a'>{book.title}</Item.Header>
              <Item.Meta>
                <span className='cinema'>{book.title}</span>
              </Item.Meta>
              <Item.Description>
                {
                  book.synopsis[0]
                }
              </Item.Description>
              <Item.Extra>
              <Label.Group tag>
                <Label as='a'>{book.price}€</Label>
              </Label.Group>
              </Item.Extra>
              <Item.Extra>
                <Button floated='right' onClick={() => {addToCart(book.isbn)}} primary>
                  <Icon name='cart' />
                  Add to Cart
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        )
      }
      </Item.Group>
    </>
  );
}

export default Home;