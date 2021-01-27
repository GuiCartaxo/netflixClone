import React, {useState, useEffect} from 'react'
import Header from '../../components/Header'
import './index.css'
import FeaturedMovie from '../../components/FeaturedMovie'
import Tmdb from '../../Tmdb'
import DetailedMovieInfo from '../../components/DetailedMovieInfo'

export default () => {

    const [featuredData, setFeaturedData] = useState(null)

    useEffect(() => {
        const loadAll = async () => {
            // Pegando a lista TOTAL
            let list = await Tmdb.getHomeList()

            //Pegando o featured
            let originals = list.filter(i => i.slug === 'originals')
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
            let chosen = originals[0].items.results[randomChosen]
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
            setFeaturedData(chosenInfo)
        }

    loadAll()
    
    }, [])

    return (
        <div className='mainDiv--detailedMovie'>
            <Header />
            {featuredData && 
                <DetailedMovieInfo item={featuredData} />
            }
        </div>
    )
}