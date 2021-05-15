import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {

  state = {
    isLoading: true,
    movies: [],
  }

  getMovies = async() => {
    const {
      data : {
        data : {movies},
      },
    }  = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    console.log(movies);
    //this.setState({movies: movies}); // 앞에 키는 state 오브젝트에 movies 배열변수 / 뒤의 변수는 구조 분해 할당으로 얻은 값 
    this.setState({movies, isLoading: false});
  }

  componentDidMount() {
    // 영화데이터 로딩 ! <= 영화데이터 로딩이 완료되면 
    console.log("componentDidMount Call");
    /*setTimeout(() => {
      this.setState({isLoading: false});
    },6000);
    */
   this.getMovies();
   
  }

  render() {
    console.log("render Call")
    const {isLoading, movies} = this.state;
    return (
           <section className="container">
              {isLoading ? (
                              <div className="loader">
                                <span className="loader_text">'Loading....'</span>
                              </div>
                           )
                          : (
                   <div className="movies">
                    {movies.map(movie => (
                         <Movie 
                            key={movie.id}
                            id={movie.id}
                            year={movie.year}
                            title={movie.title}
                            summary={movie.summary}
                            poster={movie.medium_cover_image}
                            genres={movie.genres}
                        />
                    ))}  
                  </div>
              )}
          </section>
            );
  }
}

export default Home;