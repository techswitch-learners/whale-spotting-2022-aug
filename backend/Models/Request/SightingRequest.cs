using System.ComponentModel.DataAnnotations;
using System;

namespace WhaleSpotting.Models.Request
{
    public class SightingRequest
    {            
        public int WhaleSpeciesId { get; set; }
        [StringLength(200)]
        public string SeenBy { get; set; }
        [Required]        
        public DateTime SeenOn { get; set; }
        [StringLength(200)]
        public string ImageUrl { get; set; }
        [StringLength(1500)]
        public string Description { get; set; }
        [Required]
        public int WhaleCount { get; set; }
        public int LocationId { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
