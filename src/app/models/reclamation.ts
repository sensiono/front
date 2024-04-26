import { User } from "./user";

export enum ReclamationType {
    WEBSITE_BUG = 'Problème avec le site web',
    PAYMENT_ISSUE = 'Problème de paiement',
    PURCHASE_ISSUE = 'Problème d\'achat'
    // Add more types as needed
  }
  
  export interface Reclamation {
    idRec: number;
    description: string;
    etat: string;
    //type: ReclamationType | null; // Updated to accept null as a valid type
    user: User;
  }
  
