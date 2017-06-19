using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace ListingManager.WebApi.Models
{
    public class Agent
    {
        public int AgentId { get; set; }
        [Required]
        public string AgentName { get; set; }

        public DateTime? AgentCreatedDateTime { get; set; }

        public DateTime? AgentLastUpdatedDateTime { get; set; }
    }
}