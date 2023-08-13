from flask import jsonify
from models.database import Transaction, db
from services.bookServices import getSingleBook
from sqlalchemy import text


def as_dict(transaction):
    return {
        'tid': transaction.tid,
        'uid': transaction.uid,
        'bid': transaction.bid,
        'issued_on': transaction.issued_on
    }

def getTransaction(uid): 
    transactions = Transaction.query.filter_by(uid=uid).all()
    if transactions:
            transactions_list = []
            books_list = []
            for transaction in transactions:
                transactions_list.append(as_dict(transaction))
                books_list.append(getSingleBook('bid', transaction.bid))
            return jsonify({'status': True, 'transactions':transactions_list, 'books': books_list})
        
    return jsonify({ 'status': True, 'transactions': [] })

def createTransaction(tid, uid, bid):
    newTransaction = Transaction(tid=tid, uid=uid, bid=bid)
    db.session.add(newTransaction)
    db.session.commit()
    return {
        "status": True,
        "transaction": as_dict(newTransaction)
    }

def deleteTransaction(tid):
    transaction = Transaction.query.get(tid)
    db.session.delete(transaction)
    db.session.commit()


def countTransaction():
    try:
        query = text('SELECT COUNT(*) FROM transaction')
        result = db.session.execute(query).scalar()

        return jsonify({'count': result}), 200
    except Exception as e:
        return jsonify({'status': False, 'error': str(e)}), 500