from flask import Blueprint
from controllers.bookController import books, singleBook, importBooks, count, limitedBook
from flask_cors import cross_origin

books_bp = Blueprint('books', __name__, url_prefix='/books')

# Books
@books_bp.route('/book', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def all():
    return books()

@books_bp.route('/book/get-one', methods=['GET', 'PUT', 'DELETE'])
@cross_origin(supports_credentials=True)
def individual():
    return singleBook()


@books_bp.route('/book/import', methods=['GET'])
@cross_origin(supports_credentials=True)
def imp():
    return importBooks()

@books_bp.route('/book/count', methods=['GET'])
@cross_origin(supports_credentials=True)
def countBook():
    return count()

@books_bp.route('/book/limit', methods=['GET'])
@cross_origin(supports_credentials=True)
def limit():
    return limitedBook()