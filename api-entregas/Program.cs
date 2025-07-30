using api_entregas.Data;
using api_entregas.DTO.Entrega;
using api_entregas.DTO.Motoboy;
using api_entregas.Exceptions;
using api_entregas.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<EntregaDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<EntregaService>();
builder.Services.AddScoped<MotoboyService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "API de Entregas", Version = "v1" });
});

var app = builder.Build();

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region endpoints
app.MapGet("api/motoboys", (MotoboyService service) =>
{
    var motoboys = service.ListarTodos();
    return Results.Ok(motoboys);
});

app.MapPost("api/entregas", (CriarEntregaRequest request, EntregaService service) =>
{
    try
    {
        service.CriarEntrega(request);
        return Results.Ok("Entrega criada com sucesso.");
    }
    catch (DadosInvalidosException ex)
    {
        return Results.BadRequest(ex.Message);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPut("api/entregas/{id}/status", (long id, AtualizarStatusEntregaRequest request, EntregaService service) =>
{
    try
    {
        service.MudarStatus(id, request);
        return Results.Ok("Status atualizado com sucesso.");
    }
    catch (EntidadeNaoEncontradaException ex)
    {
        return Results.NotFound(ex.Message);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPost("api/motoboys", (CriarMotoboyRequest request, MotoboyService service) =>
{
    try
    {
        var motoboy = service.CriarMotoboy(request);
        if (motoboy is null)
            return Results.Problem("Erro ao criar motoboy.");

        return Results.Ok(motoboy);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPut("api/motoboys/{id}", (int id, AtualizarMotoboyRequest request, MotoboyService service) =>
{
    try
    {
        var atualizado = service.Atualizar(id, request);
        if (!atualizado)
            return Results.NotFound($"Motoboy com ID {id} não encontrado.");

        return Results.Ok("Motoboy atualizado com sucesso.");
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapGet("api/motoboys/ativos", (MotoboyService service) =>
{
    var motoboys = service.ListarTodos()
        .Where(m => m.Ativo == true)
        .Select(m => new { m.Id, m.Nome });

    return Results.Ok(motoboys);
});

app.MapGet("api/entregas", (EntregaService service) =>
{
    var entregas = service.ListarTodas()
        .Select(e => new
        {
            e.Id,
            e.NomeCliente,
            e.Endereco,
            e.Telefone,
            e.MotoboyId,
            e.Status,
            e.DataSolicitada,
            MotoboyNome = e.Motoboy?.Nome
        });

    return Results.Ok(entregas);
});


#endregion

app.Run();
