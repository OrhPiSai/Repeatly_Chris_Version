from flask import Blueprint, request, jsonify
from app import db
from database.models.project_cycle_mapping_models import ProjectCycleMapping

# Define Blueprint
project_cycle_mapping_bp = Blueprint("project_cycle_mapping", __name__)

### Get all cycles mapped to a project (ordered)
@project_cycle_mapping_bp.route("/api/project-cycle-mapping/<int:project_id>", methods=["GET"])
def get_cycles_for_project(project_id):
    mappings = ProjectCycleMapping.query.filter_by(ProjectID=project_id).order_by(ProjectCycleMapping.OrderIndex).all()

    return jsonify([
        {
            "ProjectID": mapping.ProjectID,
            "CycleID": mapping.CycleID,
            "UserID": mapping.UserID,
            "OrderIndex": mapping.OrderIndex
        }
        for mapping in mappings
    ])

### Add a cycle to a project
@project_cycle_mapping_bp.route("/api/project-cycle-mapping", methods=["POST"])
def add_cycle_to_project():
    data = request.json

    # Validate input
    if "ProjectID" not in data or "CycleID" not in data or "UserID" not in data:
        return jsonify({"error": "ProjectID, CycleID, and UserID are required"}), 400

    # Get the max OrderIndex in the project
    max_order_index = db.session.query(db.func.max(ProjectCycleMapping.OrderIndex)).filter_by(ProjectID=data["ProjectID"]).scalar()
    if max_order_index is None:
        max_order_index = 0
    else:
        max_order_index += 1

    new_mapping = ProjectCycleMapping(
        ProjectID=data["ProjectID"],
        CycleID=data["CycleID"],
        UserID=data["UserID"],
        OrderIndex=max_order_index
    )

    db.session.add(new_mapping)
    db.session.commit()

    return jsonify({"message": "Cycle added to project successfully", "OrderIndex": max_order_index}), 201

### Remove a cycle from a project
@project_cycle_mapping_bp.route("/api/project-cycle-mapping/<int:project_id>/<int:cycle_id>", methods=["DELETE"])
def remove_cycle_from_project(project_id, cycle_id):
    mapping = ProjectCycleMapping.query.filter_by(ProjectID=project_id, CycleID=cycle_id).first()

    if not mapping:
        return jsonify({"error": "Mapping not found"}), 404

    db.session.delete(mapping)
    db.session.commit()

    return jsonify({"message": "Cycle removed from project successfully"})

### Reorder cycles in a project
@project_cycle_mapping_bp.route("/api/project-cycle-mapping/reorder", methods=["PUT"])
def reorder_cycles():
    data = request.json

    # Validate input
    if "ProjectID" not in data or "cycles" not in data:
        return jsonify({"error": "ProjectID and cycles (list of CycleID and OrderIndex) are required"}), 400

    for cycle in data["cycles"]:
        mapping = ProjectCycleMapping.query.filter_by(ProjectID=data["ProjectID"], CycleID=cycle["CycleID"]).first()
        if mapping:
            mapping.OrderIndex = cycle["OrderIndex"]

    db.session.commit()
    return jsonify({"message": "Cycles reordered successfully"})
