import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  output,
  Output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // @ViewChild('formElement') private form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('formElement');
  // @Output() add = new EventEmitter();
  enteredTitle = '';
  enteredRequest = '';
  add = output<{ title: string; text: string }>();

  ngOnInit(): void {
    console.log('On Init');
    console.log(this.form().nativeElement);
  }

  ngAfterViewInit(): void {
    console.log('After View Init');
    console.log(this.form().nativeElement);
  }

  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredRequest });
    // this.form()?.nativeElement.reset();
    this.enteredTitle = '';
    this.enteredRequest = '';
  }
}
