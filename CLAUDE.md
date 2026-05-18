# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack Movie Watchlist application for tracking movies you want to watch or have watched.

**Tech Stack:**
- **Backend:** .NET 10 / ASP.NET Core + Entity Framework Core + PostgreSQL
- **Frontend:** Angular 21 (Standalone Components, Signals, Zoneless)

## Development Rules

### Full-Stack Thinking
When implementing any feature, ALWAYS consider the complete flow:
1. **Frontend** - UI components, forms, user interaction
2. **Service** - API calls, data transformation
3. **Backend Controller** - Request handling, validation
4. **Repository** - Database operations, relationships
5. **Database** - Schema changes, migrations needed?

Never implement frontend without checking if backend supports it.
Never add API calls without verifying the endpoint exists and handles the data correctly.

### Feature Requirements Process
Before implementing any new feature, create a requirements document in the `requirements/` folder.

When gathering requirements, ask questions ONE BY ONE. For each question:
1. **Research first** - Check existing code, patterns, and constraints before asking
2. **Explain why** - Briefly state why this question matters
3. **Suggest options** - Provide multiple solutions/variations with reasoning for each
4. **Recommend one** - Indicate which option you would select and why
5. **Describe value** - Explain how your selection improves the app, UI, or UX

Example requirement file: `requirements/feature-movie-search.md`

### Before Adding a Feature, Ask:
- Does the backend endpoint exist?
- Does it accept the data format we're sending?
- Are there database relationships that need special handling (e.g., many-to-many)?
- Do we need a migration?
- Does the Repository method handle linking existing entities vs creating new ones?

### EF Core Many-to-Many Relationships
When sending related entities (like categories for a movie), the backend must:
1. Extract IDs from the sent objects
2. Load existing entities from database
3. Assign loaded entities to the relationship
4. Then save

Example:
```csharp
// DON'T: Use sent objects directly (tries to INSERT new records)
_context.Movies.Add(movie);

// DO: Load existing related entities first
var categoryIds = movie.Categories.Select(c => c.Id).ToList();
movie.Categories = await _context.Categories
    .Where(c => categoryIds.Contains(c.Id))
    .ToListAsync();
_context.Movies.Add(movie);
```

## Commands

### Backend (from `backend/` directory)
```bash
dotnet run                              # Run API at http://localhost:5244
dotnet build                            # Build project
dotnet ef migrations add <Name>         # Create EF migration
dotnet ef database update               # Apply migrations to PostgreSQL
```

### Frontend (from `frontend/` directory)
```bash
npm start                               # Dev server at http://localhost:4200
npm run build                           # Production build
npm test                                # Run tests with Vitest
```

### Database
```bash
psql moviewatchlist                     # Connect to database
\dt                                     # List tables
\d "Movies"                             # Describe Movies table
```

## Architecture

### Backend Structure
```
backend/
├── Program.cs                 # DI setup, middleware, CORS config
├── appsettings.json          # PostgreSQL connection string
├── Models/
│   ├── Movie.cs              # Movie entity (Title, Year, Director, Rating, IsWatched, etc.)
│   └── Category.cs           # Category entity (Name, Movies collection)
├── Data/
│   └── AppDbContext.cs       # EF Core DbContext with DbSet<Movie>, DbSet<Category>
├── Repositories/
│   ├── IMovieRepository.cs   # Interface: GetAll, GetById, Create, Update, Delete
│   ├── MovieRepository.cs    # Implementation with async EF Core operations
│   ├── ICategoryRepository.cs # Interface with additional ExistsAsync, GetMoviesCountAsync
│   └── CategoryRepository.cs # Implementation
└── Controllers/
    ├── MoviesController.cs   # REST API: /api/movies
    └── CategoriesController.cs # REST API: /api/categories
```

