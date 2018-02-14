namespace MajeBug.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Bugs",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        body = c.String(nullable: false, maxLength: 500),
                        isFixed = c.Boolean(nullable: false),
                        stepToReproduce = c.String(maxLength: 250),
                        title = c.String(nullable: false, maxLength: 120),
                        createdByid = c.String(nullable: false, maxLength: 128),
                        modifiedById = c.String(maxLength: 128),
                        severity = c.Int(nullable: false),
                        createdAt = c.DateTime(nullable: false),
                        modifiedAt = c.DateTime(),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.Users", t => t.createdByid, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.modifiedById)
                .Index(t => t.createdByid)
                .Index(t => t.modifiedById);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        createdAt = c.DateTime(nullable: false),
                        name = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Bugs", "modifiedById", "dbo.Users");
            DropForeignKey("dbo.Bugs", "createdByid", "dbo.Users");
            DropIndex("dbo.Bugs", new[] { "modifiedById" });
            DropIndex("dbo.Bugs", new[] { "createdByid" });
            DropTable("dbo.Users");
            DropTable("dbo.Bugs");
        }
    }
}
