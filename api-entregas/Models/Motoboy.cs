using System.ComponentModel.DataAnnotations;

namespace api_entregas.Models
{
    public class Motoboy
    {
        [Key]
        public int? Id { get; set; }

        [Required]
        public string? Nome { get; set; }

        public string? PlacaMoto { get; set; }

        public bool? Ativo { get; set; } = true;

        public IEnumerable<Entrega>? Entregas { get; set; }
    }
}
