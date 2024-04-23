import { User } from "./user";

export interface Reclamation {
    idRec: number;
    description: string;
    etat: string;
    user: User;  }
  