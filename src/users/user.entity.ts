import { v4 as uuidv4 } from 'uuid';

export class User {
  
  constructor(name: string, 
              mail: string, 
              pwd: string, 
              type: 'Employee' | 'Admin' | 'ProjectManager' = 'Employee')
  {
    this.id = uuidv4();
    this.username = name; // TODO: Cette propriété doit porter une contrainte d'unicité
    this.email = mail; // TODO: Cette propriété doit porter une contrainte d'unicité
    this.password = pwd;
    this.role = type;// TODO: Valeur par defaut 'Employee'
  }

  public id!: string; 
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: 'Employee' | 'Admin' | 'ProjectManager' 
}
