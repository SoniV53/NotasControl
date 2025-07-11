const { Menu, BrowserWindow, ipcMain } = require('electron');

class ContextMenuHandler {
  constructor() {}

  setup() {
    ipcMain.handle('mostrar-menu-eliminar', (event, coords,message) => {
      const menu = Menu.buildFromTemplate([
        { label: 'Eliminar', click: ()=>{console.log(message)}},
      ]);

      const win = BrowserWindow.fromWebContents(event.sender);
      menu.popup({
        window: win,
        x: coords.x,
        y: coords.y
      });
    });
  }
}

module.exports = ContextMenuHandler;
