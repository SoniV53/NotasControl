export interface Carpeta {
  id: number;
  nombre: string;
  fechaCreacion: string;
}

export interface CategoriaCarpetas {
  id: number;
  categoria: string;
  ocultar: boolean;
  carpetas: Carpeta[];
}
