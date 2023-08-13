from flask import Blueprint
from controllers.userController import users, singleUser, count, getLimitedUser
from flask_cors import cross_origin

users_bp = Blueprint('users', __name__, url_prefix='/users')

# Users
@users_bp.route('/user', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def all():
    return users()

@users_bp.route('/user/get-one', methods=['GET', 'PUT', 'DELETE'])
@cross_origin(supports_credentials=True)
def individual():
    return singleUser()

@users_bp.route('/user/count', methods=['GET'])
@cross_origin(supports_credentials=True)
def countUser():
    return count()

@users_bp.route('/user/limit', methods=['GET'])
@cross_origin(supports_credentials=True)
def limitUser():
    return getLimitedUser()

'''
What is Blueprint?
In simple words, they record each operation that is performed on the application. 
When flask generates a URL from an endpoint it will link the view function with a blueprint.

Why use Blueprint?
- We are using flask blueprints that a way through which we can factor an application into smaller pieces.
- We can register a blueprint on an application at a URL prefix.
- We can register multiple blueprints on an application.
'''