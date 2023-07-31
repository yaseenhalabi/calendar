# running on https://calendar-yaseen-api-9684d13821fa.herokuapp.com/
# or locally on http://127.0.0.1:5000/

from flask import Flask, request, render_template, redirect, url_for
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, redirect, url_for
from bson.json_util import dumps, ObjectId
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
load_dotenv()


# app  
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# configuration
app.config.update(
    SECRET_KEY='your-secret-key',
    SESSION_COOKIE_SECURE=True,
    REMEMBER_COOKIE_SECURE=True,
    SESSION_COOKIE_SAMESITE='None'
)
# mongodb
client = MongoClient(os.getenv('MONGODB_SRV'))
db = client['calendar']
collection = db['data']

# flask_login
login_manager = LoginManager()
login_manager.init_app(app)

# User class for login
class User(UserMixin):
    def __init__(self, username, password_hash, id):
        self.username = username
        self.password_hash = password_hash
        self.id = id

    @classmethod
    def get(cls, user_id):
        user_data = collection.find_one({'_id': user_id})
        if not user_data:
            return None
        return User(username=user_data['username'], password_hash=user_data['password_hash'], id=user_data['_id'])
    
    @classmethod
    def validate_username_password(cls, username, password):
        user_data = collection.find_one({'username': username})
        if not user_data:
            return None
        if not check_password_hash(user_data['password_hash'], password):
            return None
        return User(username=user_data['username'], password_hash=user_data['password_hash'], id=user_data['_id'])
    
    def get_id(self):
        return str(self.id)
    

@login_manager.user_loader
def load_user(user_id):
    return User.get(ObjectId(user_id))


# Login user
# takes in username and password through json. sends back session cookie
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json() 
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return 'Missing username or password', 400

    user = User.validate_username_password(username, password)

    if user is None:
        return 'Invalid username or password', 401

    login_user(user)
    return "logged in successfully", 200

# Logs out user and removes session cookie
@app.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return 'You have been logged out', 200

# Registers user and logs them in
# takes in username and password through raw json
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json() 
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return 'Missing username or password', 400

    # Check if the username already exists in the database
    existing_user = collection.find_one({'username': username})

    if existing_user is not None:
        return 'Username already exists', 400

    # Create the user
    user_id = collection.insert_one({
        'username': username,
        'password_hash': generate_password_hash(password),
    }).inserted_id

    user = User.get(user_id)

    if user is None:
        return 'Registration failed', 500

    login_user(user)

    return "You have been successfully registered and logged in"

# adds data to mongodb collection
# login is required
# user id is attached to data so the user can retrieve it later
@app.route('/add', methods=['POST'])
@login_required
def add_data():
    data = request.get_json()
    
    if not data:
        return 'No data provided', 400

    # Add user_id to data
    data['user_id'] = current_user.get_id()

    collection.insert_one(data)
  
    return 'Data added to MongoDB', 201

# gets data from mongodb collection
# login required for this
# uses current session id to find the users data
@app.route('/get', methods=['GET'])
@login_required
def get_data():
    data = collection.find({'user_id': current_user.get_id()})

    if not data:
        return 'No data found', 404
  
    return dumps(list(data)), 200

@app.route('/')
def home():
    return "You are at the home route of http://127.0.0.1:5000"

if __name__ == '__main__':
    app.run(debug=True)