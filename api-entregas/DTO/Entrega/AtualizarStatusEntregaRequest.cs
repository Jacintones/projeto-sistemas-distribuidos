using api_entregas.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace api_entregas.DTO.Entrega
{
    public class AtualizarStatusEntregaRequest
    {
        [Required(ErrorMessage = "O status é obrigatório")]
        public StatusEntrega? Status { get; set; }
    }
}
