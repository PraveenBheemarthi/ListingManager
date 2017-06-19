using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ListingManager.WebApi.Models
{
    public class OpenHouse
    {
        public int OpenHouseId { get; set; }

        [Required]
        public DateTime OpenHouseBeginDate { get; set; }

        [Required]
        public DateTime OpenHouseEndDate { get; set; }

        public DateTime? OpenHouseCreatedDateTime { get; set; }

        public DateTime? OpenHouseLastUpdatedDateTime { get; set; }

        // Foreign Key
        public int ListingId { get; set; }
        // Navigation property
        public Listing Listing { get; set; }
    }
}