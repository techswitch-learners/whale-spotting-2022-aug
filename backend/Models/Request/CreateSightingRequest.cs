using System.ComponentModel.DataAnnotations;
using System;

namespace WhaleSpotting.Models.Request
{
    public class CreateSightingRequest
    {
        public Species Species { get; set; }
        [Required]
        [StringLength(70)]
        public string SeenBy { get; set; }
        [Required]
        public DateTime SeenOn { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public int WhaleCount { get; set; }
        public ConfirmationStatus ConfirmationStatus { get; set; }
        public Location Location { get; set; }
        [Required]
        public float Latitude { get; set; }
        [Required]
        public float Longitude { get; set; }
    }
}
