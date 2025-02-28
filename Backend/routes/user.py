from flask import Blueprint, request, jsonify
from app import db, bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models.user_models import User

# Define Blueprint
user_bp = Blueprint("user", __name__)

### Get User Profile (Requires Authentication)
@user_bp.route("/api/users/profile", methods=["GET"])
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "UserID": user.UserID,
        "Fname": user.Fname,
        "LName": user.LName,
        "Email": user.Email,
        "CreatedAt": user.CreatedAt.strftime("%Y-%m-%d %H:%M:%S"),
        "UpdatedAt": user.UpdatedAt.strftime("%Y-%m-%d %H:%M:%S")
    })

### Update User Profile (Requires Authentication)
@user_bp.route("/api/users/update", methods=["PUT"])
@jwt_required()
def update_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json
    user.Fname = data.get("Fname", user.Fname)
    user.LName = data.get("LName", user.LName)
    user.Email = data.get("Email", user.Email)

    if "Password" in data and data["Password"]:
        user.Password = bcrypt.generate_password_hash(data["Password"]).decode("utf-8")

    db.session.commit()

    return jsonify({"message": "User profile updated successfully"})

### Delete User Account (Requires Authentication)
@user_bp.route("/api/users/delete", methods=["DELETE"])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User account deleted successfully"})
