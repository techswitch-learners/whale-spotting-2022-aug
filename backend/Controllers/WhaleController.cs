using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;

namespace WhaleSpotting.Controllers {
  [ApiController]
  [Route("/whales")]
  public class WhaleController : ControllerBase {
    private readonly IWhaleService _whales;

    public WhaleController(
      IWhaleService whales
    ) {
      _whales = whales;
    }
  }
}
