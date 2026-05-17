 using Microsoft.EntityFrameworkCore;
  using Backend.Data;
  using Backend.Models;

  namespace Backend.Repositories
  {
      public class CategoryRepository : ICategoryRepository
      {
          private readonly AppDbContext _context;

          // Constructor - receives DbContext via Dependency Injection
          public CategoryRepository(AppDbContext context)
          {
              _context = context;
          }

          public async Task<List<Category>> GetAllAsync()
          {
              return await _context.Categories
                  .Include(m => m.Movies)  // Also load related movies
                  .ToListAsync();
          }


          public async Task<Category?> GetByIdAsync(int id)
          {
              return await _context.Categories
                  .Include(m => m.Movies)
                  .FirstOrDefaultAsync(m => m.Id == id);
          }

          public async Task<Category> AddAsync(Category category)
          {
              _context.Categories.Add(category);
              await _context.SaveChangesAsync();
              return category;
          }


          public async Task<Category?> UpdateAsync(int id, Category category)
          {
              var existingCategory= await _context.Categories.FindAsync(id);
              if (existingCategory == null) return null;

              // Update properties
              existingCategory.Name = category.Name;
       
              await _context.SaveChangesAsync();
              return existingCategory;
          }
 

          public async Task<bool> DeleteAsync(int id)
          {
              var cat = await _context.Categories.FindAsync(id);
              if (cat == null) return false;

              _context.Categories.Remove(cat);
              await _context.SaveChangesAsync();
              return true;
          }


          public async Task<Category?> GetByNameAsync(string name)
          {
              return await _context.Categories
                  .Include(m => m.Movies)
                  .FirstOrDefaultAsync(m => m.Name == name);
          }


       public async Task<bool> ExistsAsync(int id)
  {
      return await _context.Categories.AnyAsync(c => c.Id == id);
  }

     
  public async Task<int> GetMoviesCountAsync(int categoryId)
  {
      var category = await _context.Categories
          .Include(c => c.Movies)
          .FirstOrDefaultAsync(c => c.Id == categoryId);

      return category?.Movies?.Count ?? 0;
  }







      }
  }