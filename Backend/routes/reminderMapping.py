from flask import Blueprint, request, jsonify
from app import db
from database.models.reminder_mapping_models import ReminderMapping

# Define Blueprint
reminder_mapping_bp = Blueprint("reminder_mapping", __name__)

### Get all reminder mappings
@reminder_mapping_bp.route("/api/reminder-mappings", methods=["GET"])
def get_all_reminder_mappings():
    mappings = ReminderMapping.query.all()
    return jsonify([
        {
            "ReminderID": mapping.ReminderID,
            "ActivityID": mapping.ActivityID,
            "TaskID": mapping.TaskID
        }
        for mapping in mappings
    ])

### Get reminder mappings by ReminderID
@reminder_mapping_bp.route("/api/reminder-mappings/<int:reminder_id>", methods=["GET"])
def get_reminder_mapping(reminder_id):
    mappings = ReminderMapping.query.filter_by(ReminderID=reminder_id).all()
    
    if not mappings:
        return jsonify({"error": "No reminder mappings found"}), 404

    return jsonify([
        {
            "ReminderID": mapping.ReminderID,
            "ActivityID": mapping.ActivityID,
            "TaskID": mapping.TaskID
        }
        for mapping in mappings
    ])

### Create a new reminder mapping
@reminder_mapping_bp.route("/api/reminder-mappings", methods=["POST"])
def create_reminder_mapping():
    data = request.json

    # Validate required fields
    if "ReminderID" not in data:
        return jsonify({"error": "ReminderID is required"}), 400

    new_mapping = ReminderMapping(
        ReminderID=data["ReminderID"],
        ActivityID=data.get("ActivityID"),  # Optional
        TaskID=data.get("TaskID")  # Optional
    )

    db.session.add(new_mapping)
    db.session.commit()

    return jsonify({"message": "Reminder mapping created successfully"}), 201

### Delete a reminder mapping
@reminder_mapping_bp.route("/api/reminder-mappings/<int:reminder_id>", methods=["DELETE"])
def delete_reminder_mapping(reminder_id):
    mappings = ReminderMapping.query.filter_by(ReminderID=reminder_id).all()

    if not mappings:
        return jsonify({"error": "Reminder mapping not found"}), 404

    for mapping in mappings:
        db.session.delete(mapping)
    
    db.session.commit()
    return jsonify({"message": "Reminder mapping deleted successfully"}), 200
