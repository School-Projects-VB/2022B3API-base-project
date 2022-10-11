import { v4 as uuidv4 } from 'uuid';

class _Event {
  public id!: uuidv4;
  public date!: Date;
  public eventStatus?: 'Pending' | 'Accepted' | 'Declined' // valeur par défaut : 'Pending';
  public eventType!: 'RemoteWork' | 'PaidLeave';
  public eventDescription?: string;
  public userId!: uuidv4;
}
