using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Controllers {
    [ApiController]
    [Route("/sightings")]
    public class SightingController : ControllerBase {
        private readonly ISightingService _sightings;

        public SightingController(ISightingService sightings)
        {
            _sightings = sightings;
        }
         
        [HttpGet("species/{speciesId}")]
        public ActionResult<ListResponse<Sighting>> GetSightingsBySpeciesId([FromRoute] int speciesId)
        {
            var sightings = _sightings.GetSightingsBySpeciesId(speciesId);
            return new ListResponse<Sighting>(sightings);
        }
    }
}
