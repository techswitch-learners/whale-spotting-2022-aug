using Microsoft.AspNetCore.Mvc;
using WhaleSpotting.Services;
using WhaleSpotting.Models.Response;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Helpers;
using System;

namespace WhaleSpotting.Controllers
{
    [ApiController]
    [Route("/sightings")]
    public class SightingController : ControllerBase
    {
        private readonly ISightingService _sightings;
        private readonly IAuthService _authService;

        public SightingController
        (
            IAuthService authService,
            ISightingService sightings
        )
        {
            _authService = authService;
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

        [HttpGet("pending")]
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

        [HttpPatch("{sightingId}/confirmation")]
        public ActionResult ChangeConfirmationStatus(
            [FromHeader] string authorization, 
            [FromRoute] int sightingId,
            [FromBody] ConfirmOrRejectRequest confirmOrRejectRequest)
        {
            if (authorization is null)
            {
                return new UnauthorizedResult();
            }
            try
            {
                (string, string) usernamePassword = AuthHelper.GetUsernameAndPassword(authorization);
                string username = usernamePassword.Item1;
                string password = usernamePassword.Item2;

                var check = _authService.IsValidLoginInfo(username, password);
                if (!check)
                {
                    return Unauthorized();
                }

                var result = _sightings.ConfirmOrRejectSighting(confirmOrRejectRequest, sightingId);
                if (result != null)
                {
                    return NoContent();
                }
                return NotFound();
            }
            catch (Exception)
            {
                return Unauthorized();
            }

        }
    }
}
