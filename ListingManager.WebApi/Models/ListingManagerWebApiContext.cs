using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ListingManager.WebApi.Models
{
    public class ListingManagerWebApiContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public ListingManagerWebApiContext() : base("name=ListingManagerWebApiContext")
        {
            //this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        }

        public System.Data.Entity.DbSet<ListingManager.WebApi.Models.Agent> Agents { get; set; }

        public System.Data.Entity.DbSet<ListingManager.WebApi.Models.Listing> Listings { get; set; }

        public System.Data.Entity.DbSet<ListingManager.WebApi.Models.OpenHouse> OpenHouses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agent>().Property(x => x.AgentName).HasMaxLength(200).IsRequired();
            modelBuilder.Entity<Listing>().Property(x => x.ListingName).HasMaxLength(300).IsRequired();
            modelBuilder.Entity<Listing>().Property(x => x.ListingAddress).HasMaxLength(1000).IsRequired();
            base.OnModelCreating(modelBuilder);
        }
    }
}
