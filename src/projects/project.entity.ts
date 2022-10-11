import { v4 as uuidv4 } from 'uuid';

class Project {
  public id!: uuidv4;
  public name!: string;
  public referringEmployeeId!: uuidv4;
}
