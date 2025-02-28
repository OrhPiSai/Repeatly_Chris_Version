from flask import Blueprint, request, jsonify
from app import db
from database.models.tag_models import Tag  # Ensure correct path

# Define Blueprint
tag_bp = Blueprint("tag", __name__)

### Get all tags
@tag_bp.route("/api/tags", methods=["GET"])
def get_tags():
    tags = Tag.query.all()
    return jsonify([
        {"TagID": tag.TagID, "TagName": tag.TagName}
        for tag in tags
    ])

### Get a single tag by ID
@tag_bp.route("/api/tags/<int:tag_id>", methods=["GET"])
def get_tag(tag_id):
    tag = Tag.query.get(tag_id)
    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    return jsonify({"TagID": tag.TagID, "TagName": tag.TagName})

### Create a new tag
@tag_bp.route("/api/tags", methods=["POST"])
def create_tag():
    data = request.json

    # Validate input
    if "TagName" not in data:
        return jsonify({"error": "TagName is required"}), 400

    new_tag = Tag(TagName=data["TagName"])

    db.session.add(new_tag)
    db.session.commit()

    return jsonify({"message": "Tag created successfully", "TagID": new_tag.TagID}), 201

### Update an existing tag
@tag_bp.route("/api/tags/<int:tag_id>", methods=["PUT"])
def update_tag(tag_id):
    data = request.json
    tag = Tag.query.get(tag_id)

    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    tag.TagName = data.get("TagName", tag.TagName)
    db.session.commit()

    return jsonify({"message": "Tag updated successfully"})

### Delete a tag
@tag_bp.route("/api/tags/<int:tag_id>", methods=["DELETE"])
def delete_tag(tag_id):
    tag = Tag.query.get(tag_id)

    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    db.session.delete(tag)
    db.session.commit()

    return jsonify({"message": "Tag deleted successfully"})
