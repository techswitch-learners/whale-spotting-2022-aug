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
        Sighting ConfirmOrRejectSighting(ConfirmOrRejectRequest confirmOrRejectSighting, int sightingId);
    }

    public class SightingService : ISightingService
    {
        private readonly ISightingRepo _sightings;
        private readonly IWhaleRepo _whales;

        public SightingService(ISightingRepo sightings, IWhaleRepo whales)
        {
            _sightings = sightings;
            _whales = whales;
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
                Species = _whales.GetSpeciesById(request.SpeciesId),
                SeenBy = request.SeenBy,
                SeenOn = request.SeenOn,
                ImageUrl = request.ImageUrl,
                Description = request.Description,
                WhaleCount = request. WhaleCount,
                ConfirmationStatus = ConfirmationStatus.Pending,               
                Latitude = request.Latitude,
                Longitude = request.Longitude
            };
            return _sightings.CreateSighting(newSighting);
        }

        public Sighting ConfirmOrRejectSighting(ConfirmOrRejectRequest confirmOrRejectSighting, int sightingId)
        {
            if (confirmOrRejectSighting.NewConfirmationStatus == ConfirmationStatus.Approved)
            {
                return _sightings.ConfirmRequest(sightingId);
            }
            else if (confirmOrRejectSighting.NewConfirmationStatus == ConfirmationStatus.Rejected)
            {
                return _sightings.RejectRequest(sightingId);
            }
            throw new ArgumentOutOfRangeException("The confirmation request was not to approve or reject the sighting. " +
                $"To approve, the NewConfirmationStatus of the request should be {(int) ConfirmationStatus.Approved}." +
                $"To reject, it should be {(int) ConfirmationStatus.Rejected}.");
        }
    }
}
