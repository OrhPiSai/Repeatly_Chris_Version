from flask import Blueprint, request, jsonify
from app import db
from database.models.tag_mapping_models import TagMapping  # Ensure correct path

# Define Blueprint
tag_mapping_bp = Blueprint("tag_mapping", __name__)

### Get all tag mappings
@tag_mapping_bp.route("/api/tag-mapping", methods=["GET"])
def get_tag_mappings():
    mappings = TagMapping.query.all()

    return jsonify([
        {
            "TagID": mapping.TagID,
            "ActivityID": mapping.ActivityID,
            "TaskID": mapping.TaskID
        }
        for mapping in mappings
    ])

### Add a tag to an activity/task
@tag_mapping_bp.route("/api/tag-mapping", methods=["POST"])
def add_tag_to_activity_or_task():
    data = request.json

    # Validate input
    if "TagID" not in data:
        return jsonify({"error": "TagID is required"}), 400

    if "ActivityID" not in data and "TaskID" not in data:
        return jsonify({"error": "Either ActivityID or TaskID is required"}), 400

    new_mapping = TagMapping(
        TagID=data["TagID"],
        ActivityID=data.get("ActivityID"),
        TaskID=data.get("TaskID")
    )

    db.session.add(new_mapping)
    db.session.commit()

    return jsonify({"message": "Tag mapping added successfully"}), 201

### Remove a tag from an activity/task
@tag_mapping_bp.route("/api/tag-mapping/<int:tag_id>", methods=["DELETE"])
def remove_tag_from_activity_or_task(tag_id):
    mapping = TagMapping.query.filter_by(TagID=tag_id).first()

    if not mapping:
        return jsonify({"error": "Mapping not found"}), 404

    db.session.delete(mapping)
    db.session.commit()

    return jsonify({"message": "Tag mapping removed successfully"})
