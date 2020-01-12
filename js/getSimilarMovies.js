async function getSimilarMovies(){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${url.searchParams.get('id')}/similar?api_key=d0e19023b7e791711d2dc48e57d187c8&language=en-US&page=1`);
    const data = await response.json();
    return data;
}
getSimilarMovies().then(data => {
    
    for(i = 0; i < 5; i++){
        document.querySelectorAll('#similarMovies')[i].setAttribute('src', `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`);
        console.log(data.results[i].id);
        document.querySelectorAll('.similar-items a')[i].setAttribute('href', `/movie.html?id=${data.results[i].id}`);
    }
});