from flask import Blueprint
from controllers.transactionController import transactions, singleTransaction, deleteTran, count
from flask_cors import cross_origin

tran_bp = Blueprint('transaction', __name__, url_prefix='/transactions')

# Users
@tran_bp.route('/transaction', methods=['POST'])
@cross_origin(supports_credentials=True)
def all():
    return transactions()

@tran_bp.route('/transaction/<string:uid>', methods=['GET'])
@cross_origin(supports_credentials=True)
def individual(uid):
    return singleTransaction(uid)

@tran_bp.route('/transaction/delete', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete():
    return deleteTran()

@tran_bp.route('/transaction/count', methods=['GET'])
@cross_origin(supports_credentials=True)
def countTransaction():
    return count()