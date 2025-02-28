from flask import Blueprint, request, jsonify
from app import db
from database.models.project_models import Project
from database.models.project_cycle_mapping_models import ProjectCycleMapping
from database.models.cycle_models import Cycle
from datetime import datetime

# Define Blueprint
project_bp = Blueprint("projects", __name__)

# Get all projects
@project_bp.route("/api/projects", methods=["GET"])
def get_all_projects():
    projects = Project.query.all()
    return jsonify([
        {
            "ProjectID": project.ProjectID,
            "UserID": project.UserID,
            "PName": project.PName,
            "PDescription": project.PDescription,
            "LogicalStartDate": project.LogicalStartDate.strftime("%Y-%m-%d"),
            "CreatedAt": project.CreatedAt.strftime("%Y-%m-%d %H:%M:%S"),
            "UpdatedAt": project.UpdatedAt.strftime("%Y-%m-%d %H:%M:%S"),
        }
        for project in projects
    ])

# Get a single project by ID
@project_bp.route("/api/projects/<int:project_id>", methods=["GET"])
def get_project(project_id):
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    return jsonify({
        "ProjectID": project.ProjectID,
        "UserID": project.UserID,
        "PName": project.PName,
        "PDescription": project.PDescription,
        "LogicalStartDate": project.LogicalStartDate.strftime("%Y-%m-%d"),
        "CreatedAt": project.CreatedAt.strftime("%Y-%m-%d %H:%M:%S"),
        "UpdatedAt": project.UpdatedAt.strftime("%Y-%m-%d %H:%M:%S"),
    })

# Create a new project
@project_bp.route("/api/projects", methods=["POST"])
def create_project():
    data = request.json

    if "UserID" not in data or "PName" not in data or "LogicalStartDate" not in data:
        return jsonify({"error": "UserID, PName, and LogicalStartDate are required"}), 400

    new_project = Project(
        UserID=data["UserID"],
        PName=data["PName"],
        PDescription=data.get("PDescription", ""),
        LogicalStartDate=datetime.strptime(data["LogicalStartDate"], "%Y-%m-%d")
    )

    db.session.add(new_project)
    db.session.commit()

    return jsonify({
        "message": "Project created successfully",
        "ProjectID": new_project.ProjectID
    }), 201

# Assign a cycle to a project
@project_bp.route("/api/projects/<int:project_id>/cycles", methods=["POST"])
def assign_cycle_to_project(project_id):
    data = request.json
    cycle_id = data.get("CycleID")
    user_id = data.get("UserID")

    if not cycle_id or not user_id:
        return jsonify({"error": "CycleID and UserID are required"}), 400

    # Check if cycle exists
    cycle = Cycle.query.get(cycle_id)
    if not cycle:
        return jsonify({"error": "Cycle not found"}), 404

    # Check if project exists
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    # Create mapping
    mapping = ProjectCycleMapping(ProjectID=project_id, CycleID=cycle_id, UserID=user_id)
    db.session.add(mapping)
    db.session.commit()

    return jsonify({"message": "Cycle assigned to project successfully"})

# Remove a cycle from a project
@project_bp.route("/api/projects/<int:project_id>/cycles/<int:cycle_id>", methods=["DELETE"])
def remove_cycle_from_project(project_id, cycle_id):
    mapping = ProjectCycleMapping.query.filter_by(ProjectID=project_id, CycleID=cycle_id).first()

    if not mapping:
        return jsonify({"error": "Cycle is not assigned to this project"}), 404

    db.session.delete(mapping)
    db.session.commit()

    return jsonify({"message": "Cycle removed from project successfully"})

# Get all cycles assigned to a project
@project_bp.route("/api/projects/<int:project_id>/cycles", methods=["GET"])
def get_project_cycles(project_id):
    mappings = ProjectCycleMapping.query.filter_by(ProjectID=project_id).all()
    cycle_ids = [mapping.CycleID for mapping in mappings]
    cycles = Cycle.query.filter(Cycle.CycleID.in_(cycle_ids)).all()

    return jsonify([{
        "CycleID": cycle.CycleID,
        "CName": cycle.CName,
        "CDescription": cycle.CDescription,
        "CDuration": cycle.CDuration,
        "CColor": cycle.CColor
    } for cycle in cycles])
