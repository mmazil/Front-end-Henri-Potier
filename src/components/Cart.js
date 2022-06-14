import React from 'react';
import { Button, Table } from 'semantic-ui-react';

function Cart({ cart, offers }) {

  const total = () => cart.map(book => book.price).reduce((previousValue, currentValue) => previousValue + currentValue,0);

  const calculateFinalOffer = () => {
    if(offers.offers) {
      const persentage = offers.offers[0];
      const minus = offers.offers[1];
      const slice = offers.offers[2];
  
      let price = total();
  
      const persentageOffer = price - ((price * persentage.value)/100);
      const minusOffer = price - minus?.value;
      let sliceOffer;
      if(price >= slice?.sliceValue) {
        const tranche = price / slice.sliceValue;
        sliceOffer = slice.value * Math.floor(tranche);
      }

      if(persentageOffer <= minusOffer || persentageOffer <= sliceOffer) price = persentageOffer;
      if(minusOffer <= persentageOffer || minusOffer <= sliceOffer) price = minusOffer;
      if(sliceOffer <= persentageOffer || sliceOffer <= minusOffer) price = sliceOffer;

      return price;
    }
  }

  return ( 
    <>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Cover</Table.HeaderCell>
            <Table.HeaderCell>ISBN</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            cart.map(book =>
              <Table.Row key={book.isbn}>
              <Table.Cell>
                <img src={book.cover} style={{width: "100px"}} alt={book.titel}/>
              </Table.Cell>
              <Table.Cell>
                {book.isbn}
              </Table.Cell>
              <Table.Cell>
                {book.title}
              </Table.Cell>
              <Table.Cell>
                {book.synopsis[0]}
              </Table.Cell>
              <Table.Cell>
                {book.price}€
              </Table.Cell>
            </Table.Row>
            )
          }
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              Total Price
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Button floated='right'>
                {total()}€
              </Button>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              Final Offer
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Button floated='right'>
                {calculateFinalOffer()}€
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
}

export default Cart;