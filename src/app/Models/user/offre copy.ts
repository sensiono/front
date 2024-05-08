import { User } from "src/app/Models/user/user";
import { TypeOffre } from "./TypeOffre.enum";

export interface Offre {
    id?: number;
    titre?: string;
    description?: string;
    competenceRequise?: string;
    duree?: string;
    remuneration?: number;
    user?: User;
    typeOffre?: TypeOffre;
    randomScore?: number;
  }
  