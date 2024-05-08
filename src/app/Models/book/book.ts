import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from "../user/user";

export enum Genre {
  Fiction,NonFiction,LivresAcadémiques
}
export interface Book {
  id?: number;
  title?: string;
  authorName?:string;
  isbn?:string;
  synopsis?: string;
  bookCover?: string;
  archived?:boolean;
  shareable?: boolean;
  owner?: User;
  genre?: Genre;
  /*
  feedbacks?: Feedback[];
  histories?:BookTransactionHistory[];
*/

}