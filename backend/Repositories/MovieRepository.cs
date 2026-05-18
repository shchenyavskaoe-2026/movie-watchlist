 using Microsoft.EntityFrameworkCore;
  using Backend.Data;
  using Backend.Models;

  namespace Backend.Repositories
  {
      public class MovieRepository : IMovieRepository
      {
          private readonly AppDbContext _context;

          // Constructor - receives DbContext via Dependency Injection
          public MovieRepository(AppDbContext context)
          {
              _context = context;
          }

          public async Task<List<Movie>> GetAllAsync()
          {
              return await _context.Movies
                  .Include(m => m.Categories)  // Also load related categories
                  .ToListAsync();
          }

          public async Task<Movie?> GetByIdAsync(int id)
          {
              return await _context.Movies
                  .Include(m => m.Categories)
                  .FirstOrDefaultAsync(m => m.Id == id);
          }

          public async Task<Movie> CreateAsync(Movie movie)
     {
      // If categories were sent, link to EXISTING categories
      if (movie.Categories != null && movie.Categories.Any())
      {
          var categoryIds = movie.Categories.Select(c => c.Id).ToList();
          movie.Categories = await _context.Categories
              .Where(c => categoryIds.Contains(c.Id))
              .ToListAsync();
      }

      movie.CreatedAt = DateTime.UtcNow;
      _context.Movies.Add(movie);
      await _context.SaveChangesAsync();
      return movie;
  }

          public async Task<Movie?> UpdateAsync(int id, Movie movie)
          {
              var existingMovie = await _context.Movies.FindAsync(id);
              if (existingMovie == null) return null;

              // Update properties
              existingMovie.Title = movie.Title;
              existingMovie.Year = movie.Year;
              existingMovie.Director = movie.Director;
              existingMovie.Plot = movie.Plot;
              existingMovie.Poster = movie.Poster;
              existingMovie.ImdbId = movie.ImdbId;
              existingMovie.Rating = movie.Rating;
              existingMovie.IsWatched = movie.IsWatched;

              await _context.SaveChangesAsync();
              return existingMovie;
          }

          public async Task<bool> DeleteAsync(int id)
          {
              var movie = await _context.Movies.FindAsync(id);
              if (movie == null) return false;

              _context.Movies.Remove(movie);
              await _context.SaveChangesAsync();
              return true;
          }

          public async Task<List<Movie>> GetByWatchedStatusAsync(bool isWatched)
          {
              return await _context.Movies
                  .Include(m => m.Categories)
                  .Where(m => m.IsWatched == isWatched)
                  .ToListAsync();
          }
      }
  }


