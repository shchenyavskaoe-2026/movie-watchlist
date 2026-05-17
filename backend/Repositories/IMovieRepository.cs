  using Backend.Models;

  namespace Backend.Repositories
  {
      public interface IMovieRepository
      {
          Task<List<Movie>> GetAllAsync();   //List all movies   │ GET /api/movies
          Task<Movie?> GetByIdAsync(int id);   // Get single movie  │ GET /api/movies/1 
          Task<Movie> CreateAsync(Movie movie);   //Add new movie     │ POST /api/movies
          Task<Movie?> UpdateAsync(int id, Movie movie);  //Edit movie  │ PUT /api/movies/1 
          Task<bool> DeleteAsync(int id);   //Remove movie      │ DELETE /api/movies/1
          Task<List<Movie>> GetByWatchedStatusAsync(bool isWatched);   //Filter by watched │ GET /api/movies?watched=true
      }
  }