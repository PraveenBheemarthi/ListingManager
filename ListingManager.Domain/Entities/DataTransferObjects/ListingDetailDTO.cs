using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListingManager.Domain.Entities.DataTransferObjects
{
    public class ListingDetailDTO
    {
        public int ListingId { get; set; }

        public string ListingName { get; set; }

        public string ListingAddress { get; set; }

        public string AgentName { get; set; }
    }
}
