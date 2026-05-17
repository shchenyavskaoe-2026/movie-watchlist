

using Backend.Models;

  namespace Backend.Repositories
  {
      public interface ICategoryRepository
      {
          Task<List<Category>> GetAllAsync();   
          Task<Category?> GetByIdAsync(int id);   
          Task<Category> AddAsync(Category category);   
          Task<Category?> UpdateAsync(int id, Category category);  
          Task<bool> DeleteAsync(int id);  
          Task<Category?> GetByNameAsync(string name);   
          Task<bool> ExistsAsync(int id); 
          Task<int> GetMoviesCountAsync(int categoryId);

      }
  }