using Microsoft.EntityFrameworkCore;
using SchoolManagementSystem.Infrastructure.Data;
using SchoolManagementSystem.Infrastructure.Repositories;
using SchoolManagementSystem.Domain.Interfaces;
using SchoolManagementSystem.API.Middleware;
using Microsoft.OpenApi.Models;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Services;
using SchoolManagementSystem.Domain.Entities;
using Microsoft.AspNetCore.Cors.Infrastructure;
using SchoolManagementSystem.Application.Mappers;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole(); // Logs to console
builder.Logging.AddDebug();   // Logs to debug window

// Configure services
builder.Services.AddDbContext<SchoolContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register the generic repository
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<ICampuses, CampusService>();
builder.Services.AddScoped<CampusMapper>();
builder.Services.AddScoped<IDepartments, DepartmentService>();
builder.Services.AddScoped<DepartmentMapper>();
builder.Services.AddScoped<IStudent, StudentService>();

// Add controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();  // Adds support for minimal APIs
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "School Mamagement System", Version = "v1" });
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

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
