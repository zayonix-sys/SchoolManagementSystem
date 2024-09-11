using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Domain.Entities;

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
        public DbSet<AdmissionApplication> Applications { get; set; }
        public DbSet<AdmissionTest> AdmissionTests { get; set; }
        public DbSet<Admission> Admissions { get; set; }
        public DbSet<Campus> Campuses { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeRole> EmployeeRoles { get; set; }

        public DbSet<ClassSubject> ClassSubjects { get; set; }

        public DbSet<ClassSectionAssignment> ClassSectionAssignments { get; set; }

        public DbSet<Subject> Subjects { get; set; }

        public DbSet<TimeTable> TimeTables { get; set; }

        public DbSet<SubjectTeacherAssignment> SubjectTeachers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships and keys here

            modelBuilder.Entity<Student>()
                .HasKey(s => s.StudentId);

            modelBuilder.Entity<Admission>()
                .HasKey(a => a.AdmissionId);

            modelBuilder.Entity<Admission>()
                .HasOne(a => a.Student);

            modelBuilder.Entity<AdmissionApplication>()
                .HasIndex(a => a.ApplicantId);

            modelBuilder.Entity<AdmissionTest>()
                .HasIndex(at => at.ApplicationId);

            modelBuilder.Entity<Admission>()
                .HasIndex(ad => ad.StudentId)
                .IsUnique();

            modelBuilder.Entity<Admission>()
                .HasIndex(ad => new { ad.StudentId, ad.ApplicationId })
                .IsUnique();

            modelBuilder.Entity<EmployeeRole>()
                .HasIndex(er => er.RoleName)
                .IsUnique();

            modelBuilder.Entity<Employee>()
                .HasIndex(e => e.Email)
                .IsUnique();

            modelBuilder.Entity<ApplicantApplicationView>()
                .HasNoKey();
                

            // Map the entity to the SQL Server view
            modelBuilder.Entity<ApplicantApplicationView>().ToView("vw_ApplicantDetails");

            base.OnModelCreating(modelBuilder);
        }
    }
}
