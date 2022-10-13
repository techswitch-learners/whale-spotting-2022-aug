using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using Microsoft.EntityFrameworkCore;
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
        
        [HttpGet("/approved")] 
        public IActionResult<ListResponse<Sighting>>GetApprovedSightings()
        {
            var approvedSightings = _sightings.GetApprovedSightings();
            return new ListResponse<Sightings>(approvedSightings);
        }

        [HttpGet("/unconfirmed")] 
        public IActionResult<ListResponse<Sighting>>GetUnconfirmedSightings()
        {
            var unconfirmedSightings = _sightings.GetUnconfirmedSightings();
            return new ListResponse<Sightings>(unconfirmedSightings);
        }

        [HttpGet("/species/{speciesId}")]
        public ActionResult<ListResponse<Sighting>> GetSightingsBySpeciesId([FromRoute] int speciesId)
        {
            var sightings = _sightings.GetSightingsBySpeciesId(speciesId);
            return new ListResponse<Sighting>(sightings);
        }
    }
}
