import { Directive, ElementRef, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { Popover } from 'bootstrap';

@Directive({
    selector: '[appRightClickPopover]'
})
export class RightClickDirective implements AfterViewInit, OnDestroy {

    @Input('appRightClickPopover') popoverContent: string = 'Contenido por defecto';

    private popover!: any;
    private clickOutsideListener = this.onDocumentClick.bind(this);
    private rightClickListener!: EventListenerOrEventListenerObject;

    constructor(private el: ElementRef<HTMLElement>) { }

    ngAfterViewInit(): void {
        this.popover = new Popover(this.el.nativeElement, {
            container: 'body',
            placement: 'right',
            trigger: 'manual',
            content: this.popoverContent,
        });

        this.rightClickListener = (event: Event) => {
            event.preventDefault();
            const mouseEvent = event as MouseEvent;
            this.popover.show();
            console.log('Clic derecho en:', mouseEvent.clientX, mouseEvent.clientY);
            event.stopPropagation();
        };


        this.el.nativeElement.addEventListener('contextmenu', this.rightClickListener);
        document.addEventListener('click', this.clickOutsideListener);
    }

    private onDocumentClick() {
        this.popover.hide();
    }

    ngOnDestroy(): void {
        this.popover.dispose();
        this.el.nativeElement.removeEventListener('contextmenu', this.rightClickListener);
        document.removeEventListener('click', this.clickOutsideListener);
    }
}
