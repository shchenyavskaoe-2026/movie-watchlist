
    using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Category
    {
              public int Id { get; set; } 
              [MaxLength(50)]
              public required string Name { get; set; }


    [JsonIgnore]
          public ICollection<Movie> Movies { get; set; } = new List<Movie>();

          [NotMapped]
          public List<int>? MovieIds { get; set; }

    }


}