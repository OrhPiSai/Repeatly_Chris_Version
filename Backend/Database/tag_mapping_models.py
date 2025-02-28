from app import db

class TagMapping(db.Model):
    __tablename__ = "tag_mapping"

    TagID = db.Column(db.Integer, db.ForeignKey("tag.TagID", ondelete="CASCADE"), primary_key=True)
    ActivityID = db.Column(db.Integer, db.ForeignKey("activity.ActivityID", ondelete="CASCADE"), nullable=True)
    TaskID = db.Column(db.Integer, db.ForeignKey("task.TaskID", ondelete="CASCADE"), nullable=True)

    def __repr__(self):
        return f"<TagMapping TagID={self.TagID} ActivityID={self.ActivityID} TaskID={self.TaskID}>"
