using System.Collections.Generic;
namespace WhaleSpotting.Models.Database
{
    public class WhaleSpecies
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ScientificName { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public ConservationStatus ConservationStatus { get; set; }
        public List<Location> Locations { get; set; }
    }
}
