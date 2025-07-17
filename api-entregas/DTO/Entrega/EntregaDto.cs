using api_entregas.Models.Enums;

namespace api_entregas.DTO.Entrega
{
    public class EntregaDto
    {
        public int? Id { get; set; }
        public string? NomeCliente { get; set; }
        public string? Endereco { get; set; }
        public string? Telefone { get; set; }
        public StatusEntrega? Status { get; set; }
        public DateTime? DataSolicitada { get; set; }
        public DateTime? DataEntrega { get; set; }
        public int? MotoboyId { get; set; }
        public string? NomeMotoboy { get; set; }
    }
}
