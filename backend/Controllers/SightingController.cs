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

        [HttpPatch]
        public ActionResult ConfirmOrRejectSighting([FromHeader] string authorization, [FromBody] ConfirmOrRejectRequest confirmOrRejectRequest)
        {
            if (authorization is null)
            {
                return new UnauthorizedResult();
            }

            try
            {
                var encodedUsernamePassword = authorization.Substring("Basic ".Length).Trim();
                string usernamePassword = AuthHelper.Base64Decode(encodedUsernamePassword);
                int separatorIndex = usernamePassword.IndexOf(':');

                var splitUsernamePassword = usernamePassword.Split(':');
                var username = splitUsernamePassword[0];
                var password = splitUsernamePassword[1];

                var check = _authService.IsValidLoginInfo(username, password);
                if (!check)
                {
                    return new UnauthorizedResult();
                }

                var result = _sightings.ConfirmOrRejectSighting(confirmOrRejectRequest);
                if (result)
                {
                    return StatusCode(200);
                }
                return StatusCode(400);
            }
            catch (Exception)
            {
                return new UnauthorizedResult();
            }
        }
    }
}
