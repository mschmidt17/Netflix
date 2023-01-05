export const getPopularMovies = async() => {
	try {
		const response = await fetch(` https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20`)
		const data = await response.json()
		return data?.results
	} 
	catch(error) {
		alert(error)
	}
}

export const getFeaturedMovies = async() => {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20`)
		const data = await response.json()
		return data?.results
	} 
	catch (error) {
		alert(error)
	}
}