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


export const CATEGORIAS_DUMMY: CategoriaCarpetas[] = [
  {
    id: 1,
    categoria: 'Documentos Personales',
    ocultar: false,
    carpetas: [
      { id: 1, nombre: 'Pasaportes', fechaCreacion: '2024-06-28' },
      { id: 2, nombre: 'Licencias', fechaCreacion: '2024-06-20' },
      { id: 3, nombre: 'Certificados', fechaCreacion: '2024-06-15' }
    ]
  },
  {
    id: 2,
    categoria: 'Trabajo',
    ocultar: false,
    carpetas: [
      { id: 4, nombre: 'Proyectos', fechaCreacion: '2024-06-10' },
      { id: 5, nombre: 'Contratos', fechaCreacion: '2024-05-30' }
    ]
  },
  {
    id: 3,
    categoria: 'Archivos Ocultos',
    ocultar: true,
    carpetas: [
      { id: 6, nombre: 'Confidenciales', fechaCreacion: '2024-05-01' }
    ]
  }
];
