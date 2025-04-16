import { Component, OnInit } from '@angular/core';
import { tag } from '../tag';
import { StorageService } from '../storage.service';
import { TagComponent } from '../tag/tag.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-tags',
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  imports: [TagComponent,FormsModule,NgIf],
  
  
})
export class TagsComponent implements OnInit {
  loaded = false;
  tags: tag[] = [];
  editing: tag | null = null;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    if (this.loaded) return;
    this.tags = this.storageService.getTags();
    this.loaded = true;
  }

  dialogAddTag(): false {
    const name = window.prompt('Nom du tag :');
    if (!name || name.trim() === '') return false;

    const newTag: tag = {
      id: Date.now(),
      name: name.trim(),
      color: '#000000'
    };

    this.tags.push(newTag);
    this.storageService.saveTags(this.tags);
    return false;
  }

  deleteTag(tagToDelete: tag): void {
    this.tags = this.tags.filter(tag => tag.id !== tagToDelete.id);
    this.storageService.saveTags(this.tags);
  }
  startEdit(tag?: tag): void{
    this.editing = tag
    ?{...tag }
    : {id:0, name:'', color: '#000000' };
  }
  cancelEdit(): void {
    this.editing = null;
  }
  submitEdit(): void {
    if (!this.editing) return;

    if (this.editing.id === 0) {
      this.editing.id = Date.now();
      this.tags.push(this.editing);
    } else {
      const index = this.tags.findIndex(t => t.id === this.editing!.id);
      if (index !== -1) this.tags[index] = this.editing;
    }

    this.storageService.saveTags(this.tags);
    this.editing = null;
  }
}

