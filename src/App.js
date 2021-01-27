import React, {useEffect, useState} from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow/index.jsx'
import FeaturedMovie from './components/FeaturedMovie/index.jsx'
import Header from './components/Header/index.jsx'
import Loading from './assets/img/Netflix_LoadTime.gif'

export default ({title}) => {
  
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  const [receiveMovieId, setReceiveMovieId] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      //Pegando o featured
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()

    setInterval(() => {loadAll()}, 15000)
    
  }, [])


  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  function receivedMovieId(id) {
    setReceiveMovieId(id)
  }

  return (
    <div className='page'>
      <Header black={blackHeader}/>
      {featuredData && 
        <FeaturedMovie item={featuredData} receivedMovieId={receivedMovieId}/>
      }
      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Feito para fins didáticos por Guilherme Cartaxo Nascimento <span role='img' aria-label='soco'>👊</span><br/>
        Direitos de Imagem para Netflix <br/>
        Dados obtidos pela API do site Themoviedb.org
      </footer>
      
      {movieList.length <= 0 &&
      <div className='loading'>
        <img src={Loading}/>
      </div>
      }
    </div>
  )
}
