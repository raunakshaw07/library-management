from flask import request, jsonify
import requests
from services.bookServices import allBooks, createBook, getSingleBook, updateBook, deleteBook, countBooks, limit


def books():
    if request.method == "GET":
        try:
            Books = allBooks()
        except Exception as err:
            return jsonify({ "status" : False, "Error" : err }), 500
        else:
            book_list = [{
                "bid": book.bid, 
                "title": book.title,
                "authors": book.authors,
                "isbn": book.isbn,
                "average_rating": book.average_rating,
                "publication_date": book.publication_date,
                "publisher": book.publisher,
                "copies": book.copies
            } for book in Books]
            
            return jsonify({"status" : True, "Books": book_list}), 200
    
    elif request.method == "POST":
        try:
            data = request.get_json()
            
            book = getSingleBook('bid', data['bid'])
            if book:
                return jsonify({ "status": False, "msg": "Book already exists" }), 300
            else:
                book = createBook(data['bid'], data['title'], data['authors'], data['isbn'], data['average_rating'], data['publication_date'], data['publisher'], data['copies'])
        except Exception as err:
            return jsonify({ "status" : False, "Error": str(err) }), 500
        else:
            return jsonify({ "status" : True, "msg" : "Book added successfully", "book": book }), 200



def singleBook():
    try:
        params = request.args.to_dict()
        book = getSingleBook(params['param'], params['value'])
        if not book:
            return jsonify({'status': False, 'msg': 'book not found'}), 404
    except Exception as err:
        return jsonify({ 'status': False, 'Error': str(err) }), 500
    else:
        if request.method == 'GET':
            return jsonify({
                "status": True,
                "books": book
            }), 200
        elif request.method == 'PUT':
            data = request.get_json()
            updateBook(book['bid'], data['copies'])
            return jsonify({"status" : True, 'msg': 'Book updated successfully'}), 200
        elif request.method == 'DELETE':
            deleteBook(book['bid'])
            return jsonify({"status" : True, 'msg': 'Book deleted successfully'}), 200


def importBooks():
    try:
        params = request.args.to_dict()
        pages = params['pages']
        copies = params['copies']
        
        book_list = []
        for i in range(1, int(pages) + 1):
            api_url = 'https://frappe.io/api/method/frappe-library?page=' + pages
            print(api_url)
            response = requests.get(api_url)
            if response.status_code == 200:
                data = response.json()['message']
                
                for book in data:
                    bid = book['bookID']
                    title = book['title']
                    authors = book['authors']
                    isbn = book['isbn']
                    average_rating = book['average_rating']
                    publication_date = book['publication_date']
                    publisher = book['publisher']
                
                    book = getSingleBook('bid', bid)
                    if len(book) != 0:
                        book_list.append({ "status": False, "msg": "Book already exists" })
                    else:
                        book = createBook(bid, title, authors, isbn, average_rating, publication_date, publisher, copies)
                        book_list.append(book)
                    
        return jsonify({ 'status': True, 'books': book_list }), 200
    except Exception as err:
        return jsonify({ 'status': False, 'error': str(err) }), 500


def limitedBook():
    try:
        books = limit()
    except Exception as err:
        return jsonify({ "status" : False, "Error" : err }), 500
    else:
        book_list = [{
            "bid": book.bid, 
            "title": book.title,
            "authors": book.authors,
            "isbn": book.isbn,
            "average_rating": book.average_rating,
            "publication_date": book.publication_date,
            "publisher": book.publisher,
            "copies": book.copies
        } for book in books]
        
        return jsonify({"status" : True, "books": book_list}), 200

def count():
    return countBooks()