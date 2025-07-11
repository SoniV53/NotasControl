import { AtributosTitulo } from "./EnumAtributos";

export interface ItemAtributos{
    titulo:string,
    value:string | boolean,
}

export const ATRIBUTOS_LISTA_CATEGORIA: ItemAtributos[] = [
  {titulo: AtributosTitulo.VisibleMenu,value:true},
];

export enum Tipos{
    Categoria = 'categoria',
    Carpeta = 'carpeta',
    Articulo = 'articulo',
}
