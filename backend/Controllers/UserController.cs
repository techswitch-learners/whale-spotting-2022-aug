using Microsoft.AspNetCore.Mvc;
using System;
using WhaleSpotting.Services;
using WhaleSpotting.Helpers;
using WhaleSpotting.Models.Request;
using WhaleSpotting.Models.Database;
using WhaleSpotting.Models.Response;

namespace WhaleSpotting.Controllers 
{
    [ApiController]
    [Route("/users")]
    public class UserController : ControllerBase 
    {

        private readonly IAuthService _authService;
        private readonly IUserService _userService;

        public UserController
        (
            IAuthService authService,
            IUserService userService
        ) {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("create")]
        public ActionResult<UserResponse> Create([FromHeader] string authorization, [FromBody] CreateUserRequest newUserRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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
                
                User createdUser = _userService.Create(newUserRequest);

                return new UserResponse(newUserRequest);  
            }
            catch (Exception)
            {
                return new UnauthorizedResult();
            }
        }
    }
}
