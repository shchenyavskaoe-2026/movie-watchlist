  using Microsoft.EntityFrameworkCore;
  using Backend.Models;


    namespace Backend.Data
  {
      public class AppDbContext : DbContext
      {
          public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
          {
          }

          public DbSet<Movie> Movies { get; set; } //"Movies" table access point 
          public DbSet<Category> Categories { get; set; } //"Categories" table access point 
      }
  }