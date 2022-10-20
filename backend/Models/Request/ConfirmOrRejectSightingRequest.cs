using System.ComponentModel.DataAnnotations;
using System;
using WhaleSpotting.Models.Database;

namespace WhaleSpotting.Models.Request
{
    public class ConfirmOrRejectRequest
    {
        [Required]
        public ConfirmationStatus NewConfirmationStatus{ get; set; }
    }
}
