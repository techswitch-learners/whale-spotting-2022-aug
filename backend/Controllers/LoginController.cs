using Microsoft.AspNetCore.Mvc;
using System;
using WhaleSpotting.Services;
using WhaleSpotting.Helpers;

namespace WhaleSpotting.Controllers {
    [ApiController]
    [Route("/login")]
    public class LoginController : ControllerBase {

        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public LoginController
        (
            IAuthService authService,
            IUserService userService
        ) {
            _authService = authService;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult Login([FromHeader(Name = "Authorization")] string authHeader) {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (authHeader is null)
            {
                return new UnauthorizedResult();
            }

            try
            {
                var encodedUsernamePassword = authHeader.Substring("Basic ".Length).Trim();
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
                else
                {
                    return Ok();
                }
            }
            catch (Exception)
            {
                return new UnauthorizedResult();
            }
        }
    }
}
