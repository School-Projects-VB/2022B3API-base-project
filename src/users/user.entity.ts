import { v4 as uuidv4 } from 'uuid';

export class User {
  
  constructor(
      name: string, 
      mail: string, 
      pwd: string, 
      type: 'Employee' | 'Admin' | 'ProjectManager'
    ){
    this.id = uuidv4(); // TODO: Format uuidv4
    this.username = name;
    this.email = mail;
    this.password = pwd;
    this.role = type;
  }

  public id!: string; 
  public username!: string; // TODO: Cette propriété doit porter une contrainte d'unicité
  public email!: string; // TODO: Cette propriété doit porter une contrainte d'unicité
  public password!: string;
  public role!: 'Employee' | 'Admin' | 'ProjectManager' // TODO: Valeur par defaut 'Employee'
}
