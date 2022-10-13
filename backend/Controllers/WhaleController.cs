using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers {
    [ApiController]
    [Route("/whales")]
    public class WhaleController : ControllerBase {
        private readonly IWhaleService _whales;

        public WhaleController
        (
            IWhaleService whales
        ) {
            _whales = whales;
        }

        [HttpGet("")]
        public ActionResult<ListResponse<Species>> GetAllSpecies()
        {
            var whales = _whales.GetAllSpecies();
            return new ListResponse<Species>(whales);
        }
    }
}
