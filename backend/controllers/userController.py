from flask import request, jsonify
from services.userServices import allUsers, createUser, getSingleUser, updateUser, deleteUser, countUsers, get_limited_users_sorted_by_date


def users():
    if request.method == "GET":
        try:
            users = allUsers()
        except Exception as err:
            return jsonify({ "status" : False, "Error" : err }), 500
        else:
            user_list = [{
                "uid": user.uid, 
                "name": user.name,
                "address": user.address,
                "phone": user.phone,
                "email": user.email,
                "gender": user.gender,
                "debt": user.debt,
                "createdAt": user.created_at
            } for user in users]
            
            return jsonify({"status" : True, "users": user_list}), 200
    
    elif request.method == "POST":
        try:
            data = request.get_json()
            user = createUser(data['name'], data['address'], data['phone'], data['email'], data['gender'])
            
            if user['status'] == False:
                return jsonify({ 'status': False, 'msg': 'User already exists' })
        except Exception as err:
            return jsonify({ "status" : False, "error": str(err) }), 500
        else:
            return jsonify({ "status" : True, "msg" : "User created successfully", "user": user['user'] }), 200



def singleUser():
    try:
        params = request.args.to_dict()
        user = getSingleUser(params['param'], params['value'])
        if not user:
            return jsonify({'msg': 'user not found'}), 404
    except Exception as err:
        return jsonify({ 'status': False, 'error': str(err) }), 500
    else:
        if request.method == 'GET':
            return jsonify({ "status": True, "user": user })
        elif request.method == 'PUT':
            data = request.get_json()
            user = updateUser(user['uid'], data)
            if user:
                return jsonify({"status" : True, 'msg': 'User updated successfully', "user": user}), 200
            return jsonify({ "status": False, 'msg': "User not found", "user": [] })
        elif request.method == 'DELETE':
            deleteUser(params['value'])
            return jsonify({"status" : True, 'msg': 'User deleted successfully'}), 200


def getLimitedUser():
    return get_limited_users_sorted_by_date()


def count():
    return countUsers()