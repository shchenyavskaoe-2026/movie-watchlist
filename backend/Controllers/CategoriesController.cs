 using Microsoft.AspNetCore.Mvc;
  using Backend.Models;
  using Backend.Repositories;

  namespace Backend.Controllers
  {
      [ApiController]
      [Route("api/[controller]")]
      public class CategoriesController : ControllerBase
      {
          private readonly ICategoryRepository _repository;

          public CategoriesController(ICategoryRepository repository)
          {
              _repository = repository;
          }



  // GET: api/categories
  [HttpGet]
  public async Task<ActionResult<List<Category>>> GetAll()
  {
      var c = await _repository.GetAllAsync();
      return Ok(c);
  }

  // GET: api/categories/5
  [HttpGet("{id}")]
  public async Task<ActionResult<Category>> GetById(int id)
  {
      var c = await _repository.GetByIdAsync(id);
      if (c == null)
      {
          return NotFound();
      }
      return Ok(c);
  }

  // POST: api/categories
  [HttpPost]
  public async Task<ActionResult<Category>> Create(Category c)
  {
      var created = await _repository.AddAsync(c);
      return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  // PUT: api/categories/5
  [HttpPut("{id}")]
  public async Task<ActionResult<Category>> Update(int id, Category c)
  {
      var updated = await _repository.UpdateAsync(id, c);
      if (updated == null)
      {
          return NotFound();
      }
      return Ok(updated);
  }

  // DELETE: api/categories/5
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


 // - GET /api/categories/{id}/movies/count - optional, uses your GetMoviesCountAsync

  // GET: api/categories/5/
   [HttpGet("{id}/movies/count")]
  public async Task<ActionResult<int>> GetMoviesCount(int id)
  {
      var c = await _repository.GetMoviesCountAsync(id);
      return Ok(c);
  }



      }
  }