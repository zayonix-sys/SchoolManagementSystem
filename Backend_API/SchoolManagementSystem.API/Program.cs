using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SchoolManagementSystem.API.Middleware;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Application.Services;
using SchoolManagementSystem.Domain.Entities;
using SchoolManagementSystem.Domain.Interfaces;
using SchoolManagementSystem.Infrastructure.Data;
using SchoolManagementSystem.Infrastructure.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole(); // Logs to console
builder.Logging.AddDebug();   // Logs to debug window

// Configure services
builder.Services.AddDbContext<SchoolContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register the generic repository
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

builder.Services.AddScoped<IUserAccount, UserAccountService>();
builder.Services.AddScoped<UserMapper>();

builder.Services.AddScoped<ICampuses, CampusService>();
builder.Services.AddScoped<CampusMapper>();
builder.Services.AddScoped<IClassroom, ClassroomService>();
builder.Services.AddScoped<ClassroomMapper>();
builder.Services.AddScoped<ISection, SectionService>();
builder.Services.AddScoped<SectionMapper>();
builder.Services.AddScoped<IDepartments, DepartmentService>();
builder.Services.AddScoped<DepartmentMapper>();
builder.Services.AddScoped<IClass, ClassService>();
builder.Services.AddScoped<ClassMapper>();
builder.Services.AddScoped<ISection, SectionService>();
builder.Services.AddScoped<SectionMapper>();
builder.Services.AddScoped<IApplicant, ApplicantService>();
builder.Services.AddScoped<ApplicantMapper>();
builder.Services.AddScoped<ApplicationMapper>();
builder.Services.AddScoped<ApplicantApplicationMapper>();
builder.Services.AddScoped<TimeTableViewMapper>();
builder.Services.AddScoped<IQuestionBank, QuestionBankService>();
builder.Services.AddScoped<QuestionBankMapper>();

builder.Services.AddScoped<IEmployee, EmployeeService>();
builder.Services.AddScoped<EmployeeMapper>();
builder.Services.AddScoped<IEmployeeRoles, EmployeeRolesService>();
builder.Services.AddScoped<RoleMapper>();
builder.Services.AddScoped<IClassSectionAssignment, ClassSectionAssignmentService>();
builder.Services.AddScoped<ClassSectionAssignmentMapper>();
builder.Services.AddScoped<IClassSubject, ClassSubjectService>();
builder.Services.AddScoped<ClassSubjectMapper>();
builder.Services.AddScoped<ITimeTable, TimeTableService>();
builder.Services.AddScoped<TimeTableMapper>();
builder.Services.AddScoped<IPeriod, PeriodService>();
builder.Services.AddScoped<PeriodMapper>();

builder.Services.AddScoped<IStudent, StudentService>();
builder.Services.AddScoped<StudentMapper>();
builder.Services.AddScoped<ISubject, SubjectService>();
builder.Services.AddScoped<SubjectMapper>();
builder.Services.AddScoped<ISubjectTeacherAssignment, SubjectTeacherAssignmentService>();
builder.Services.AddScoped<SubjectTeacherAssignmentMapper>();
builder.Services.AddScoped<ISponsor, SponsorService>();
builder.Services.AddScoped<SponsorMapper>();
builder.Services.AddScoped<IExamPaper, ExamPaperService>();
builder.Services.AddScoped<ExamPaperMapper>();
builder.Services.AddScoped<ExamPaperUpdateMapper>();
builder.Services.AddScoped<ISponsorship, SponsorshipService>();
builder.Services.AddScoped<SponsorshipMapper>();
builder.Services.AddScoped<ISponsorshipDetail, SponsorshipDetailService>();
builder.Services.AddScoped<SponsorshipDetailMapper>();

builder.Services.AddScoped<IExamPaperPDF, ExamPaperPdfService>();
builder.Services.AddScoped<IExam, ExamService>();
builder.Services.AddScoped<ExamMapper>();
//builder.Services.AddScoped<IExamResult, ExamResultService>();
//builder.Services.AddScoped<ExamResultMapper>();

builder.Services.AddScoped<IStudentAttendance, StudentAttendanceService>();
builder.Services.AddScoped<StudentAttendanceMapper>();

builder.Services.AddScoped<IPayment, PaymentService>();
builder.Services.AddScoped<PaymentMapper>();
builder.Services.AddScoped<IUserRoles, UserRolesService>();
builder.Services.AddScoped<UserRoleMapper>();
builder.Services.AddScoped<IUserPermission, UserPermissionService>();
builder.Services.AddScoped<UserPermissionMapper>();

builder.Services.AddScoped<IDashboardCountView, DashboardCountViewService>();
builder.Services.AddScoped<DashboardCountViewMapper>();





// Add controllers
builder.Services.AddControllers();

// JWT Authention
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddEndpointsApiExplorer();  // Adds support for minimal APIs
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "School Management System", Version = "v1" });
});

// Add other services and middleware configurations if needed
// builder.Host.UseSerilog((context, config) => { config.ReadFrom.Configuration(context.Configuration); });

// builder.Services.AddAutoMapper(typeof(Program)); // Example for AutoMapper

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});



var app = builder.Build();

// Seed the database with default data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SchoolContext>();
    SeedDefaultData(context);
}

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS
app.UseCors("AllowAllOrigins");

// Add custom error-handling middleware
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors("AllowLocalhost3000");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
//app.UseExceptionHandler("/Home/Error"); // For production
app.UseDeveloperExceptionPage(); // Server Side Exception (For development)
app.Run();


//Method for Default Data
void SeedDefaultData(SchoolContext context)
{
    // Seed default campus, roles and users
    if (!context.Campuses.Any())
    {
        var defaultCampus = new Campus
        {
            CampusName = "Default Campus",
            Address = "Karachi",
            Country = "Pakistan",
            State = "Sindh",
            City = "Karachi",
            PostalCode = "12345",
            PhoneNumber = "021-1234567",
            Email = "default@school.com"
        };
        context.Campuses.Add(defaultCampus);
        context.SaveChanges();
    }

    if (!context.UserRoles.Any())
    {

        var defaultRole = new UserRole
        {
            RoleName = "Admin",
            RoleDescription = "Administrator role with full permissions",
            CreatedAt = DateTime.Now,
            IsActive = true,
        };
        context.UserRoles.Add(defaultRole);
        context.SaveChanges();
    }

    var campudId = context.Campuses.Select(c => c.CampusId).FirstOrDefault();

    var adminRoleId = context.UserRoles
        .Where(r => r.RoleName == "Admin")
        .Select(r => r.RoleId)
        .FirstOrDefault();

    if (!context.Users.Any())
    {
        var defaultUser = new User
        {
            UserName = "Super Admin",
            PasswordHash = "password", // Properly hash the password
            RoleId = adminRoleId,
            CampusId = Convert.ToInt32(campudId),
            CreatedAt = DateTime.Now,
        };
        context.Users.Add(defaultUser);
        context.SaveChanges();
    }
}

