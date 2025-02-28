from app import db  # Import SQLAlchemy instance
from datetime import datetime
from sqlalchemy.sql import text  # Import text for default timestamps

class User(db.Model):
    __tablename__ = "user" 

    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Fname = db.Column(db.Text, nullable=False)
    LName = db.Column(db.Text, nullable=False)
    Email = db.Column(db.Text, unique=True, nullable=False)
    Password = db.Column(db.Text, nullable=False)
    CreatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"))
    UpdatedAt = db.Column(db.DateTime, server_default=text("CURRENT_TIMESTAMP"), onupdate=datetime.utcnow)

    # Relationships
    projects = db.relationship("Project", backref="owner", lazy=True)

    def __repr__(self):
        return f"<User {self.Email}>"
