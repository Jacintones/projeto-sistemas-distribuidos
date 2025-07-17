using api_entregas.Models;
using Microsoft.EntityFrameworkCore;

namespace api_entregas.Data
{
    public class EntregaDbContext : DbContext
    {
        public EntregaDbContext(DbContextOptions<EntregaDbContext> options)
            : base(options)
        {
        }

        public DbSet<Entrega> Entregas => Set<Entrega>();
        public DbSet<Motoboy> Motoboys => Set<Motoboy>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Entrega>()
                .Property(e => e.Status)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
