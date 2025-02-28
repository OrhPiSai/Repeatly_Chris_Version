from app import db
from datetime import datetime
from sqlalchemy.sql import text

class Cycle(db.Model):
    __tablename__ = "cycle"

    CycleID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CName = db.Column(db.Text, nullable=False)
    CDescription = db.Column(db.Text, nullable=True)
    CDuration = db.Column(db.Integer, nullable=False)  # Stored as days
    CreatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"))
    UpdatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"), onupdate=datetime.utcnow)

    # Relationships
    project_mappings = db.relationship("ProjectCycleMapping", backref="cycle", lazy=True)

    def __repr__(self):
        return f"<Cycle {self.CName}>"
