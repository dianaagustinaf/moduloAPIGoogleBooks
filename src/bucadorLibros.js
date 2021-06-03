import fetch from 'node-fetch'  //request a la url que le agregue
const urlAPI = "https://www.googleapis.com/books/v1/volumes"

/*
You can perform a volumes search by sending an HTTP GET request to the following URI:
https://www.googleapis.com/books/v1/volumes?q=search+terms
*/

function crearBuscador() {
    
    return{

        libroPorReconocimiento : async (query) => {
            return new Promise((resolve, reject) =>{
                fetch(urlAPI + `?q=${query}`)
                .then(response => response.json())
                .then(response => resolve(formatear(response)))
                .catch(error => reject(error))
            })
        },

        libroPorAutor :  async (autor) => {
            return new Promise((resolve, reject) =>{
                fetch(urlAPI + `?q=inauthor:${autor}`)
                .then(response => response.json())
                .then(response => resolve(formatearLista(response)))
                .catch(error => reject(error))
            })
        },

        libroPorId: async (id) => {
            return new Promise((resolve,reject) =>{
                fetch(urlApi + `/${id}`)
                .then(response => response.json())
                .then(response => resolve(formatear(response)))
                .catch(error => reject(error))
            })
        },

    }
}

function formatear (librosAPI){

    const book = librosAPI.items[0].volumeInfo  
    const bookFormateado = formatoBook(book)    
    return bookFormateado
    
}

function formatoBook (book){

    const losAtributosDelBook = {
        title: book.title,
        authors: book.authors,
        publishedDate: book.publishedDate,
        averageRating: book.averageRating,
        description: book.description,
        pageCount: book.pageCount,
        imageLinks: book.imageLinks,
        infoLink: book.infoLink
    }
    
    return losAtributosDelBook

}

function formatearLista (librosAPI){

    const maxBooks = 10
    let i = 0
    const lista = []

    while (i<maxBooks) {   // falta validacion de que haya libro

        const book = librosAPI.items[i].volumeInfo
        const bookFormateado = formatoBook(book)
        lista.push(bookFormateado)
        
        i++
    }
    
    return lista

}

export { crearBuscador }





/*

EJEMPLO RESP ID
items: [
    {
      kind: 'books#volume',
      id: '2zgRDXFWkm8C',
      etag: '8pgDcrQJak4',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/2zgRDXFWkm8C',
      volumeInfo: [Object],
      saleInfo: [Object],
      accessInfo: [Object],
      searchInfo: [Object]
    }

*/
