import { Reclamation } from "./reclamation";

export interface User {
  idUser: number;
  nomUtilisateur: string;
  motDePasse: string;
  email: string;
  profile: string;
  competences: string[];
  nomEntreprise: string;
  adresseEntreprise: string;
  reclamations: Reclamation[];
}
