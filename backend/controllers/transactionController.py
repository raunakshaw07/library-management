from flask import request, jsonify
from services.transactionServices import getTransaction, createTransaction, deleteTransaction, countTransaction

def transactions():
    if request.method == "POST":
        try:
            params = request.args.to_dict()
            uid = params['uid']
            bid = params['bid']
            tid = uid + '|' + bid
            
            print({ uid, bid, tid })
            
            transaction = createTransaction(tid, uid, bid)
        except Exception as err:
            return jsonify({ "status" : False, "error": str(err) }), 500
        else:
            return jsonify({ "status" : True, "msg" : "Book Issued Successfully", "transaction": transaction }), 200



def singleTransaction(uid):
    try:
        transactions = getTransaction(uid)
        if not transactions:
            return jsonify({'msg': 'transaction not found'}), 404
    except Exception as err:
        return jsonify({ 'status': False, 'error': err }), 500
    else:
        if request.method == 'GET':
            return transactions, 200


def deleteTran():
    params = request.args.to_dict()
    print(params)
    deleteTransaction(params['tid'])
    return jsonify({"status" : True, 'msg': 'Book returned successfully'}), 200


def count():
    return countTransaction()