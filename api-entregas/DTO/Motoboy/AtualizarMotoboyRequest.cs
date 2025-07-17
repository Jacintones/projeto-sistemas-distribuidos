using System.ComponentModel.DataAnnotations;

namespace api_entregas.DTO.Motoboy
{
    public record AtualizarMotoboyRequest
    {
        [Required(ErrorMessage = "O nome do motoboy é obrigatório")]
        [StringLength(100, ErrorMessage = "O nome do motoboy deve ter no máximo 100 caracteres")]
        public string? Nome { get; init; }

        [Required(ErrorMessage = "A placa da moto é obrigatória")]
        [StringLength(10, ErrorMessage = "A placa da moto deve ter no máximo 10 caracteres")]
        public string? PlacaMoto { get; init; }

        public bool? Ativo { get; init; }
    }
}
