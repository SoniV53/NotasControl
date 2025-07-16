import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements OnInit {

  @Input('appAutoFocus') focusId?: string;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // Si pasaste un id, búscalo
    if (this.focusId) {
      const element = document.getElementById(this.focusId);
      if (element) {
        element.focus();
        this.setCursorToEnd(element);
      }
    } else {
      // Si no, aplica focus al elemento mismo
      this.el.nativeElement.focus();
      this.setCursorToEnd(this.el.nativeElement);
    }
  }

  private setCursorToEnd(element: HTMLElement) {
    if (element.hasAttribute('contenteditable')) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

}
