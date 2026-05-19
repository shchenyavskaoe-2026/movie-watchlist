
    using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Category
    {
              public int Id { get; set; } 
              [MaxLength(50)]
              public required string Name { get; set; }


  [JsonIgnore]  // Add this - stops the circular loop
               public ICollection<Movie> Movies { get; set; } = new List<Movie>();

    }


}