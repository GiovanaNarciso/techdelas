import {pesquisar} from'../js/pesquisa.js';
import Categoria from './Categoria.js';
import Artigo from './ArtigoCard.js';
import lupa from "../icones/lupa.svg";
import postImg from "../img/post1.jpg";
import db from "../postdb.json";
import errorimg from "../img/notfound.png"
import { useState, useEffect } from 'react';

import {readdir} from 'fs'





function Posts(){

    let postList = db.postlist

    const [currentMaxPosts, setcurrentMaxPost] = useState(3);


    console.log(postList)

    let categorias = [
        { 
            classe: "Tecnologia",
            txt: "Tecnologia"
        },
        {
            classe: "Empoderamento",
            txt: "Empoderamento"
        },
        {
            classe: "Ciencia",
            txt: "Ciência"
        },
        {
            classe: "Educacao",
            txt: "Educação"
        },
        { 
            classe: "Saude",
            txt: "Saúde"
        }
    ]
    let postagens = []

    function RenderPosts(maxPosts){
        let i = 0
        while(i <postList.length && i<maxPosts) {
    
            let post = (require('../posts/' + postList[i]).default)
            if (!post.hidden){
                try{
                    postagens.push({titulo: post.titulo, classes: post.classes, subtitulo: post.subtitulo, img: (require("../img/" + post.img)).default, alt: post.alt, url: post.url})
                }
                catch{
                    try{
                        postagens.push({titulo: post.titulo, classes: post.classes, subtitulo: post.subtitulo, img: errorimg, alt: post.alt, url: post.url})
                    }
                    catch{
                        postagens.push({titulo: "erro", classes: "erro", subtitulo: "erro", img: errorimg, alt: "erro", url: "erro"})
                    }
    
                }
            }
            i += 1
        }
    }


    RenderPosts(currentMaxPosts)

    function AddPost(event){
        event.preventDefault()
        setcurrentMaxPost(currentMaxPosts + 1)
        RenderPosts(currentMaxPosts)
    }
    

    let postCards = (postagens.map((post,index)=>(
        <Artigo 
        key = {index} 
        artigo = {post.url} 
        classes = {post.classes} 
        titulo={post.titulo} 
        subtitulo = {post.subtitulo} 
        img = {post.img} 
        alt = {post.alt}>
        </Artigo>
    )))
    return(
        <section className="posts">
        <div className="container">
            <article className="barra">
                <div className="topo">
                    <button type="submit"><img src={lupa} alt=""/></button>
                    <input type="text" name="pesquisarArtigo" id="artigo" placeholder="Pesquise um post..." onKeyUp={pesquisar}/>
                </div>
                <div className="categorias">
                    <ul>
                        {
                            categorias.map((objeto, index)=>(<Categoria key = {index} classe= {objeto.classe} txt = {objeto.txt}/>))
                        }
                    </ul>
                </div>
            </article>
            <article className="janela">
                <div className="topo">
                    <div className="postagens">
                        {postCards}
                    </div>
                </div>
            <a href="posts.html" id="veja-mais" onClick={AddPost}>veja mais...</a>
            </article>
        </div>
    </section>
    )
}
export default Posts