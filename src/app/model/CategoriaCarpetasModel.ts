export interface Carpeta {
  id: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
}

export interface CategoriaCarpetas {
  id: number;
  categoria: string;
  carpetas: Carpeta[];
}
