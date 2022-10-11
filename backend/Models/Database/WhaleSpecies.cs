namespace WhaleSpotting.Models.Database
{
    public class WhaleSpecies
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ScientificName { get; set; }
        public string Description { get; set; }
        public string PhotoUrl { get; set; }
        public string ConservationStatusId { get; set; }
    }
}
