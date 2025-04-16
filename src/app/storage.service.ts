import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { tag } from './tag';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TAGS_KEY = 'tags';
  private readonly NOTES_KEY = 'notes';

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // ========== TAGS ==========
  getTags(): tag[] {
    if (!this.isBrowser()) return [];
    const data = localStorage.getItem(this.TAGS_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveTags(tags: tag[]): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(this.TAGS_KEY, JSON.stringify(tags));
  }

  addTag(newTag: tag): void {
    const tags = this.getTags();
    tags.push(newTag);
    this.saveTags(tags);
  }

  deleteTag(id: number): void {
    const tags = this.getTags().filter(t => t.id !== id);
    this.saveTags(tags);
  }

  // ========== NOTES ==========
  getNotes(): Note[] {
    if (!this.isBrowser()) return [];
    const data = localStorage.getItem(this.NOTES_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveNotes(notes: Note[]): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }

  addNote(note: Note): void {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  }

  deleteNote(id: number): void {
    const notes = this.getNotes().filter(n => n.id !== id);
    this.saveNotes(notes);
  }
}
