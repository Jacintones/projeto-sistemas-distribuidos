using api_entregas.Data;
using api_entregas.DTO.Entrega;
using api_entregas.Exceptions;
using api_entregas.Models;
using api_entregas.Models.Enums;

namespace api_entregas.Services
{
    public class EntregaService
    {
        private readonly EntregaDbContext _context;
        private readonly ILogger<EntregaService> _logger;

        public EntregaService(EntregaDbContext context, ILogger<EntregaService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void CriarEntrega(CriarEntregaRequest request)
        {
            try
            {
                var entrega = new Entrega
                {
                    NomeCliente = request.NomeCliente,
                    Endereco = request.Endereco,
                    Telefone = request.Telefone,
                    MotoboyId = request?.MotoboyId,
                    DataSolicitada = DateTime.UtcNow,
                    Status = StatusEntrega.Pendente
                };

                _context.Entregas.Add(entrega);
                _context.SaveChanges();

                _logger.LogInformation("Entrega criada com sucesso: {@Entrega}", entrega);
            }
            catch (DadosInvalidosException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar entrega: {@Request}", request);
                throw new ErroInternoException("Erro interno ao criar entrega.", ex);
            }
        }

        public void MudarStatus(int id, AtualizarStatusEntregaRequest request)
        {
            try
            {
                var entrega = _context.Entregas.Find(id);
                if (entrega is null)
                {
                    _logger.LogWarning("Entrega com ID {Id} não encontrada.", id);
                    throw new EntidadeNaoEncontradaException("Entrega", id);
                }

                entrega.Status = request.Status;

                if (request.Status == StatusEntrega.Entregue)
                {
                    entrega.DataEntrega = DateTime.UtcNow;
                    _logger.LogInformation("Entrega ID {Id} marcada como ENTREGUE.", id);
                }
                else
                {
                    _logger.LogInformation("Status da entrega ID {Id} atualizado para {Status}.", id, request.Status);
                }

                _context.SaveChanges();
            }
            catch (EntidadeNaoEncontradaException)
            {
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar status da entrega ID {Id}.", id);
                throw new ErroInternoException("Erro interno ao atualizar status da entrega.", ex);
            }
        }
    }
}
