import { v4 as uuidv4 } from 'uuid';

class ProjectUser {
  public id!: uuidv4;
  public startDate!: Date;
  public endDate!: Date;
  public projectId!: uuidv4;
  public userId!: uuidv4;
}
