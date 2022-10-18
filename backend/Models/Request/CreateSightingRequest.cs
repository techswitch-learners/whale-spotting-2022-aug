using System.ComponentModel.DataAnnotations;
using System;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class CreateSightingRequest
    {
        public int SpeciesId { get; set; }
        [Required]
        [StringLength(70)]
        public string SeenBy { get; set; }
        [Required]
        public DateTime SeenOn { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public int WhaleCount { get; set; }          
        [Required]
        public float Latitude { get; set; }
        [Required]
        public float Longitude { get; set; }
    }
}
