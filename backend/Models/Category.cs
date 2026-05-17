
    using System.ComponentModel.DataAnnotations;
  
  namespace Backend.Models
{
    public class Category
    {
              public int Id { get; set; } 
              [MaxLength(50)]
              public required string Name { get; set; }



               public ICollection<Movie> Movies { get; set; } = new List<Movie>();

    }


}