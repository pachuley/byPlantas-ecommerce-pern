import _ from 'lodash'

/* 
    metodo para paginar
    recibe 3 parametros
    items (seria el array de productos)
    page number, 1,2,3 etc seria la pagina actual
    page size el numero de elemntos a mostrar
    slice corta el array desde el index que le pasamos en adelante en adelante
    take toma el array y devuelve una porcion segun el size que le pasamos
*/
export function paginate (items, pageNumber, pageSize){
    const startIndex = (pageNumber - 1 ) * pageSize
    return _(items).slice(startIndex).take(pageSize).value()
}