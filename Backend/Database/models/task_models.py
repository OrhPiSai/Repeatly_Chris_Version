from app import db
from datetime import datetime
from sqlalchemy.sql import text

class Task(db.Model):
    __tablename__ = "task"

    TaskID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    TName = db.Column(db.Text, nullable=False)
    TNotes = db.Column(db.Text, nullable=True)
    TaskDuration = db.Column(db.Integer, nullable=False)  # Stored in minutes instead of INTERVAL
    CreatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"))
    UpdatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"), onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Task {self.TName}>"
