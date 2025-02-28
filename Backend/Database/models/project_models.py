from app import db
from datetime import datetime
from sqlalchemy.sql import text

class Project(db.Model):
    __tablename__ = "project"

    ProjectID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserID = db.Column(db.Integer, db.ForeignKey("user.UserID"), nullable=False)
    PName = db.Column(db.Text, nullable=False)
    PDescription = db.Column(db.Text, nullable=True)
    LogicalStartDate = db.Column(db.DateTime, nullable=False)
    CreatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"))
    UpdatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"), onupdate=datetime.utcnow)

    # Relationships
    cycles = db.relationship("ProjectCycleMapping", backref="project", lazy=True)

    def __repr__(self):
        return f"<Project {self.PName}>"
