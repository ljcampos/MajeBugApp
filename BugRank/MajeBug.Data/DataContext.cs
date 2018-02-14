namespace MajeBug.Data
{
    using MajeBugDomain;
    using System;
    using System.Data.Entity;
    using System.Linq;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;

    public class DataContext : DbContext
    {
        // El contexto se ha configurado para usar una cadena de conexión 'DataContext' del archivo 
        // de configuración de la aplicación (App.config o Web.config). De forma predeterminada, 
        // esta cadena de conexión tiene como destino la base de datos 'MajeBug.Data.DataContext' de la instancia LocalDb. 
        // 
        // Si desea tener como destino una base de datos y/o un proveedor de base de datos diferente, 
        // modifique la cadena de conexión 'DataContext'  en el archivo de configuración de la aplicación.
        public DataContext()
            : base("name=DataContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var bug = modelBuilder.Entity<Bug>();
            bug.HasKey(x => x.id).Property(x => x.id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            bug.Property(x => x.isFixed).IsRequired();
            bug.Property(x => x.title).HasMaxLength(120).IsRequired();
            bug.Property(x => x.body).HasMaxLength(500).IsRequired();
            bug.Property(x => x.stepToReproduce).HasMaxLength(250).IsOptional();
            bug.Property(x => x.severity).IsRequired();
            // relations
            // tracking
            bug.HasRequired(x => x.createdby).WithMany().HasForeignKey(x => x.createdByid);
            bug.HasOptional(x => x.modifiedBy).WithMany().HasForeignKey(x => x.modifiedById);
            // severity

            // concurrency managment
            bug.Property(x => x.RowVersion).IsConcurrencyToken();

            var user = modelBuilder.Entity<User>();
            user.HasKey(x => x.Id);
            user.Property(x => x.name).HasMaxLength(100);
            user.Property(x => x.createdAt).IsRequired();
        }

        // Agregue un DbSet para cada tipo de entidad que desee incluir en el modelo. Para obtener más información 
        // sobre cómo configurar y usar un modelo Code First, vea http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }
        public virtual DbSet<Bug> Bugs { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}

    //public class UserMap : EntityTypeConfiguration<User>
    //{

    //}
}