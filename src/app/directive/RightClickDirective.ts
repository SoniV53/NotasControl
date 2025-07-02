import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appRightClickPopover]'
})
export class RightClickDirective {

    constructor() { }

    @HostListener('contextmenu', ['$event'])
    onRightClick(event: MouseEvent) {
        event.preventDefault(); // Evita el menú del navegador

        console.log('Directiva: clic derecho detectado');

        // Llama a tu handler en Electron para abrir menú contextual
        if (window.electron && window.electron.ipcRenderer) {
            window.electron.ipcRenderer.invoke('mostrar-menu-eliminar', {x: event.clientX,y: event.clientY},
                "HOLA"
            );
        }
    }
}
