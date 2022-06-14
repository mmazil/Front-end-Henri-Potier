export const getBooks = () => fetch("http://henri-potier.xebia.fr/books")
    .then(res => res.json())
    .then(data => data);

export const getOffers = isbns => fetch(`http://henri-potier.xebia.fr/books/${isbns}/commercialOffers`)
    .then(res => res.json())
    .then(data => data);