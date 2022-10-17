using System.Collections.Generic;
using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        IEnumerable<Sighting> GetApprovedSightings();
        IEnumerable<Sighting> GetPendingSightings();
        IEnumerable<Sighting> GetSightingsBySpeciesId(int speciesId);
        Sighting CreateSighting(CreateSightingRequest request);
        bool ConfirmOrRejectSighting(ConfirmOrRejectRequest confirmOrRejectSighting);
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
            //TODO: WS-40
            //logic, change request to include locationID
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

        public bool ConfirmOrRejectSighting(ConfirmOrRejectRequest confirmOrRejectSighting)
        {
            if (confirmOrRejectSighting.isApproved == true)
            {
                return _sightings.ConfirmRequest(confirmOrRejectSighting.SightingId);
            }
            else if (confirmOrRejectSighting.isApproved == false)
            {
                return _sightings.RejectRequest(confirmOrRejectSighting.SightingId);
            }
            return false;
        }
    }
}
