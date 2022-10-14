using System.Collections.Generic;
using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        IEnumerable<Sighting> GetApprovedSightings();
        IEnumerable<Sighting> GetPendingSightings();
        IEnumerable<Sighting> GetSightingsBySpeciesId(int speciesId);
        Sighting CreateSighting(CreateSightingRequest request);
    }
    
    public class SightingService : ISightingService
    {
        private readonly ISightingRepo _sightings;

        public SightingService(ISightingRepo sightings)
        {
            _sightings = sightings;
        }
        public IEnumerable<Sighting> GetSightingsBySpeciesId(int speciesId)
        {
            return _sightings.GetSightingsBySpeciesId(speciesId);
        }
        public IEnumerable<Sighting> GetApprovedSightings()
        {
            return _sightings.GetApprovedSightings();
        }
        public IEnumerable<Sighting> GetPendingSightings()
        {
            return _sightings.GetPendingSightings();
        }

        public Sighting CreateSighting(CreateSightingRequest request)
        {
            var newSighting = new Sighting
            {
                SeenBy = request.Name,
                SeenOn = request.Date,
                ImageUrl = request.ImageUrl,
                Description = request.Description,
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                ConfirmationStatus = ConfirmationStatus.Pending,
            };

            return _sightings.CreateSighting(newSighting);
        }
    }
}
