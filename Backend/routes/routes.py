from flask import Blueprint, jsonify, request
from flask_cors import CORS
from app import db
from sqlalchemy.sql import text  # Import text for raw SQL in SQLAlchemy 2.x
from routes.user import user_bp
from routes.project import project_bp
from routes.cycle import cycle_bp
from routes.activity import activity_bp
from routes.task import task_bp
from routes.tag import tag_bp
from routes.tagMapping import tag_mapping_bp
from routes.projectCycleMapping import project_cycle_mapping_bp
from routes.reminder import reminder_bp

# Define a Blueprint for general routes
routes_bp = Blueprint("routes", __name__)
CORS(routes_bp)  # ✅ Enable CORS for frontend communication

# Home Route (Confirms backend is running)
@routes_bp.route("/")
def home():
    return jsonify({"message": "Repeatly Backend is running!"})

# Test Database Connection
@routes_bp.route("/test-db")
def test_db():
    try:
        # Run a simple query wrapped in text() for SQLAlchemy 2.x
        result = db.session.execute(text("SELECT 1")).fetchone()
        return jsonify({
            "success": True,
            "message": "Database connected successfully!",
            "result": result[0]
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# User Authentication Middleware (Protects Routes)
def authenticate_user():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Unauthorized access"}), 401

# Register Blueprints for API Endpoints
def register_api_blueprints(app):
    app.register_blueprint(routes_bp)
    app.register_blueprint(user_bp, url_prefix="/api/users")
    app.register_blueprint(project_bp, url_prefix="/api/projects")
    app.register_blueprint(cycle_bp, url_prefix="/api/cycles")
    app.register_blueprint(activity_bp, url_prefix="/api/activities")
    app.register_blueprint(task_bp, url_prefix="/api/tasks")
    app.register_blueprint(tag_bp, url_prefix="/api/tags")
    app.register_blueprint(tag_mapping_bp, url_prefix="/api/tag-mapping")
    app.register_blueprint(project_cycle_mapping_bp, url_prefix="/api/project-cycle-mapping")
    app.register_blueprint(reminder_bp, url_prefix="/api/reminders")
