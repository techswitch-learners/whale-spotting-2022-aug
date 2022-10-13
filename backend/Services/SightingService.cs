using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        public IEnumerable<Sighting> GetApprovedSightings();
        IEnumerable<Sighting> GetSightingsBySpeciesId(int speciesId);
    }
    
    public class SightingService : ISightingService
    {
        private readonly ISightingRepo _sightings;

        public SightingService(ISightingRepo sightings)
        {
            _sightings = sightings;
        }
        
        public IEnumerable<Sighting> GetApprovedSightings()
        {
            return _sightings.GetApprovedSightings();
        }

        public IEnumerable<Sighting> GetUnconfirmedSightings()
        {
            return _sightings.GetUnconfirmedSightings();
        }

        public IEnumerable<Sighting> GetSightingsBySpeciesId(int speciesId)
        {
            return _sightings.GetSightingsBySpeciesId(speciesId);
        }
    }
}
