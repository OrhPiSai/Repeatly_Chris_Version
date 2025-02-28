from flask import Blueprint, request, jsonify
from app import db, bcrypt
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    create_refresh_token,
    unset_jwt_cookies,
    set_access_cookies,
    set_refresh_cookies
)
from database.models.user_models import User
from datetime import timedelta

# Define Blueprint
auth_bp = Blueprint("auth", __name__)

### User Registration
@auth_bp.route("/api/auth/register", methods=["POST"])
def register():
    data = request.json

    # Validate input fields
    if not all(key in data for key in ["Fname", "LName", "Email", "Password"]):
        return jsonify({"error": "All fields are required"}), 400

    # Check if email exists
    if User.query.filter_by(Email=data["Email"]).first():
        return jsonify({"error": "Email already exists"}), 409

    # Hash password
    hashed_password = bcrypt.generate_password_hash(data["Password"]).decode("utf-8")

    # Create new user
    new_user = User(
        Fname=data["Fname"],
        LName=data["LName"],
        Email=data["Email"],
        Password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


### User Login (With JWT Token & Refresh Token)
@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(Email=data.get("Email")).first()

    if not user or not bcrypt.check_password_hash(user.Password, data.get("Password")):
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate JWT Tokens (Access Token + Refresh Token)
    access_token = create_access_token(identity=user.UserID, expires_delta=timedelta(days=1))
    refresh_token = create_refresh_token(identity=user.UserID)

    response = jsonify({
        "message": "Login successful",
        "UserID": user.UserID,
        "Fname": user.Fname,
        "LName": user.LName,
        "Email": user.Email,
        "token": access_token
    })

    # Set tokens in HTTP-only cookies (for better security)
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response


### Refresh Token (Get New Access Token)
@auth_bp.route("/api/auth/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=user_id, expires_delta=timedelta(days=1))

    response = jsonify({"message": "Access token refreshed", "token": new_access_token})
    set_access_cookies(response, new_access_token)

    return response


### User Logout (Clear JWT Cookies)
@auth_bp.route("/api/auth/logout", methods=["POST"])
@jwt_required()
def logout():
    response = jsonify({"message": "User logged out successfully"})

    # Unset JWT cookies
    unset_jwt_cookies(response)
    
    return response
