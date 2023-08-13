from flask import Flask
# from flask_migrate import Migrate
from flask_cors import CORS
from blueprints.userBlueprint import users_bp
from blueprints.bookBlueprint import books_bp
from blueprints.transactionBlueprint import tran_bp
from models.database import db


def create_app():
    app = Flask(__name__)  # flask app object
    app.config.from_object('config')  # Configuring from Python Files

    db.init_app(app)  # Initializing the database
    # ma.init_app(app)
    return app


app = create_app()  # Creating the app
CORS(app, support_credentials=True)
app.register_blueprint(users_bp) # Registering the blueprint
app.register_blueprint(books_bp)
app.register_blueprint(tran_bp)
# migrate = Migrate(app, db)  # Initializing the migration


if (__name__ == "__main__"):
    app.run(debug=True, port=8000)
    

'''
Flask-Migrate
---------------
Flask-Migrate is an extension that handles SQLAlchemy database migrations for Flask applications using Alembic. 
The database operations are made available through the Flask command-line interface.
'''