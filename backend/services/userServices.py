from flask import jsonify
from sqlalchemy import text
from models.database import Users, db
import uuid


def allUsers():
    user = Users.query.all()
    return user

def getSingleUser(param, val):
    user = None
    if param == 'uid':
        query = f"SELECT * FROM users WHERE uid='{val}';"
        
        with db.engine.begin() as conn:
            user = conn.exec_driver_sql(query).all()
    elif param == 'name':
        user = Users.query.filter(Users.name.like('%'+ val +'%')).all()

    if user:
        user_dict = {
            'uid': user[0].uid,
            'name': user[0].name,
            'address': user[0].address,
            'phone': user[0].phone,
            'email': user[0].email,
            'gender': user[0].gender,
            'debt': user[0].debt,
            'created_at': user[0].created_at
        }
        return user_dict
    return None

def createUser(name, address, phone, email, gender):
    user = Users.query.filter(Users.name.like('%'+ name +'%')).all()
    if user:
        return {"status": False}
    else:
        newUser = Users(uid=str(uuid.uuid4()), name=name, address=address, phone=phone, email=email, gender=gender, debt=0)
        db.session.add(newUser)
        db.session.commit()
        
        return { 'status': True, 'user': {
            'uid' : newUser.uid,
            'name': newUser.name,
            'address': newUser.address,
            'phone': newUser.phone,
            'email': newUser.email,
            'gender': newUser.gender,
            'debt': newUser.debt,
            "createdAt": newUser.created_at
        } }


def as_dict(user):
    return {
        'uid': user.uid,
        'name': user.name,
        'address': user.address,
        'phone': user.phone,
        'email': user.email,
        'gender': user.gender,
        'debt': user.debt,
        'created_at': user.created_at
    }
        
def updateUser(uid, data):      
    user = Users.query.get(uid)
    if user:
        user.name = data['name']
        user.address = data['address']
        user.phone = data['phone']
        user.email = data['email']
        user.gender = data['gender']
        user.debt = data['debt']
        db.session.commit()
    
    return as_dict(user)
    
    
def deleteUser(uid):
    user = Users.query.get(uid)
    db.session.delete(user)
    db.session.commit()
    
    
def get_limited_users_sorted_by_date():
    try:
        users = Users.query.order_by(Users.created_at.desc()).limit(10).all()

        users_list = []
        for user in users:
            user_dict = {
                'uid' : user.uid,
                'name': user.name,
                'address': user.address,
                'phone': user.phone,
                'email': user.email,
                'gender': user.gender,
                'debt': user.debt,
                "createdAt": user.created_at
            } 
            users_list.append(user_dict)

        return jsonify(users_list)
    except Exception as e:
        return jsonify({'status': False, 'error': str(e)}), 500    

    
def countUsers():
    try:
        query = text('SELECT COUNT(*) FROM users')
        result = db.session.execute(query).scalar()

        return jsonify({'count': result}), 200
    except Exception as e:
        return jsonify({'status': False, 'error': str(e)}), 500