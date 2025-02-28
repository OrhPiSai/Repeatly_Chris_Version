from flask import Blueprint, request, jsonify
from app import db
from database.models.activity_models import Activity
from datetime import datetime

# Define Blueprint
activities_bp = Blueprint("activities", __name__)

### Helper Function to Serialize Activity Objects
def serialize_activity(activity):
    return {
        "ActivityID": activity.ActivityID,
        "AName": activity.AName,
        "ADescription": activity.ADescription,
        "ADuration": activity.ADuration,
        "CreatedAt": activity.CreatedAt,
        "UpdatedAt": activity.UpdatedAt
    }

### Get all activities
@activities_bp.route("/api/activities", methods=["GET"])
def get_all_activities():
    activities = Activity.query.all()
    return jsonify([serialize_activity(activity) for activity in activities])

### Get a single activity by ID
@activities_bp.route("/api/activities/<int:activity_id>", methods=["GET"])
def get_activity(activity_id):
    activity = Activity.query.get(activity_id)
    if not activity:
        return jsonify({"error": "Activity not found"}), 404

    return jsonify(serialize_activity(activity))

### Create a new activity
@activities_bp.route("/api/activities", methods=["POST"])
def create_activity():
    data = request.json

    # Validate required fields
    if not data.get("AName") or not data.get("ADuration"):
        return jsonify({"error": "AName and ADuration are required"}), 400

    new_activity = Activity(
        AName=data["AName"],
        ADescription=data.get("ADescription", ""),
        ADuration=data["ADuration"]
    )

    db.session.add(new_activity)
    db.session.commit()

    return jsonify({"message": "Activity created successfully", "ActivityID": new_activity.ActivityID}), 201

### Update an existing activity
@activities_bp.route("/api/activities/<int:activity_id>", methods=["PUT"])
def update_activity(activity_id):
    data = request.json
    activity = Activity.query.get(activity_id)

    if not activity:
        return jsonify({"error": "Activity not found"}), 404

    activity.AName = data.get("AName", activity.AName)
    activity.ADescription = data.get("ADescription", activity.ADescription)
    activity.ADuration = data.get("ADuration", activity.ADuration)
    activity.UpdatedAt = datetime.utcnow()  # Auto-update timestamp

    db.session.commit()

    return jsonify({"message": "Activity updated successfully"})

### Delete an activity
@activities_bp.route("/api/activities/<int:activity_id>", methods=["DELETE"])
def delete_activity(activity_id):
    activity = Activity.query.get(activity_id)

    if not activity:
        return jsonify({"error": "Activity not found"}), 404

    db.session.delete(activity)
    db.session.commit()

    return jsonify({"message": "Activity deleted successfully"})
