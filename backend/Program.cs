using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Repositories;

var builder = WebApplication.CreateBuilder(args);

// ============================================
// STEP 1: REGISTER SERVICES (before builder.Build())
// All builder.Services.Add___ goes here
// These register dependencies for Dependency Injection
// ============================================

// OpenAPI for API documentation
builder.Services.AddOpenApi();

// Database - connects to PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories - tells DI how to create repository instances
// AddScoped = new instance per HTTP request
builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

// Controllers - enables API controllers
builder.Services.AddControllers();

  // CORS - allows frontend to call API
  builder.Services.AddCors(options =>
  {
      options.AddPolicy("AllowFrontend", policy =>
      {
          policy.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
      });
  });



// ============================================
// STEP 2: BUILD THE APP
// This creates the app from all registered services
// ============================================

var app = builder.Build();

// ============================================
// STEP 3: CONFIGURE MIDDLEWARE (after builder.Build())
// All app.___ goes here
// Middleware runs on every HTTP request in order
// ============================================

// Development-only features
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


// CORS - allows frontend to call API
 app.UseCors("AllowFrontend");


 
// Redirects HTTP to HTTPS
app.UseHttpsRedirection();

// Maps controller routes (api/movies, api/categories, etc.)
app.MapControllers();

app.Run();
