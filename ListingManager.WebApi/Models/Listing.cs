using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ListingManager.WebApi.Models
{
    public class Listing
    {
        public int ListingId { get; set; }

        [Required]
        public string ListingName { get; set; }

        [Required]
        public string ListingAddress { get; set; }

        public DateTime? ListingCreatedDateTime { get; set; }

        public DateTime? ListingLastUpdatedDateTime { get; set; }

        // Foreign Key
        public int AgentId { get; set; }
        // Navigation property
        public Agent Agent { get; set; }
    }
}