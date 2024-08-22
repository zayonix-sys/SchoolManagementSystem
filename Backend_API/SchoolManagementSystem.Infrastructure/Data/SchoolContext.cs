using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagementSystem.Infrastructure.Data
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<AdmissionTest> AdmissionTests { get; set; }
        public DbSet<Admission> Admissions { get; set; }
        public DbSet<Campus> Campuses { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships and keys here

            modelBuilder.Entity<Student>()
                .HasKey(s => s.StudentId);

            modelBuilder.Entity<Admission>()
                .HasKey(a => a.AdmissionId);

            modelBuilder.Entity<Admission>()
                .HasOne(a => a.Student);

            modelBuilder.Entity<Application>()
                .HasIndex(a => a.ApplicantId);

            modelBuilder.Entity<AdmissionTest>()
                .HasIndex(at => at.ApplicationId);

            modelBuilder.Entity<Admission>()
                .HasIndex(ad => ad.StudentId)
                .IsUnique();

            modelBuilder.Entity<Admission>()
                .HasIndex(ad => new { ad.StudentId, ad.ApplicationId })
                .IsUnique();

            // Add configurations for other entities
        }
    }
}
