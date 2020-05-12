document.querySelector('.search-content--search').addEventListener('click', function(){
    if(document.querySelector('.search-content--search').value === 'Search for a movie...'){
        document.querySelector('.search-content--search').value = null;
    }
})

document.querySelector('.search-content--search').addEventListener('keyup', function(e){
    e.preventDefault();
    
    let y = document.querySelector('.search-content');
    let z = document.querySelectorAll('.search-content--result');
    z.forEach(function(self){
        self.remove()
    });
    const searchValue = document.querySelector('.search-content--search').value;
    async function getMovies() {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=###&language=en-US&query=${searchValue}&page=1&include_adult=false`);
        const data = await response.json();
        return data;
    }

    getMovies().then(data => {
        data.results.forEach(function(date){
            let x = document.createElement('div');
            //Link is speciffic to 'https://ipatovrobert.github.io/theMovieTheater/' because of the limitetions of Github Pages
            x.innerHTML = `<a href="https://ipatovrobert.github.io/theMovieTheater/movie.html?id=${date.id}"> ${date.original_title} </a>`
            x.className = 'search-content--result';
            y.appendChild(x);
        })
    }
        );

    //document.querySelector('.search-content--search').style.borderBottom = '1px solid';
    document.querySelector('.search-content').style.borderRadius = '2rem';
})

async function getTrendingMovies() {
    const response =  await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=d0e19023b7e791711d2dc48e57d187c8');
    const data = await response.json();
    return data;
}

getTrendingMovies().then(data => { 
    for(i = 0; i < 4; i++){
        const movie = document.querySelectorAll('.trending-movies--item');
        const movieLink = document.querySelectorAll('#trending-movies--link');

        movie[i].src = "https://image.tmdb.org/t/p/original" + data.results[i].poster_path;
        //Link is speciffic to 'https://ipatovrobert.github.io/theMovieTheater/' because of the limitetions of Github Pages
        movieLink[i].setAttribute('href', `https://ipatovrobert.github.io/theMovieTheater/movie.html?id=${data.results[i].id}`);
}
});
