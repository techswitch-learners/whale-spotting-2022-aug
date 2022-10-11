using System.Collections.Generic;
namespace WhaleSpotting.Models.Database
{
    public class Location
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public List<WhaleSpecies> WhaleSpecies { get; set; }
    }
}
