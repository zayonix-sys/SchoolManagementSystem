using Microsoft.Extensions.DependencyInjection;
using SchoolManagementSystem.Application.Interfaces;
using SchoolManagementSystem.Application.Mappers;
using SchoolManagementSystem.Application.Services;

namespace SchoolManagementSystem.Application
{
	public static class ApplicationServicesRegistration
	{
		public static IServiceCollection AddApplicationServices(this IServiceCollection services)
		{

			services.AddScoped<NoticeMapper>();
			services.AddScoped<INoticeService, NoticeService>();

			return services;
		}
	}
}
