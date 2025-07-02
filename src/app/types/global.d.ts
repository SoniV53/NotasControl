export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<any>;
      };

      eliminarBaseDatos(): Promise<any>;
      exportarBaseDatos(destinoPath: string): Promise<any>;
      importarBaseDatos(rutaArchivoDb: string): Promise<any>;

      crearParametro(clave: string, valor: string): Promise<any>;
      obtenerParametros(): Promise<any>;
      obtenerParametro(clave: string): Promise<any>;
      actualizarParametro(clave: string, valor: string): Promise<any>;
      eliminarParametro(clave: string): Promise<any>;

      crearCategoria(nombre: string, ocultar: string): Promise<any>;
      obtenerCategorias(): Promise<any>;
      actualizarCategoria(id: number, name: string, ocultar: string): Promise<any>;
      eliminarCategoria(id: number): Promise<any>;

      crearCarpeta(nombre: string, parentId?: number | null, categoryId?: number | null): Promise<any>;
      obtenerCarpetas(parentId?: number | null): Promise<any>;
      obtenerCarpetasCategoria(categoriaId?: number | null): Promise<any>;
      actualizarCarpeta(id: number, name: string): Promise<any>;
      eliminarCarpeta(id: number): Promise<any>;

      crearArticulo(folderId: number | null, title: string, content: string, ocultar: string): Promise<any>;
      obtenerArticulosPorCarpeta(folderId?: number): Promise<any>;
      obtenerArticulos(): Promise<any>;
      actualizarArticulo(id: number, title: string, content: string, ocultar: string): Promise<any>;
      actualizarArticuloOcultar(id: number, ocultar: string): Promise<any>;
      actualizarTituloArticulo(id: number, titulo: string): Promise<any>;
      eliminarArticulo(id: number): Promise<any>;

      agregarHistorial(key: number,tipo:any): Promise<any>;
      obtenerHistorialCarpetas(): Promise<any>;
      obtenerHistorial(): Promise<any>;
      eliminarHistorial(key: number): Promise<any>;
      limpiarHistorial(): Promise<any>;
    };
  }
}
