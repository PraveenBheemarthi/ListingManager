namespace ListingManager.WebApi.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ListingManager.WebApi.Models.ListingManagerWebApiContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ListingManager.WebApi.Models.ListingManagerWebApiContext context)
        {
            context.Agents.AddOrUpdate(x => x.AgentId,
              new Agent() { AgentId = 1, AgentName = "Jane Austen", AgentCreatedDateTime = DateTime.Now, AgentLastUpdatedDateTime = DateTime.Now },
              new Agent() { AgentId = 2, AgentName = "Charles Dickens", AgentCreatedDateTime = DateTime.Now, AgentLastUpdatedDateTime = DateTime.Now },
              new Agent() { AgentId = 3, AgentName = "Miguel de Cervantes", AgentCreatedDateTime = DateTime.Now, AgentLastUpdatedDateTime = DateTime.Now }
              );

            context.Listings.AddOrUpdate(x => x.ListingId,
                new Listing()
                {
                    ListingId = 1,
                    ListingName = "Pride and Prejudice",
                    ListingAddress = "1813 Maple Avenue, San Pedro, CA 90731",
                    ListingCreatedDateTime = DateTime.Now,
                    ListingLastUpdatedDateTime = DateTime.Now,
                    AgentId = 1,
                },
                new Listing()
                {
                    ListingId = 2,
                    ListingName = "Northanger Abbey",
                    ListingAddress = " 1817 W. Adams Lane San Jose, CA 95116",
                    ListingCreatedDateTime = DateTime.Now,
                    ListingLastUpdatedDateTime = DateTime.Now,
                    AgentId = 1
                },
                new Listing()
                {
                    ListingId = 3,
                    ListingName = "David Copperfield",
                    ListingAddress = "1850 W. Windsor Dr. Carmichael, CA 95608",
                    ListingCreatedDateTime = DateTime.Now,
                    ListingLastUpdatedDateTime = DateTime.Now,
                    AgentId = 2
                },
                new Listing()
                {
                    ListingId = 4,
                    ListingName = "Don Quixote",
                    ListingAddress = "1617 East Bayberry Street Hanford, CA 93230",
                    ListingCreatedDateTime = DateTime.Now,
                    ListingLastUpdatedDateTime = DateTime.Now,
                    AgentId = 3
                });

            context.OpenHouses.AddOrUpdate(x => x.OpenHouseId,
               new OpenHouse()
               {
                   OpenHouseId = 1,
                   OpenHouseBeginDate = Convert.ToDateTime("06/18/2016 14:00:00.00"),
                   OpenHouseEndDate = Convert.ToDateTime("06/18/2016 15:00:00.00"),
                   OpenHouseCreatedDateTime = DateTime.Now,
                   OpenHouseLastUpdatedDateTime = DateTime.Now,
                   ListingId = 1
               },
               new OpenHouse()
               {
                   OpenHouseId = 2,
                   OpenHouseBeginDate = Convert.ToDateTime("06/18/2016 16:00:00.00"),
                   OpenHouseEndDate = Convert.ToDateTime("06/18/2016 17:00:00.00"),
                   OpenHouseCreatedDateTime = DateTime.Now,
                   OpenHouseLastUpdatedDateTime = DateTime.Now,
                   ListingId = 2
               },
                new OpenHouse()
                {
                    OpenHouseId = 3,
                    OpenHouseBeginDate = Convert.ToDateTime("06/18/2016 18:00:00.00"),
                    OpenHouseEndDate = Convert.ToDateTime("06/18/2016 19:00:00.00"),
                    OpenHouseCreatedDateTime = DateTime.Now,
                    OpenHouseLastUpdatedDateTime = DateTime.Now,
                    ListingId = 3
                },
                new OpenHouse()
                {
                    OpenHouseId = 4,
                    OpenHouseBeginDate = Convert.ToDateTime("06/18/2016 11:00:00.00"),
                    OpenHouseEndDate = Convert.ToDateTime("06/18/2016 12:00:00.00"),
                    OpenHouseCreatedDateTime = DateTime.Now,
                    OpenHouseLastUpdatedDateTime = DateTime.Now,
                    ListingId = 4
                }
                );
        }
    }
}
