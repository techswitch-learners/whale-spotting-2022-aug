using Microsoft.AspNetCore.Mvc;
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
    }
}
