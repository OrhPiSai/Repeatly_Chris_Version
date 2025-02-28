from app import db

class ProjectCycleMapping(db.Model):
    __tablename__ = "project_cycle_mapping"

    ProjectID = db.Column(db.Integer, db.ForeignKey("project.ProjectID", ondelete="CASCADE"), primary_key=True)
    CycleID = db.Column(db.Integer, db.ForeignKey("cycle.CycleID", ondelete="CASCADE"), primary_key=True)
    UserID = db.Column(db.Integer, db.ForeignKey("user.UserID"), nullable=False)
    OrderIndex = db.Column(db.Integer, nullable=False, default=0)  # Allows reordering

    def __repr__(self):
        return f"<ProjectCycleMapping ProjectID={self.ProjectID}, CycleID={self.CycleID}, UserID={self.UserID}>"
