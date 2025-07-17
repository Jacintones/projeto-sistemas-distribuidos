namespace api_entregas.DTO.Motoboy
{
    public record MotoboyResponse
    {
        public int? Id { get; init; }
        public string? Nome { get; init; }
        public string? PlacaMoto { get; init; }
        public bool? Ativo { get; init; }

        public static explicit operator MotoboyResponse(Models.Motoboy motoboy)
        {
            return new MotoboyResponse
            {
                Id = motoboy.Id,
                Nome = motoboy.Nome,
                PlacaMoto = motoboy.PlacaMoto,
                Ativo = motoboy.Ativo
            };
        }
    }
}
