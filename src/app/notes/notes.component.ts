import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  loaded = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    if (!this.loaded) {
      this.notes = this.storageService.getNotes();
      this.loaded = true;
    }
  }

  dialogAddNote() {
    const title = window.prompt('Titre de la note :');
    if (title) {
      const newNote: Note = {
        id: Date.now(),
        title,
        content: '',
        color: '#ffffff',
        type: 'text',
        tags: []
      };
      this.storageService.addNote(newNote);
      this.notes.push(newNote);
    }
  }

  deleteNote(note: Note) {
    this.storageService.deleteNote(note.id);
    this.notes = this.notes.filter(n => n.id !== note.id);
  }
}
