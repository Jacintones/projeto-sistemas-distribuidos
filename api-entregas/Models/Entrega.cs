using api_entregas.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_entregas.Models
{
    public class Entrega
    {
        [Key]
        public long? Id { get; set; }

        [Required]
        public string? NomeCliente { get; set; }

        [Required]
        public string? Endereco { get; set; }

        public string? Telefone { get; set; }

        [Required]
        public StatusEntrega? Status { get; set; }

        public DateTime? DataSolicitada { get; set; }

        public DateTime? DataEntrega { get; set; }

        public int? MotoboyId { get; set; }

        [ForeignKey("MotoboyId")]
        public Motoboy? Motoboy { get; set; }
    }
}
