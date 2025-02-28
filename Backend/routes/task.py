from flask import Blueprint, request, jsonify
from app import db
from database.models.task_model import Task
from datetime import datetime

# Define Blueprint for task routes
task_bp = Blueprint("tasks", __name__)

### Get all tasks under a specific activity
@task_bp.route("/api/activities/<int:activity_id>/tasks", methods=["GET"])
def get_tasks_by_activity(activity_id):
    tasks = Task.query.filter_by(ActivityID=activity_id).all()
    return jsonify([
        {
            "TaskID": task.TaskID,
            "TName": task.TName,
            "TNotes": task.TNotes,
            "TaskDuration": str(task.TaskDuration),  # Convert INTERVAL to string
            "CreatedAt": task.CreatedAt.isoformat(),
            "UpdatedAt": task.UpdatedAt.isoformat()
        } for task in tasks
    ])

### Get a single task by ID
@task_bp.route("/api/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    return jsonify({
        "TaskID": task.TaskID,
        "TName": task.TName,
        "TNotes": task.TNotes,
        "TaskDuration": str(task.TaskDuration),  # Convert INTERVAL to string
        "CreatedAt": task.CreatedAt.isoformat(),
        "UpdatedAt": task.UpdatedAt.isoformat()
    })

### Create a new task under an activity
@task_bp.route("/api/activities/<int:activity_id>/tasks", methods=["POST"])
def create_task(activity_id):
    data = request.json

    # Validate required fields
    if not data.get("TName") or not data.get("TaskDuration"):
        return jsonify({"error": "TName and TaskDuration are required"}), 400

    try:
        new_task = Task(
            TName=data["TName"],
            TNotes=data.get("TNotes", ""),
            TaskDuration=data["TaskDuration"],  # Expecting string duration (e.g., '1 day')
            ActivityID=activity_id
        )

        db.session.add(new_task)
        db.session.commit()

        return jsonify({
            "message": "Task created successfully",
            "TaskID": new_task.TaskID
        }), 201

    except Exception as e:
        return jsonify({"error": f"Failed to create task: {str(e)}"}), 500

### Update an existing task
@task_bp.route("/api/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.json
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    try:
        task.TName = data.get("TName", task.TName)
        task.TNotes = data.get("TNotes", task.TNotes)
        task.TaskDuration = data.get("TaskDuration", task.TaskDuration)
        task.UpdatedAt = datetime.utcnow()

        db.session.commit()

        return jsonify({"message": "Task updated successfully"})
    
    except Exception as e:
        return jsonify({"error": f"Failed to update task: {str(e)}"}), 500

### Delete a task
@task_bp.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    try:
        db.session.delete(task)
        db.session.commit()

        return jsonify({"message": "Task deleted successfully"})

    except Exception as e:
        return jsonify({"error": f"Failed to delete task: {str(e)}"}), 500
