from app import db
from datetime import datetime
from sqlalchemy.sql import text

class Activity(db.Model):
    __tablename__ = "activity"  # Lowercase for PostgreSQL compatibility

    ActivityID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    AName = db.Column(db.Text, nullable=False)
    ADescription = db.Column(db.Text, nullable=True)
    ADuration = db.Column(db.Integer, nullable=False)  # Stored as hours

    CreatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"))
    UpdatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"), onupdate=datetime.utcnow)

    # Relationship (If activities are linked to projects)
    ProjectID = db.Column(db.Integer, db.ForeignKey("project.ProjectID", ondelete="CASCADE"), nullable=True)
    project = db.relationship("Project", backref="activities")

    def __repr__(self):
        return f"<Activity {self.AName}>"
