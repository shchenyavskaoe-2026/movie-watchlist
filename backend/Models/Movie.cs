
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
  using System.ComponentModel.DataAnnotations.Schema;
 using System.Text.Json.Serialization;  // Add this

  
  namespace Backend.Models 
  {

public class Movie // 'public' allows access from other parts of the app
    {
        public int Id { get; set; } 

        [MaxLength(200)] 
        public required string Title { get; set; }
        public int? Year { get; set; }
         [MaxLength(100)]
        public string? Director { get; set; }
         [MaxLength(2000)]
        public string? Plot { get; set; }
        [MaxLength(500)]
        public string? Poster { get; set; }
          [MaxLength(20)]
        public string? ImdbId { get; set; }
         [Range(1, 10)]   
        public int? Rating { get; set; }
        public bool IsWatched { get; set; } = false;
        public DateTime CreatedAt { get; set; }



          [JsonIgnore]  // Don't send to frontend
          public ICollection<Category> Categories { get; set; } = new List<Category>();

          [NotMapped]
          public List<int>? CategoryIds { get; set; }
    }

  }