namespace SchoolManagementSystem.Application.DTOs
{
    public class DashboardCountViewDTO
    {
        public int? TotalSponsors { get; set; }
        public int? TotalEmployees { get; set; }
        public int? TotalStudents { get; set; }
        public int? NewSponsorsThisMonth { get; set; }
        public int? NewEmployeesThisMonth { get; set; }
        public int? NewStudentsThisMonth { get; set; }
        public int? SponsorStudent { get; set; }
        public int? MaleStudents { get; set; }
        public int? FemaleStudents { get; set; }
    }
}
