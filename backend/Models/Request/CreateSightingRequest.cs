using System.ComponentModel.DataAnnotations;
using System;

namespace WhaleSpotting.Models.Request
{
    public class CreateSightingRequest
    {
        [Required]
        [StringLength(70)]
        public string Name { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public float Latitude { get; set; }

        [Required]
        public float Longitude { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }
    }
}
