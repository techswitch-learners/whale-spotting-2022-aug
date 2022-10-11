using System; 

namespace WhaleSpotting.Models.Database
{
    public class Sightings
    {
        public int Id { get; set; }
        public int WhaleSpeciesId { get; set; }
        public string SeenBy { get; set; }
        public DateTime SeenOn { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public int WhaleCount { get; set; }
        public int ConservationStatusId { get; set; }
        public int LocationId { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
