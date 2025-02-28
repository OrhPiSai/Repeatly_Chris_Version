import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

# Initialize the database object here (BEFORE importing models)
db = SQLAlchemy()

def create_app():
    """Factory function to create the Flask app instance."""
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize database with the app
    db.init_app(app)

    # Import models AFTER initializing db (to avoid circular import)
    with app.app_context():
        from Database import models  # Import all models inside app context

    # Initialize Flask-Migrate
    Migrate(app, db)

    # Register routes from routes.py
    from routes.routes import routes_bp  # Import Blueprint
    app.register_blueprint(routes_bp)  # Register Blueprint

    return app

# Create the app instance for Gunicorn to discover
app = create_app()

# Run the app if executed directly
if __name__ == "__main__":
    # Get port from environment variables (default to 5000)
    port = int(os.environ.get("PORT", 5000))
    
    # Run the Flask app on 0.0.0.0 so Render can detect it
    app.run(host="0.0.0.0", port=port, debug=True)
