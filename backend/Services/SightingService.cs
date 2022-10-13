using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        IEnumerable<Sighting> GetApprovedSightings();
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

        public Sighting CreateSighting(CreateSightingRequest request)
        {
            //TODO
            //logic, change request to include locationID
            var newSighting = new Sighting
            {
                SeenBy = request.Name,
                SeenOn = request.Date,
                ImageUrl = request.ImageUrl,
                Description = request.Description,
                Latitude = request.Latitude,
                Longitude = request.Longitude
            };

            return _sightings.CreateSighting(newSighting);
        }
    }
}
