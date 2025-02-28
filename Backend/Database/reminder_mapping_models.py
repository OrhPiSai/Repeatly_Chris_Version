from app import db

class ReminderMapping(db.Model):
    __tablename__ = "reminder_mapping"  # Lowercase for PostgreSQL compatibility

    ReminderID = db.Column(db.Integer, db.ForeignKey("reminder.ReminderID", ondelete="CASCADE"), primary_key=True)
    ActivityID = db.Column(db.Integer, db.ForeignKey("activity.ActivityID", ondelete="CASCADE"), nullable=True)
    TaskID = db.Column(db.Integer, db.ForeignKey("task.TaskID", ondelete="CASCADE"), nullable=True)

    # Relationships
    reminder = db.relationship("Reminder", backref="reminder_mappings")
    activity = db.relationship("Activity", backref="reminder_mappings")
    task = db.relationship("Task", backref="reminder_mappings")

    def __repr__(self):
        return f"<ReminderMapping ReminderID={self.ReminderID} ActivityID={self.ActivityID} TaskID={self.TaskID}>"
