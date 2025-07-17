namespace api_entregas.Exceptions
{
    public class EntidadeNaoEncontradaException : ApplicationException
    {
        public EntidadeNaoEncontradaException(string entidade, object id)
            : base($"{entidade} com ID {id} não foi encontrada.") { }
    }
}
