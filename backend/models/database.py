from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    address = db.Column(db.String(250))
    phone = db.Column(db.String(10))
    email = db.Column(db.String(50))
    gender = db.Column(db.String(10))
    debt = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Books(db.Model):
    __tablename__ = 'books'
    bid = db.Column(db.String, primary_key=True)
    title = db.Column(db.String(30))
    authors = db.Column(db.String(250))
    isbn = db.Column(db.String(10))
    average_rating = db.Column(db.String(50))
    publication_date = db.Column(db.String(10))
    publisher = db.Column(db.String(10))
    copies = db.Column(db.Integer)
    page=db.Column(db.String)
    
    def __repr__(self):
        return f"Book(bid: {self.bid}, title: {self.title}, authors: {self.authors}, isbn: {self.isbn}, average_rating: {self.average_rating}, publication_date: {self.publication_date}, publisher: {self.publisher}, copies: {self.copies}, page: {self.page})"


class Transaction(db.Model):
    __tablename__ = 'transaction'
    tid = db.Column(db.String, primary_key=True)
    uid = db.Column(db.String(30))
    bid = db.Column(db.String(250))
    issued_on = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f"Book(tid: {self.tid}, uid: {self.uid}, bid: {self.bid}, issued_on: {self.issued_on})"
