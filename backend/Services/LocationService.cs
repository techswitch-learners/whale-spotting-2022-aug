using System;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using WhaleSpotting.Repositories;

namespace WhaleSpotting.Services
{
    public interface ILocationService
    {
    }

    public class LocationService : ILocationService
    {
        private readonly ILocationRepo _locations;

        public LocationService(ILocationRepo locations)
        {
            _locations = locations;
        }
    }
}
