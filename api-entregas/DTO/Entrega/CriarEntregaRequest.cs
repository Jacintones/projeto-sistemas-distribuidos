using System.ComponentModel.DataAnnotations;

namespace api_entregas.DTO.Entrega
{
    public class CriarEntregaRequest
    {
        [Required(ErrorMessage = "O nome do cliente é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome do cliente deve ter no máximo 100 caracteres.")]
        public string? NomeCliente { get; set; }

        [Required(ErrorMessage = "O endereço é obrigatório.")]
        [StringLength(200, ErrorMessage = "O endereço deve ter no máximo 200 caracteres.")]
        public string? Endereco { get; set; }

        [Required(ErrorMessage = "O telefone é obrigatório.")]
        [Phone(ErrorMessage = "O telefone informado não é válido.")]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "O ID do motoboy é obrigatório.")]
        [Range(1, int.MaxValue, ErrorMessage = "O ID do motoboy deve ser um número positivo.")]
        public int? MotoboyId { get; set; }
    }
}
