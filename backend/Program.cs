var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyHeader()
           .AllowAnyMethod();
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/patient", async () =>
{
    using (var httpClient = new HttpClient())
    {
        var patientJson = await httpClient.GetStringAsync("https://hapi.fhir.org/baseR4/Patient?_format=json");
        return patientJson;
    }
})
.WithName("GetPatientData")
.WithOpenApi();

app.MapGet("/encounter/{identifier}", async (string identifier) =>
{
    using (var httpClient = new HttpClient())
    {
        var encounterJson = await httpClient.GetStringAsync($"https://hapi.fhir.org/baseR4/Encounter?patient.identifier={identifier}");
        return encounterJson;
    }
})
.WithName("GetEncounterData")
.WithOpenApi();

app.MapGet("/patientsearch/{identifier}", async (string identifier) =>
{
    using (var httpClient = new HttpClient())
    {
        var response = await httpClient.GetAsync($"http://localhost:5246/encounter/{identifier}");
        
        if (response.IsSuccessStatusCode)
        {
            var encounterJson = await response.Content.ReadAsStringAsync();
            return encounterJson;
        }
        else
        {
            // Handle error, return an appropriate response or log the error
            return "Error fetching data";
        }
    }
})
.WithName("SearchPatient")
.WithOpenApi();

app.Run();
