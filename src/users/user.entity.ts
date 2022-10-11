import { v4 as uuidv4 } from 'uuid';

class User {
  public id!: uuidv4;
  public username!: string; // cette propriété doit porter une contrainte d'unicité
  public email!: string; // cette propriété doit porter une contrainte d'unicité
  public password!: string;
  public role!: 'Employee' | 'Admin' | 'ProjectManager' // valeur par defaut : 'Employee'
}
