using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RVAProjekat.AppData;
using RVAProjekat.AppData.Strategy;
using RVAProjekat.InicijalizacijaZaProlaz;
using RVAProjekat.Logger;

namespace RVAProjekat
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            //Postavljanje strategije
            UserProviderStrategy.SetStrategy(new DataBaseUserProvider());
            ItemProviderStrategy.SetStrategy(new DataBaseItemProvider());
            MarkProviderStrategy.SetStrategy(new DataBaseMarkProvider());
            NotificationProviderStrategy.SetStrategy(new DataBaseNotificationProvider());
            //Inicijalizacija podataka
            InitializationOfData i = new InitializationOfData();
            i.Initialize();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();


            services.AddCors();
            ////dodati za logovanje

            services.AddSingleton<ILoggerManager, LoggerManager>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseCors(options =>
            options.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
        }
    }
}
