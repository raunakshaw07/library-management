from models.database import Books, db
from flask import jsonify
from sqlalchemy import text

def allBooks():
    return Books.query.all()

def getSingleBook(param, val): 
    # return Books.query.get(bid)
    books = []
    if param == 'bid':
        query = f"SELECT * FROM books WHERE bid = '{val}';"
        with db.engine.begin() as conn:
            books = conn.exec_driver_sql(query).all()
    elif param == 'title':
        books = Books.query.filter(Books.title.like('%'+ val +'%')).all()
    elif param == 'authors':
        books = Books.query.filter(Books.authors.like('%'+ val +'%')).all()
    elif param == 'isbn':
        books = Books.query.filter(Books.isbn.like('%'+ val +'%')).all()
    elif param == 'publisher':
        books = Books.query.filter(Books.publisher.like('%'+ val +'%')).all()
    elif param == 'page':
        books = Books.query.filter(Books.page.like('%'+ val +'%')).all()
    
    if books:
        books_dict = {
            'bid': books[0].bid,
            'title': books[0].title,
            'authors': books[0].authors,
            'isbn': books[0].isbn,
            'average_rating': books[0].average_rating,
            'publication_date': books[0].publication_date,
            'publisher': books[0].publisher,
            'copies': books[0].copies,
            'pages': books[0].page
        }
        return books_dict
    return []

def createBook(bid, title, authors, isbn, average_rating, publication_date, publisher, copies):
    newBook = Books(
        bid=bid, 
        title=title, 
        authors=authors, 
        isbn=isbn, 
        average_rating = average_rating, 
        publication_date = publication_date, 
        publisher = publisher, 
        copies = copies
    )
    db.session.add(newBook)
    db.session.commit()
    
    return { 'status': True, 'book': {
            'bid' : newBook.bid,
            'title': newBook.title,
            'authors': newBook.authors,
            'isbn': newBook.isbn,
            'average_rating': newBook.average_rating,
            'publication_date': newBook.publication_date,
            'publisher': newBook.publisher,
            "copies": newBook.copies
        } }

def updateBook(bid, copies):
    book = Books.query.get(bid)
    book.copies = copies
    db.session.commit()

def deleteBook(bid):
    book = Books.query.get(bid)
    db.session.delete(book)
    db.session.commit()
    
    
def limit():
    books = Books.query.limit(10).all()
    return books


def countBooks():
    try:
        query = text('SELECT COUNT(*) FROM books')
        result = db.session.execute(query).scalar()

        return jsonify({'count': result}), 200
    except Exception as e:
        return jsonify({'status': False, 'error': str(e)}), 500