using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListingManager.Domain.Entities.DataTransferObjects
{
    public class OpenHouseDetailDTO
    {
        public int OpenHouseId { get; set; }

        public DateTime OpenHouseBeginDate { get; set; }

        public DateTime OpenHouseEndDate { get; set; }

        public string ListingName { get; set; }
    }
}
