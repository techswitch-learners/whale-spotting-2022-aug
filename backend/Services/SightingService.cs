using System.Collections.Generic;
using WhaleSpotting.Repositories;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        IEnumerable<Sighting> GetApprovedSightings();
        IEnumerable<Sighting> GetPendingSightings();
        IEnumerable<Sighting> GetSightingsBySpeciesId(int speciesId);
        Sighting CreateSighting(CreateSightingRequest request);
        IEnumerable<Sighting> GetSightingsByLocationId(int locationId);
        Sighting ConfirmOrRejectSighting(ConfirmOrRejectRequest confirmOrRejectSighting, int sightingId);
        Sighting GetSightingById(int sightingId);
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
                SeenBy = request.SeenBy,
                SeenOn = request.SeenOn,
                ImageUrl = request.ImageUrl,
                Species = _whales.GetSpeciesById(request.SpeciesId),
                Description = request.Description,
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                WhaleCount = request.WhaleCount,
                ConfirmationStatus = ConfirmationStatus.Pending,
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

        public IEnumerable<Sighting> GetSightingsByLocationId(int locationId)
        {
            return _sightings.GetSightingsByLocationId(locationId);
        }

        public Sighting GetSightingById(int sightingId)
        {
            return _sightings.GetSightingById(sightingId);
        }

        public async Task GetLongformLocationNameAsync(double latitude, double longitude)
        {
            string apiUrl = $"https://nominatim.openstreetmap.org/reverse?format=json&lat={latitude}&lon={longitude}";
            try{
                using (HttpClient client = new HttpClient())
                {
                    using (HttpResponseMessage res = await client.GetAsync(apiUrl))
                    {
                        
                        using (HttpContent content = res.Content)
                        {
                            var data = await content.ReadAsStringAsync();   
                            if (data == null)
                            {
                                Console.WriteLine("No location found!!");
                            }
                            // else
                            // {
                            //     return 
                            // }
                        }

                    }
                }
            }
            catch(Exception exception)
            {
                Console.WriteLine(exception);
            }
        }
    }
}
