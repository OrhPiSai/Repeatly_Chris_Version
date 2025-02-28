from app import db

class Tag(db.Model):
    __tablename__ = "tag"  # Lowercase for PostgreSQL compatibility

    TagID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    TagName = db.Column(db.Text, nullable=False, unique=True)  # Enforce unique tag names

    def __repr__(self):
        return f"<Tag {self.TagName}>"
