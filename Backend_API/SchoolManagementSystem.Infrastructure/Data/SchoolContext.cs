using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Domain.Entities;

namespace SchoolManagementSystem.Infrastructure.Data
{
    public class SchoolContext : DbContext
    {
        public SchoolContext(DbContextOptions<SchoolContext> options) : base(options)
        {
        }

        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserPermission> UserPermissions { get; set; }
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
        public DbSet<Period> Periods { get; set; }
        public DbSet<SubjectTeacherAssignment> SubjectTeachers { get; set; }
        public DbSet<Sponsor> Sponsors { get; set; }
        public DbSet<QuestionBank> QuestionsBank { get; set; }
        public DbSet<ExamPaper> ExamPaper { get; set; }
        public DbSet<Exam> Exams { get; set; }

        public DbSet<ExamResult> ExamResults { get; set; }
        public DbSet<Sponsorship> Sponsorships { get; set; }

        public DbSet<Payment> SponsorPayments { get; set; }
        public DbSet<SponsorshipDetail> SponsorshipDetails { get; set; }

        public DbSet<StudentAttendance> StudentAttendance { get; set; }
        //public DbSet<ExamResult> ExamResults { get; set; }

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
                .HasIndex(a => a.ApplicationId);

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

            modelBuilder.Entity<TimeTableView>()
                .HasNoKey();

            modelBuilder.Entity<DashboardCountView>()
                          .HasNoKey();
           modelBuilder.Entity<User>()
            .HasMany(u => u.Permissions) // Navigation property in User
            .WithOne(up => up.Users) // Navigation property in UserPermission
            .HasForeignKey(up => up.UserId); // Foreign key in UserPermission



            // Map the entity to the SQL Server view
            modelBuilder.Entity<ApplicantApplicationView>().ToView("vw_ApplicantDetails");
            modelBuilder.Entity<TimeTableView>().ToView("TimeTableView");
            modelBuilder.Entity<DashboardCountView>().ToView("DashboardCountViews");

            base.OnModelCreating(modelBuilder);
        }
    }
}
