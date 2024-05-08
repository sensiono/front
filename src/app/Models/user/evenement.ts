
import { User } from "src/app/Models/user/user";
export interface Evenement {
    id?: number;
    titre?: string;
    description?: string;
    date?: Date;
    lieu?: string;
    user?: User;
    // Autres propriétés si nécessaire
  }
  