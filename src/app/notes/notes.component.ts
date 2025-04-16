import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NgIf, NgFor} from '@angular/common';
import { StorageService } from '../storage.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  imports: [NgIf, NgFor, FormsModule]

})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  loaded = false;
  constructor(private storageService: StorageService) {}

  
  editingNote: Note | null = null;

startAddNote(): void {
  this.editingNote = {
    id: Date.now(),
    title: '',
    content: '',
    color: '#ffffff',
    type: 'text',
    tags: []
  };
}

saveNote(): void {
  if (this.editingNote) {
    const index = this.notes.findIndex(n => n.id === this.editingNote!.id);

    if (index > -1) {
      this.notes[index] = { ...this.editingNote };
    } else {
      this.notes.push(this.editingNote);
    }

    this.storageService.saveNotes(this.notes); 
    this.editingNote = null;
  }
}

cancelEdit(): void {
  this.editingNote = null;
}


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
  startEditNote(note: Note): void {
    this.editingNote = { ...note };
  }
}
