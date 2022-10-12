using System.ComponentModel.DataAnnotations;
using WhaleSpotting.Models.Request;

namespace WhaleSpotting.Models.Response
{
    public class UserResponse
    {
        [Required]
        [StringLength(70)]
        public string Name { get; set; }

        [Required]
        [StringLength(70)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public UserResponse(CreateUserRequest newUserRequest)
        {
            this.Name = newUserRequest.Name;
            this.Username = newUserRequest.Username;
            this.Email = newUserRequest.Email;
        }
    }
}