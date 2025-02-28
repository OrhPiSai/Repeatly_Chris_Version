from flask import Blueprint, request, jsonify
from app import db
from database.models.reminder_models import Reminder
from datetime import datetime

# Define Blueprint for reminders
reminders_bp = Blueprint("reminders", __name__)

### Get all reminders
@reminders_bp.route("/api/reminders", methods=["GET"])
def get_all_reminders():
    reminders = Reminder.query.all()
    return jsonify([reminder.to_dict() for reminder in reminders])

### Get a single reminder by ID
@reminders_bp.route("/api/reminders/<int:reminder_id>", methods=["GET"])
def get_reminder(reminder_id):
    reminder = Reminder.query.get(reminder_id)
    if not reminder:
        return jsonify({"error": "Reminder not found"}), 404

    return jsonify(reminder.to_dict())

### Create a new reminder
@reminders_bp.route("/api/reminders", methods=["POST"])
def create_reminder():
    data = request.json

    # Validate required fields
    required_fields = ["DestEmail", "Time", "TimeFormat", "DaysBeforeDue"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    try:
        new_reminder = Reminder(
            RDescription=data.get("RDescription", ""),
            DestEmail=data["DestEmail"],
            Time=datetime.strptime(data["Time"], "%Y-%m-%dT%H:%M:%S"),
            TimeFormat=data["TimeFormat"],
            DaysBeforeDue=data["DaysBeforeDue"],
            RecurrenceCount=data.get("RecurrenceCount"),
            RecurrenceInterval=data.get("RecurrenceInterval"),
        )

        db.session.add(new_reminder)
        db.session.commit()

        return jsonify({
            "message": "Reminder created successfully",
            "ReminderID": new_reminder.ReminderID
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

### Update an existing reminder
@reminders_bp.route("/api/reminders/<int:reminder_id>", methods=["PUT"])
def update_reminder(reminder_id):
    data = request.json
    reminder = Reminder.query.get(reminder_id)

    if not reminder:
        return jsonify({"error": "Reminder not found"}), 404

    try:
        reminder.RDescription = data.get("RDescription", reminder.RDescription)
        reminder.DestEmail = data.get("DestEmail", reminder.DestEmail)
        reminder.Time = datetime.strptime(data["Time"], "%Y-%m-%dT%H:%M:%S") if "Time" in data else reminder.Time
        reminder.TimeFormat = data.get("TimeFormat", reminder.TimeFormat)
        reminder.DaysBeforeDue = data.get("DaysBeforeDue", reminder.DaysBeforeDue)
        reminder.RecurrenceCount = data.get("RecurrenceCount", reminder.RecurrenceCount)
        reminder.RecurrenceInterval = data.get("RecurrenceInterval", reminder.RecurrenceInterval)
        reminder.UpdatedAt = datetime.utcnow()  # Auto-update timestamp

        db.session.commit()
        return jsonify({"message": "Reminder updated successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

### Delete a reminder
@reminders_bp.route("/api/reminders/<int:reminder_id>", methods=["DELETE"])
def delete_reminder(reminder_id):
    reminder = Reminder.query.get(reminder_id)

    if not reminder:
        return jsonify({"error": "Reminder not found"}), 404

    try:
        db.session.delete(reminder)
        db.session.commit()
        return jsonify({"message": "Reminder deleted successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
