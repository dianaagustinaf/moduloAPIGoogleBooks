import axios from "axios";
import { crearBuscador } from "./bucadorLibros.js";

const buscador = crearBuscador()

const libroReconocido = (await buscador
        .libroPorReconocimiento("Harry Potter la piedra filosofal"))

const libroPorAutor = (await buscador
        .libroPorAutor("J.K. Rowling"))

console.log(libroReconocido)
console.log(libroPorAutor)

