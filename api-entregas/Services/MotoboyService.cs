using api_entregas.Data;
using api_entregas.DTO.Motoboy;
using api_entregas.Models;

namespace api_entregas.Services
{
    public class MotoboyService
    {
        private readonly EntregaDbContext _context;
        private readonly ILogger<MotoboyService> _logger;

        public MotoboyService(EntregaDbContext context, ILogger<MotoboyService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public MotoboyResponse? CriarMotoboy(CriarMotoboyRequest request)
        {
            try
            {
                var motoboy = new Motoboy
                {
                    Nome = request.Nome,
                    PlacaMoto = request.PlacaMoto,
                    Ativo = true
                };

                _context.Motoboys.Add(motoboy);
                _context.SaveChanges();

                _logger.LogInformation("Motoboy criado com sucesso: {@Motoboy}", motoboy);
                return (MotoboyResponse)motoboy;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar motoboy: {@Request}", request);
                return null;
            }
        }

        public List<MotoboyResponse> ListarTodos()
        {
            try
            {
                var lista = _context.Motoboys.ToList();
                _logger.LogInformation("Listagem de motoboys retornou {Count} registros.", lista.Count);
                return lista.Select(c => (MotoboyResponse)c).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao listar motoboys.");
                return new List<MotoboyResponse>();
            }
        }

        public bool Atualizar(int id, AtualizarMotoboyRequest request)
        {
            try
            {
                var motoboy = _context.Motoboys.Find(id);
                if (motoboy is null)
                {
                    _logger.LogWarning("Motoboy ID {Id} não encontrado para atualização.", id);
                    return false;
                }

                motoboy.Nome = request.Nome ?? motoboy.Nome;
                motoboy.PlacaMoto = request.PlacaMoto ?? motoboy.PlacaMoto;

                if (request.Ativo.HasValue)
                    motoboy.Ativo = request.Ativo.Value;

                _context.SaveChanges();
                _logger.LogInformation("Motoboy ID {Id} atualizado com sucesso.", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar motoboy ID {Id}.", id);
                return false;
            }
        }

        public bool Inativar(int id)
        {
            try
            {
                var motoboy = _context.Motoboys.Find(id);
                if (motoboy is null)
                {
                    _logger.LogWarning("Motoboy ID {Id} não encontrado para inativação.", id);
                    return false;
                }

                if (!motoboy.Ativo.GetValueOrDefault())
                {
                    _logger.LogInformation("Motoboy ID {Id} já está inativo.", id);
                    return false;
                }

                motoboy.Ativo = false;
                _context.SaveChanges();
                _logger.LogInformation("Motoboy ID {Id} inativado com sucesso.", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao inativar motoboy ID {Id}.", id);
                return false;
            }
        }
    }
}
