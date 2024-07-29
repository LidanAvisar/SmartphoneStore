using Microsoft.EntityFrameworkCore;
using SmartphoneStoreApi.Data;
using SmartphoneStoreApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), 
    new MySqlServerVersion(new Version(8, 0, 25))));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials(); 
        });
});

builder.Services.AddSignalR();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
    SeedData(context);
}

void SeedData(ApplicationDbContext context)
{
    if (!context.Users.Any())
    {
        context.Users.Add(new User { Username = "admin", Password = "admin1234", Role = "admin" });
        context.Users.Add(new User { Username = "user", Password = "user1234", Role = "user" });
        context.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowSpecificOrigin"); 

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ConnectionHub>("/connectionHub");

app.Run();
