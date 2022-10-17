using System.ComponentModel.DataAnnotations;
using System;

namespace WhaleSpotting.Models.Request
{
    public class ConfirmOrRejectRequest
    {
        [Required]
        public int SightingId { get; set; }

        // true == approved
        // false == rejected
        [Required]
        public bool isApproved { get; set; }
    }
}
