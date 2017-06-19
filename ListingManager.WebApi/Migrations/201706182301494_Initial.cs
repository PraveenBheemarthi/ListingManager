namespace ListingManager.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Agents",
                c => new
                    {
                        AgentId = c.Int(nullable: false, identity: true),
                        AgentName = c.String(nullable: false, maxLength: 200),
                        AgentCreatedDateTime = c.DateTime(),
                        AgentLastUpdatedDateTime = c.DateTime(),
                    })
                .PrimaryKey(t => t.AgentId);
            
            CreateTable(
                "dbo.Listings",
                c => new
                    {
                        ListingId = c.Int(nullable: false, identity: true),
                        ListingName = c.String(nullable: false, maxLength: 300),
                        ListingAddress = c.String(nullable: false, maxLength: 1000),
                        ListingCreatedDateTime = c.DateTime(),
                        ListingLastUpdatedDateTime = c.DateTime(),
                        AgentId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ListingId)
                .ForeignKey("dbo.Agents", t => t.AgentId, cascadeDelete: true)
                .Index(t => t.AgentId);
            
            CreateTable(
                "dbo.OpenHouses",
                c => new
                    {
                        OpenHouseId = c.Int(nullable: false, identity: true),
                        OpenHouseBeginDate = c.DateTime(nullable: false),
                        OpenHouseEndDate = c.DateTime(nullable: false),
                        OpenHouseCreatedDateTime = c.DateTime(),
                        OpenHouseLastUpdatedDateTime = c.DateTime(),
                        ListingId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.OpenHouseId)
                .ForeignKey("dbo.Listings", t => t.ListingId, cascadeDelete: true)
                .Index(t => t.ListingId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.OpenHouses", "ListingId", "dbo.Listings");
            DropForeignKey("dbo.Listings", "AgentId", "dbo.Agents");
            DropIndex("dbo.OpenHouses", new[] { "ListingId" });
            DropIndex("dbo.Listings", new[] { "AgentId" });
            DropTable("dbo.OpenHouses");
            DropTable("dbo.Listings");
            DropTable("dbo.Agents");
        }
    }
}
