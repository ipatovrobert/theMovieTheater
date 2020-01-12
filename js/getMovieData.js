const currentLink = window.location.href;
const url = new URL(currentLink);

async function getMovieData() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${url.searchParams.get('id')}?api_key=d0e19023b7e791711d2dc48e57d187c8&language=en-US`);
    const data = await response.json();
    return data;
}

getMovieData().then(data => {
    let actualGenres = new Array;
    for(i = 0; i < data.genres.length; i++){
        actualGenres.push(data.genres[i].name);
    }

    function minutesToHours() {
        const actualTime = data.runtime;
        const hours = (actualTime / 60);
        const roundedHours = Math.floor(hours);
        const minutes = (hours - roundedHours) * 60;
        const roundedMinutes = Math.round(minutes);

        return `${roundedHours}h ${roundedMinutes}m`;
    }

    // Movie background image
    document.querySelector('.movie-background').style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`;
    // Movie poster
    document.querySelector('.movie-details--image img').setAttribute('src', `https://image.tmdb.org/t/p/original${data.poster_path}`);
    // Movie title
    document.querySelector('.movie-title').textContent = data.original_title;
    // Movie paragraph
    document.querySelector('.movie-paragraph').textContent = data.overview;
    // Movie release date
    document.querySelector('.movie-release').textContent = `Release date: ${data.release_date}`;
    // Movie genre
    document.querySelector('#genreArr').textContent = actualGenres.join(', ');
    // Movie runtime
    document.querySelector('#runtimeValue').textContent = minutesToHours();
    // Movie status
    document.querySelector('#statusValue').textContent = data.status;
    // Movie avgScr
    document.querySelector('#avgScrValue').textContent = data.vote_average;
});