### Frontend Structure
```
frontend/src/app/
├── app.config.ts             # Providers: zoneless detection, HttpClient, router
├── app.ts                    # Root component importing child components
├── app.html                  # Main template with <app-category-list>, <app-movie-list>
├── models/
│   ├── movie.model.ts        # TypeScript interface matching backend Movie
│   └── category.model.ts     # TypeScript interface matching backend Category
├── services/
│   ├── movie.service.ts      # HttpClient calls to /api/movies
│   └── category.service.ts   # HttpClient calls to /api/categories
├── components/
│   ├── movie-list/           # Displays all movies using Signals
│   └── category-list/        # Displays all categories using Signals
└── environments/
    ├── environment.ts        # Dev: apiUrl = http://localhost:5244/api
    └── environment.prod.ts   # Prod: apiUrl placeholder
```

## Key Patterns

### Backend

**Repository Pattern with DI:**
```csharp
// Interface defines contract
public interface IMovieRepository {
    Task<List<Movie>> GetAllAsync();
    Task<Movie?> GetByIdAsync(int id);
    // ...
}

// Registered in Program.cs
builder.Services.AddScoped<IMovieRepository, MovieRepository>();

// Injected in Controller
public MoviesController(IMovieRepository repository) { }
```

**Entity Framework with Eager Loading:**
```csharp
return await _context.Movies
    .Include(m => m.Categories)  // Load related data
    .ToListAsync();
```

**REST Controller Pattern:**
```csharp
[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase {
    [HttpGet]           // GET /api/movies
    [HttpGet("{id}")]   // GET /api/movies/5
    [HttpPost]          // POST /api/movies
    [HttpPut("{id}")]   // PUT /api/movies/5
    [HttpDelete("{id}")] // DELETE /api/movies/5
}
```

### Frontend

**Zoneless Angular with Signals:**
```typescript
// app.config.ts - No Zone.js needed
provideZonelessChangeDetection()

// Component using Signals
movies = signal<Movie[]>([]);

loadMovies(): void {
  this.movieService.getAll().subscribe(data => {
    this.movies.set(data);  // Triggers change detection
  });
}
```

**Modern Control Flow (Angular 17+):**
```html
@for (movie of movies(); track movie.id) {
  <li>{{ movie.title }}</li>
} @empty {
  <li>No movies found</li>
}

@if (movie.isWatched) {
  <span>Watched</span>
}
```

**Service with Environment Config:**
```typescript
import { environment } from '../../environments/environment';

private apiUrl = `${environment.apiUrl}/movies`;
```

## Database Schema

**Tables:**
- `Movies` - id, Title, Year, Director, Plot, Poster, ImdbId, Rating, IsWatched, CreatedAt
- `Categories` - id, Name
- `CategoryMovie` - Junction table for many-to-many (auto-generated by EF Core)

**Relationships:**
- Movie <-> Category: Many-to-Many via CategoryMovie junction table

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/movies | Get all movies |
| GET | /api/movies/{id} | Get movie by ID |
| POST | /api/movies | Create movie |
| PUT | /api/movies/{id} | Update movie |
| DELETE | /api/movies/{id} | Delete movie |
| GET | /api/categories | Get all categories |
| GET | /api/categories/{id} | Get category by ID |
| POST | /api/categories | Create category |
| PUT | /api/categories/{id} | Update category |
| DELETE | /api/categories/{id} | Delete category |
| GET | /api/categories/{id}/movies/count | Get movie count in category |

## Configuration

### Backend CORS (Program.cs)
```csharp
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy => {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

### PostgreSQL Connection (appsettings.json)
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=moviewatchlist;Username=olha"
}
```

## Server Ports
- Frontend: http://localhost:4200
- Backend: http://localhost:5244
- PostgreSQL: localhost:5432

## Testing API with curl
```bash
# Get all categories
curl http://localhost:5244/api/categories

# Create category
curl -X POST http://localhost:5244/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Action"}'

# Create movie
curl -X POST http://localhost:5244/api/movies \
  -H "Content-Type: application/json" \
  -d '{"title": "Inception", "year": 2010, "director": "Christopher Nolan", "rating": 9, "isWatched": true}'
```
