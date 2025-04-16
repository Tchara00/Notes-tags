import { Component, input } from '@angular/core';


@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  id = input<number>(0);
  name = input<string>('Sans nom');
  color = input<string>('#000000');
  

}
