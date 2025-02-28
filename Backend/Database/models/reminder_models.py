from app import db
from datetime import datetime
from sqlalchemy.sql import text

class Reminder(db.Model):
    __tablename__ = "reminder"  # Lowercase for PostgreSQL compatibility

    ReminderID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    RDescription = db.Column(db.Text, nullable=True)
    DestEmail = db.Column(db.Text, nullable=False)
    Time = db.Column(db.DateTime, nullable=False)
    TimeFormat = db.Column(db.Integer, nullable=False)  # 12-hour / 24-hour format
    DaysBeforeDue = db.Column(db.Integer, nullable=False)
    RecurrenceCount = db.Column(db.Integer, nullable=True)
    RecurrenceInterval = db.Column(db.Integer, nullable=True)

    CreatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"))
    UpdatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"), onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Reminder {self.ReminderID} - {self.DestEmail}>"
