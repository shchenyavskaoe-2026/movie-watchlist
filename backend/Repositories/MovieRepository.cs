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
      var movies = await _context.Movies
          .Include(m => m.Categories)
          .ToListAsync();

      // Populate CategoryIds from Categories
      foreach (var movie in movies)
      {
          movie.CategoryIds = movie.Categories.Select(c => c.Id).ToList();
      }

      return movies;
  }

  public async Task<Movie?> GetByIdAsync(int id)
  {
      var movie = await _context.Movies
          .Include(m => m.Categories)
          .FirstOrDefaultAsync(m => m.Id == id);

      if (movie != null)
      {
          movie.CategoryIds = movie.Categories.Select(c => c.Id).ToList();
      }

      return movie;
  }

       
    public async Task<Movie> CreateAsync(Movie movie)
  {
      // Use CategoryIds instead of Categories
      if (movie.CategoryIds?.Any() == true)
      {
          movie.Categories = await _context.Categories
              .Where(c => movie.CategoryIds.Contains(c.Id))
              .ToListAsync();
      }

      movie.CreatedAt = DateTime.UtcNow;
      _context.Movies.Add(movie);
      await _context.SaveChangesAsync();

      // Populate CategoryIds for response
      movie.CategoryIds = movie.Categories.Select(c => c.Id).ToList();

      return movie;
  }



  public async Task<Movie?> UpdateAsync(int id, Movie movie)
  {
      // Load existing movie WITH categories
      var existingMovie = await _context.Movies
          .Include(m => m.Categories)  // Important!
          .FirstOrDefaultAsync(m => m.Id == id);

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

      // Update categories
      if (movie.CategoryIds != null)
      {
          existingMovie.Categories = await _context.Categories
              .Where(c => movie.CategoryIds.Contains(c.Id))
              .ToListAsync();
      }

      await _context.SaveChangesAsync();

      // Populate CategoryIds for response
      existingMovie.CategoryIds = existingMovie.Categories.Select(c => c.Id).ToList();

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


