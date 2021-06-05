using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Api.Models
{
    public partial class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbContext()
        {
        }

        public DbContext(DbContextOptions<DbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CategoriaDespesa> CategoriaDespesas { get; set; }
        public virtual DbSet<CategoriaReceita> CategoriaReceita { get; set; }
        public virtual DbSet<Movimento> Movimentos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=dev;Username=postgres;Password=123456");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Portuguese_Brazil.1252");

            modelBuilder.Entity<CategoriaDespesa>(entity =>
            {
                entity.ToTable("categoria_despesa");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("descricao");
            });

            modelBuilder.Entity<CategoriaReceita>(entity =>
            {
                entity.ToTable("categoria_receita");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("descricao");
            });

            modelBuilder.Entity<Movimento>(entity =>
            {
                entity.ToTable("movimento");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CategoriaDespesaId).HasColumnName("categoria_despesa_id");

                entity.Property(e => e.CategoriaReceitaId).HasColumnName("categoria_receita_id");

                entity.Property(e => e.Data)
                    .HasColumnType("date")
                    .HasColumnName("data");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("descricao");

                entity.Property(e => e.Valor)
                    .HasPrecision(10, 2)
                    .HasColumnName("valor");

                entity.HasOne(d => d.CategoriaDespesa)
                    .WithMany(p => p.Movimentos)
                    .HasForeignKey(d => d.CategoriaDespesaId)
                    .HasConstraintName("movimento_categoria_despesa_id_fkey");

                entity.HasOne(d => d.CategoriaReceita)
                    .WithMany(p => p.Movimentos)
                    .HasForeignKey(d => d.CategoriaReceitaId)
                    .HasConstraintName("movimento_categoria_receita_id_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
