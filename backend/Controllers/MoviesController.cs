 using Microsoft.AspNetCore.Mvc;
  using Backend.Models;
  using Backend.Repositories;

  namespace Backend.Controllers
  {
      [ApiController]
      [Route("api/[controller]")]
      public class MoviesController : ControllerBase
      {
          private readonly IMovieRepository _repository;

          public MoviesController(IMovieRepository repository)
          {
              _repository = repository;
          }


    // GET /api/movies?search=term
  [HttpGet]
  public async Task<ActionResult<List<Movie>>> GetAll([FromQuery] string? search)
  {
      var movies = await _repository.GetAllAsync(search);
      return Ok(movies);
  }

  // GET: api/movies/5
  [HttpGet("{id}")]
  public async Task<ActionResult<Movie>> GetById(int id)
  {
      var movie = await _repository.GetByIdAsync(id);
      if (movie == null)
      {
          return NotFound();
      }
      return Ok(movie);
  }

  // POST: api/movies
  [HttpPost]
  public async Task<ActionResult<Movie>> Create(Movie movie)
  {
      var created = await _repository.CreateAsync(movie);
      return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  // PUT: api/movies/5
  [HttpPut("{id}")]
  public async Task<ActionResult<Movie>> Update(int id, Movie movie)
  {
      var updated = await _repository.UpdateAsync(id, movie);
      if (updated == null)
      {
          return NotFound();
      }
      return Ok(updated);
  }

  // DELETE: api/movies/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
      var deleted = await _repository.DeleteAsync(id);
      if (!deleted)
      {
          return NotFound();
      }
      return NoContent();
  }






      }
  }