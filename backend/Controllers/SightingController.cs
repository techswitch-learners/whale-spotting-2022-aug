using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers {
    [ApiController]
    [Route("/sightings")]
    public class SightingController : ControllerBase {
        private readonly ISightingService _sightings;
        
        public SightingController
        (
            ISightingService sightings
        ) {
            _sightings = sightings;
        }
    }
}
