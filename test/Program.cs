using Microsoft.EntityFrameworkCore;
using test.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationContext>(optios =>
    optios.UseSqlServer(builder.Configuration.GetConnectionString("test")));
var app = builder.Build();

builder.Services.AddCors();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(options => options
            .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
