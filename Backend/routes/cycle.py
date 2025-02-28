from flask import Blueprint, request, jsonify
from app import db
from database.models.cycle_models import Cycle
from database.models.project_cycle_mapping_models import ProjectCycleMapping  # ✅ Ensure correct import
from datetime import datetime

# Define a Flask Blueprint for cycle-related routes
cycle_bp = Blueprint("cycle", __name__)

### Helper Function to Serialize Cycle Objects
def serialize_cycle(cycle):
    return {
        "CycleID": cycle.CycleID,
        "CName": cycle.CName,
        "CDescription": cycle.CDescription,
        "CDuration": cycle.CDuration,
        "CColor": cycle.CColor,
        "CreatedAt": cycle.CreatedAt.strftime("%Y-%m-%d %H:%M:%S"),
        "UpdatedAt": cycle.UpdatedAt.strftime("%Y-%m-%d %H:%M:%S")
    }

### Get all cycles
@cycle_bp.route("/api/cycles", methods=["GET"])
def get_cycles():
    cycles = Cycle.query.all()
    return jsonify([serialize_cycle(cycle) for cycle in cycles])

### Get a single cycle by ID
@cycle_bp.route("/api/cycles/<int:cycle_id>", methods=["GET"])
def get_cycle(cycle_id):
    cycle = Cycle.query.get(cycle_id)
    if not cycle:
        return jsonify({"error": "Cycle not found"}), 404

    return jsonify(serialize_cycle(cycle))

### Get all cycles assigned to a specific project
@cycle_bp.route("/api/cycles/project/<int:project_id>", methods=["GET"])
def get_cycles_for_project(project_id):
    mappings = ProjectCycleMapping.query.filter_by(ProjectID=project_id).all()
    cycle_ids = [mapping.CycleID for mapping in mappings]
    cycles = Cycle.query.filter(Cycle.CycleID.in_(cycle_ids)).all()

    return jsonify([serialize_cycle(cycle) for cycle in cycles])

### Get cycles that are not assigned to any project
@cycle_bp.route("/api/cycles/unassigned", methods=["GET"])
def get_unassigned_cycles():
    assigned_cycle_ids = db.session.query(ProjectCycleMapping.CycleID).distinct()
    unassigned_cycles = Cycle.query.filter(~Cycle.CycleID.in_(assigned_cycle_ids)).all()

    return jsonify([serialize_cycle(cycle) for cycle in unassigned_cycles])

### Create a new cycle
@cycle_bp.route("/api/cycles", methods=["POST"])
def create_cycle():
    data = request.json

    if not data.get("CName") or not data.get("CDuration"):
        return jsonify({"error": "CName and CDuration are required"}), 400

    new_cycle = Cycle(
        CName=data["CName"],
        CDescription=data.get("CDescription", ""),
        CDuration=data["CDuration"],
        CColor=data.get("CColor", "#FFFFFF")  # Default white color
    )

    db.session.add(new_cycle)
    db.session.commit()

    return jsonify({"message": "Cycle created successfully", "CycleID": new_cycle.CycleID}), 201

### Update an existing cycle
@cycle_bp.route("/api/cycles/<int:cycle_id>", methods=["PUT"])
def update_cycle(cycle_id):
    data = request.json
    cycle = Cycle.query.get(cycle_id)

    if not cycle:
        return jsonify({"error": "Cycle not found"}), 404

    cycle.CName = data.get("CName", cycle.CName)
    cycle.CDescription = data.get("CDescription", cycle.CDescription)
    cycle.CDuration = data.get("CDuration", cycle.CDuration)
    cycle.UpdatedAt = datetime.utcnow()

    db.session.commit()

    return jsonify({"message": "Cycle updated successfully"})

### Update cycle color
@cycle_bp.route("/api/cycles/<int:cycle_id>/color", methods=["PATCH"])
def update_cycle_color(cycle_id):
    data = request.json
    cycle = Cycle.query.get(cycle_id)

    if not cycle:
        return jsonify({"error": "Cycle not found"}), 404

    cycle.CColor = data.get("color", cycle.CColor)
    cycle.UpdatedAt = datetime.utcnow()

    db.session.commit()

    return jsonify({"message": "Cycle color updated successfully"})

### Delete a cycle
@cycle_bp.route("/api/cycles/<int:cycle_id>", methods=["DELETE"])
def delete_cycle(cycle_id):
    cycle = Cycle.query.get(cycle_id)

    if not cycle:
        return jsonify({"error": "Cycle not found"}), 404

    db.session.delete(cycle)
    db.session.commit()

    return jsonify({"message": "Cycle deleted successfully"})
