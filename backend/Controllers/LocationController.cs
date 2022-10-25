using System;
using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers {
    [ApiController]
    [Route("/locations")]
    public class LocationController : ControllerBase {
        private readonly ILocationService _locations;

        public LocationController
        (
            ILocationService locations
        ) {
            _locations = locations;
        }
        
        [HttpGet("{locationId}")]
        public ActionResult<Location> GetLocationById([FromRoute] int locationId)
        {
            try
            {
                var whale = _locations.GetLocationById(locationId);
                return whale;
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}
