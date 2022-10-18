using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/sightings")]
    public class SightingController : ControllerBase
    {
        private readonly ISightingService _sightings;

        public SightingController(ISightingService sightings)
        {
            _sightings = sightings;
        }

        [HttpGet]
        public ActionResult<ListResponse<Sighting>> GetApprovedSightings()
        {
            var approvedSightings = _sightings.GetApprovedSightings();
            return new ListResponse<Sighting>(approvedSightings);
        }

        [HttpGet("species/{speciesId}")]
        public ActionResult<ListResponse<Sighting>> GetSightingsBySpeciesId([FromRoute] int speciesId)
        {
            var sightings = _sightings.GetSightingsBySpeciesId(speciesId);
            return new ListResponse<Sighting>(sightings);
        }

        [HttpGet("/pending")]
        public ActionResult<ListResponse<Sighting>> GetPendingSightings()
        {
            var pendingSightings = _sightings.GetPendingSightings();
            return new ListResponse<Sighting>(pendingSightings);
        }

        [HttpPost]
        public ActionResult CreateSighting([FromBody] CreateSightingRequest createSightingRequest)
        {
            var createdSighting = _sightings.CreateSighting(createSightingRequest);
            return Created("/api", createdSighting);
        }
        [HttpGet("{sightingId}")]
        public ActionResult<Sighting> GetSightingById([FromRoute] int sightingId)
        {
            var sighting = _sightings.GetSightingById(sightingId);
            return sighting;
        }
    }
}
