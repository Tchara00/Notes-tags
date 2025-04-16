export interface Note {
    id: number;
    title: string;
    content: string;
    color: string;
    type: 'text' | 'checklist';
    tags: number[];
  }
  