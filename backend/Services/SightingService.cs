using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        public IEnumerable<Sighting> GetApprovedSightings();
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
    }
}
