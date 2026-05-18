# Backend Setup

## Overview
ASP.NET Core 10 Web API with Entity Framework Core and PostgreSQL database.

## Tech Stack
- .NET 10 / ASP.NET Core
- Entity Framework Core with Npgsql (PostgreSQL)
- Repository Pattern with Dependency Injection

## Database Schema

### Movies Table
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | Primary Key, Auto-increment |
| Title | string | Required, Max 200 chars |
| Year | int? | Nullable |
| Director | string? | Max 100 chars |
| Plot | string? | Max 2000 chars |
| Poster | string? | Max 500 chars (URL) |
| ImdbId | string? | Max 20 chars |
| Rating | int? | Range 1-10 |
| IsWatched | bool | Default false |
| CreatedAt | DateTime | Set on creation |

### Categories Table
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | Primary Key, Auto-increment |
| Name | string | Required, Max 50 chars |

### CategoryMovie Table (Junction)
| Column | Type | Description |
|--------|------|-------------|
| MoviesId | int | FK to Movies |
| CategoriesId | int | FK to Categories |

## Architecture
```
Program.cs          → DI configuration, middleware, CORS
Models/             → Entity classes (Movie, Category)
Data/               → AppDbContext (EF Core)
Repositories/       → Data access layer (interfaces + implementations)
Controllers/        → REST API endpoints
```

## Configuration
- CORS enabled for http://localhost:4200
- PostgreSQL connection in appsettings.json
- Scoped lifetime for repositories

## Server
- HTTP: http://localhost:5244
- HTTPS: https://localhost:7135
